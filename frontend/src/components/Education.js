import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { mockData } from '../mock';

const Education = () => {
  const { education } = mockData;

  return (
    <section id="education" className="section">
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr',
          gap: 'calc(var(--grid-unit) * 2)'
        }}>
          {/* Section Header */}
          <div>
            <div className="label" style={{ marginBottom: '16px' }}>
              04. EDUCATION
            </div>
            <h2 className="title-big" style={{ marginBottom: '32px' }}>
              ACADEMIC<br/>BACKGROUND
            </h2>
          </div>
          
          {/* Education Cards */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: 'calc(var(--grid-unit) * 1)'
          }}>
            {education.map((edu, index) => (
              <div key={edu.id} className="card">
                <div style={{ 
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--accent-foreground)'
                  }}>
                    <GraduationCap size={24} />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '8px',
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
                        <span className="label-small">{edu.duration}</span>
                      </div>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <MapPin size={14} />
                        <span className="label-small">{edu.location}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-regular" style={{ 
                      marginBottom: '4px',
                      fontWeight: '600'
                    }}>
                      {edu.degree}
                    </h3>
                    
                    <div className="text-body" style={{ 
                      marginBottom: '8px',
                      color: 'var(--accent-primary)'
                    }}>
                      {edu.institution}
                    </div>
                    
                    {/* Grade/Score */}
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      marginBottom: '16px'
                    }}>
                      {edu.cgpa && (
                        <div>
                          <span className="label-small">CGPA: </span>
                          <span className="text-body" style={{ color: 'var(--accent-primary)' }}>
                            {edu.cgpa}
                          </span>
                        </div>
                      )}
                      {edu.percentage && (
                        <div>
                          <span className="label-small">PERCENTAGE: </span>
                          <span className="text-body" style={{ color: 'var(--accent-primary)' }}>
                            {edu.percentage}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-body" style={{ 
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6'
                    }}>
                      {edu.description}
                    </p>
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

export default Education;