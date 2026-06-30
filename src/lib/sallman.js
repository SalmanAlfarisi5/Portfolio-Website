// Client for the saLLMan Hugging Face Space — a 97M-parameter decoder-only LLM
// I trained from scratch. The Space runs a Gradio backend exposing a single
// `/generate` endpoint. The model is single-turn (no conversation memory), so
// each request is fully independent.
//
// We talk to the Space over Gradio's plain REST API with `fetch`, NOT the
// official @gradio/client. From a visitor's browser that library fails two ways
// (both invisible from Node/curl, which is why the Space "works on HF" yet the
// site couldn't reach it):
//   1. It resolves the Space through huggingface.co/api/spaces/... first — an
//      extra hop that anonymous visitor IPs get rate-limited on (HTTP 429).
//   2. It issues credentialed (cookie) cross-origin requests, which the Space
//      rejects under CORS (its responses omit `Access-Control-Allow-Credentials`).
// Calling the Space's own *.hf.space REST endpoints directly with an ordinary
// uncredentialed fetch sidesteps both. This is Gradio's documented "API via
// curl" protocol:
//   POST {app}/gradio_api/call/generate   {data:[...]}  ->  { event_id }
//   GET  {app}/gradio_api/call/generate/{event_id}      ->  SSE result stream

export const SPACE_ID = 'Salmanalfarisi1/saLLMan-demo';
export const SPACE_APP_URL = 'https://salmanalfarisi1-sallman-demo.hf.space';
export const SPACE_PAGE_URL = 'https://huggingface.co/spaces/Salmanalfarisi1/saLLMan-demo';
export const REPO_URL = 'https://github.com/SalmanAlfarisi5/saLLMan';

// Gradio mounts its REST API under /gradio_api on the Space's app domain.
const API_ROOT = `${SPACE_APP_URL}/gradio_api`;

// Generation defaults, mirroring the Space's own defaults.
export const DEFAULTS = Object.freeze({
  temperature: 0.8,
  topK: 40,
  maxNewTokens: 256,
});

// One-click example problems that fill the prompt box.
export const EXAMPLE_PROMPTS = Object.freeze([
  'Two-sum: return the indices of two numbers that add up to a target',
  'Reverse a singly linked list',
  'Check if a string is a palindrome, ignoring spaces and case',
  'Maximum sum of a contiguous subarray',
  'Merge two sorted arrays into one sorted array',
]);

// While a sleeping Space cold-starts we report wake progress through a status
// callback. We fan those updates out to any UI subscribers and remember the
// latest one, so a late subscriber still sees the current state.
// Shape mirrors @gradio/client's SpaceStatus: { status, message }.
const statusListeners = new Set();
let lastStatus = null;

/**
 * Subscribe to Space connection status updates. Immediately replays the most
 * recent status, if any. Returns an unsubscribe function.
 */
export function subscribeStatus(listener) {
  statusListeners.add(listener);
  if (lastStatus) listener(lastStatus);
  return () => statusListeners.delete(listener);
}

function emitStatus(status) {
  lastStatus = status;
  for (const listener of statusListeners) {
    try {
      listener(status);
    } catch {
      /* a broken listener must not break the connection */
    }
  }
}

// ── Waking the Space ─────────────────────────────────────────────────────────
// The free CPU tier spins the Space down after ~48h idle. Any request to the
// app domain triggers a wake, but the app isn't ready to serve until /config
// returns JSON. We probe /config (uncredentialed, so no CORS/credentials issue
// and no rate-limited huggingface.co hop) until it's up, surfacing a "starting"
// status meanwhile so the UI can show friendly cold-start copy.

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
  // Fast path: a warm Space is ready immediately, with no status noise.
  if (await appIsRunning()) return;

  emitStatus({ status: 'starting', message: 'Waking the Space up…' });
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
    if (await appIsRunning()) {
      emitStatus({ status: 'running', message: 'Space is running.' });
      return;
    }
  }
  throw new Error('The Space did not wake up in time. Please try again in a moment.');
}

// Cache the in-flight wake so warmUp() and a submit share one probe loop.
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

