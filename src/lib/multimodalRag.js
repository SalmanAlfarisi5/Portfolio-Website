// Client for the Multimodal Document RAG Hugging Face Space.
//
// The Space runs the full retrieval pipeline (hybrid BGE + BM25 + CLIP search,
// cross-encoder re-ranking, gpt-4o-mini answers with images attached) and holds
// the OpenAI key as a server-side secret. To keep cost bounded and the page
// abuse-resistant, the website only exposes the *curated sample* documents —
// uploads live on the full Space (and are themselves strictly capped there).
//
// We use the official @gradio/client (same as the saLLMan demo): it handles the
// queue/event-stream protocol and waits for the Space to wake from idle sleep.

import { Client } from '@gradio/client';

// ⚠️  Update these to your actual Space once created (see space/DEPLOY.md).
export const SPACE_ID = 'Salmanalfarisi1/multimodal-rag-demo';
export const SPACE_APP_URL = 'https://salmanalfarisi1-multimodal-rag-demo.hf.space';
export const SPACE_PAGE_URL = 'https://huggingface.co/spaces/Salmanalfarisi1/multimodal-rag-demo';
export const REPO_URL = 'https://github.com/SalmanAlfarisi5';

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
      t = (crypto.randomUUID?.() || String(Math.random()).slice(2));
      localStorage.setItem('mmrag_token', t);
    }
    return t;
  } catch {
    return 'anon';
  }
}

// Cache + reuse the (expensive to establish) Space connection.
let clientPromise = null;
function getClient() {
  if (!clientPromise) {
    // Connect via the direct *.hf.space app URL rather than the "owner/space"
    // ID. Given an ID, @gradio/client first resolves the host through
    // https://huggingface.co/api/spaces/<id>/host — an extra hop that, from a
    // visitor's browser, is frequently rate-limited (HTTP 429) or blocked,
    // making connect() throw "Space metadata could not be loaded." The app URL
    // points straight at the running Space and skips that lookup entirely.
    clientPromise = Client.connect(SPACE_APP_URL).catch((err) => {
      clientPromise = null;
      throw err;
    });
  }
  return clientPromise;
}

let warmedUp = false;
export function isColdStart() {
  return !warmedUp;
}

function parseData(result) {
  const text = Array.isArray(result?.data) ? result.data[0] : result?.data;
  if (typeof text !== 'string') throw new Error('Unexpected response from the demo.');
  return JSON.parse(text);
}

/** Fetch the list of available sample documents. Falls back to a static list. */
export async function fetchSamples() {
  try {
    const app = await getClient();
    const data = parseData(await app.predict('/samples', []));
    warmedUp = true;
    if (Array.isArray(data) && data.length) return data;
  } catch {
    /* fall through to the static list */
  }
  return [...FALLBACK_SAMPLES];
}

/**
 * Ask a question against a curated sample document.
 * @returns {{answer: string, sources: Array}}
 */
export async function askQuestion({ sampleId, question }) {
  const app = await getClient();
  const data = parseData(await app.predict('/ask', [sampleId, question, getToken()]));
  if (data.error) throw new Error(data.error);
  warmedUp = true;
  return data;
}
