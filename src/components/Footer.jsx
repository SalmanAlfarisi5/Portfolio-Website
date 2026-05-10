
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github size={20} />, href: 'https://github.com/SalmanAlfarisi5', label: 'GitHub' },
    { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/salmanalfarisi5', label: 'LinkedIn' },
    { icon: <Mail size={20} />, href: 'mailto:salman26080@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-background border-t border-border/20 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-lg font-semibold gradient-text">Salman Alfarisi</span>
            <p className="text-sm text-muted-foreground mt-2">
              Modeling tomorrow's insights today.
            </p>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="p-2 rounded-full bg-secondary/50 hover:bg-primary/20 text-foreground/80 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Salman Portfolio.
          </p>
          
          <div className="mt-4 md:mt-0">
            <span className="text-xs text-muted-foreground">
              Built with React, Tailwind CSS & Framer Motion
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
