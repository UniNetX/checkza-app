// Drastically improved UI version of the Navbar
// Includes: modern UI, animations, accessibility improvements, minimal style coupling
// Assumes Tailwind CSS is available

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import SettingsModal from './SettingsModal';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('.cz-mobile-menu') && !target.closest('.cz-mobile-menu-btn')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  ];

  const dropdownItems = [
    { path: '/how-to-play', label: 'How to Play', icon: '🎓' },
    { path: '/openings', label: 'Openings', icon: '📖' },
    { path: '/endgames', label: 'Endgames', icon: '🏁' },
    { path: '/puzzles', label: 'Puzzles', icon: '🧩' },
    { path: '/resources', label: 'Resources', icon: '📚' },
    { path: '/analysis', label: 'Analysis', icon: '🔍' },
  ];

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const mobileStats = [
    { number: '30+', label: 'Openings' },
    { number: '50+', label: 'Endgames' },
    { number: '100+', label: 'Resources' },
    { number: '24/7', label: 'Available' }
  ];

  return (
    <>
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <nav className={`cz-navbar ${isScrolled ? 'cz-navbar-scrolled' : ''}`}>
        <div className="cz-navbar-container">
          {/* Logo */}
          <Link to="/" className="cz-navbar-logo" onClick={closeMenu}>
            <span className="cz-logo-icon">♟️</span>
            <span className="cz-logo-text">Checkza</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="cz-navbar-nav">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`cz-nav-link ${isActive(item.path) ? 'cz-nav-link-active' : ''}`}
                onClick={closeMenu}
              >
                <span className="cz-nav-icon">{item.icon}</span>
                <span className="cz-nav-label">{item.label}</span>
              </Link>
            ))}
            
            {/* Learn Dropdown */}
            <div className="dropdown">
              <button 
                className="dropdown-toggle"
                onClick={toggleDropdown}
                onMouseEnter={() => setIsDropdownOpen(true)}
              >
                <span className="cz-nav-icon">📚</span>
                <span className="cz-nav-label">Lessons</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              <div 
                className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                {dropdownItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="dropdown-item"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    <span className="dropdown-icon">{item.icon}</span>
                    <span className="dropdown-label">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="cz-navbar-right">
            <ThemeToggle />
            <Link to="/signin" className="cz-navbar-auth-btn">Sign In / Sign Up</Link>
            
            {/* Mobile Menu Button */}
            <button
              className={`cz-mobile-menu-btn ${isMenuOpen ? 'cz-mobile-menu-btn-active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="cz-hamburger-line"></span>
              <span className="cz-hamburger-line"></span>
              <span className="cz-hamburger-line"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`cz-mobile-menu ${isMenuOpen ? 'cz-mobile-menu-open' : ''}`}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="cz-mobile-menu-content">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`cz-mobile-nav-link ${isActive(item.path) ? 'cz-mobile-nav-link-active' : ''}`}
              onClick={closeMenu}
            >
              <span className="cz-mobile-nav-icon">{item.icon}</span>
              <span className="cz-mobile-nav-label">{item.label}</span>
            </Link>
          ))}
          
          {/* Mobile Dropdown */}
          <div className="mobile-dropdown">
            <button 
              className="mobile-dropdown-toggle"
              onClick={toggleDropdown}
            >
              <span className="cz-mobile-nav-icon">📚</span>
              <span className="cz-mobile-nav-label">Lessons</span>
              <span className={`dropdown-arrow ${isDropdownOpen ? 'rotate' : ''}`}>▼</span>
            </button>
            <div className={`mobile-dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
              {dropdownItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="mobile-dropdown-item"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsMenuOpen(false);
                  }}
                >
                  <span className="dropdown-icon">{item.icon}</span>
                  <span className="dropdown-label">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <Link to="/signin" className="cz-navbar-auth-btn cz-navbar-auth-btn-mobile">Sign In / Sign Up</Link>
          
          {/* Mobile Stats */}
          <div className="cz-mobile-stats">
            {mobileStats.map((stat, index) => (
              <div key={index} className="cz-mobile-stat-item">
                <div className="cz-mobile-stat-number">{stat.number}</div>
                <div className="cz-mobile-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SettingsModal 
        isOpen={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
      />
    </>
  );
};

export default Navbar;
