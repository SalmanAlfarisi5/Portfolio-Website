
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/projects';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my portfolio of projects across Machine Learning, LLMs, Computer Vision, NLP,
            Quantitative Finance, and Software Development.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2 p-1 bg-secondary/30 rounded-full">
            {['all', 'ML', 'web', 'dev', 'Analysis'].map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'ghost'}
                className={`rounded-full capitalize ${activeFilter === filter ? '' : 'hover:bg-secondary/50'}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
