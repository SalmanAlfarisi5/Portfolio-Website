
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const ProjectsSection = () => {
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
    <section id="projects" className="py-20 bg-background relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore a selection of my recent work, showcasing my skills and experience in
            building modern, responsive, and user-friendly applications.
          </p>
        </motion.div>
        
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 p-1 bg-secondary/30 rounded-full">
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
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
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
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" className="rounded-full">
            <Link to="/projects">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
