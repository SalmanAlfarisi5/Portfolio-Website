
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/projects';
import usePageMeta from '@/lib/usePageMeta';

// Filter values map 1:1 to project.category; labels are spelled out so the
// chips read the same as the category badges on the cards (e.g. dev → Software).
const filters = [
  { value: 'all', label: 'All' },
  { value: 'ML', label: 'Machine Learning' },
  { value: 'web', label: 'Web' },
  { value: 'dev', label: 'Software' },
  { value: 'Analysis', label: 'Analysis' },
];

const Projects = () => {
  usePageMeta('Projects', 'Projects by Muhammad Salman Al Farisi across Machine Learning, LLMs, Computer Vision, NLP, Quantitative Finance, and Software Development.');
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
            {filters.map((filter) => (
              <Button
                key={filter.value}
                variant={activeFilter === filter.value ? 'default' : 'ghost'}
                className={`rounded-full ${activeFilter === filter.value ? '' : 'hover:bg-secondary/50'}`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {filteredProjects.length > 0 ? (
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
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No projects in this category yet.</p>
            <Button
              variant="link"
              className="mt-2 text-primary"
              onClick={() => setActiveFilter('all')}
            >
              View all projects
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;
