
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Briefcase, GraduationCap, Trophy, BrainCircuit, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// `condensed` renders a teaser (used on the Home page): highlights + a CTA to
// the full /about page. The full version (used on /about) adds the journey
// narrative and the Skills / Experience / Education tabs.
const AboutSection = ({ condensed = false }) => {
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  // Grouped, resume-accurate skills. Self-assigned proficiency percentages were
  // removed in favour of categorised competencies that read more credibly.
  const skillGroups = [
    { name: 'Languages', items: ['Python', 'SQL', 'R', 'Java', 'C'] },
    { name: 'ML & Deep Learning', items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'HuggingFace', 'LoRA / PEFT', 'Mamba / SSM', 'SHAP'] },
    { name: 'NLP & Generative AI', items: ['RAG', 'FAISS', 'BM25', 'Cross-Encoder Re-ranking', 'LangChain', 'LLM-as-Judge', 'SFT'] },
    { name: 'Web & MLOps', items: ['FastAPI', 'Flask', 'ReactJS', 'Streamlit', 'Docker', 'Git & GitHub'] },
    { name: 'Data & Visualization', items: ['Pandas', 'NumPy', 'PostgreSQL', 'MySQL', 'Matplotlib', 'PowerBI'] },
  ];

  const highlights = [
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: 'B.Sc. Data Science & Analytics @ NUS',
      subtitle: 'GPA 4.64 / 5.00 · CS Double Major (AI) · Quant Finance Minor',
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      title: 'Top student in Data Structures & Algorithms',
      subtitle: 'Highest cumulative score among 616 students',
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: '6 Data Science & ML roles',
      subtitle: 'ShopBack · Astra International · NHG · Mitra Taxindo · VetBuddy · NUS',
    },
    {
      icon: <BrainCircuit className="h-5 w-5" />,
      title: 'Research focus',
      subtitle: 'LLMs · RAG · NLP · Reinforcement Learning',
    },
  ];

  const experiences = [
    {
      title: 'Automation Engineer Intern',
      company: 'ShopBack',
      period: 'Jan 2026 - May 2026',
      description: 'Built PRISM, a scalable end-to-end Quality Control automation pipeline reconciling merchant and ShopBack data, currently live in Australia and architected for rollout across 11 markets, with features including scheduled QC runs, email-triggered pipeline execution, and custom web crawling to validate merchant contracts against live listings. Developed VoiceTrace, an LLM-powered operations intelligence system for cashback dispute tickets that automates transaction retrieval, generates resolution insights, enables bulk ticket categorization, and delivers real-time merchant health monitoring via Slack.',
    },
    {
      title: 'Data Scientist Intern',
      company: 'Astra International',
      period: 'Jul 2025 - Sep 2025',
      description: 'Researched and evaluated LLM evaluation frameworks (statistical- and LLM-based) to establish a baseline methodology for Astra International\'s LLM evaluator product. Trained forecasting models for CPO prices in Indonesia, integrating multi-source features with econometric and machine learning approaches to minimize prediction error. Developed a product substitutability recommendation system for the spare parts retail sector, incorporating market analysis, bundling strategies, and intelligent substitution logic.',
    },
    {
      title: 'Data Analyst Intern',
      company: 'National Health Group',
      period: 'May 2025 - Jul 2025',
      description: 'Designed and implemented a data pipeline to integrate and standardize questionnaire submissions from multiple formats into a single structured dataset for efficient statistical analysis. \
      Automated personalized healthcare report generation by translating patient survey responses into structured clinical summaries. \
      Applied multiple LLMs for clinical text extraction, converting unstructured triage and psychotherapy notes into structured JSON datasets categorized by psychological frameworks.',
    },
    {
      title: 'Web Developer (Freelance)',
      company: 'Mitra Taxindo Consulting',
      period: 'Jan 2025 - May 2025',
      description: 'Built and deployed a production bilingual (EN/ID) marketing website (mtaxindo.com) for a Jakarta tax-consulting firm using React 18, Vite, and React Router on Vercel, with a custom React-Context i18n layer, browser-language detection, and localStorage persistence. Engineered SEO and performance optimizations — route-level code splitting, a per-route meta/Open-Graph hook, JSON-LD structured data, sitemap/robots, scroll-reveal animations, and a serverless Web3Forms contact pipeline with accessible feedback states.',
    },
    {
      title: 'Machine Learning Scientist',
      company: 'VetBuddy',
      period: 'Nov 2024 - Jan 2025',
      description: 'Partnered with Mandai to deliver AI-based medication prescription for zoo and veterinary clinics in Singapore and India through a web-based solution. Implemented Retrieval-Augmented Generation (RAG) using GPT-4 and Azure Vector Database, along with Llama models, to provide accurate medication prescription recommendations by leveraging historical data and medication references.',
    },
    {
      title: 'Teaching Assistant',
      company: 'National University of Singapore',
      period: 'Jan 2025 - Dec 2025',
      description: 'Conducted weekly classes on Data Structures & Algorithms and Machine Learning/AI for ~50 students, preparing learning materials, answering forum questions, and guiding students through complex problem-solving strategies. Developed an automated grading pipeline for ~100 students, eliminating manual grading overhead and ensuring consistent, reproducible scoring at scale.',
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Science (Hons.) in Data Science and Analytics',
      institution: 'National University of Singapore',
      period: '2023 - 2027',
      description: 'Cumulative GPA: 4.64/5.00. Double Major in Computer Science (Focus Area in Artificial Intelligence) and Minor in Quantitative Finance. Ranked top student in Data Structures & Algorithms among 616 students, and serving as Teaching Assistant for CS2040 (Data Structures & Algorithms), IT1244 (Artificial Intelligence & Machine Learning), and DSS5105 (Data Science Projects in Practice).',
    },
    {
      degree: 'High School',
      institution: 'M. H. Thamrin State Prominent High School',
      period: '2020 - 2023',
      description: 'Represented school in various Mathematics competitions and Olympiads, and organized events on many occasions.',
    },
  ];

  const HighlightsCard = (
    <div className="glass-card rounded-lg p-6 sm:p-8 h-full">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary" /> Quick Highlights
      </h3>
      <div className="space-y-5">
        {highlights.map((item, i) => (
          <div key={i} className="flex items-start gap-4">
            <span className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
              {item.icon}
            </span>
            <div>
              <p className="font-medium leading-tight">{item.title}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="about" className="py-20 bg-secondary/20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm a third-year student at NUS with a passion for Machine Learning and Algorithms.
            Here's a bit more about my journey, skills, and experience.
          </p>
        </motion.div>

        {condensed ? (
          /* Home teaser: highlights + CTA to the full About page */
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {HighlightsCard}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-center mt-10"
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                More about my journey, skills & experience <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {HighlightsCard}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold mb-4">My Journey</h3>
                <p className="text-muted-foreground mb-6">
                  I've completed multiple projects and internships spanning Data Science, Machine Learning, and Software Development — building LLMs from scratch, multimodal RAG systems, NLP classifiers, forecasting models, and full-stack applications.
                  My passion for algorithms was recognized when I ranked top out of 616 students in Data Structures & Algorithms (CS2040),
                  and I now serve as a Teaching Assistant for both CS2040 and IT1244 (AI & Machine Learning).
                </p>
                <p className="text-muted-foreground mb-6">
                  I believe in continuous learning and staying current with the latest machine learning frameworks
                  and data analysis best practices. Having applied machine learning across various domains including healthcare and finance,
                  I remain eager to explore new challenges and opportunities.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Python', 'PyTorch', 'HuggingFace', 'LangChain', 'RAG / FAISS', 'FastAPI'].map((tag, index) => (
                    <motion.span
                      key={index}
                      custom={index}
                      variants={fadeInUpVariant}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="px-3 py-1 bg-secondary/50 rounded-full text-sm"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            <Tabs defaultValue="skills" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="skills" className="flex items-center gap-2">
                  <Code className="h-4 w-4" /> Skills
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> Experience
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" /> Education
                </TabsTrigger>
              </TabsList>

              <TabsContent value="skills" className="space-y-6">
                {skillGroups.map((group, index) => (
                  <motion.div
                    key={group.name}
                    custom={index}
                    variants={fadeInUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      {group.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 rounded-lg bg-secondary/50 text-sm font-medium border border-border/50"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={fadeInUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Card className="glass-card overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold">{exp.title}</h4>
                            <p className="text-primary">{exp.company}</p>
                          </div>
                          <span className="text-sm text-muted-foreground mt-2 md:mt-0 px-3 py-1 bg-secondary/30 rounded-full">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{exp.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="education" className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={fadeInUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Card className="glass-card overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold">{edu.degree}</h4>
                            <p className="text-primary">{edu.institution}</p>
                          </div>
                          <span className="text-sm text-muted-foreground mt-2 md:mt-0 px-3 py-1 bg-secondary/30 rounded-full">
                            {edu.period}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{edu.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
