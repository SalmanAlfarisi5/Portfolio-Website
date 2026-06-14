import React from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Layers,
  Image as ImageIcon,
  FileStack,
  ListFilter,
  ScanSearch,
  MessageSquare,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MultimodalRagDemo from '@/components/MultimodalRagDemo';
import { REPO_URL, SPACE_PAGE_URL } from '@/lib/multimodalRag';

const stats = [
  { value: '3-way', label: 'Hybrid retrieval (dense + BM25 + CLIP)', Icon: Layers },
  { value: '4', label: 'Formats: PDF · DOCX · TXT · MD', Icon: FileStack },
  { value: 'VLM', label: 'Charts read at answer time', Icon: ImageIcon },
];

const stack = ['BGE', 'BM25', 'CLIP', 'RRF', 'Cross-Encoder', 'FAISS', 'gpt-4o-mini'];

const pipeline = [
  {
    Icon: ScanSearch,
    title: 'Hybrid retrieval',
    body: 'BGE dense embeddings, numeric-aware BM25, and CLIP visual search over image pixels — fused with Reciprocal Rank Fusion to cast a wide, high-recall net.',
  },
  {
    Icon: ListFilter,
    title: 'Cross-encoder re-ranking',
    body: 'A cross-encoder jointly scores each (question, passage) pair to pick the few most relevant passages — precision over the recall net.',
  },
  {
    Icon: MessageSquare,
    title: 'Multimodal answering',
    body: 'The actual chart/table images are attached to the prompt — not just their captions — so the model re-reads the figure for the specific question. Answers are cited; out-of-document questions are refused.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const MultimodalRag = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.header variants={fadeUp} initial="hidden" animate="visible" className="text-center mb-14">
          <Badge variant="secondary" className="mb-4 font-normal">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Interactive demo · multimodal RAG
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Multimodal Document <span className="gradient-text">RAG</span>
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A document Q&amp;A system that retrieves with{' '}
            <span className="text-foreground font-medium">hybrid dense + sparse + visual</span> search,
            re-ranks with a cross-encoder, and feeds the{' '}
            <span className="text-foreground font-medium">actual chart and table images</span> to the
            model at answer time. Grounded, cited answers — evaluated on FinanceBench. Try it live below.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-full">
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub repo
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <a href={SPACE_PAGE_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Hugging Face Space
              </a>
            </Button>
          </div>
        </motion.header>

        {/* ── Stats ──────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14"
        >
          {stats.map(({ value, label, Icon }) => (
            <div key={label} className="glass-card rounded-xl p-5 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold leading-none">{value}</div>
                <div className="text-xs text-muted-foreground mt-1">{label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── How it works ───────────────────────────────────────── */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-2xl font-bold mb-2 text-center">How it works</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            A two-stage retrieve-then-rerank pipeline with true multimodal grounding.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {stack.map((item) => (
              <Badge key={item} variant="secondary" className="font-normal px-3 py-1">
                {item}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pipeline.map(({ Icon, title, body }, i) => (
              <div key={title} className="glass-card rounded-xl p-5 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">Stage {i + 1}</span>
                </div>
                <h3 className="font-semibold mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Cost / safety framing ──────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10 rounded-xl border border-primary/20 bg-primary/[0.04] p-5"
        >
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 mt-0.5 text-primary shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">About this demo.</span> It answers over
              a few <span className="text-foreground font-medium">curated sample documents</span> using
              a small, cost-efficient model, with server-side rate limits. Want to ask over your own
              file? The full Hugging Face Space accepts short uploads (capped for cost).
            </p>
          </div>
        </motion.div>

        {/* ── The demo ───────────────────────────────────────────── */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Try it yourself
          </h2>
          <p className="text-muted-foreground mb-6">
            Pick a sample document, ask a question, and see the grounded answer with its sources.
          </p>
          <MultimodalRagDemo />
        </motion.section>
      </div>
    </motion.div>
  );
};

export default MultimodalRag;
