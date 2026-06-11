// Single source of truth for portfolio projects.
// `featured: true` items appear in the Home page highlights section.

export const projects = [
  {
    id: 9,
    title: 'saLLMan — Step-aware LLM',
    description:
      'Built a decoder-only LLM from scratch in PyTorch with modern LLaMA-class components (RoPE, SwiGLU, RMSNorm, FlashAttention, KV-cache). Pretrained a 97M-parameter model on 2.2B tokens of Python on a single 8 GB RTX 3060 Ti, then applied Group Relative Policy Optimization (GRPO) — implemented from scratch — to align it toward step-by-step DSA reasoning.',
    category: 'ML',
    tags: ['PyTorch', 'LLM', 'GRPO', 'FlashAttention'],
    demoLink: 'https://github.com/SalmanAlfarisi5/saLLMan',
    codeLink: 'https://github.com/SalmanAlfarisi5/saLLMan',
    internalLink: '/sallman',
    featured: true,
  },
  {
    id: 10,
    title: 'Multimodal Document RAG',
    description:
      'Built a multi-format document Q&A system using hybrid FAISS + BM25 retrieval with Reciprocal Rank Fusion and cross-encoder re-ranking, plus multimodal ingestion (PDF, DOCX, images via GPT-4o-mini). Evaluated against the FinanceBench benchmark with LLM-as-judge scoring.',
    category: 'ML',
    tags: ['RAG', 'FAISS', 'BM25', 'Flask', 'GPT-4o'],
    demoLink: 'https://github.com/SalmanAlfarisi5',
    codeLink: 'https://github.com/SalmanAlfarisi5',
    featured: true,
  },
  {
    id: 17,
    title: 'NVIDIA Nemotron Reasoning Challenge',
    description:
      "Fine-tuned NVIDIA's Nemotron-Nano (30B-total / 3B-active hybrid Mamba-Transformer MoE) with a rank-32 LoRA adapter on six families of symbolic reasoning puzzles, lifting the official grader score from a 0.53 baseline to 0.58. Built a fully metric-compliant SFT pipeline trained only on grader-verified chains of thought.",
    category: 'ML',
    tags: ['LoRA / PEFT', 'Nemotron', 'Mamba MoE', 'PyTorch'],
    demoLink: 'https://github.com/SalmanAlfarisi5',
    codeLink: 'https://github.com/SalmanAlfarisi5',
    featured: true,
  },
  {
    id: 12,
    title: 'Twitter Bias Detector',
    description:
      'Fine-tuned DistilBERT with LoRA + Bayesian Optimization (OPTUNA) for a 20% metric improvement over baseline. Built as a Chrome browser extension with a FastAPI backend and Hugging Face inference, using IndexedDB for privacy-preserving local analytics.',
    category: 'ML',
    tags: ['NLP', 'DistilBERT', 'LoRA', 'FastAPI', 'Chrome Extension'],
    demoLink: 'https://github.com/SalmanAlfarisi5',
    codeLink: 'https://github.com/SalmanAlfarisi5',
    featured: true,
  },
  {
    id: 11,
    title: 'Sentiment Control Interpretability',
    description:
      'Trained and compared N-gram, LSTM, and Seq2Seq Transformer architectures for sentiment-conditioned text generation, achieving 97.8% accuracy. Executed 4 interpretability experiments identifying a 2-step sentiment encoding mechanism via perturbation and ablation studies.',
    category: 'ML',
    tags: ['Transformer', 'NLP', 'Seq2Seq', 'Ablation Study'],
    demoLink: 'https://github.com/SalmanAlfarisi5',
    codeLink: 'https://github.com/SalmanAlfarisi5',
  },
  {
    id: 13,
    title: 'Traffic Sign Classification',
    description:
      'Benchmarked 5 CNN architectures (AlexNet, ResNet50, VGG16, EfficientNetB0, custom CNN) on 23 traffic-sign classes. Fine-tuned ResNet50 and EfficientNetB0 via transfer learning, both reaching 99.9% test accuracy on ~5,000 images.',
    category: 'ML',
    tags: ['PyTorch', 'CNN', 'Transfer Learning', 'Computer Vision'],
    demoLink: 'https://github.com/SalmanAlfarisi5/TrafficSignClassification',
    codeLink: 'https://github.com/SalmanAlfarisi5/TrafficSignClassification',
  },
  {
    id: 14,
    title: 'Rice Leaf Disease Detection',
    description:
      'Built a deep-learning pipeline to classify 5 categories of rice-leaf disease using transfer learning. ResNet-50 reached 100% test accuracy; EfficientNet B0 and MobileNet V2 scored 99.4% and 98.8% respectively on ~5,000 images.',
    category: 'ML',
    tags: ['ResNet-50', 'EfficientNet', 'Transfer Learning', 'Computer Vision'],
    demoLink: 'https://github.com/SalmanAlfarisi5/RiceLeafDisease',
    codeLink: 'https://github.com/SalmanAlfarisi5/RiceLeafDisease',
  },
  {
    id: 15,
    title: 'DNA Cancer Detection',
    description:
      'Benchmarked ML classifiers for early cancer detection from cell-free DNA fragment-length analysis. Optimized classification thresholds on Precision-Recall curves, achieving ≥95% recall with Logistic Regression reaching 97.5% precision.',
    category: 'ML',
    tags: ['Machine Learning', 'Healthcare', 'Scikit-learn', 'Imbalanced Data'],
    demoLink: 'https://github.com/SalmanAlfarisi5/CancerDetection',
    codeLink: 'https://github.com/SalmanAlfarisi5/CancerDetection',
  },
  {
    id: 3,
    title: 'Stock Price Prediction',
    description:
      'Forecasted S&P 500 index closing prices by integrating historical market data with news sentiment analysis. Trained and tuned ensemble models (Random Forest, XGBoost, CatBoost) and recurrent architectures (RNN, GRU, LSTM).',
    category: 'ML',
    tags: ['Time Series', 'XGBoost', 'LSTM', 'Sentiment Analysis'],
    demoLink: 'https://github.com/SalmanAlfarisi5/Stock-Price-Prediction',
    codeLink: 'https://github.com/SalmanAlfarisi5/Stock-Price-Prediction',
  },
  {
    id: 1,
    title: 'Tweets Classification',
    description:
      'Scraped Twitter data and applied NLP preprocessing (Word2Vec, SpaCy, BERT) plus image classification to predict emojis. Optimized multiple models including Logistic Regression, CatBoost, LightGBM, SVM, and Neural Networks.',
    category: 'ML',
    tags: ['NLP', 'Image Processing', 'Sentiment Analysis'],
    demoLink: 'https://github.com/jasonmatthewsuhari/cs3244',
    codeLink: 'https://github.com/jasonmatthewsuhari/cs3244',
  },
  {
    id: 16,
    title: 'Markowitz Portfolio Optimization',
    description:
      'Simulated Markowitz Portfolio Optimization on S&P 500 stocks, applying Modern Portfolio Theory to compute optimal asset allocations from risk-return tradeoffs and efficient-frontier analysis.',
    category: 'Analysis',
    tags: ['Portfolio Optimization', 'Quantitative Finance', 'Python', 'S&P 500'],
    demoLink: 'https://github.com/SalmanAlfarisi5/MarkowitzPortfolioOptimization',
    codeLink: 'https://github.com/SalmanAlfarisi5/MarkowitzPortfolioOptimization',
  },
  {
    id: 7,
    title: 'US Diabetes Prediction',
    description:
      'Built and evaluated classification models on diabetes data using feature selection and cross-validation in R.',
    category: 'ML',
    tags: ['Machine Learning', 'R', 'Cross Validation'],
    demoLink: 'https://github.com/SalmanAlfarisi5/DSA1101-Final-Assignment',
    codeLink: 'https://github.com/SalmanAlfarisi5/DSA1101-Final-Assignment',
  },
  {
    id: 4,
    title: 'Taylor Swift Song Analysis',
    description:
      'Analyzed and visualized Taylor Swift song features in R to uncover trends in listener enjoyment.',
    category: 'Analysis',
    tags: ['Data Visualization', 'Data Analysis', 'R'],
    demoLink: 'https://github.com/SalmanAlfarisi5/Taylor-Swift-Song-Analysis',
    codeLink: 'https://github.com/SalmanAlfarisi5/Taylor-Swift-Song-Analysis',
  },
  {
    id: 5,
    title: 'OpenJio — Activity Manager',
    description:
      'Built a full-stack activity-management system letting users create, edit, delete, search, filter, and sort activities with real-time database updates.',
    category: 'web',
    tags: ['ReactJS', 'PostgreSQL', 'Heroku', 'Figma'],
    demoLink: 'https://github.com/SalmanAlfarisi5/OpenJio-workspace',
    codeLink: 'https://github.com/SalmanAlfarisi5/OpenJio-workspace',
  },
  {
    id: 6,
    title: 'Portfolio Website',
    description:
      'Built a responsive SPA with React and Vite — React Router for navigation, Tailwind CSS + Radix UI for styling, and Framer Motion for animations, with a light/dark theme.',
    category: 'web',
    tags: ['React', 'Framer Motion', 'Tailwind CSS'],
    demoLink: 'https://alfarisisalman.com/',
    codeLink: 'https://github.com/SalmanAlfarisi5/Portfolio-Website',
  },
  {
    id: 8,
    title: 'Discrete Event Simulation',
    description:
      'Developed a Java OOP simulator for multi-queue, multi-server systems — handling arrival, service, and departure events.',
    category: 'dev',
    tags: ['Java', 'OOP'],
    demoLink: 'https://github.com/SalmanAlfarisi5',
    codeLink: 'https://github.com/SalmanAlfarisi5',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
