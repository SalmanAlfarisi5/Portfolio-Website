// Client for the Multimodal Document RAG Hugging Face Space.
//
// The Space runs the full retrieval pipeline (hybrid BGE + BM25 + CLIP search,
// cross-encoder re-ranking, gpt-4o-mini answers with images attached) and holds
// the OpenAI key as a server-side secret. To keep cost bounded and the page
// abuse-resistant, the website only exposes the *curated sample* documents —
// uploads live on the full Space (and are themselves strictly capped there).
//
// We talk to the Space over Gradio's plain REST API with `fetch`, NOT the
// official @gradio/client (same approach as src/lib/sallman.js). From a
// visitor's browser that library fails two ways — both invisible from
// Node/curl, which is why the Space "works on HF" yet the deployed site got
// "Failed to fetch":
//   1. It resolves the Space through huggingface.co/api/spaces/... first — an
//      extra hop that anonymous visitor IPs get rate-limited on (HTTP 429).
//   2. It issues credentialed (cookie) cross-origin requests, which the Space
//      rejects under CORS (its responses omit `Access-Control-Allow-Credentials`).
// Calling the Space's own *.hf.space REST endpoints with an ordinary
// uncredentialed fetch sidesteps both. This is Gradio's documented "API via
// curl" protocol (two named endpoints here, both plain text in / JSON out):
//   POST {app}/gradio_api/call/{ep}   {data:[...]}  ->  { event_id }
//   GET  {app}/gradio_api/call/{ep}/{event_id}      ->  SSE result stream

export const SPACE_ID = 'Salmanalfarisi1/multimodal-rag-demo';
export const SPACE_APP_URL = 'https://salmanalfarisi1-multimodal-rag-demo.hf.space';
export const SPACE_PAGE_URL = 'https://huggingface.co/spaces/Salmanalfarisi1/multimodal-rag-demo';
export const REPO_URL = 'https://github.com/SalmanAlfarisi5';

// Gradio mounts its REST API under /gradio_api on the Space's app domain.
const API_ROOT = `${SPACE_APP_URL}/gradio_api`;

// Shown until samples load from the Space; also the fallback if the Space is asleep.
export const FALLBACK_SAMPLES = Object.freeze([
  { id: 'northwind_2023_annual_report', title: 'Northwind FY2023 Annual Report' },
  { id: 'aurora_x1_datasheet', title: 'Aurora X1 AI Accelerator Datasheet' },
]);

// One-click example questions (work against the bundled samples).
export const EXAMPLE_QUESTIONS = Object.freeze([
  'What was revenue in FY2023 and how much did it grow year over year?',
  'What is the gross margin and how did it change?',
  'What is the FY2024 revenue guidance?',
  'What is the peak INT8 throughput and typical power?',
  'How does YOLOv8-n perform on this accelerator?',
]);

// A best-effort per-browser token so the Space can rate-limit a single client.
// (The real spend protection is server-side; this just adds friction.)
function getToken() {
  try {
    let t = localStorage.getItem('mmrag_token');
    if (!t) {
      t = crypto.randomUUID?.() || String(Math.random()).slice(2);
      localStorage.setItem('mmrag_token', t);
    }
    return t;
  } catch {
    return 'anon';
  }
}

// ── Waking the Space ─────────────────────────────────────────────────────────
// The free CPU tier spins the Space down after ~48h idle. Any request to the
// app domain triggers a wake, but the app isn't ready to serve until /config
// returns JSON. We probe /config (uncredentialed, so no CORS/credentials issue
// and no rate-limited huggingface.co hop) until it's up.

// `/config` serves JSON only when the Gradio app is actually running; while the
// Space sleeps or builds it returns the HF wake page (HTML) or a 5xx.
async function appIsRunning() {
  try {
    const res = await fetch(`${SPACE_APP_URL}/config`, {
      headers: { accept: 'application/json' },
    });
    if (!res.ok) return false;
    return (res.headers.get('content-type') || '').includes('application/json');
  } catch {
    return false;
  }
}

