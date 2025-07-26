import React, { useState } from 'react';
import { Github, ExternalLink, Filter } from 'lucide-react';

const Projects = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  if (!data || !Array.isArray(data)) return null;
  
  const categories = ['All', ...new Set(data.map(project => project.category))];
  
  const filteredProjects = selectedCategory === 'All' 
    ? data 
    : data.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr',
          gap: 'calc(var(--grid-unit) * 2)'
        }}>
          {/* Section Header */}
          <div>
            <div className="label" style={{ marginBottom: '16px' }}>
              02. SELECTED WORK
            </div>
            <h2 className="title-big" style={{ marginBottom: '32px' }}>
              RECENT<br/>PROJECTS
            </h2>
          </div>
          
          {/* Filter Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '16px',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '48px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={16} />
              <span className="label-small">FILTER:</span>
            </div>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'btn-accent' : 'btn-ghost'}
                style={{ 
                  padding: '8px 16px',
                  minHeight: 'auto'
                }}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 'calc(var(--grid-unit) * 1)'
          }}>
            {filteredProjects.map((project) => (
              <div key={project.id} className="card hover-lift">
                {/* Project Image */}
                <div style={{ 
                  marginBottom: '24px',
                  overflow: 'hidden',
                  aspectRatio: '16/10'
                }}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    className="hover-scale"
                  />
                </div>
                
                {/* Project Info */}
                <div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px'
                  }}>
                    <span className="label-small" style={{ color: 'var(--accent-primary)' }}>
                      {project.category}
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <a 
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-opacity"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        <Github size={16} />
                      </a>
                      {project.liveLink && (
                        <a 
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover-opacity"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-regular" style={{ 
                    marginBottom: '12px',
                    fontWeight: '600'
                  }}>
                    {project.title}
                  </h3>
                  
                  <p className="text-body" style={{ 
                    marginBottom: '16px',
                    color: 'var(--text-secondary)'
                  }}>
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="label-small"
                        style={{ 
                          padding: '4px 8px',
                          backgroundColor: 'var(--color-background)',
                          border: '1px solid var(--border-light)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;