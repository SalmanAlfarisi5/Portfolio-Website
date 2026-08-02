import React from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  ExternalLink,
  ScanText,
  Crop,
  Type,
  AlignLeft,
  Sparkles,
  ShieldCheck,
  Layers,
  Wand2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import OCRDemo from '@/components/OCRDemo';
import { REPO_URL, SPACE_PAGE_URL } from '@/lib/ocr';
import usePageMeta from '@/lib/usePageMeta';

const stats = [
  { value: '2', label: 'Networks trained from scratch — detection + recognition', Icon: Layers },
  { value: '97.8%', label: 'Detection H-mean · 97.5% word-level recognition accuracy', Icon: Type },
  { value: '100%', label: 'Synthetic training data — rendered, never downloaded', Icon: Wand2 },
];

const stack = ['PyTorch', 'DBNet', 'CRNN', 'CTC Loss', 'ResNet-18 + FPN', 'BiLSTM', 'OpenCV'];

const pipeline = [
  {
    Icon: ScanText,
    title: 'Detection — where is the text?',
    body:
      'A ResNet-18 + FPN predicts a per-pixel text probability map. Words are shrunk during training so neighbours never merge, and a second predicted map gives every pixel its own threshold — combined through a differentiable step function, so the binarization itself is learned rather than hand-tuned.',
  },
  {
    Icon: Crop,
    title: 'Recognition — what does it say?',
    body:
      'Each polygon is perspective-warped into an upright strip, then read by a CNN → BiLSTM → per-timestep classifier. CTC loss sums over every possible alignment of the label to the timesteps, so the model learns to read without ever being told where the individual characters are.',
  },
  {
    Icon: AlignLeft,
    title: 'Assembly — make it a document',
    body:
      'Words are grouped into visual lines and sorted into reading order, turning a bag of transcriptions into text you can actually read. Every word keeps its polygon and confidence, which is what lets the demo highlight a line of text on the image.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const OCR = () => {
  usePageMeta(
    'OCR from Scratch',
    'A complete deep-learning OCR system built from scratch in PyTorch — DBNet text detection plus a CRNN+CTC recognizer, trained entirely on synthetic data. Try the live demo.'
  );

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
            Interactive demo · deep-learning OCR
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            OCR built <span className="gradient-text">from scratch</span>
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Two neural networks, no OCR library.{' '}
            <span className="text-foreground font-medium">DBNet</span> finds every word in an
            image and <span className="text-foreground font-medium">CRNN + CTC</span> reads it —
            both implemented and trained from zero in PyTorch, on training data the project
            renders for itself. Try it on your own image below.
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
            Reading a page is two problems, not one — so it is two models, trained separately.
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

        {/* ── The interesting bit ────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-14 rounded-xl border border-primary/20 bg-primary/[0.04] p-5"
        >
          <div className="flex items-start gap-3">
            <Wand2 className="h-5 w-5 mt-0.5 text-primary shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">
                No character was ever labelled.
              </span>{' '}
              Training a reader normally means annotating where each letter sits in each image.
              CTC removes that entirely: instead of picking one alignment between the image and
              the string, it sums the probability of{' '}
              <span className="text-foreground font-medium">every possible alignment</span> —
              evaluated in O(T·L) by dynamic programming. The model is only ever shown a picture
              and the words in it, and works out the rest by itself.
            </p>
          </div>
        </motion.div>

        {/* ── Demo framing ───────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10 rounded-xl border border-border/50 bg-secondary/20 p-5"
        >
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 mt-0.5 text-primary shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">About this demo.</span> Both models
              run on a free CPU Space, so the first request may take ~30s to wake it up. Uploads
              are capped and processed in memory — nothing is stored. The models were trained
              only on synthetic data, so clean printed text works best; heavily stylised or
              handwritten text is where you will see them struggle, which is exactly the
              domain-gap the README discusses.
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
            Pick a sample or drop in your own image, and watch both models run.
          </p>
          <OCRDemo />
        </motion.section>
      </div>
    </motion.div>
  );
};

export default OCR;
