import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/openings', label: 'Openings', icon: '📖' },
    { path: '/endgames', label: 'Endgames', icon: '🏁' },
    { path: '/resources', label: 'Resources', icon: '📚' },
    { path: '/analysis', label: 'Analysis', icon: '🔍' },
    { path: '/how-to-play', label: 'How to Play', icon: '🎓' }
  ];

  const socialLinks = [
    { href: '#', label: 'Twitter', icon: '🐦' },
    { href: '#', label: 'Discord', icon: '💬' },
    { href: '#', label: 'GitHub', icon: '💻' }
  ];

  const stats = [
    { number: '30+', label: 'Openings' },
    { number: '50+', label: 'Endgames' },
    { number: '100+', label: 'Resources' },
    { number: '24/7', label: 'Available' }
  ];

  return (
    <footer className="cz-footer">
      <div className="cz-footer-container">
        {/* Main Footer Content */}
        <div className="cz-footer-content">
          {/* Brand Section */}
          <div className="cz-footer-brand">
            <div className="cz-footer-logo">
              <span className="cz-logo-icon">♟️</span>
              <span className="cz-logo-text">Checkza</span>
            </div>
            <p className="cz-footer-tagline">
              Master chess with comprehensive training and analysis tools. 
              Join thousands of players improving their game with our structured learning platform.
            </p>
            <div className="cz-footer-social">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="cz-social-link"
                  aria-label={link.label}
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="cz-footer-links">
            <h3 className="cz-footer-section-title">Quick Links</h3>
            <ul className="cz-footer-links-list">
              {footerLinks.slice(0, 3).map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="cz-footer-link"
                  >
                    <span className="cz-link-icon">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div className="cz-footer-links">
            <h3 className="cz-footer-section-title">More</h3>
            <ul className="cz-footer-links-list">
              {footerLinks.slice(3).map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="cz-footer-link"
                  >
                    <span className="cz-link-icon">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="cz-footer-bottom">
          <div className="cz-footer-bottom-content">
            <p className="cz-copyright">
              © {currentYear} Checkza. All rights reserved.
            </p>
            <div className="cz-footer-bottom-links">
              <Link to="/privacy" className="cz-footer-bottom-link">
                Privacy Policy
              </Link>
              <Link to="/terms" className="cz-footer-bottom-link">
                Terms of Service
              </Link>
              <Link to="/cookies" className="cz-footer-bottom-link">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        className={`cz-back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <span className="cz-back-to-top-icon">↑</span>
      </button>
    </footer>
  );
};

export default Footer; 