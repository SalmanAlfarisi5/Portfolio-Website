import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Loader2,
  ChevronDown,
  SlidersHorizontal,
  RotateCcw,
  ExternalLink,
  AlertTriangle,
  Brain,
  Code2,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import CodeBlock from '@/components/CodeBlock';
import {
  generateSolution,
  parseModelOutput,
  isColdStart,
  warmUp,
  subscribeStatus,
  DEFAULTS,
  EXAMPLE_PROMPTS,
  SPACE_PAGE_URL,
} from '@/lib/sallman';

const inputClasses =
  'w-full bg-secondary/30 border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all';

// Fallback: once a request runs longer than this we assume the Space is
// cold-starting and switch to the friendlier "waking up" copy, even if the
// Space hasn't reported a wake/build status. A free CPU boot can take a minute+.
const COLD_THRESHOLD_SECONDS = 20;

// Space statuses that mean it's still coming up (vs. already serving requests).
const BOOTING_STATUSES = new Set(['sleeping', 'building', 'starting']);

const SaLLManDemo = () => {
  const [problem, setProblem] = useState('');
  const [temperature, setTemperature] = useState(DEFAULTS.temperature);
  const [topK, setTopK] = useState(DEFAULTS.topK);
  const [maxNewTokens, setMaxNewTokens] = useState(DEFAULTS.maxNewTokens);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [result, setResult] = useState(null); // parsed output
  const [error, setError] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [cold, setCold] = useState(false);
  const [spaceStatus, setSpaceStatus] = useState(null);

  const textareaRef = useRef(null);
  const timerRef = useRef(null);

  // Clean up the elapsed-time interval on unmount.
  useEffect(() => () => clearInterval(timerRef.current), []);

  // Begin waking the (free-tier) Space as soon as the demo mounts, so the
  // cold-start boot overlaps with the user reading and typing rather than
  // starting only on submit. Also track wake/build progress for nicer copy.
  useEffect(() => {
    warmUp();
    return subscribeStatus(setSpaceStatus);
  }, []);

  const loading = status === 'loading';
  const spaceBooting = !!spaceStatus && BOOTING_STATUSES.has(spaceStatus.status);
  const showColdMessage = spaceBooting || cold || elapsed >= COLD_THRESHOLD_SECONDS;

  const fillExample = (text) => {
    setProblem(text);
    textareaRef.current?.focus();
  };

  const runGenerate = async () => {
    const trimmed = problem.trim();
    if (!trimmed || loading) return;

    setStatus('loading');
    setResult(null);
    setError('');
    setElapsed(0);
    setCold(isColdStart());

    const startedAt = Date.now();
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);

    try {
      const raw = await generateSolution({
        problem: trimmed,
        temperature,
        topK,
        maxNewTokens,
      });
      setResult(parseModelOutput(raw));
      setStatus('done');
    } catch (err) {
      setError(err?.message || 'Something went wrong while reaching the model.');
      setStatus('error');
    } finally {
      clearInterval(timerRef.current);
    }
  };

  const resetDefaults = () => {
    setTemperature(DEFAULTS.temperature);
    setTopK(DEFAULTS.topK);
    setMaxNewTokens(DEFAULTS.maxNewTokens);
  };

  return (
    <div className="glass-card rounded-xl p-5 sm:p-6">
      {/* Problem input */}
      <label htmlFor="sallman-problem" className="block text-sm font-medium mb-2">
        Problem statement
      </label>
      <textarea
        id="sallman-problem"
        ref={textareaRef}
        rows={4}
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        disabled={loading}
        placeholder="Describe a DSA / coding problem, e.g. “Return the indices of two numbers that add up to a target.”"
        className={`${inputClasses} resize-y disabled:opacity-60`}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') runGenerate();
        }}
      />

      {/* Example prompts */}
      <div className="mt-3">
        <span className="text-xs text-muted-foreground">Try an example:</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => fillExample(example)}
              disabled={loading}
              className="text-xs text-left px-3 py-1.5 rounded-full bg-secondary/40 border border-border/40 text-foreground/80 hover:bg-secondary/70 hover:text-foreground transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced controls */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowAdvanced((v) => !v)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          aria-expanded={showAdvanced}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Advanced
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence initial={false}>
          {showAdvanced && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-4 grid gap-5 sm:grid-cols-3 rounded-lg bg-secondary/20 border border-border/40 p-4">
                <div>
                  <div className="flex items-center justify-between mb-2 text-xs">
                    <label htmlFor="sallman-temp" className="font-medium">Temperature</label>
                    <span className="tabular-nums text-muted-foreground">{temperature.toFixed(2)}</span>
                  </div>
                  <Slider
                    id="sallman-temp"
                    min={0}
                    max={1.5}
                    step={0.05}
                    value={[temperature]}
                    onValueChange={([v]) => setTemperature(v)}
                    disabled={loading}
                    aria-label="Temperature"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2 text-xs">
                    <label htmlFor="sallman-topk" className="font-medium">Top-k</label>
                    <span className="tabular-nums text-muted-foreground">
                      {topK === 0 ? 'off' : topK}
                    </span>
                  </div>
                  <Slider
                    id="sallman-topk"
                    min={0}
                    max={100}
                    step={1}
                    value={[topK]}
                    onValueChange={([v]) => setTopK(v)}
                    disabled={loading}
                    aria-label="Top-k (0 disables)"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2 text-xs">
                    <label htmlFor="sallman-tokens" className="font-medium">Max new tokens</label>
                    <span className="tabular-nums text-muted-foreground">{maxNewTokens}</span>
                  </div>
                  <Slider
                    id="sallman-tokens"
                    min={32}
                    max={512}
                    step={32}
                    value={[maxNewTokens]}
                    onValueChange={([v]) => setMaxNewTokens(v)}
                    disabled={loading}
                    aria-label="Maximum new tokens"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={resetDefaults}
                disabled={loading}
                className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                Reset to defaults
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Generate button */}
      <div className="mt-5 flex items-center gap-3 flex-wrap">
        <Button
          onClick={runGenerate}
          disabled={loading || !problem.trim()}
          size="lg"
          className="rounded-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate
            </>
          )}
        </Button>
        <span className="text-xs text-muted-foreground hidden sm:inline">
          ⌘/Ctrl + Enter
        </span>
      </div>

      {/* Status / output region */}
      <div aria-live="polite" aria-busy={loading}>
        {status === 'loading' && (
          <div className="mt-6 border-t border-border/40 pt-6">
            <div className="flex items-start gap-3">
              <Loader2 className="h-5 w-5 mt-0.5 animate-spin text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">
                  {showColdMessage ? 'Waking the model up…' : 'Thinking…'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {showColdMessage
                    ? spaceBooting && spaceStatus?.message
                      ? spaceStatus.message
                      : 'The Space spins down when idle, so the first run can take a minute or two while it wakes. Hang tight.'
                    : 'A warm run usually takes 5–10 seconds.'}
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
                  <p className="text-sm font-medium">Couldn’t reach the model</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    The Space may be waking up or temporarily unavailable. Give it a moment and try
                    again, or open it directly on Hugging Face.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" variant="default" className="rounded-full" onClick={runGenerate}>
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

        {status === 'done' && result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 border-t border-border/40 pt-6 space-y-5"
          >
            {result.structured ? (
              <>
                {result.reasoning && (
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold mb-2">
                      <Brain className="h-4 w-4 text-primary" />
                      Reasoning
                    </h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {result.reasoning}
                    </p>
                  </div>
                )}
                {result.code && (
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold mb-2">
                      <Code2 className="h-4 w-4 text-primary" />
                      Generated code
                    </h4>
                    <CodeBlock code={result.code} language="python" />
                  </div>
                )}
              </>
            ) : (
              <div>
                <h4 className="text-sm font-semibold mb-2">Model output</h4>
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed font-sans">
                  {result.raw}
                </pre>
              </div>
            )}

            <p className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
              <Info className="h-3.5 w-3.5 shrink-0" />
              saLLMan is single-turn — each request is independent, with no memory of previous ones.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SaLLManDemo;
