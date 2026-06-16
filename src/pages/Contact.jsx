
import React from 'react';
import { motion } from 'framer-motion';
import ContactSection from '@/components/ContactSection';
import usePageMeta from '@/lib/usePageMeta';

const Contact = () => {
  usePageMeta('Contact', 'Get in touch with Muhammad Salman Al Farisi — open to data science, machine learning, and software opportunities.');
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >      
      <ContactSection />
    </motion.div>
  );
};

export default Contact;