// Eagerly start waking the Space. Safe to call repeatedly and early — e.g. on
// page mount — so the cold-start boot overlaps with the user reading and typing
// instead of starting only on submit.
export function warmUp() {
  ensureAwake().catch(() => {
    /* the error is surfaced later, when the user actually submits */
  });
}

// Track whether the model has answered at least once this session. The first
// request of a session may cold-start the Space (a free CPU boot can take a
// minute or more), so the UI shows a friendlier "waking the model up" message
// until we've seen one response.
let warmedUp = false;
export function isColdStart() {
  return !warmedUp;
}

// ── Calling the model ────────────────────────────────────────────────────────

// Kick off a generation; returns the event id used to read the result stream.
async function startGenerate(data) {
  const res = await fetch(`${API_ROOT}/call/generate`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) {
    throw new Error(`The model request failed (HTTP ${res.status}).`);
  }
  const eventId = (await res.json())?.event_id;
  if (!eventId) {
    throw new Error('The model did not return a request id.');
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

// Stream the result for an event id. Gradio emits intermediate `generating`
// events and a final `complete` (or `error`) event; we resolve on the first
// terminal one.
async function readResult(eventId) {
  const res = await fetch(`${API_ROOT}/call/generate/${eventId}`, {
    headers: { accept: 'text/event-stream' },
  });
  if (!res.ok || !res.body) {
    throw new Error(`Couldn't read the model response (HTTP ${res.status}).`);
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
          throw new Error(data || 'The model reported an error.');
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
  throw new Error('The model response ended unexpectedly.');
}

/**
 * Call the model. Args map to the Space's `/generate` inputs, in this exact
 * order: problem (string), temperature (float), top_k (int), max_new_tokens
 * (int). Returns the raw, tagged string the model produced.
 */
export async function generateSolution({
  problem,
  temperature = DEFAULTS.temperature,
  topK = DEFAULTS.topK,
  maxNewTokens = DEFAULTS.maxNewTokens,
}) {
  await ensureAwake();

  let eventId;
  try {
    eventId = await startGenerate([problem, temperature, topK, maxNewTokens]);
  } catch (err) {
    // The Space may have slept again since we last checked; drop the cached
    // wake so the next attempt re-probes and re-wakes it.
    wakePromise = null;
    throw err;
  }

  const text = await readResult(eventId);
  if (typeof text !== 'string') {
    throw new Error('The model returned an unexpected response.');
  }

  warmedUp = true;
  return text;
}

// ── Output parsing ──────────────────────────────────────────────────────────
// The model emits tagged sections, e.g.
//   <reasoning> ...step-by-step reasoning... </reasoning>
//   <code> ...python... </code>
// We split those out so the UI can render reasoning as prose and code in a
// highlighted block, stripping the raw tags. The model is small and sometimes
// drops or truncates a tag, so this is deliberately forgiving.

function extractTag(text, tag) {
  // Preferred: a properly closed <tag>...</tag> pair.
  const closed = new RegExp(`<${tag}\\s*>([\\s\\S]*?)<\\/${tag}\\s*>`, 'i');
  const closedMatch = text.match(closed);
  if (closedMatch) return closedMatch[1].trim();

  // Fallback: an opening tag with no close — capture up to the next known tag
  // or the end of the string (handles truncated / max-token-cut output).
  const open = new RegExp(
    `<${tag}\\s*>([\\s\\S]*?)(?=<\\/?(?:reasoning|code)\\s*>|$)`,
    'i',
  );
  const openMatch = text.match(open);
  if (openMatch && openMatch[1].trim()) return openMatch[1].trim();

  return null;
}

/**
 * Parse the model's tagged output.
 * @returns {{ reasoning: string|null, code: string|null, raw: string, structured: boolean }}
 * If no recognizable tags are present, `structured` is false and callers should
 * fall back to rendering `raw`.
 */
export function parseModelOutput(text) {
  const raw = typeof text === 'string' ? text : '';
  const reasoning = extractTag(raw, 'reasoning');
  const code = extractTag(raw, 'code');
  return {
    reasoning,
    code,
    raw,
    structured: reasoning !== null || code !== null,
  };
}
