
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: 'Tweets Classification',
      description: 'A full-featured online store with product management, cart functionality, and payment processing.',
      image: 'e-commerce-dashboard',
      category: 'ML',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      demoLink: '#',
      codeLink: '#',
    },
    {
      id: 2,
      title: 'Recommendation System',
      description: 'A productivity application for managing tasks, projects, and team collaboration.',
      image: 'task-management-app',
      category: 'ML',
      tags: ['React', 'Firebase', 'Tailwind CSS'],
      demoLink: '#',
      codeLink: '#',
    },
    {
      id: 3,
      title: 'Stock Price Prediction',
      description: 'A responsive portfolio website showcasing projects and skills with a modern design.',
      image: 'portfolio-website',
      category: 'ML',
      tags: ['React', 'Framer Motion', 'Tailwind CSS'],
      demoLink: '#',
      codeLink: '#',
    },
    {
      id: 4,
      title: 'Website Development',
      description: 'Real-time weather information with forecasts, maps, and location-based data.',
      image: 'weather-dashboard',
      category: 'web',
      tags: ['JavaScript', 'Weather API', 'Chart.js'],
      demoLink: '#',
      codeLink: '#',
    },
    {
      id: 5,
      title: 'Blog Platform',
      description: 'A content management system for creating and managing blog posts with user authentication.',
      image: 'blog-platform',
      category: 'web',
      tags: ['React', 'Node.js', 'Express', 'MongoDB'],
      demoLink: '#',
      codeLink: '#',
    },
    {
      id: 6,
      title: 'Fitness Tracker',
      description: 'An application for tracking workouts, progress, and health metrics with data visualization.',
      image: 'fitness-tracker',
      category: 'app',
      tags: ['React Native', 'Firebase', 'Chart.js'],
      demoLink: '#',
      codeLink: '#',
    },
    {
      id: 7,
      title: 'Restaurant Website',
      description: 'A website for a restaurant with menu, reservation system, and online ordering.',
      image: 'restaurant-website',
      category: 'web',
      tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
      demoLink: '#',
      codeLink: '#',
    },
    {
      id: 8,
      title: 'Music Player',
      description: 'A web-based music player with playlist management and audio visualization.',
      image: 'music-player',
      category: 'app',
      tags: ['React', 'Web Audio API', 'Styled Components'],
      demoLink: '#',
      codeLink: '#',
    },
  ];
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
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
            Explore my portfolio of projects showcasing my skills and experience in
            web development, app design, and more.
          </p>
        </motion.div>
        
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2 p-1 bg-secondary/30 rounded-full">
            {['all', 'ML', 'web'].map((filter) => (
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
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card className="glass-card overflow-hidden group h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img  
                    alt={`${project.title} project screenshot`}
                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                   src="https://images.unsplash.com/photo-1694190614093-fd6d69af6327" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <div className="flex space-x-2">
                      <Button size="icon" variant="secondary" className="rounded-full" asChild>
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" aria-label="View demo">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button size="icon" variant="secondary" className="rounded-full" asChild>
                        <a href={project.codeLink} target="_blank" rel="noopener noreferrer" aria-label="View code">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" className="self-start p-0 h-auto" asChild>
                    <a href={project.demoLink} className="flex items-center text-primary hover:text-primary/80">
                      View Project <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;
