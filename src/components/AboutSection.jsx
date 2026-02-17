
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
    { name: 'Python', level: 90 },
    { name: 'SQL', level: 85 },
    { name: 'Java', level: 75 },
    { name: 'JavaScript', level: 70 },
    { name: 'R', level: 70 },
    { name: 'PowerBI', level: 75 },
    { name: 'TensorFlow', level: 80 },
    { name: 'PyTorch', level: 80 },
  ];

  const experiences = [
    {
      title: 'Operations Automation Engineer Intern',
      company: 'ShopBack',
      period: 'Jan 2026 - May 2026',
      description: 'Developed end-to-end automation pipelines to benchmark and evaluate LLM models for quality control across ShopBack and merchant datasets, \
      leveraging API integrations and refined semantic matching techniques to significantly reduce manual matching costs and turnaround time. \
      Maintained and enhanced the internal automation platform for large-scale data ingestion and spike alerting via Slack, \
      implementing SSO authentication and delivering new features to improve system reliability and reduce operational costs.',
    },
    {
      title: 'Data Scientist Intern',
      company: 'Astra International',
      period: 'Jul 2025 - Sep 2025',
      description: 'Researched and evaluated LLM evaluation frameworks (statistical- and LLM-based) to establish a baseline methodology for internal analytics tools. \
      Trained forecasting models for CPO prices in Indonesia using econometric and machine learning approaches to minimize prediction error while ensuring interpretability. \
      Developed a recommendation system for product substitutability in the spare parts retail sector, incorporating market analysis, bundling strategies, and intelligent substitution logic.',
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
      title: 'Machine Learning Engingeer',
      company: 'VetBuddy',
      period: 'Nov 2024 - Jan 2025',
      description: 'Partnered with Mandai to deliver AI-based medication prescription systems for zoo and veterinary clinics in Singapore and India. \
      Implemented Retrieval-Augmented Generation (RAG) using GPT-4, Azure Vector Database, and Llama models to provide accurate, context-aware medication recommendations leveraging historical medical data and references.',
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
      description: 'Conducted weekly classes for CS2040 (Data Structures & Algorithms) and IT1244 (Machine Learning & A.I) for ~50 students. \
      Prepared learning materials, facilitated tutorials, answered forum questions, and guided students through complex algorithmic and machine learning problem-solving strategies.',
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Data Science & Analytics',
      institution: 'National University of Singapore',
      period: '2023 - 2027',
      description: 'Second Major in Computer Science and Minor in Quantitative Finance with focus area in Machine Learning.\
      Ranked top in Data Structures & Algorithms (CS2040) and currently serving as a Teaching Assistant for that course.\
      Currenntly contributing to research in the LLM framework and the application of machine learning in various fields.',
    },
    {
      degree: 'High School',
      institution: 'M. H. Thamrin State Prominent High School',
      period: '2020 - 2023',
      description: 'Represented school in various Math competitions and Olympiads and organized events in many occasions',
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
            I'm a third year student in NUS with passion in Machine Learning and Algorithm.
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
              I've completed multiple projects and internships in Data Science, Data Analysis, Machine Learning and Software Development, spanning 
              automation pipelines, image classification, NLP, recommendation systems, stock-market analysis and prediction, and full-stack web development. 
              Along the way, my passion for algorithms was recognized when I ranked top out of 616 students in Data Structures & Algorithms (CS2040), 
              and I now serve as a Teaching Assistant for that course.
            </p>
            <p className="text-muted-foreground mb-6">
              I believe in continuous learning, staying current with the latest machine-learning frameworks 
              and Data Analysis best practices. While I have tried applications of machine learning in various domains, including healthcare and finance,
              I am still keen to explore new challenges and opportunities to apply machine learning in other fields.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Python', 'SQL', 'PyTorch', 'TensorFlow', 'Keras', 'LangChain (RAG)'].map((tag, index) => (
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
