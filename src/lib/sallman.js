// Client for the saLLMan Hugging Face Space — a 97M-parameter decoder-only LLM
// I trained from scratch. The Space runs a Gradio backend exposing a single
// `/generate` endpoint. The model is single-turn (no conversation memory), so
// each request is fully independent.
//
// We use the official @gradio/client because it transparently handles the
// queue/event-stream protocol AND waits for the Space to wake from its idle
// sleep (the free tier spins down after ~48h, so the first call can cold-start).

import { Client } from '@gradio/client';

export const SPACE_ID = 'Salmanalfarisi1/saLLMan-demo';
export const SPACE_APP_URL = 'https://salmanalfarisi1-sallman-demo.hf.space';
export const SPACE_PAGE_URL = 'https://huggingface.co/spaces/Salmanalfarisi1/saLLMan-demo';
export const REPO_URL = 'https://github.com/SalmanAlfarisi5/saLLMan';

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

// Connecting (and waking) the Space is expensive, so cache the connection and
// reuse it across requests. Reset the cache if a connection attempt fails so a
// later retry can start fresh.
let clientPromise = null;

// While a sleeping Space cold-starts, the Gradio client reports wake/build
// progress through a status callback. We fan those updates out to any UI
// subscribers and remember the latest one, so a late subscriber still sees the
// current state. Shape: @gradio/client SpaceStatus ({ status, detail, message }).
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

function getClient() {
  if (!clientPromise) {
    clientPromise = Client.connect(SPACE_ID, { status_callback: emitStatus }).catch((err) => {
      clientPromise = null;
      throw err;
    });
  }
  return clientPromise;
}

// Eagerly start connecting to (and, if needed, waking) the Space. Safe to call
// repeatedly and early — e.g. on page mount — so the cold-start boot overlaps
// with the user reading the page and typing instead of starting on submit.
export function warmUp() {
  getClient().catch(() => {
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

/**
 * Call the model. Positional args must be in this exact order:
 *   problem (string), temperature (float), top_k (int), max_new_tokens (int).
 * Returns the raw, tagged string the model produced.
 */
export async function generateSolution({
  problem,
  temperature = DEFAULTS.temperature,
  topK = DEFAULTS.topK,
  maxNewTokens = DEFAULTS.maxNewTokens,
}) {
  const app = await getClient();
  const result = await app.predict('/generate', [problem, temperature, topK, maxNewTokens]);

  const text = Array.isArray(result?.data) ? result.data[0] : result?.data;
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
