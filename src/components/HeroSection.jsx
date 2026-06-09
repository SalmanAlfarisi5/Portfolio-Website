
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
          <a 
            href="https://drive.google.com/file/d/1yVRgsC0gjk1O0LGDkXBCzjnNcjLkYbqL/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.span 
              className="inline-block px-3 py-1 text-sm rounded-full bg-primary/10 text-primary mb-4 cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              See my resume
            </motion.span>
          </a>

            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              I build <span className="gradient-text">intelligent</span> machine learning applications
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-8 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              A data scientist with a strong background in machine learning, data analysis, and software development. I specialize in building scalable ML pipelines and deriving actionable insights from complex data.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <Button asChild size="lg" className="rounded-full">
                <Link to="/contact">
                  Get in touch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full"
                onClick={scrollToProjects}
              >
                View my work
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto animated-border">
              <div className="absolute inset-[3px] bg-background rounded-[calc(var(--radius)-3px)] z-10 flex items-center justify-center">
                <img  
                  alt="Professional developer portrait" 
                  className="w-full h-full object-cover rounded-[calc(var(--radius)-3px)]"
                 src="https://images.unsplash.com/photo-1607706189992-eae578626c86" />
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
