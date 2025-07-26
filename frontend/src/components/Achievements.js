import React from 'react';
import { Trophy, Award, Calendar, ExternalLink } from 'lucide-react';

const Achievements = ({ achievements, certifications }) => {
  if (!achievements || !certifications) return null;

  return (
    <section id="achievements" className="section">
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr',
          gap: 'calc(var(--grid-unit) * 2)'
        }}>
          {/* Section Header */}
          <div>
            <div className="label" style={{ marginBottom: '16px' }}>
              06. ACHIEVEMENTS & CERTIFICATIONS
            </div>
            <h2 className="title-big" style={{ marginBottom: '32px' }}>
              RECOGNITION<br/>& AWARDS
            </h2>
          </div>
          
          {/* Achievements Section */}
          <div style={{ marginBottom: '48px' }}>
            <h3 className="text-regular" style={{ 
              marginBottom: '24px',
              fontWeight: '600'
            }}>
              ACHIEVEMENTS
            </h3>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '24px'
            }}>
              {achievements.map((achievement, index) => (
                <div key={achievement.id} className="card">
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px'
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
                      <Trophy size={24} />
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
                          <span className="label-small">{achievement.date}</span>
                        </div>
                      </div>
                      
                      <h4 className="text-regular" style={{ 
                        marginBottom: '4px',
                        fontWeight: '600'
                      }}>
                        {achievement.title}
                      </h4>
                      
                      <div className="text-body" style={{ 
                        marginBottom: '8px',
                        color: 'var(--accent-primary)'
                      }}>
                        {achievement.organization}
                      </div>
                      
                      <p className="text-body" style={{ 
                        color: 'var(--text-secondary)',
                        fontSize: '14px',
                        lineHeight: '1.6'
                      }}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Certifications Section */}
          <div>
            <h3 className="text-regular" style={{ 
              marginBottom: '24px',
              fontWeight: '600'
            }}>
              CERTIFICATIONS
            </h3>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '24px'
            }}>
              {certifications.map((cert, index) => (
                <div key={cert.id} className="card">
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px'
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
                      <Award size={24} />
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
                          <span className="label-small">{cert.date}</span>
                        </div>
                        {cert.link && (
                          <a 
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover-opacity"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                      
                      <h4 className="text-regular" style={{ 
                        marginBottom: '4px',
                        fontWeight: '600'
                      }}>
                        {cert.name}
                      </h4>
                      
                      <div className="text-body" style={{ 
                        marginBottom: '8px',
                        color: 'var(--accent-primary)'
                      }}>
                        {cert.issuer}
                      </div>
                      
                      <div className="label-small" style={{ 
                        color: 'var(--text-secondary)'
                      }}>
                        ID: {cert.credentialId}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;