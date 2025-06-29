import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LearnMenu.css';

const MAIN_ITEMS = [
  { to: '/lessons/how-to-play', label: 'How to Play', icon: '🎓' },
  { to: '/lessons/strategy', label: 'Learn Basic Strategy', icon: '♞' },
  { to: '/coach', label: 'Play Coach', icon: '🧑‍🏫' },
  { to: '/lessons', label: 'Lesson Library', icon: '🧩' },
  { to: '/analysis', label: 'Analysis', icon: '🔍' },
  { to: '/endgames', label: 'Endgames', icon: '♙' },
  { to: '/practice', label: 'Practice', icon: '🎯' },
];

const MORE_ITEMS = [
  { to: '/insights', label: 'Insights', icon: '💡' },
  { to: '/classroom', label: 'Classroom', icon: '🏫' },
];

const LearnMenu: React.FC<{ onNavigate?: () => void }> = ({ onNavigate }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <nav className="learn-menu">
      <div className="learn-menu-header">
        <span className="learn-menu-header-icon">🎓</span>
        <span className="learn-menu-header-title">Learn</span>
      </div>
      <div className="learn-menu-list">
        {MAIN_ITEMS.map(item => (
          <Link key={item.to} to={item.to} className="learn-menu-item" onClick={onNavigate}>
            <span className="learn-menu-item-icon">{item.icon}</span>
            <span className="learn-menu-item-label">{item.label}</span>
          </Link>
        ))}
        <button className="learn-menu-more-btn" onClick={() => setShowMore(m => !m)}>
          {showMore ? 'Less ▲' : 'More ▼'}
        </button>
        {showMore && (
          <div className="learn-menu-more-list">
            {MORE_ITEMS.map(item => (
              <Link key={item.to} to={item.to} className="learn-menu-item" onClick={onNavigate}>
                <span className="learn-menu-item-icon">{item.icon}</span>
                <span className="learn-menu-item-label">{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default LearnMenu; 