// Single source of truth for portfolio projects.
// `featured: true` items appear in the Home page highlights section.
//
// Link model (all optional):
//   internalLink — an in-app interactive demo route (highest priority CTA)
//   live         — an externally hosted live demo / deployed site
//   repo         — public GitHub repository
// A project may omit links entirely (e.g. private/coursework repos); the card
// gracefully renders no action buttons rather than linking to a dead page.

const GH = 'https://github.com/SalmanAlfarisi5';

export const projects = [
  {
    id: 9,
    title: 'saLLMan — Step-aware LLM',
    description:
      'Built a decoder-only LLM from scratch in PyTorch with modern LLaMA-class components (RoPE, SwiGLU, RMSNorm, FlashAttention, KV-cache). Pretrained a 97M-parameter model on 2.2B tokens of Python on a single 8 GB RTX 3060 Ti, then applied Group Relative Policy Optimization (GRPO) — implemented from scratch — to align it toward step-by-step DSA reasoning.',
    category: 'ML',
    tags: ['PyTorch', 'LLM', 'GRPO', 'FlashAttention'],
    repo: `${GH}/saLLMan`,
    internalLink: '/sallman',
    featured: true,
  },
  {
    id: 10,
    title: 'Multimodal Document RAG',
    description:
      'A multi-format document Q&A system with three-way hybrid retrieval — BGE dense, numeric-aware BM25, and CLIP visual search fused via Reciprocal Rank Fusion — plus cross-encoder re-ranking. Charts and tables are fed to the VLM as real images at answer time, not just captions. Evaluated on FinanceBench with LLM-as-judge scoring.',
    category: 'ML',
    tags: ['RAG', 'CLIP', 'FAISS', 'BM25', 'Cross-Encoder', 'GPT-4o'],
    repo: `${GH}/Multimodal-RAG`,
    internalLink: '/multimodal-rag',
    featured: true,
  },
  {
    id: 18,
    title: 'OCR from Scratch — Detection + Recognition',
    description:
      'A complete deep-learning OCR system with no OCR library involved: DBNet (ResNet-18 + FPN with differentiable binarization) locates every word, and a CRNN + CTC recognizer reads it — trained without a single character-level label. Both networks train entirely on synthetic pages and word crops the project renders for itself, reaching 97.8% detection H-mean and 97.5% word accuracy, and transcribing the sample receipt, report and sign at 0% character error end to end.',
    category: 'ML',
    tags: ['PyTorch', 'DBNet', 'CRNN', 'CTC Loss', 'Computer Vision', 'FastAPI'],
    repo: `${GH}/ocr`,
    internalLink: '/ocr',
    featured: true,
  },
  {
    id: 17,
    title: 'NVIDIA Nemotron Reasoning Challenge',
    description:
      "Fine-tuned NVIDIA's Nemotron-Nano (30B-total / 3B-active hybrid Mamba-Transformer MoE) with a rank-32 LoRA adapter on six families of symbolic reasoning puzzles, lifting the official grader score from a 0.53 baseline to 0.58. Built a fully metric-compliant SFT pipeline trained only on grader-verified chains of thought.",
    category: 'ML',
    tags: ['LoRA / PEFT', 'Nemotron', 'Mamba MoE', 'PyTorch'],
    featured: true,
  },
  {
    id: 12,
    title: 'Twitter Bias Detector',
    description:
      'Fine-tuned DistilBERT with LoRA + Bayesian Optimization (OPTUNA) for a 20% metric improvement over baseline. Built as a Chrome browser extension with a FastAPI backend and Hugging Face inference, using IndexedDB for privacy-preserving local analytics.',
    category: 'ML',
    tags: ['NLP', 'DistilBERT', 'LoRA', 'FastAPI', 'Chrome Extension'],
    featured: true,
  },
  {
    id: 11,
    title: 'Sentiment Control Interpretability',
    description:
      'Trained and compared N-gram, LSTM, and Seq2Seq Transformer architectures for sentiment-conditioned text generation, achieving 97.8% accuracy. Executed 4 interpretability experiments identifying a 2-step sentiment encoding mechanism via perturbation and ablation studies.',
    category: 'ML',
    tags: ['Transformer', 'NLP', 'Seq2Seq', 'Ablation Study'],
  },
  {
    id: 13,
    title: 'Traffic Sign Classification',
    description:
      'Benchmarked 5 CNN architectures (AlexNet, ResNet50, VGG16, EfficientNetB0, custom CNN) on 23 traffic-sign classes. Fine-tuned ResNet50 and EfficientNetB0 via transfer learning, both reaching 99.9% test accuracy on ~5,000 images.',
    category: 'ML',
    tags: ['PyTorch', 'CNN', 'Transfer Learning', 'Computer Vision'],
    repo: `${GH}/TrafficSignClassification`,
  },
  {
    id: 14,
    title: 'Rice Leaf Disease Detection',
    description:
      'Built a deep-learning pipeline to classify 5 categories of rice-leaf disease using transfer learning. ResNet-50 reached 100% test accuracy; EfficientNet B0 and MobileNet V2 scored 99.4% and 98.8% respectively on ~5,000 images.',
    category: 'ML',
    tags: ['ResNet-50', 'EfficientNet', 'Transfer Learning', 'Computer Vision'],
    repo: `${GH}/RiceLeafDisease`,
  },
  {
    id: 15,
    title: 'DNA Cancer Detection',
    description:
      'Benchmarked ML classifiers for early cancer detection from cell-free DNA fragment-length analysis. Optimized classification thresholds on Precision-Recall curves, achieving ≥95% recall with Logistic Regression reaching 97.5% precision.',
    category: 'ML',
    tags: ['Machine Learning', 'Healthcare', 'Scikit-learn', 'Imbalanced Data'],
    repo: `${GH}/CancerDetection`,
  },
  {
    id: 3,
    title: 'Stock Price Prediction',
    description:
      'Forecasted S&P 500 index closing prices by integrating historical market data with news sentiment analysis. Trained and tuned ensemble models (Random Forest, XGBoost, CatBoost) and recurrent architectures (RNN, GRU, LSTM).',
    category: 'ML',
    tags: ['Time Series', 'XGBoost', 'LSTM', 'Sentiment Analysis'],
    repo: `${GH}/Stock-Price-Prediction`,
  },
  {
    id: 1,
    title: 'Tweets Classification',
    description:
      'Scraped Twitter data and applied NLP preprocessing (Word2Vec, SpaCy, BERT) plus image classification to predict emojis. Optimized multiple models including Logistic Regression, CatBoost, LightGBM, SVM, and Neural Networks.',
    category: 'ML',
    tags: ['NLP', 'Image Processing', 'Sentiment Analysis'],
    repo: 'https://github.com/jasonmatthewsuhari/cs3244',
  },
  {
    id: 16,
    title: 'Markowitz Portfolio Optimization',
    description:
      'Simulated Markowitz Portfolio Optimization on S&P 500 stocks, applying Modern Portfolio Theory to compute optimal asset allocations from risk-return tradeoffs and efficient-frontier analysis.',
    category: 'Analysis',
    tags: ['Portfolio Optimization', 'Quantitative Finance', 'Python', 'S&P 500'],
    repo: `${GH}/MarkowitzPortfolioOptimization`,
  },
  {
    id: 7,
    title: 'US Diabetes Prediction',
    description:
      'Built and evaluated classification models on diabetes data using feature selection and cross-validation in R.',
    category: 'ML',
    tags: ['Machine Learning', 'R', 'Cross Validation'],
    repo: `${GH}/DSA1101-Final-Assignment`,
  },
  {
    id: 4,
    title: 'Taylor Swift Song Analysis',
    description:
      'Analyzed and visualized Taylor Swift song features in R to uncover trends in listener enjoyment.',
    category: 'Analysis',
    tags: ['Data Visualization', 'Data Analysis', 'R'],
    repo: `${GH}/Taylor-Swift-Song-Analysis`,
  },
  {
    id: 5,
    title: 'OpenJio — Activity Manager',
    description:
      'Built a full-stack activity-management system letting users create, edit, delete, search, filter, and sort activities with real-time database updates.',
    category: 'web',
    tags: ['ReactJS', 'PostgreSQL', 'Heroku', 'Figma'],
  },
  {
    id: 6,
    title: 'Portfolio Website',
    description:
      'Built a responsive SPA with React and Vite — React Router for navigation, Tailwind CSS + Radix UI for styling, and Framer Motion for animations, with a light/dark theme.',
    category: 'web',
    tags: ['React', 'Framer Motion', 'Tailwind CSS'],
    live: 'https://alfarisisalman.com/',
    repo: `${GH}/Portfolio-Website`,
  },
  {
    id: 8,
    title: 'Discrete Event Simulation',
    description:
      'Developed a Java OOP simulator for multi-queue, multi-server systems — handling arrival, service, and departure events.',
    category: 'dev',
    tags: ['Java', 'OOP'],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
