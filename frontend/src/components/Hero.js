import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Hero = ({ data }) => {
  if (!data) return null;

  return (
    <section id="hero" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      paddingTop: '80px'
    }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr',
          gap: 'calc(var(--grid-unit) * 2)',
          textAlign: 'left'
        }}>
          {/* Main Content */}
          <div>
            <div className="label" style={{ marginBottom: '16px' }}>
              PORTFOLIO 2025
            </div>
            
            <h1 className="hero-title" style={{ 
              marginBottom: '32px',
              lineHeight: '0.9'
            }}>
              {data.name.split(' ')[0]}<br/>
              {data.name.split(' ')[1]}
            </h1>
            
            <div className="text-big" style={{ 
              marginBottom: '32px',
              color: 'var(--text-secondary)'
            }}>
              {data.title}
            </div>
            
            <div className="text-body" style={{ 
              marginBottom: '48px',
              maxWidth: '600px'
            }}>
              {data.bio}
            </div>
            
            {/* CTA Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '16px',
              marginBottom: '48px',
              flexWrap: 'wrap'
            }}>
              <a href="#projects" className="btn-accent">
                VIEW PROJECTS
              </a>
              <a href="#contact" className="btn-primary">
                GET IN TOUCH
              </a>
            </div>
            
            {/* Social Links */}
            <div style={{ 
              display: 'flex', 
              gap: '24px',
              alignItems: 'center'
            }}>
              <div className="label-small" style={{ marginRight: '8px' }}>
                CONNECT:
              </div>
              <a 
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-opacity"
                style={{ color: 'var(--text-primary)' }}
              >
                <Github size={20} />
              </a>
              <a 
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-opacity"
                style={{ color: 'var(--text-primary)' }}
              >
                <Linkedin size={20} />
              </a>
              <a 
                href={`mailto:${data.email}`}
                className="hover-opacity"
                style={{ color: 'var(--text-primary)' }}
              >
                <Mail size={20} />
              </a>
              <a 
                href={data.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-opacity"
                style={{ color: 'var(--text-primary)' }}
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div style={{ 
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div className="label-small">SCROLL</div>
          <ArrowDown size={16} className="hover-opacity" />
        </div>
      </div>
    </section>
  );
};

export default Hero;