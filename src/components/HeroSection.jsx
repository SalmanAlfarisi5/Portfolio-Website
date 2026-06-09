
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, FileText, Github, Linkedin } from 'lucide-react';
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
            href="/Resume-Salman.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.span
              className="inline-flex items-center gap-1.5 px-3 py-1 text-sm rounded-full bg-primary/10 text-primary mb-4 cursor-pointer hover:bg-primary/20 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <FileText className="h-3.5 w-3.5" /> See my resume
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
              <div className="absolute inset-[3px] bg-background rounded-[calc(var(--radius)-3px)] z-10 flex flex-col items-center justify-center text-center p-8 gap-5">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-primary/30">
                    MS
                  </div>
                  <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-green-500 border-4 border-background" title="Open to opportunities" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Muhammad Salman</h2>
                  <p className="text-primary font-medium">Data Scientist · ML Engineer</p>
                  <p className="text-sm text-muted-foreground mt-1">NUS '27 · Singapore</p>
                </div>
                <div className="flex gap-3">
                  {[
                    { icon: <Github className="h-5 w-5" />, href: 'https://github.com/SalmanAlfarisi5', label: 'GitHub' },
                    { icon: <Linkedin className="h-5 w-5" />, href: 'https://www.linkedin.com/in/salmanalfarisi5', label: 'LinkedIn' },
                    { icon: <FileText className="h-5 w-5" />, href: '/Resume-Salman.pdf', label: 'Resume' },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="p-2.5 rounded-full bg-secondary/60 hover:bg-primary/20 text-foreground/80 hover:text-primary transition-colors"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-2 pt-1">
                  {['LLMs', 'RAG', 'PyTorch'].map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-secondary/50 text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
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
