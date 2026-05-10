
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const projects = [
    {
      id: 9,
      title: 'saLLMan — Step-aware LLM',
      description: 'Built a decoder-only LLM from scratch with RoPE positional encoding, SwiGLU activation, and RMSNorm, trained on DSA reasoning corpora (LeetCode & Codeforces). Applied GRPO reinforcement learning to align the model toward step-by-step algorithmic reasoning.',
      image: 'sallman',
      category: 'ML',
      tags: ['PyTorch', 'LLM', 'GRPO', 'Transformers'],
      demoLink: 'https://github.com/SalmanAlfarisi5',
      codeLink: 'https://github.com/SalmanAlfarisi5',
    },
    {
      id: 10,
      title: 'Multimodal Document RAG',
      description: 'Built a multi-format document Q&A system using hybrid FAISS + BM25 retrieval with cross-encoder re-ranking and multimodal ingestion (PDF, DOCX, images via GPT-4o-mini). Evaluated against the FinanceBench benchmark with LLM-as-judge scoring.',
      image: 'multimodal-rag',
      category: 'ML',
      tags: ['RAG', 'FAISS', 'BM25', 'Flask', 'GPT-4o'],
      demoLink: 'https://github.com/SalmanAlfarisi5',
      codeLink: 'https://github.com/SalmanAlfarisi5',
    },
    {
      id: 11,
      title: 'Sentiment Control Interpretability',
      description: 'Trained and compared N-gram, LSTM, and Seq2Seq Transformer architectures for sentiment-conditioned text generation, achieving 97.8% accuracy. Executed 4 interpretability experiments identifying a 2-step sentiment encoding mechanism via perturbation and ablation studies.',
      image: 'sentiment-interpretability',
      category: 'ML',
      tags: ['Transformer', 'NLP', 'Seq2Seq', 'Ablation Study'],
      demoLink: 'https://github.com/SalmanAlfarisi5',
      codeLink: 'https://github.com/SalmanAlfarisi5',
    },
    {
      id: 12,
      title: 'Twitter Bias Detector',
      description: 'Fine-tuned DistilBERT with LoRA + Bayesian Optimization (OPTUNA) for 20% metric improvement over baseline. Built as a Chrome browser extension with FastAPI backend and Hugging Face inference, using IndexedDB for privacy-preserving local analytics.',
      image: 'twitter-bias-detector',
      category: 'ML',
      tags: ['NLP', 'DistilBERT', 'LoRA', 'FastAPI', 'Chrome Extension'],
      demoLink: 'https://github.com/SalmanAlfarisi5',
      codeLink: 'https://github.com/SalmanAlfarisi5',
    },
    {
      id: 1,
      title: 'Tweets Classification',
      description: 'Scraped Twitter data and applied NLP preprocessing (Word2Vec, SpaCy, BERT) plus image classification to predict emojis. Optimized multiple models including Logistic Regression, CatBoost, LightGBM, SVM, and Neural Networks.',
      image: 'tweets-classification',
      category: 'ML',
      tags: ['NLP', 'Image Processing', 'Sentiment Analysis'],
      demoLink: 'https://github.com/jasonmatthewsuhari/cs3244',
      codeLink: 'https://github.com/jasonmatthewsuhari/cs3244',
    },
    {
      id: 2,
      title: 'Recommendation System',
      description: 'Engineered customer-advisor features and trained hybrid ML models to improve advisor-customer matching.',
      image: 'recommendation-system',
      category: 'ML',
      tags: ['Deep Learning', 'Collaborative Filtering', 'Content-based Filtering'],
      demoLink: 'https://github.com/SalmanAlfarisi5',
      codeLink: 'https://github.com/SalmanAlfarisi5',
    },
    {
      id: 3,
      title: 'Stock Price Prediction',
      description: 'Forecasted S&P 500 index closing prices by integrating historical market data with news sentiment analysis. Trained and tuned ensemble models (Random Forest, XGBoost, CatBoost) and recurrent architectures (RNN, GRU, LSTM).',
      image: 'stock-price-prediction',
      category: 'ML',
      tags: ['Time Series', 'XGBoost', 'LSTM', 'Sentiment Analysis'],
      demoLink: 'https://github.com/SalmanAlfarisi5/Stock-Price-Prediction',
      codeLink: 'https://github.com/SalmanAlfarisi5/Stock-Price-Prediction',
    },
    {
      id: 4,
      title: 'Taylor Swift Song Analysis',
      description: 'Analyzed and visualized Taylor Swift song features in R to uncover trends in listener enjoyment.',
      image: 'taylor-swift-song-analysis',
      category: 'Analysis',
      tags: ['Data Visualization', 'Data Analysis', 'Markdown'],
      demoLink: 'https://github.com/SalmanAlfarisi5/Taylor-Swift-Song-Analysis',
      codeLink: 'https://github.com/SalmanAlfarisi5/Taylor-Swift-Song-Analysis',
    },
    {
      id: 5,
      title: 'Website Development',
      description: 'Built a comprehensive activity management system, enabling users to create, edit, delete, search, filter, and sort activities with real-time database updates',
      image: 'website-development',
      category: 'web',
      tags: ['ReactJS', 'PostgreSQL', 'git & github', 'Heroku', 'Figma'],
      demoLink: 'https://github.com/SalmanAlfarisi5/OpenJio-workspace',
      codeLink: 'https://github.com/SalmanAlfarisi5/OpenJio-workspace',
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'Built a responsive SPA with React and Vite, using React Router for navigation and Tailwind CSS + Radix UI for styling, and Framer Motion for animations.',
      image: 'portfolio-website',
      category: 'web',
      tags: ['React', 'Framer Motion', 'Tailwind CSS'],
      demoLink: 'https://alfarisisalman.com/',
      codeLink: 'https://github.com/SalmanAlfarisi5/Portfolio-Website',
    },
    {
      id: 7,
      title: 'US Diabetes Prediction',
      description: 'Built and evaluated classification models on diabetes data using feature selection and cross validation in R.',
      image: 'us-diabetes-prediction',
      category: 'ML',
      tags: ['Machine Learning', 'R', 'Cross Validation'],
      demoLink: 'https://github.com/SalmanAlfarisi5/DSA1101-Final-Assignment',
      codeLink: 'https://github.com/SalmanAlfarisi5/DSA1101-Final-Assignment',
    },
    {
      id: 8,
      title: 'Discrete Event Simulation',
      description: 'Developed a Java OOP simulator for multi-queue, multi-server systems—handling arrival, service, and departure events.',
      image: 'discrete-event-simulation',
      category: 'dev',
      tags: ['Java', 'OOP'],
      demoLink: 'https://github.com/SalmanAlfarisi5',
      codeLink: 'https://github.com/SalmanAlfarisi5',
    },
  ];
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my portfolio of projects showcasing my skills and experience in
            Machine Learning, Web Development, and Data Analysis. 
          </p>
        </motion.div>
        
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2 p-1 bg-secondary/30 rounded-full">
            {['all', 'ML', 'web', 'dev', 'Analysis'].map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'ghost'}
                className={`rounded-full capitalize ${activeFilter === filter ? '' : 'hover:bg-secondary/50'}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card className="glass-card overflow-hidden group h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img  
                    alt={`${project.title} project screenshot`}
                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                   src="https://images.unsplash.com/photo-1694190614093-fd6d69af6327" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <div className="flex space-x-2">
                      <Button size="icon" variant="secondary" className="rounded-full" asChild>
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" aria-label="View demo">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button size="icon" variant="secondary" className="rounded-full" asChild>
                        <a href={project.codeLink} target="_blank" rel="noopener noreferrer" aria-label="View code">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" className="self-start p-0 h-auto" asChild>
                    <a href={project.demoLink} className="flex items-center text-primary hover:text-primary/80">
                      View Project <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
