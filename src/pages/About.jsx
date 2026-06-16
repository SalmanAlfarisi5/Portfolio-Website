
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Globe, Trophy, Bike } from 'lucide-react';
import AboutSection from '@/components/AboutSection';
import usePageMeta from '@/lib/usePageMeta';

const About = () => {
  usePageMeta('About', 'About Muhammad Salman Al Farisi — NUS Data Science & Analytics student. Background, skills, work experience, and education in ML, LLMs, and software development.');
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >

      <AboutSection />
      
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">More About Me</h2>
              <p className="text-muted-foreground mb-4">
                I am actively researching in the field of deep learning, particularly Natural Language Processing (NLP) and Reinforcement Learning (RL).
                I am also curious about the application of machine learning in the finance field, which led me to pursue a minor in Quantitative Finance
                and multiple projects in that area.
              </p>
              <p className="text-muted-foreground mb-4">
                Outside of work and school, here are some of my hobbies and interests:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <span className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
                    <BookOpen className="h-4 w-4" />
                  </span>
                  <span>Reading novels</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
                    <Globe className="h-4 w-4" />
                  </span>
                  <span>Travelling</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
                    <Trophy className="h-4 w-4" />
                  </span>
                  <span>Playing Chess</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
                    <Bike className="h-4 w-4" />
                  </span>
                  <span>Night cycling around Singapore</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="glass-card rounded-lg overflow-hidden shadow-xl">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/40">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-muted-foreground">salman — zsh</span>
                </div>
                <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
                  <p><span className="text-primary">➜</span> <span className="text-muted-foreground">~</span> whoami</p>
                  <p className="mb-3">muhammad salman al farisi</p>
                  <p><span className="text-primary">➜</span> <span className="text-muted-foreground">~</span> cat focus.json</p>
                  <pre className="mb-3 text-foreground/90 whitespace-pre-wrap">{`{
  "research":  ["NLP", "Reinforcement Learning"],
  "building":  ["LLMs", "RAG systems"],
  "exploring": ["Quantitative Finance"]
}`}</pre>
                  <p><span className="text-primary">➜</span> <span className="text-muted-foreground">~</span> status</p>
                  <p className="text-green-500">● open to new challenges &amp; opportunities</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
