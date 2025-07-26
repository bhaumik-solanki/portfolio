import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Send, User, MessageSquare } from 'lucide-react';
import { contactAPI, apiUtils } from '../services/api';

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    try {
      await contactAPI.sendMessage(formData);
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! I will get back to you soon.'
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      const errorInfo = apiUtils.handleError(error);
      setSubmitStatus({
        type: 'error',
        message: errorInfo.message
      });
    } finally {
      setLoading(false);
    }
  };

  if (!data) return null;

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
                      {data.email}
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
                      {data.phone}
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
                      {data.location}
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
            </div>
            
            {/* Contact Form */}
            <div className="card">
              <div className="card-title" style={{ marginBottom: '24px' }}>
                SEND A MESSAGE
              </div>
              
              {/* Status Messages */}
              {submitStatus && (
                <div style={{
                  padding: '12px 16px',
                  marginBottom: '24px',
                  backgroundColor: submitStatus.type === 'success' ? 'rgba(56, 255, 98, 0.1)' : 'rgba(255, 56, 56, 0.1)',
                  border: `1px solid ${submitStatus.type === 'success' ? 'var(--accent-primary)' : 'var(--color-error)'}`,
                  borderRadius: '0'
                }}>
                  <div className="text-body" style={{
                    color: submitStatus.type === 'success' ? 'var(--accent-primary)' : 'var(--color-error)',
                    fontSize: '14px'
                  }}>
                    {submitStatus.message}
                  </div>
                </div>
              )}
              
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
                      disabled={loading}
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
                      disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
                  disabled={loading}
                  className="btn-accent"
                  style={{ 
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    opacity: loading ? 0.6 : 1
                  }}
                >
                  <Send size={16} />
                  {loading ? 'SENDING...' : 'SEND MESSAGE'}
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