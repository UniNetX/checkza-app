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
        <div className="cz-footer-content cz-footer-modern">
          {/* Brand & Social */}
          <div className="cz-footer-brand cz-footer-modern-brand">
            <div className="cz-footer-logo">
              <span className="cz-logo-icon">♟️</span>
              <span className="cz-logo-text">Checkza</span>
            </div>
            <p className="cz-footer-tagline cz-footer-modern-tagline">
              Master chess with structured lessons, real puzzles, and progress tracking. Join thousands leveling up their game with Checkza.
            </p>
            <div className="cz-footer-social cz-footer-modern-social">
              <a href="#" className="cz-social-link" aria-label="Twitter" title="Twitter">🐦</a>
              <a href="#" className="cz-social-link" aria-label="Discord" title="Discord">💬</a>
              <a href="#" className="cz-social-link" aria-label="GitHub" title="GitHub">💻</a>
            </div>
          </div>

          {/* Links */}
          <div className="cz-footer-modern-links">
            <div className="cz-footer-links-group">
              <h3 className="cz-footer-section-title">Quick Links</h3>
              <ul className="cz-footer-links-list">
                <li><Link to="/" className="cz-footer-link"><span className="cz-link-icon">🏠</span>Home</Link></li>
                <li><Link to="/openings" className="cz-footer-link"><span className="cz-link-icon">📖</span>Openings</Link></li>
                <li><Link to="/endgames" className="cz-footer-link"><span className="cz-link-icon">🏁</span>Endgames</Link></li>
                <li><Link to="/resources" className="cz-footer-link"><span className="cz-link-icon">📚</span>Resources</Link></li>
                <li><Link to="/analysis" className="cz-footer-link"><span className="cz-link-icon">🔍</span>Analysis</Link></li>
                <li><Link to="/how-to-play" className="cz-footer-link"><span className="cz-link-icon">🎓</span>How to Play</Link></li>
              </ul>
            </div>
            <div className="cz-footer-links-group">
              <h3 className="cz-footer-section-title">Legal</h3>
              <ul className="cz-footer-links-list">
                <li><Link to="/privacy" className="cz-footer-link">Privacy Policy</Link></li>
                <li><Link to="/terms" className="cz-footer-link">Terms of Service</Link></li>
                <li><Link to="/cookies" className="cz-footer-link">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="cz-footer-bottom cz-footer-modern-bottom">
          <div className="cz-footer-bottom-content cz-footer-modern-bottom-content">
            <span className="cz-copyright">© {currentYear} Checkza</span>
            <span className="cz-footer-bottom-sep">·</span>
            <span className="cz-footer-built">Built with ♟️ for chess lovers everywhere</span>
          </div>
        </div>
      </div>

      {/* Back to Top Button - Modern, Subtle */}
      <button 
        className={`cz-back-to-top cz-footer-modern-backtotop ${showBackToTop ? 'visible' : ''}`}
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