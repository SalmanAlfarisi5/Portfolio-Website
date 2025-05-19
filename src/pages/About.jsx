
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
              <h2 className="text-3xl font-bold mb-6">My Philosophy</h2>
              <p className="text-muted-foreground mb-4">
                I believe that impactful data-driven solutions go beyond algorithms—
                they solve real problems and empower users with actionable insights.
                My approach blends deep technical expertise in machine learning with 
                a solid grounding in user needs and business context.
              </p>
              <p className="text-muted-foreground mb-4">
                Every project I undertake is guided by these core principles:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Establish end-to-end, repeatable ML pipelines with clear versioning, testing, and orchestration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Clean, maintainable code that stands the test of time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Continuous learning and adaptation to new technologies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Collaborative approach that values communication and feedback</span>
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
