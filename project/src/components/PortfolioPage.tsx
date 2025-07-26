import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { ExternalLink, Github, Mail, Linkedin, Code, Database, Wrench, Cpu, GraduationCap, School } from 'lucide-react';

interface PortfolioPageProps {
  onBack: () => void;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ onBack }) => {
  const { about, projects, skills, education } = portfolioData;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'languages': return <Code className="w-4 h-4" />;
      case 'frontend': return <Cpu className="w-4 h-4" />;
      case 'backend': return <Database className="w-4 h-4" />;
      case 'tools': return <Wrench className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 border border-green-500/30 rounded-lg p-6 bg-black/50 backdrop-blur-sm hover:border-green-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
          <button 
            onClick={onBack}
            className="mb-4 text-green-400 hover:text-green-300 transition-colors duration-200 hover:scale-105 transform"
          >
            ← Back to Terminal
          </button>
          <h1 className="text-4xl font-bold mb-2 text-green-400 glow-text">{about.name}</h1>
          <h2 className="text-xl mb-4 text-green-300">{about.title}</h2>
          <p className="text-green-200 mb-6 leading-relaxed">{about.bio}</p>
          
          {/* Contact Links */}
          <div className="flex gap-4">
            <a 
              href={`mailto:${about.contact.email}`}
              className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-all duration-200 hover:scale-110 transform hover:rotate-3"
            >
              <Mail className="w-5 h-5" />
              Email
            </a>
            <a 
              href={about.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-all duration-200 hover:scale-110 transform hover:rotate-3"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a 
              href={about.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-all duration-200 hover:scale-110 transform hover:rotate-3"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-green-400 glow-text">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu) => (
              <motion.div 
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border border-green-500/30 rounded-lg p-6 bg-black/50 backdrop-blur-sm hover:border-green-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:scale-105 transform group"
              >
                <div className="flex items-start gap-3 mb-4">
                  <motion.div 
                    whileHover={{ rotate: 12 }}
                    transition={{ duration: 0.3 }}
                  >
                    {edu.type === 'college' ? (
                      <GraduationCap className="w-6 h-6 text-green-400" />
                    ) : (
                      <School className="w-6 h-6 text-green-400" />
                    )}
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-green-400 group-hover:text-green-300 transition-colors duration-200 mb-1">
                      {edu.institution}
                    </h4>
                    <p className="text-green-300 text-sm mb-2">{edu.location}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {edu.course && (
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-sm font-medium">Course:</span>
                      <span className="text-green-200 text-sm">{edu.course}</span>
                    </div>
                  )}
                  {edu.percentage && (
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-sm font-medium">Scores:</span>
                      <span className="text-green-200 text-sm">{edu.percentage}</span>
                    </div>
                  )}
                  {edu.subjects && (
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-sm font-medium">Stream:</span>
                      <span className="text-green-200 text-sm">{edu.subjects}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-green-400 glow-text">Featured Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="border border-green-500/30 rounded-lg p-6 bg-black/50 backdrop-blur-sm hover:border-green-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:scale-105 transform group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-green-400 group-hover:text-green-300 transition-colors duration-200">
                    {project.title}
                  </h4>
                  {project.featured && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded border border-green-500/30 animate-pulse glow-text">
                      FEATURED
                    </span>
                  )}
                </div>
                
                <p className="text-green-200 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="text-xs bg-green-500/10 text-green-300 px-2 py-1 rounded border border-green-500/20 hover:bg-green-500/20 hover:scale-105 transition-all duration-200 hover:shadow-sm hover:shadow-green-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 text-sm">
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-all duration-200 hover:scale-110 transform hover:shadow-sm hover:shadow-green-500/50"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-all duration-200 hover:scale-110 transform hover:shadow-sm hover:shadow-green-500/50"
                    >
                      <Github className="w-4 h-4" />
                      Source
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-green-400 glow-text">Technical Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div 
                key={category}
                className="border border-green-500/30 rounded-lg p-4 bg-black/50 backdrop-blur-sm hover:border-green-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="hover:rotate-180 transition-transform duration-300">
                    {getCategoryIcon(category)}
                  </div>
                  <h4 className="font-semibold text-green-400 capitalize">
                    {category}
                  </h4>
                </div>
                <div className="space-y-3">
                  {categorySkills.map((skill, index) => (
                    <div key={skill.id} className="hover:scale-105 transition-transform duration-200">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-green-300">{skill.name}</span>
                        <span className="text-xs text-green-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-green-900/30 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-out glow-bar"
                          style={{ 
                            width: `${skill.level}%`,
                            animationDelay: `${index * 100}ms`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
      </div>

      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 10px currentColor;
        }
        .glow-bar {
          box-shadow: 0 0 10px currentColor;
        }
      `}</style>
    </div>
  );
};

export default PortfolioPage;