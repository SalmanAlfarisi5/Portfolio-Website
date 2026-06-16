import React from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Cpu,
  Database,
  MemoryStick,
  FileCode2,
  GraduationCap,
  Target,
  Sparkles,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SaLLManDemo from '@/components/SaLLManDemo';
import { REPO_URL, SPACE_PAGE_URL } from '@/lib/sallman';
import usePageMeta from '@/lib/usePageMeta';

const stats = [
  { value: '97M', label: 'Parameters', Icon: Cpu },
  { value: '2.2B', label: 'Pretraining tokens', Icon: Database },
  { value: '8 GB', label: 'Single RTX 3060 Ti', Icon: MemoryStick },
];

const architecture = [
  'RoPE',
  'SwiGLU',
  'RMSNorm',
  'Pre-LN',
  'FlashAttention',
  'KV-cache',
];

const pipeline = [
  {
    Icon: FileCode2,
    title: 'Pretraining',
    body: 'Next-token pretraining on 2.2 billion tokens of Python source code from The Stack.',
  },
  {
    Icon: GraduationCap,
    title: 'Supervised fine-tuning',
    body: 'SFT on Codeforces competitive-programming data with step-by-step chains of thought.',
  },
  {
    Icon: Target,
    title: 'GRPO reinforcement learning',
    body: 'Group Relative Policy Optimization — implemented from scratch — with a verifiable code-execution reward.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SaLLMan = () => {
  usePageMeta('saLLMan — Step-aware LLM', 'saLLMan: a decoder-only LLM built from scratch in PyTorch (RoPE, SwiGLU, FlashAttention) and aligned with GRPO for step-by-step DSA reasoning. Try the live demo.');
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
        <motion.header
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center mb-14"
        >
          <Badge variant="secondary" className="mb-4 font-normal">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Interactive demo · built from scratch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            sa<span className="gradient-text">LLM</span>an
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A 97-million-parameter decoder-only language model I designed, built, and trained
            <span className="text-foreground font-medium"> entirely from scratch</span> in PyTorch —
            on a single 8&nbsp;GB consumer GPU. Try it live below.
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

        {/* ── How it's built ─────────────────────────────────────── */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-2xl font-bold mb-2 text-center">How it's built</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            A modern LLaMA-class architecture and a full three-stage training pipeline — every
            component implemented by hand.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {architecture.map((item) => (
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
                  <span className="text-xs font-semibold text-muted-foreground">
                    Stage {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Honest framing ─────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10 rounded-xl border border-primary/20 bg-primary/[0.04] p-5"
        >
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 mt-0.5 text-primary shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">A note on expectations.</span>{' '}
              At 97M parameters this is a research / portfolio model. It reliably produces the right{' '}
              <span className="text-foreground font-medium">structure</span> — a reasoning trace
              followed by Python — but the code is usually <span className="text-foreground font-medium">not correct</span>.
              The point isn't a working code solver; it's a demonstration of building the entire LLM
              stack, from architecture to RL alignment, from the ground up.
            </p>
          </div>
        </motion.div>

        {/* ── The demo ───────────────────────────────────────────── */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Try it yourself
          </h2>
          <p className="text-muted-foreground mb-6">
            Give it a DSA or coding problem and watch it reason, then write Python.
          </p>
          <SaLLManDemo />
        </motion.section>
      </div>
    </motion.div>
  );
};

export default SaLLMan;
