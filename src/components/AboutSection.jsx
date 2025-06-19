
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
    { name: 'SQL', level: 75 },
    { name: 'R', level: 85 },
    { name: 'PyTorch', level: 70 },
    { name: 'TensorFlow', level: 80 },
    { name: 'Scikit-Learn', level: 80 },
    { name: 'LangChain (RAG)', level: 80 },
    { name: 'OpenCV', level: 70 },
    { name: 'PostgreSQL', level: 80 },
    { name: 'Git & GitHub', level: 80 },
  ];

  const experiences = [
    {
      title: 'Machine Learning Researcher Intern',
      company: 'Institute of Mental Health',
      period: 'May 2025 - July 2025',
      description: 'Developed a data pipeline to integrate and standardize multiple FormSG submissions with CAT outputs for machine learning tasks.\
      Trained and fine-tuned various regression models (Linear, Lasso, Ridge) to predict CAT outcomes using comprehensive questionnaire data, incorporating health-specific scoring logic.\
      Applied Large Language Models (LLMs) for feature extraction from electronic health records (EHRs) and contributed to the development of research manuscripts on LLM methodologies.',
    },
    {
      title: 'Machine Learning Engineer',
      company: 'VetBuddy',
      period: 'Nov 2024 - Jan 2025',
      description: 'Collaborated with Mandai to deliver AI-based medication prescription for\
       zoo and veterinary clinics in Singapore and India. Implemented Retrieval-Augmented\
        Generation (RAG) using GPT-4 and Azure Vector Database, along with Llama models,\
         to provide accurate medication prescription recommendations by leveraging historical \
         data and medication references for contextual understanding',
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
      period: 'Jan 2024 - Dec 2025',
      description: 'Crafted notes and conducted weekly lab and tutorial session for three classes (Machine Learning & A.I and Data Structure & Algorithm), attended by over 50+ students in total.\
      Achieved overall feedback score of 4.6 / 5.0 for effectiveness and engagement.',
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Data Science & Analytics',
      institution: 'National University of Singapore',
      period: '2023 - 2027',
      description: 'Second Major in Computer Science and Minor in Quantitative Finance with focus area in Machine Learning',
    },
    {
      degree: 'High School',
      institution: 'M. H. Thamrin State Prominent High School',
      period: '2020 - 2023',
      description: 'Represented school in various Math competitions and Olympiads and participated in many organizations',
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
            I'm a third year student in NUS with passion in A.I and Machine Learning.
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
              I've a few experiences in Machine Learning, Data Analysis and Software Development, spanning 
              Natural Language Processing, Recommendation System, Stock Market Analysis & Prediction, and Full-Stack Web Development. 
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
