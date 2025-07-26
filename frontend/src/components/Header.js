import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      backgroundColor: 'var(--color-background)', 
      borderBottom: '1px solid var(--border-light)',
      zIndex: 1000,
      padding: '16px 0'
    }}>
      <div className="container">
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="header-logo">
            AJ.DEV
          </div>
          
          {/* Desktop Navigation */}
          <div style={{ display: 'none' }} className="desktop-nav">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                className="nav-link"
                style={{ marginLeft: '24px' }}
              >
                {item.name}
              </a>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="btn-ghost md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ padding: '8px' }}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div style={{ 
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-white)',
            border: '1px solid var(--border-light)',
            borderTop: 'none',
            padding: '24px'
          }}>
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                className="nav-link"
                style={{ 
                  display: 'block', 
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border-light)',
                  marginBottom: '8px'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
      
      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;