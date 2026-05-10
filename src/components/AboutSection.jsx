
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Briefcase, GraduationCap, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const AboutSection = () => {
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

  const skills = [
    { name: 'Python', level: 95 },
    { name: 'PyTorch', level: 85 },
    { name: 'HuggingFace / LLMs', level: 85 },
    { name: 'SQL', level: 85 },
    { name: 'RAG / FAISS', level: 80 },
    { name: 'LangChain', level: 80 },
    { name: 'FastAPI / Flask', level: 75 },
    { name: 'Java', level: 75 },
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
      title: 'Machine Learning Scientist',
      company: 'VetBuddy',
      period: 'Nov 2024 - Jan 2025',
      description: 'Partnered with Mandai to deliver AI-based medication prescription for zoo and veterinary clinics in Singapore and India through a web-based solution. Implemented Retrieval-Augmented Generation (RAG) using GPT-4 and Azure Vector Database, along with Llama models, to provide accurate medication prescription recommendations by leveraging historical data and medication references.',
    },
    {
      title: 'Web Developer',
      company: 'Mitra Taxindo Consulting',
      period: 'Nov 2024 - Jan 2025',
      description: 'Designed and implemented a fully responsive and scalable profile website for \
      a leading tax consulting firm in Indonesia, leveraging ReactJS to ensure dynamic user \
      interaction and optimal performance. Built and deployed a Retrieval-Augmented Generation (RAG) \
      pipeline for AI-powered chatbots, integrating advanced language models such as Llama 3 and Mixtral \
      8x7B to enhance accuracy and contextual understanding',
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
      description: 'Cumulative GPA: 4.63/5.00. Double Major in Computer Science (Focus Area in Artificial Intelligence) and Minor in Quantitative Finance. Ranked top student in Data Structures & Algorithms among 616 students, and currently serving as Teaching Assistant for CS2040 (Data Structures & Algorithms) and IT1244 (Artificial Intelligence & Machine Learning).',
    },
    {
      degree: 'High School',
      institution: 'M. H. Thamrin State Prominent High School',
      period: '2020 - 2023',
      description: 'Represented school in various Mathematics competitions and Olympiads, and organized events on many occasions.',
    },

  ];

  return (
    <section id="about" className="py-20 bg-background relative">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="glass-card rounded-lg p-1">
              <div className="bg-background rounded-md overflow-hidden">
                <img  
                  alt="Developer working on code" 
                  className="w-full h-auto rounded-md"
                 src="https://images.unsplash.com/photo-1507146815454-9faa99d579aa" />
              </div>
            </div>
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
          
          <TabsContent value="skills" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeInUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-secondary/30 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
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
      </div>
    </section>
  );
};

export default AboutSection;
