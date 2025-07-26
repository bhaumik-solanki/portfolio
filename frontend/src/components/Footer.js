import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, Heart, Coffee } from 'lucide-react';

const Footer = ({ data }) => {
  if (!data) return null;

  return (
    <footer style={{ 
      backgroundColor: 'var(--bg-white)',
      borderTop: '1px solid var(--border-light)',
      padding: 'calc(var(--grid-unit) * 2) 0'
    }}>
      <div className="container">
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '48px',
          marginBottom: '48px'
        }}>
          {/* Brand Section */}
          <div>
            <div className="header-logo" style={{ marginBottom: '16px' }}>
              {data.name.split(' ').map(word => word[0]).join('')}.DEV
            </div>
            <p className="text-body" style={{ 
              marginBottom: '24px',
              color: 'var(--text-secondary)',
              maxWidth: '300px'
            }}>
              {data.title} passionate about building innovative 
              solutions with modern technologies.
            </p>
            <div style={{ 
              display: 'flex',
              gap: '16px'
            }}>
              <a 
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-opacity"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)'
                }}
              >
                <Github size={20} />
              </a>
              <a 
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-opacity"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)'
                }}
              >
                <Linkedin size={20} />
              </a>
              <a 
                href={`mailto:${data.email}`}
                className="hover-opacity"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)'
                }}
              >
                <Mail size={20} />
              </a>
              <a 
                href={data.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-opacity"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)'
                }}
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <div className="card-title" style={{ marginBottom: '16px' }}>
              QUICK LINKS
            </div>
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <a href="#about" className="nav-link">About</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#experience" className="nav-link">Experience</a>
              <a href="#education" className="nav-link">Education</a>
              <a href="#skills" className="nav-link">Skills</a>
              <a href="#achievements" className="nav-link">Achievements</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <div className="card-title" style={{ marginBottom: '16px' }}>
              GET IN TOUCH
            </div>
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div className="text-body" style={{ fontSize: '14px' }}>
                {data.email}
              </div>
              <div className="text-body" style={{ fontSize: '14px' }}>
                {data.phone}
              </div>
              <div className="text-body" style={{ 
                fontSize: '14px',
                color: 'var(--text-secondary)'
              }}>
                {data.location}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-light)',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span className="text-body" style={{ 
              fontSize: '14px',
              color: 'var(--text-secondary)'
            }}>
              © 2025 {data.name}. Made with
            </span>
            <Heart size={16} style={{ color: 'var(--accent-primary)' }} />
            <span className="text-body" style={{ 
              fontSize: '14px',
              color: 'var(--text-secondary)'
            }}>
              and
            </span>
            <Coffee size={16} style={{ color: 'var(--accent-primary)' }} />
          </div>
          
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '24px'
          }}>
            <a href="#hero" className="nav-link" style={{ fontSize: '12px' }}>
              Back to Top
            </a>
            <span className="label-small" style={{ 
              color: 'var(--text-secondary)'
            }}>
              PORTFOLIO v2.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;