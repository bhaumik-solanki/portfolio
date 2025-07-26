import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { mockData } from '../mock';

const Experience = () => {
  const { experience } = mockData;

  return (
    <section id="experience" className="section">
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr',
          gap: 'calc(var(--grid-unit) * 2)'
        }}>
          {/* Section Header */}
          <div>
            <div className="label" style={{ marginBottom: '16px' }}>
              03. WORK EXPERIENCE
            </div>
            <h2 className="title-big" style={{ marginBottom: '32px' }}>
              PROFESSIONAL<br/>JOURNEY
            </h2>
          </div>
          
          {/* Experience Timeline */}
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}>
            {experience.map((exp, index) => (
              <div key={exp.id} className="card">
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '24px',
                  alignItems: 'flex-start'
                }}>
                  {/* Main Content */}
                  <div>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      marginBottom: '12px',
                      flexWrap: 'wrap'
                    }}>
                      <span className="label-small" style={{ 
                        color: 'var(--accent-primary)',
                        backgroundColor: 'rgba(56, 255, 98, 0.1)',
                        padding: '4px 8px'
                      }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <Calendar size={14} />
                        <span className="label-small">{exp.duration}</span>
                      </div>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <MapPin size={14} />
                        <span className="label-small">{exp.location}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-regular" style={{ 
                      marginBottom: '4px',
                      fontWeight: '600'
                    }}>
                      {exp.position}
                    </h3>
                    
                    <div className="text-body" style={{ 
                      marginBottom: '16px',
                      color: 'var(--accent-primary)'
                    }}>
                      {exp.company}
                    </div>
                    
                    <p className="text-body" style={{ 
                      marginBottom: '16px',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6'
                    }}>
                      {exp.description}
                    </p>
                    
                    {/* Technologies */}
                    <div style={{ 
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {exp.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
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
                  
                  {/* Arrow Indicator */}
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'var(--color-background)',
                    border: '1px solid var(--border-light)'
                  }}>
                    <ArrowRight size={16} />
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

export default Experience;