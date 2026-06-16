import { useEffect } from 'react';

const BASE_TITLE = 'Muhammad Salman Al Farisi';
const DEFAULT_DESCRIPTION =
  'Muhammad Salman Al Farisi — Data Science & Analytics student at NUS building intelligent machine learning systems: LLMs, RAG, NLP, and forecasting.';

// Lightweight per-route document title + meta description, no extra deps.
// Pass just a page label (e.g. "Projects") — it is composed with the base title.
export default function usePageMeta(pageTitle, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} — ${BASE_TITLE}` : `${BASE_TITLE} — Data Scientist & ML Engineer`;

    const meta = document.querySelector('meta[name="description"]');
    const prevDescription = meta ? meta.getAttribute('content') : null;
    if (meta && description) {
      meta.setAttribute('content', description);
    }

    return () => {
      if (meta && prevDescription !== null) {
        meta.setAttribute('content', prevDescription);
      }
    };
  }, [pageTitle, description]);
}