async function waitUntilAwake({ timeoutMs = 180000, intervalMs = 3000 } = {}) {
  // Fast path: a warm Space is ready immediately.
  if (await appIsRunning()) return;

  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
    if (await appIsRunning()) return;
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

// Eagerly start waking the Space (fire-and-forget). Safe to call repeatedly —
// e.g. on page mount — so the cold-start boot overlaps with the visitor reading
// and typing instead of starting only when they hit Ask.
export function warmUp() {
  ensureAwake().catch(() => {
    /* the error is surfaced later, when the user actually asks */
  });
}

// Track whether the demo has answered at least once this session, so the UI can
// show friendlier "waking the demo up" copy on the first (possibly cold) run.
let warmedUp = false;
export function isColdStart() {
  return !warmedUp;
}

// ── Calling an endpoint ──────────────────────────────────────────────────────

// Kick off an endpoint call; returns the event id used to read the result.
async function startCall(endpoint, data) {
  const res = await fetch(`${API_ROOT}/call/${endpoint}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) {
    throw new Error(`The demo request failed (HTTP ${res.status}).`);
  }
  const eventId = (await res.json())?.event_id;
  if (!eventId) {
    throw new Error('The demo did not return a request id.');
  }
  return eventId;
}

// Parse one SSE block ("event: ...\ndata: ...") into its event name and raw
// data string. Per the SSE spec, multiple data: lines concatenate with "\n".
function parseSseBlock(block) {
  let event;
  const dataLines = [];
  for (const line of block.split('\n')) {
    if (line.startsWith('event:')) event = line.slice(6).trim();
    else if (line.startsWith('data:')) dataLines.push(line.slice(5).replace(/^ /, ''));
  }
  return { event, data: dataLines.length ? dataLines.join('\n') : undefined };
}

// Stream the result for an event id and return the endpoint's single output
// value. Gradio may emit intermediate `generating` events before a terminal
// `complete` (or `error`); we resolve on the first terminal one.
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

        if (event === 'error') {
          throw new Error(data || 'The demo reported an error.');
        }
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

// Run one endpoint call end-to-end and return its single output value. Assumes
// the Space is already awake (callers gate on ensureAwake/appIsRunning).
async function callEndpoint(endpoint, data) {
  const eventId = await startCall(endpoint, data);
  return readResult(endpoint, eventId);
}

// Both endpoints return their real payload as a JSON string in that single
// output slot; unwrap it.
function parseJson(raw) {
  if (typeof raw !== 'string') throw new Error('Unexpected response from the demo.');
  return JSON.parse(raw);
}

/** Fetch the list of available sample documents. Falls back to a static list. */
export async function fetchSamples() {
  try {
    if (await appIsRunning()) {
      const data = parseJson(await callEndpoint('samples', []));
      warmedUp = true;
      if (Array.isArray(data) && data.length) return data;
    } else {
      // Space is cold: don't block the samples list on a full wake — return the
      // static list now and boot the Space in the background so it's ready by
      // the time a question is asked.
      warmUp();
    }
  } catch {
    /* asleep, unreachable, or malformed — fall back to the static list */
  }
  return [...FALLBACK_SAMPLES];
}

/**
 * Ask a question against a curated sample document.
 * @returns {{answer: string, sources: Array}}
 */
export async function askQuestion({ sampleId, question }) {
  await ensureAwake();

  let raw;
  try {
    raw = await callEndpoint('ask', [sampleId, question, getToken()]);
  } catch (err) {
    // The Space may have slept again since we last probed; drop the cached wake
    // so the next attempt re-probes and re-wakes it.
    wakePromise = null;
    throw err;
  }

  const data = parseJson(raw);
  if (data.error) throw new Error(data.error);
  warmedUp = true;
  return data;
}
