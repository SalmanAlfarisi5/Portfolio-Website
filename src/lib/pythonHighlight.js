// A tiny, dependency-free Python syntax highlighter.
//
// It tokenizes source in a single regex pass and returns an array of
// { text, type } tokens; anything that doesn't match a rule is emitted as
// plain text. saLLMan's generated code is often malformed or truncated, so the
// whole thing is wrapped to degrade gracefully — it can never throw on bad input.

const KEYWORDS = [
  'def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'import',
  'from', 'as', 'with', 'try', 'except', 'finally', 'raise', 'in', 'not',
  'and', 'or', 'is', 'lambda', 'yield', 'global', 'nonlocal', 'pass', 'break',
  'continue', 'assert', 'del', 'async', 'await', 'match', 'case',
];

const BUILTINS = [
  'print', 'len', 'range', 'int', 'str', 'float', 'list', 'dict', 'set',
  'tuple', 'bool', 'bytes', 'enumerate', 'zip', 'map', 'filter', 'sorted',
  'reversed', 'sum', 'min', 'max', 'abs', 'round', 'input', 'open', 'type',
  'isinstance', 'issubclass', 'super', 'object', 'iter', 'next', 'any', 'all',
  'hash', 'repr', 'format', 'ord', 'chr', 'hex', 'bin', 'oct',
];

// Order matters: the first matching alternative at a given position wins.
const RULES = [
  ['comment', /#[^\n]*/],
  // optional string prefix (r/b/f/u) followed by triple- or single-quoted text
  ['string', /(?:[rbfuRBFU]{0,2})(?:'''[\s\S]*?'''|"""[\s\S]*?"""|'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*")/],
  ['decorator', /@[A-Za-z_][\w.]*/],
  ['number', /\b0[xX][0-9a-fA-F]+\b|\b\d[\d_]*\.?\d*(?:[eE][+-]?\d+)?j?\b/],
  ['keyword', new RegExp(`\\b(?:${KEYWORDS.join('|')})\\b`)],
  ['constant', /\b(?:True|False|None|self|cls)\b/],
  ['builtin', new RegExp(`\\b(?:${BUILTINS.join('|')})\\b`)],
  // an identifier immediately followed by "(" — a function call or definition
  ['func', /\b[A-Za-z_]\w*(?=\s*\()/],
];

const COMBINED = new RegExp(RULES.map(([, re]) => `(${re.source})`).join('|'), 'g');

// type → color (a GitHub-dark-leaning palette; `func`/`decorator` lean purple
// to echo the site's primary accent).
export const PY_THEME = Object.freeze({
  plain: '#e6edf3',
  comment: '#8b949e',
  string: '#a5d6ff',
  number: '#79c0ff',
  keyword: '#ff7b72',
  constant: '#79c0ff',
  builtin: '#ffa657',
  func: '#d2a8ff',
  decorator: '#d2a8ff',
});

export function tokenizePython(code) {
  const source = typeof code === 'string' ? code : String(code ?? '');
  const tokens = [];

  try {
    COMBINED.lastIndex = 0;
    let lastIndex = 0;
    let match;

    while ((match = COMBINED.exec(source)) !== null) {
      // Guard against zero-length matches stalling the loop.
      if (match.index === COMBINED.lastIndex) {
        COMBINED.lastIndex += 1;
        continue;
      }

      if (match.index > lastIndex) {
        tokens.push({ text: source.slice(lastIndex, match.index), type: 'plain' });
      }

      // match[1..n] map to RULES in order; find which group captured.
      const groupIndex = match.slice(1).findIndex((g) => g !== undefined);
      const type = groupIndex >= 0 ? RULES[groupIndex][0] : 'plain';
      tokens.push({ text: match[0], type });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < source.length) {
      tokens.push({ text: source.slice(lastIndex), type: 'plain' });
    }
  } catch {
    // On any unexpected failure, fall back to the unhighlighted source.
    return [{ text: source, type: 'plain' }];
  }

  return tokens;
}
