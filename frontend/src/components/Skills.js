import React from 'react';
import { Code, Database, Wrench, Layers, Smartphone } from 'lucide-react';
import { mockData } from '../mock';

const Skills = () => {
  const { skills } = mockData;

  const skillCategories = [
    { 
      name: 'Programming Languages', 
      key: 'programming',
      icon: <Code size={24} />,
      description: 'Core programming languages I work with'
    },
    { 
      name: 'Frontend Technologies', 
      key: 'frontend',
      icon: <Layers size={24} />,
      description: 'UI/UX frameworks and libraries'
    },
    { 
      name: 'Backend Technologies', 
      key: 'backend',
      icon: <Database size={24} />,
      description: 'Server-side technologies and frameworks'
    },
    { 
      name: 'Databases', 
      key: 'databases',
      icon: <Database size={24} />,
      description: 'Database management systems'
    },
    { 
      name: 'Tools & Platforms', 
      key: 'tools',
      icon: <Wrench size={24} />,
      description: 'Development tools and cloud platforms'
    },
    { 
      name: 'Frameworks & Libraries', 
      key: 'frameworks',
      icon: <Smartphone size={24} />,
      description: 'Additional frameworks and libraries'
    }
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr',
          gap: 'calc(var(--grid-unit) * 2)'
        }}>
          {/* Section Header */}
          <div>
            <div className="label" style={{ marginBottom: '16px' }}>
              05. TECHNICAL SKILLS
            </div>
            <h2 className="title-big" style={{ marginBottom: '32px' }}>
              TECH<br/>STACK
            </h2>
          </div>
          
          {/* Skills Grid */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 'calc(var(--grid-unit) * 1)'
          }}>
            {skillCategories.map((category, index) => (
              <div key={category.key} className="card">
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
                    {category.icon}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '8px'
                    }}>
                      <span className="label-small" style={{ 
                        color: 'var(--accent-primary)',
                        backgroundColor: 'rgba(56, 255, 98, 0.1)',
                        padding: '4px 8px'
                      }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    
                    <h3 className="card-title" style={{ 
                      marginBottom: '8px',
                      fontSize: '16px'
                    }}>
                      {category.name}
                    </h3>
                    
                    <p className="text-body" style={{ 
                      marginBottom: '16px',
                      color: 'var(--text-secondary)',
                      fontSize: '14px'
                    }}>
                      {category.description}
                    </p>
                  </div>
                </div>
                
                {/* Skills Tags */}
                <div style={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {skills[category.key] && skills[category.key].map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="label-small hover-scale"
                      style={{ 
                        padding: '6px 12px',
                        backgroundColor: 'var(--color-background)',
                        border: '1px solid var(--border-light)',
                        cursor: 'default',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Summary Stats */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginTop: '48px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div className="text-big" style={{ color: 'var(--accent-primary)' }}>
                {skills.programming.length}+
              </div>
              <div className="label-small">PROGRAMMING LANGUAGES</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="text-big" style={{ color: 'var(--accent-primary)' }}>
                {skills.frontend.length}+
              </div>
              <div className="label-small">FRONTEND TECHNOLOGIES</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="text-big" style={{ color: 'var(--accent-primary)' }}>
                {skills.backend.length}+
              </div>
              <div className="label-small">BACKEND TECHNOLOGIES</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="text-big" style={{ color: 'var(--accent-primary)' }}>
                {skills.databases.length}+
              </div>
              <div className="label-small">DATABASE SYSTEMS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;