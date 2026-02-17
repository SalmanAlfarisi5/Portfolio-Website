
import React from 'react';
import { motion } from 'framer-motion';
import AboutSection from '@/components/AboutSection';

const About = () => {
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
                I am also curious on the application of machine learning in finance field, which led me doing a minor in Quantitative Finance
                and multiple projects in that area.
              </p>
              <p className="text-muted-foreground mb-4">
                Also, these are some of my hobbies and interests outside of work and school:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Reading novels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Travelling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Playing Chesss</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
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
              <div className="glass-card rounded-lg p-1">
                <div className="bg-background rounded-md overflow-hidden">
                  <img  
                    alt="Developer workspace" 
                    className="w-full h-auto rounded-md"
                   src="https://images.unsplash.com/photo-1507146815454-9faa99d579aa" />
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
