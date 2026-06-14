import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Loader2,
  RotateCcw,
  ExternalLink,
  AlertTriangle,
  FileText,
  Quote,
  Image as ImageIcon,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  fetchSamples,
  askQuestion,
  isColdStart,
  EXAMPLE_QUESTIONS,
  FALLBACK_SAMPLES,
  SPACE_PAGE_URL,
} from '@/lib/multimodalRag';

const inputClasses =
  'w-full bg-secondary/30 border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all';

const COLD_THRESHOLD_SECONDS = 15;

const MultimodalRagDemo = () => {
  const [samples, setSamples] = useState(FALLBACK_SAMPLES);
  const [sampleId, setSampleId] = useState(FALLBACK_SAMPLES[0]?.id || '');
  const [question, setQuestion] = useState('');

  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState([]);
  const [error, setError] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [cold, setCold] = useState(false);

  const timerRef = useRef(null);
  const textareaRef = useRef(null);

  // Load the live sample list from the Space (falls back to the static list).
  useEffect(() => {
    let alive = true;
    fetchSamples()
      .then((list) => {
        if (!alive || !list?.length) return;
        setSamples(list);
        setSampleId((cur) => (list.some((s) => s.id === cur) ? cur : list[0].id));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const loading = status === 'loading';
  const showColdMessage = cold || elapsed >= COLD_THRESHOLD_SECONDS;

  const fillExample = (text) => {
    setQuestion(text);
    textareaRef.current?.focus();
  };

  const run = async () => {
    const q = question.trim();
    if (!q || loading) return;

    setStatus('loading');
    setAnswer('');
    setSources([]);
    setError('');
    setElapsed(0);
    setCold(isColdStart());

    const startedAt = Date.now();
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);

    try {
      const data = await askQuestion({ sampleId, question: q });
      setAnswer(data.answer || '');
      setSources(Array.isArray(data.sources) ? data.sources : []);
      setStatus('done');
    } catch (err) {
      setError(err?.message || 'Something went wrong while reaching the demo.');
      setStatus('error');
    } finally {
      clearInterval(timerRef.current);
    }
  };

  return (
    <div className="glass-card rounded-xl p-5 sm:p-6">
      {/* Document picker */}
      <label htmlFor="mmrag-doc" className="block text-sm font-medium mb-2">
        Document
      </label>
      <div className="relative">
        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <select
          id="mmrag-doc"
          value={sampleId}
          onChange={(e) => setSampleId(e.target.value)}
          disabled={loading}
          className={`${inputClasses} pl-9 appearance-none cursor-pointer disabled:opacity-60`}
        >
          {samples.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      {/* Question input */}
      <label htmlFor="mmrag-q" className="block text-sm font-medium mt-4 mb-2">
        Question
      </label>
      <textarea
        id="mmrag-q"
        ref={textareaRef}
        rows={3}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={loading}
        placeholder="Ask something answerable from the selected document…"
        className={`${inputClasses} resize-y disabled:opacity-60`}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') run();
        }}
      />

      {/* Example questions */}
      <div className="mt-3">
        <span className="text-xs text-muted-foreground">Try an example:</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {EXAMPLE_QUESTIONS.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => fillExample(ex)}
              disabled={loading}
              className="text-xs text-left px-3 py-1.5 rounded-full bg-secondary/40 border border-border/40 text-foreground/80 hover:bg-secondary/70 hover:text-foreground transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Ask button */}
      <div className="mt-5 flex items-center gap-3 flex-wrap">
        <Button onClick={run} disabled={loading || !question.trim()} size="lg" className="rounded-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching…
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Ask
            </>
          )}
        </Button>
        <span className="text-xs text-muted-foreground hidden sm:inline">⌘/Ctrl + Enter</span>
      </div>

      {/* Status / output */}
      <div aria-live="polite" aria-busy={loading}>
        {status === 'loading' && (
          <div className="mt-6 border-t border-border/40 pt-6">
            <div className="flex items-start gap-3">
              <Loader2 className="h-5 w-5 mt-0.5 animate-spin text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">
                  {showColdMessage ? 'Waking the demo up…' : 'Retrieving and reading sources…'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {showColdMessage
                    ? 'The Space spins down when idle, so the first run can take ~30s. Hang tight.'
                    : 'A warm run usually takes a few seconds.'}
                  {elapsed > 0 && <span className="tabular-nums"> · {elapsed}s</span>}
                </p>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-6 border-t border-border/40 pt-6">
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 mt-0.5 text-destructive shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Couldn’t reach the demo</p>
                  <p className="text-xs text-muted-foreground mt-1">{error}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" className="rounded-full" onClick={run}>
                      <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                      Retry
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-full" asChild>
                      <a href={SPACE_PAGE_URL} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        Open the Space
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {status === 'done' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 border-t border-border/40 pt-6 space-y-5"
          >
            <div>
              <h4 className="text-sm font-semibold mb-2">Answer</h4>
              <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                {answer}
              </p>
            </div>

            {sources.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <Quote className="h-4 w-4 text-primary" />
                  Sources
                </h4>
                <div className="space-y-2">
                  {sources.map((s) => (
                    <div
                      key={s.source_num}
                      className="rounded-lg bg-secondary/20 border border-border/40 p-3"
                    >
                      <div className="flex items-center gap-2 text-xs font-medium text-foreground/80 mb-1">
                        <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                          Source {s.source_num}
                        </span>
                        <span className="text-muted-foreground">{s.citation}</span>
                        {s.has_image && (
                          <span className="inline-flex items-center gap-1 text-muted-foreground">
                            <ImageIcon className="h-3 w-3" /> image
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
              <Info className="h-3.5 w-3.5 shrink-0" />
              Answers are grounded in the selected document only — questions it can’t support are
              refused. Want to try your own file? Open the full Space.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MultimodalRagDemo;
