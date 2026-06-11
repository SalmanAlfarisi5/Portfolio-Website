import React, { useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { tokenizePython, PY_THEME } from '@/lib/pythonHighlight';

// A self-contained, syntax-highlighted code block with a copy button.
// The code surface is intentionally dark in both light and dark site themes so
// the token colors stay legible.
const CodeBlock = ({ code, language = 'python' }) => {
  const [copied, setCopied] = useState(false);
  const tokens = useMemo(() => tokenizePython(code), [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (e.g. insecure context) — fail quietly.
    }
  };

  return (
    <div className="rounded-lg overflow-hidden border border-white/10 bg-[#0d1117]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/[0.03]">
        <span className="text-xs font-medium text-zinc-400">{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded px-1 py-0.5"
          aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </button>
      </div>
      <pre
        className="overflow-x-auto p-4 text-[13px] leading-relaxed"
        style={{ color: PY_THEME.plain }}
      >
        <code className="font-mono">
          {tokens.map((token, i) => (
            <span key={i} style={{ color: PY_THEME[token.type] || PY_THEME.plain }}>
              {token.text}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
