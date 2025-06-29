import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './dashboard.css';

const Dashboard: React.FC = () => {
  const { elementRef: statsRef } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  const features = [
    {
      icon: '📖',
      title: 'Openings',
      description: 'Master chess openings with comprehensive guides and analysis.',
      path: '/openings'
    },
    {
      icon: '🏁',
      title: 'Endgames',
      description: 'Perfect your endgame technique with specialized training.',
      path: '/endgames'
    },
    {
      icon: '🔍',
      title: 'Analysis',
      description: 'Analyze your games with advanced tools and insights.',
      path: '/analysis'
    },
    {
      icon: '📚',
      title: 'Resources',
      description: 'Access comprehensive chess learning materials and references.',
      path: '/resources'
    },
    {
      icon: '🎓',
      title: 'How to Play',
      description: 'Learn chess fundamentals and improve your game.',
      path: '/how-to-play'
    }
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome to Checkza</h1>
        <p>Master chess with comprehensive training and analysis tools</p>
      </header>

      <main className="dashboard-main">
        {/* Features Grid */}
        <section className="features-section">
          <h2 className="section-title animate-fade-in-up">Learning Areas</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <Link
                key={feature.path}
                to={feature.path}
                className="feature-card animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-arrow">→</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Start */}
        <section className="quick-start-section">
          <h2 className="section-title animate-fade-in-up">Quick Start</h2>
          <div className="quick-start-grid">
            <div className="quick-start-card animate-fade-in-up">
              <h3>📖 Learn Openings</h3>
              <p>Start with fundamental openings and build your repertoire</p>
              <Link to="/openings" className="quick-start-btn">Explore Openings</Link>
            </div>
            <div className="quick-start-card animate-fade-in-up">
              <h3>🏁 Practice Endgames</h3>
              <p>Master essential endgame techniques and strategies</p>
              <Link to="/endgames" className="quick-start-btn">Study Endgames</Link>
            </div>
            <div className="quick-start-card animate-fade-in-up">
              <h3>🔍 Analyze Games</h3>
              <p>Use advanced tools to analyze and improve your games</p>
              <Link to="/analysis" className="quick-start-btn">Start Analysis</Link>
            </div>
          </div>
        </section>

        {/* Platform Stats */}
        <section className="stats-section" ref={statsRef}>
          <h2 className="section-title animate-fade-in-up">Platform Overview</h2>
          <div className="stats-grid">
            <div className="stat-card animate-fade-in-up">
              <div className="stat-icon">📖</div>
              <div className="stat-value animate-count">30+</div>
              <div className="stat-label">Openings</div>
            </div>
            <div className="stat-card animate-fade-in-up">
              <div className="stat-icon">🏁</div>
              <div className="stat-value animate-count">50+</div>
              <div className="stat-label">Endgames</div>
            </div>
            <div className="stat-card animate-fade-in-up">
              <div className="stat-icon">📚</div>
              <div className="stat-value animate-count">100+</div>
              <div className="stat-label">Resources</div>
            </div>
            <div className="stat-card animate-fade-in-up">
              <div className="stat-icon">🎯</div>
              <div className="stat-value animate-count">24/7</div>
              <div className="stat-label">Available</div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content animate-fade-in-up">
            <h2>Ready to Improve Your Chess?</h2>
            <p>Start your chess learning journey today with our comprehensive training platform.</p>
            <div className="cta-buttons">
              <Link to="/openings" className="cta-btn primary">Start Learning</Link>
              <Link to="/how-to-play" className="cta-btn secondary">Learn Basics</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard; 