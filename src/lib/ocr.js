// Client for the ocrlab (deep-learning OCR) Hugging Face Space.
//
// The Space runs both models — DBNet text detection and a CRNN+CTC recognizer,
// both trained from scratch on synthetic data — and returns the extracted text
// plus a polygon for every word, so the page can draw the detections on a
// canvas rather than shipping a rendered image back.
//
// Same transport approach as src/lib/multimodalRag.js and src/lib/sallman.js:
// we talk to the Space over Gradio's plain REST API with `fetch`, NOT the
// official @gradio/client. From a visitor's browser that library fails two ways
// (both invisible from Node/curl):
//   1. It resolves the Space through huggingface.co/api/spaces/... first — an
//      extra hop that anonymous visitor IPs get rate-limited on (HTTP 429).
//   2. It issues credentialed (cookie) cross-origin requests, which the Space
//      rejects under CORS.
// Calling the Space's own *.hf.space REST endpoints with an ordinary
// uncredentialed fetch sidesteps both:
//   POST {app}/gradio_api/call/{ep}   {data:[...]}  ->  { event_id }
//   GET  {app}/gradio_api/call/{ep}/{event_id}      ->  SSE result stream

export const SPACE_ID = 'Salmanalfarisi1/ocrlab-demo';
export const SPACE_APP_URL = 'https://salmanalfarisi1-ocrlab-demo.hf.space';
export const SPACE_PAGE_URL = 'https://huggingface.co/spaces/Salmanalfarisi1/ocrlab-demo';
export const REPO_URL = 'https://github.com/SalmanAlfarisi5/ocr';

const API_ROOT = `${SPACE_APP_URL}/gradio_api`;

// Uploads are sent as base64 over a plain JSON endpoint, so keep them modest —
// a 4 MB image becomes ~5.5 MB of base64 in the request body.
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

// Shown before the Space answers, and as the fallback if it is asleep.
export const FALLBACK_SAMPLES = Object.freeze([
  { id: 'receipt', title: 'Receipt' },
  { id: 'document', title: 'Document' },
  { id: 'sign', title: 'Sign' },
]);

// A best-effort per-browser token so the Space can rate-limit a single client.
function getToken() {
  try {
    let token = localStorage.getItem('ocrlab_token');
    if (!token) {
      token = crypto.randomUUID?.() || String(Math.random()).slice(2);
      localStorage.setItem('ocrlab_token', token);
    }
    return token;
  } catch {
    return 'anon';
  }
}

// ── Waking the Space ─────────────────────────────────────────────────────────
// The free CPU tier spins down after ~48h idle. `/config` serves JSON only when
// the Gradio app is actually running; while it sleeps or builds it returns the
// HF wake page (HTML) or a 5xx.

export const NOT_DEPLOYED_MESSAGE =
  `The OCR demo Space (${SPACE_ID}) isn’t deployed yet. ` +
  `Build it with \`python scripts/build_space.py\` and push it to Hugging Face, ` +
  `then point SPACE_APP_URL in src/lib/ocr.js at it.`;

// Three distinguishable states, because they need different handling:
//   running  — serving JSON, go ahead
//   starting — asleep, building, or a transient blip; worth waiting for
//   missing  — no such Space (404 on the app domain). Waiting cannot fix this,
//              so we fail immediately instead of polling for three minutes.
async function probeSpace() {
  try {
    const res = await fetch(`${SPACE_APP_URL}/config`, {
      headers: { accept: 'application/json' },
    });
    if (res.status === 404) return 'missing';
    if (!res.ok) return 'starting';
    return (res.headers.get('content-type') || '').includes('application/json')
      ? 'running'
      : 'starting';
  } catch {
    return 'starting'; // network error — retryable, unlike a 404
  }
}

async function appIsRunning() {
  return (await probeSpace()) === 'running';
}

async function waitUntilAwake({ timeoutMs = 180000, intervalMs = 3000 } = {}) {
  const first = await probeSpace();
  if (first === 'running') return;
  if (first === 'missing') throw new Error(NOT_DEPLOYED_MESSAGE);

  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
    const state = await probeSpace();
    if (state === 'running') return;
    if (state === 'missing') throw new Error(NOT_DEPLOYED_MESSAGE);
  }
  throw new Error('The demo did not wake up in time. Please try again in a moment.');
}

