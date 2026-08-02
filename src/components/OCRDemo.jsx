import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Loader2,
  RotateCcw,
  ExternalLink,
  AlertTriangle,
  ScanText,
  Copy,
  Check,
  Download,
  Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  fetchSamples,
  ocrSample,
  ocrUpload,
  isColdStart,
  warmUp,
  FALLBACK_SAMPLES,
  MAX_UPLOAD_BYTES,
  SPACE_PAGE_URL,
} from '@/lib/ocr';

const COLD_THRESHOLD_SECONDS = 15;

// The sample images live in the site's own /public so the canvas can show them
// immediately — the Space only ever returns text and polygons, never pixels.
const SAMPLE_IMAGES = {
  receipt: '/ocr/receipt.jpg',
  document: '/ocr/document.png',
  sign: '/ocr/sign.png',
};

const OCRDemo = () => {
  const [samples, setSamples] = useState(FALLBACK_SAMPLES);
  const [imageSrc, setImageSrc] = useState(SAMPLE_IMAGES.receipt);
  const [activeSample, setActiveSample] = useState('receipt');
  const [uploadFile, setUploadFile] = useState(null);

  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [cold, setCold] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hoveredLine, setHoveredLine] = useState(-1);
  const [dragOver, setDragOver] = useState(false);

  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const timerRef = useRef(null);
  const objectUrlRef = useRef(null);

  const loading = status === 'loading';
  const showColdMessage = cold || elapsed >= COLD_THRESHOLD_SECONDS;

  // Start waking the Space while the visitor is still reading the page.
  useEffect(() => {
    warmUp();
    let alive = true;
    fetchSamples()
      .then((list) => {
        if (!alive || !list?.length) return;
        setSamples(list.filter((s) => SAMPLE_IMAGES[s.id]));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => () => {
    clearInterval(timerRef.current);
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
  }, []);

  // ── canvas drawing ────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image || !image.complete || !image.naturalWidth) return;

    const ctx = canvas.getContext('2d');
    const maxWidth = 820;
    const scale = Math.min(1, maxWidth / image.naturalWidth);
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    if (!result?.regions?.length) return;

    // The Space may have downscaled the image before running OCR, so derive the
    // factor from the size it reports rather than assuming it matches.
    const reported = result.image_size?.width || image.naturalWidth;
    const k = canvas.width / reported;

    const lineWords = new Set();
    if (hoveredLine >= 0 && result.lines?.[hoveredLine]) {
      result.lines[hoveredLine].split(' ').forEach((w) => lineWords.add(w));
    }

    result.regions.forEach((region) => {
      const hot = hoveredLine >= 0 && lineWords.has(region.text);
      ctx.beginPath();
      region.box.forEach(([x, y], i) =>
        i ? ctx.lineTo(x * k, y * k) : ctx.moveTo(x * k, y * k)
      );
      ctx.closePath();
      if (hot) {
        ctx.fillStyle = 'rgba(16, 185, 129, 0.28)';
        ctx.fill();
      }
      ctx.lineWidth = hot ? 2.5 : 1.4;
      ctx.strokeStyle =
        region.confidence > 0.7 ? '#10b981' : region.confidence > 0.4 ? '#f59e0b' : '#ef4444';
      ctx.stroke();
    });
  }, [result, hoveredLine]);

  useEffect(() => {
    draw();
  }, [draw, imageSrc]);

  // ── running the demo ──────────────────────────────────────────────────────
  const run = async () => {
    if (loading) return;

    setStatus('loading');
    setResult(null);
    setError('');
    setElapsed(0);
    setCold(isColdStart());
    setHoveredLine(-1);

    const startedAt = Date.now();
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);

    try {
      const data = uploadFile ? await ocrUpload(uploadFile) : await ocrSample(activeSample);
      setResult(data);
      setStatus('done');
    } catch (err) {
      setError(err?.message || 'Something went wrong while reaching the demo.');
      setStatus('error');
    } finally {
      clearInterval(timerRef.current);
    }
  };

  const pickSample = (id) => {
    if (loading) return;
    setUploadFile(null);
    setActiveSample(id);
    setImageSrc(SAMPLE_IMAGES[id]);
    setResult(null);
    setStatus('idle');
    setError('');
  };

  const acceptFile = (file) => {
    if (!file || loading) return;
    if (!file.type.startsWith('image/')) {
      setError('That file is not an image.');
      setStatus('error');
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setError(
        `That image is ${(file.size / 1024 / 1024).toFixed(1)} MB — please use one under ${
          MAX_UPLOAD_BYTES / 1024 / 1024
        } MB.`
      );
      setStatus('error');
      return;
    }
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = URL.createObjectURL(file);
    setUploadFile(file);
    setActiveSample(null);
    setImageSrc(objectUrlRef.current);
    setResult(null);
    setStatus('idle');
    setError('');
  };

  const copyText = () => {
    if (!result?.text) return;
    navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const downloadText = () => {
    if (!result?.text) return;
    const blob = new Blob([result.text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${activeSample || 'ocr'}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="glass-card rounded-xl p-5 sm:p-6">
      {/* ── Picker ─────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm font-medium mr-1">Image</span>
        {samples.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => pickSample(s.id)}
            disabled={loading}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
              activeSample === s.id
                ? 'bg-primary/15 border-primary/50 text-foreground'
                : 'bg-secondary/40 border-border/40 text-foreground/80 hover:bg-secondary/70'
            }`}
          >
            {s.title}
          </button>
        ))}

        <label
          className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer transition-colors inline-flex items-center gap-1.5 ${
            uploadFile
              ? 'bg-primary/15 border-primary/50 text-foreground'
              : 'bg-secondary/40 border-border/40 text-foreground/80 hover:bg-secondary/70'
          } ${loading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <Upload className="h-3 w-3" />
          {uploadFile ? uploadFile.name.slice(0, 22) : 'Upload your own'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={loading}
            onChange={(e) => acceptFile(e.target.files?.[0])}
          />
        </label>
      </div>

      {/* ── Canvas + text ──────────────────────────────────────────────── */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-4 rounded-lg transition-colors ${
          dragOver ? 'ring-2 ring-primary/60' : ''
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          acceptFile(e.dataTransfer.files?.[0]);
        }}
      >
        <div className="rounded-lg bg-secondary/20 border border-border/40 p-3 flex items-center justify-center min-h-[220px]">
          {/* Hidden <img> is the drawing source for the canvas. */}
          <img
            ref={imageRef}
            src={imageSrc}
            alt=""
            className="hidden"
            onLoad={draw}
          />
          <canvas ref={canvasRef} className="max-w-full h-auto rounded" />
        </div>

        <div className="rounded-lg bg-secondary/20 border border-border/40 flex flex-col min-h-[220px]">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border/40">
            <ScanText className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Extracted text
            </span>
            {result?.text && (
              <span className="ml-auto flex gap-1">
                <button
                  type="button"
                  onClick={copyText}
                  className="text-xs px-2 py-1 rounded hover:bg-secondary/70 text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  type="button"
                  onClick={downloadText}
                  className="text-xs px-2 py-1 rounded hover:bg-secondary/70 text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  <Download className="h-3 w-3" />
                  .txt
                </button>
              </span>
            )}
          </div>

          <div className="p-3 overflow-auto max-h-[46vh] font-mono text-xs leading-relaxed">
            {status === 'done' && result?.lines?.length ? (
              result.lines.map((line, i) => (
                <span
                  key={`${line}-${i}`}
                  onMouseEnter={() => setHoveredLine(i)}
                  onMouseLeave={() => setHoveredLine(-1)}
                  className={`block px-1 rounded cursor-default transition-colors ${
                    hoveredLine === i ? 'bg-primary/15 text-foreground' : 'text-foreground/85'
                  }`}
                >
                  {line}
                </span>
              ))
            ) : status === 'done' ? (
              <span className="text-muted-foreground italic">
                No text found in this image.
              </span>
            ) : (
              <span className="text-muted-foreground italic">
                Press “Read text” to run both models on this image.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Action ─────────────────────────────────────────────────────── */}
      <div className="mt-5 flex items-center gap-3 flex-wrap">
        <Button onClick={run} disabled={loading} size="lg" className="rounded-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Reading…
            </>
          ) : (
            <>
              <ScanText className="mr-2 h-4 w-4" />
              Read text
            </>
          )}
        </Button>
        <span className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
          <ImageIcon className="h-3.5 w-3.5" />
          or drop an image anywhere above
        </span>
      </div>

      {/* ── Status ─────────────────────────────────────────────────────── */}
      <div aria-live="polite" aria-busy={loading}>
        {loading && (
          <div className="mt-5 border-t border-border/40 pt-5 flex items-start gap-3">
            <Loader2 className="h-5 w-5 mt-0.5 animate-spin text-primary shrink-0" />
            <div>
              <p className="text-sm font-medium">
                {showColdMessage ? 'Waking the demo up…' : 'Detecting and reading words…'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {showColdMessage
                  ? 'The Space spins down when idle, so the first run can take ~30s. Hang tight.'
                  : 'A warm run takes a couple of seconds on CPU.'}
                {elapsed > 0 && <span className="tabular-nums"> · {elapsed}s</span>}
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-5 border-t border-border/40 pt-5">
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 mt-0.5 text-destructive shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Couldn’t run the demo</p>
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

        {status === 'done' && result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-5 border-t border-border/40 pt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground"
          >
            <span>
              <b className="text-foreground tabular-nums">{result.regions?.length ?? 0}</b> words
            </span>
            <span>
              <b className="text-foreground tabular-nums">{result.lines?.length ?? 0}</b> lines
            </span>
            {result.timings_ms && (
              <>
                <span>
                  detect{' '}
                  <b className="text-foreground tabular-nums">
                    {Math.round(result.timings_ms.detection ?? 0)} ms
                  </b>
                </span>
                <span>
                  recognise{' '}
                  <b className="text-foreground tabular-nums">
                    {Math.round(result.timings_ms.recognition ?? 0)} ms
                  </b>
                </span>
              </>
            )}
            <span className="text-muted-foreground/80">
              Hover a line to highlight its words on the image.
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OCRDemo;
