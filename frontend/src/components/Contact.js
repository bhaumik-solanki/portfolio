import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Send, User, MessageSquare } from 'lucide-react';
import { mockData } from '../mock';

const Contact = () => {
  const { personal } = mockData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr',
          gap: 'calc(var(--grid-unit) * 2)'
        }}>
          {/* Section Header */}
          <div>
            <div className="label" style={{ marginBottom: '16px' }}>
              07. GET IN TOUCH
            </div>
            <h2 className="title-big" style={{ marginBottom: '32px' }}>
              LET'S<br/>CONNECT
            </h2>
          </div>
          
          {/* Contact Content */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: 'calc(var(--grid-unit) * 1)'
          }}>
            {/* Contact Info */}
            <div className="card">
              <div className="card-title" style={{ marginBottom: '24px' }}>
                CONTACT INFORMATION
              </div>
              
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                marginBottom: '32px'
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--accent-foreground)'
                  }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="label-small" style={{ marginBottom: '4px' }}>
                      EMAIL
                    </div>
                    <div className="text-body">
                      {personal.email}
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--accent-foreground)'
                  }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="label-small" style={{ marginBottom: '4px' }}>
                      PHONE
                    </div>
                    <div className="text-body">
                      {personal.phone}
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--accent-foreground)'
                  }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="label-small" style={{ marginBottom: '4px' }}>
                      LOCATION
                    </div>
                    <div className="text-body">
                      {personal.location}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div>
                <div className="label-small" style={{ marginBottom: '16px' }}>
                  SOCIAL MEDIA
                </div>
                <div style={{ 
                  display: 'flex',
                  gap: '16px'
                }}>
                  <a 
                    href={personal.github}
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
                    href={personal.linkedin}
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
                    href={personal.portfolio}
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
            </div>
            
            {/* Contact Form */}
            <div className="card">
              <div className="card-title" style={{ marginBottom: '24px' }}>
                SEND A MESSAGE
              </div>
              
              <form onSubmit={handleSubmit}>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <User size={16} />
                      <label className="label-small" htmlFor="name">
                        NAME
                      </label>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid var(--border-light)',
                        borderRadius: '0',
                        backgroundColor: 'var(--color-background)',
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>
                  
                  <div>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <Mail size={16} />
                      <label className="label-small" htmlFor="email">
                        EMAIL
                      </label>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid var(--border-light)',
                        borderRadius: '0',
                        backgroundColor: 'var(--color-background)',
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <MessageSquare size={16} />
                    <label className="label-small" htmlFor="subject">
                      SUBJECT
                    </label>
                  </div>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid var(--border-light)',
                      borderRadius: '0',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <MessageSquare size={16} />
                    <label className="label-small" htmlFor="message">
                      MESSAGE
                    </label>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid var(--border-light)',
                      borderRadius: '0',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                  />
                </div>
                
                <button 
                  type="submit"
                  className="btn-accent"
                  style={{ 
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Send size={16} />
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;