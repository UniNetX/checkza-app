import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './header.css';
import { Link, useLocation } from 'react-router-dom';
import LearnMenu from './LearnMenu';

const navLinks = [
  { to: '/practice', label: 'Practice' },
  { to: '/play', label: 'Play' },
  { to: '/resources', label: 'Resources' },
];

const Header: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [learnOpen, setLearnOpen] = useState(false);
  const learnRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (learnRef.current && !learnRef.current.contains(e.target as Node)) {
        setLearnOpen(false);
      }
    };
    if (learnOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [learnOpen]);

  return (
    <header className="cz-header cz-header-dark">
      <div className="cz-header-inner">
        <Link to="/" className="cz-logo cz-logo-link">
          <span role="img" aria-label="chess">♛</span> Checkza
        </Link>
        <nav className="cz-nav">
          <div className="cz-nav-learn" ref={learnRef}>
            <button
              className={`cz-nav-link${learnOpen ? ' active' : ''}`}
              onClick={() => setLearnOpen(v => !v)}
              aria-haspopup="true"
              aria-expanded={learnOpen}
            >
              Learn ▼
            </button>
            {learnOpen && (
              <div className="cz-nav-learn-dropdown">
                <LearnMenu onNavigate={() => setLearnOpen(false)} />
              </div>
            )}
          </div>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname.startsWith(link.to) ? 'active cz-nav-link' : 'cz-nav-link'}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="cz-header-actions">
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 