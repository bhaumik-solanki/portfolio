import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { mockData } from '../mock';

const About = () => {
  const { personal } = mockData;

  return (
    <section id="about" className="section">
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr',
          gap: 'calc(var(--grid-unit) * 2)'
        }}>
          {/* Section Header */}
          <div>
            <div className="label" style={{ marginBottom: '16px' }}>
              01. ABOUT ME
            </div>
            <h2 className="title-big" style={{ marginBottom: '32px' }}>
              GETTING TO<br/>KNOW ME
            </h2>
          </div>
          
          {/* Content Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'calc(var(--grid-unit) * 1)',
            marginBottom: '48px'
          }}>
            {/* Bio Card */}
            <div className="card">
              <div className="card-title">BACKGROUND</div>
              <div className="card-content">
                <p style={{ marginBottom: '16px' }}>
                  {personal.bio}
                </p>
                <p>
                  Currently pursuing my final year in Computer Science Engineering, 
                  I'm passionate about creating innovative solutions that bridge the gap 
                  between technology and real-world problems.
                </p>
              </div>
            </div>
            
            {/* Contact Info Card */}
            <div className="card">
              <div className="card-title">CONTACT INFO</div>
              <div className="card-content">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Mail size={16} />
                    <span>{personal.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Phone size={16} />
                    <span>{personal.phone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <MapPin size={16} />
                    <span>{personal.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats/Quick Facts */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div className="text-big" style={{ color: 'var(--accent-primary)' }}>
                15+
              </div>
              <div className="label-small">PROJECTS COMPLETED</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="text-big" style={{ color: 'var(--accent-primary)' }}>
                3+
              </div>
              <div className="label-small">INTERNSHIPS</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="text-big" style={{ color: 'var(--accent-primary)' }}>
                8.7
              </div>
              <div className="label-small">CGPA</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="text-big" style={{ color: 'var(--accent-primary)' }}>
                4+
              </div>
              <div className="label-small">CERTIFICATIONS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;