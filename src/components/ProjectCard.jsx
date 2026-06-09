import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Brain, Globe, Terminal, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// Cohesive, on-brand gradient palettes — picked deterministically per project
// so every card looks distinct but the set stays harmonious.
const palettes = [
  ['#6366f1', '#8b5cf6'],
  ['#8b5cf6', '#ec4899'],
  ['#3b82f6', '#06b6d4'],
  ['#06b6d4', '#10b981'],
  ['#ec4899', '#8b5cf6'],
  ['#f59e0b', '#ef4444'],
];

const categoryMeta = {
  ML: { label: 'Machine Learning', Icon: Brain },
  web: { label: 'Web', Icon: Globe },
  dev: { label: 'Software', Icon: Terminal },
  Analysis: { label: 'Analysis', Icon: BarChart3 },
};

const hash = (str) => {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const ProjectCard = ({ project }) => {
  const [from, to] = palettes[hash(project.title) % palettes.length];
  const meta = categoryMeta[project.category] || categoryMeta.dev;
  const { Icon, label } = meta;

  return (
    <motion.div variants={itemVariants} className="h-full">
      <Card className="glass-card overflow-hidden group h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <div
          className="relative overflow-hidden aspect-video flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        >
          {/* Decorative pattern + oversized category icon watermark */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35) 0, transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.25) 0, transparent 35%)',
            }}
          />
          <Icon
            className="absolute -right-4 -bottom-4 h-32 w-32 text-white/15 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
            strokeWidth={1.5}
          />
          <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-black/25 text-white backdrop-blur-sm">
            {label}
          </span>
          <Icon className="relative h-12 w-12 text-white/90" strokeWidth={1.5} />

          {/* Hover overlay with quick links */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
            <div className="flex space-x-2">
              <Button size="icon" variant="secondary" className="rounded-full" asChild>
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} demo`}>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full" asChild>
                <a href={project.codeLink} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} code`}>
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
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:text-primary/80"
            >
              View Project <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