// Cache the in-flight wake so a background warm-up and a submit share one probe
// loop rather than racing two.
let wakePromise = null;
function ensureAwake() {
  if (!wakePromise) {
    wakePromise = waitUntilAwake().catch((err) => {
      wakePromise = null;
      throw err;
    });
  }
  return wakePromise;
}

/** Start waking the Space (fire-and-forget). Safe to call on page mount. */
export function warmUp() {
  ensureAwake().catch(() => {
    /* surfaced later, when the user actually runs OCR */
  });
}

let warmedUp = false;
export function isColdStart() {
  return !warmedUp;
}

// ── Calling an endpoint ──────────────────────────────────────────────────────

async function startCall(endpoint, data) {
  const res = await fetch(`${API_ROOT}/call/${endpoint}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) throw new Error(`The demo request failed (HTTP ${res.status}).`);
  const eventId = (await res.json())?.event_id;
  if (!eventId) throw new Error('The demo did not return a request id.');
  return eventId;
}

// Per the SSE spec, multiple data: lines concatenate with "\n".
function parseSseBlock(block) {
  let event;
  const dataLines = [];
  for (const line of block.split('\n')) {
    if (line.startsWith('event:')) event = line.slice(6).trim();
    else if (line.startsWith('data:')) dataLines.push(line.slice(5).replace(/^ /, ''));
  }
  return { event, data: dataLines.length ? dataLines.join('\n') : undefined };
}

async function readResult(endpoint, eventId) {
  const res = await fetch(`${API_ROOT}/call/${endpoint}/${eventId}`, {
    headers: { accept: 'text/event-stream' },
  });
  if (!res.ok || !res.body) {
    throw new Error(`Couldn't read the demo response (HTTP ${res.status}).`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let sep;
      while ((sep = buffer.indexOf('\n\n')) !== -1) {
        const { event, data } = parseSseBlock(buffer.slice(0, sep));
        buffer = buffer.slice(sep + 2);
        if (data === undefined) continue;

        if (event === 'error') throw new Error(data || 'The demo reported an error.');
        if (event === 'complete') {
          const payload = JSON.parse(data);
          return Array.isArray(payload) ? payload[0] : payload;
        }
        // 'generating' / heartbeat events carry partial state we don't need.
      }
    }
  } finally {
    reader.cancel().catch(() => {});
  }
  throw new Error('The demo response ended unexpectedly.');
}

async function callEndpoint(endpoint, data) {
  const eventId = await startCall(endpoint, data);
  return readResult(endpoint, eventId);
}

function parseJson(raw) {
  if (typeof raw !== 'string') throw new Error('Unexpected response from the demo.');
  return JSON.parse(raw);
}

// ── Public API ───────────────────────────────────────────────────────────────

/** Read a File/Blob as a base64 data URL (what the Space's ocr_base64 wants). */
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read that file.'));
    reader.readAsDataURL(file);
  });
}

/** The list of bundled sample images. Falls back to a static list. */
export async function fetchSamples() {
  try {
    if (await appIsRunning()) {
      const data = parseJson(await callEndpoint('samples', []));
      warmedUp = true;
      if (Array.isArray(data) && data.length) return data;
    } else {
      // Don't block the sample list on a full wake — return the static list now
      // and boot the Space in the background.
      warmUp();
    }
  } catch {
    /* asleep, unreachable, or malformed — fall back */
  }
  return [...FALLBACK_SAMPLES];
}

function unwrap(raw) {
  const data = parseJson(raw);
  if (data.error) throw new Error(data.error);
  warmedUp = true;
  return data;
}

/**
 * OCR one of the bundled sample images.
 * @returns {{text: string, lines: string[], regions: Array, image_size: object}}
 */
export async function ocrSample(sampleId) {
  await ensureAwake();
  try {
    return unwrap(await callEndpoint('ocr_sample', [sampleId, getToken()]));
  } catch (err) {
    wakePromise = null; // it may have slept again; re-probe next time
    throw err;
  }
}

/**
 * OCR a user-supplied image.
 * @param {File|Blob} file
 */
export async function ocrUpload(file) {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(
      `That image is ${(file.size / 1024 / 1024).toFixed(1)} MB. Please use one under ${
        MAX_UPLOAD_BYTES / 1024 / 1024
      } MB.`
    );
  }
  const dataUrl = await fileToDataUrl(file);
  await ensureAwake();
  try {
    return unwrap(await callEndpoint('ocr_base64', [dataUrl, getToken()]));
  } catch (err) {
    wakePromise = null;
    throw err;
  }
}
