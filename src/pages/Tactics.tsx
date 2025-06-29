import React from 'react';
import { Link } from 'react-router-dom';
import './Tactics.css';

const Tactics: React.FC = () => {
  const tacticalPatterns = [
    {
      name: 'Fork',
      description: 'Attack two pieces at once, forcing your opponent to choose which one to save.',
      example: 'Nc7+',
      difficulty: 'Beginner',
      icon: '🎯'
    },
    {
      name: 'Pin',
      description: 'Attack a piece that cannot move because it would expose a more valuable piece behind it.',
      example: 'Bd3',
      difficulty: 'Intermediate',
      icon: '📌'
    },
    {
      name: 'Skewer',
      description: 'Attack a piece, forcing it to move and exposing a more valuable piece behind it.',
      example: 'Re1',
      difficulty: 'Advanced',
      icon: '🔍'
    },
    {
      name: 'Discovered Attack',
      description: 'Move one piece to reveal an attack by another piece.',
      example: 'Nxe5',
      difficulty: 'Intermediate',
      icon: '⚡'
    },
    {
      name: 'Double Check',
      description: 'Check the king with two pieces simultaneously.',
      example: 'Nf6+',
      difficulty: 'Advanced',
      icon: '⚔️'
    },
    {
      name: 'Back Rank Mate',
      description: 'Checkmate on the back rank using a rook or queen.',
      example: 'Rd8#',
      difficulty: 'Beginner',
      icon: '🏁'
    }
  ];

  const trainingModes = [
    {
      title: 'Daily Challenge',
      description: 'Solve today\'s featured puzzle and test your skills!',
      icon: '📅',
      difficulty: 'Mixed',
      timeLimit: 'Unlimited'
    },
    {
      title: 'Speed Training',
      description: 'Solve puzzles against the clock to improve speed.',
      icon: '⏱️',
      difficulty: 'Mixed',
      timeLimit: '1-5 minutes'
    },
    {
      title: 'Pattern Recognition',
      description: 'Focus on specific tactical patterns and themes.',
      icon: '🧠',
      difficulty: 'Themed',
      timeLimit: 'Unlimited'
    }
  ];

  return (
    <div className="tactics-page">
      <div className="tactics-container">
        {/* Header */}
        <header className="tactics-header">
          <h1>Tactics Training</h1>
          <p>Master tactical patterns and improve calculation skills with interactive puzzles and training exercises.</p>
        </header>

        {/* Training Modes */}
        <section className="training-modes-section">
          <h2>Training Modes</h2>
          <div className="training-modes-grid">
            {trainingModes.map((mode, index) => (
              <div key={index} className="training-mode-card">
                <div className="mode-icon">{mode.icon}</div>
                <h3>{mode.title}</h3>
                <p>{mode.description}</p>
                <div className="mode-details">
                  <span className="difficulty">Difficulty: {mode.difficulty}</span>
                  <span className="time-limit">Time: {mode.timeLimit}</span>
                </div>
                <button className="start-training-btn">Start Training</button>
              </div>
            ))}
          </div>
        </section>

        {/* Tactical Patterns */}
        <section className="patterns-section">
          <h2>Tactical Patterns</h2>
          <div className="patterns-grid">
            {tacticalPatterns.map((pattern, index) => (
              <div key={index} className="pattern-card">
                <div className="pattern-header">
                  <div className="pattern-icon">{pattern.icon}</div>
                  <div className="pattern-info">
                    <h3>{pattern.name}</h3>
                    <span className="difficulty-badge">{pattern.difficulty}</span>
                  </div>
                </div>
                <p className="pattern-description">{pattern.description}</p>
                <div className="pattern-example">
                  <strong>Example:</strong> {pattern.example}
                </div>
                <button className="practice-pattern-btn">Practice</button>
              </div>
            ))}
        </div>
        </section>

        {/* Learning Resources */}
        <section className="resources-section">
          <h2>Learning Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <h3>📚 Tactics Guide</h3>
              <p>Comprehensive guide to tactical patterns and combinations.</p>
              <Link to="/resources" className="resource-link">Read Guide</Link>
            </div>
            <div className="resource-card">
              <h3>🎯 Pattern Recognition</h3>
              <p>Learn to recognize tactical patterns quickly and accurately.</p>
              <Link to="/resources" className="resource-link">Learn Patterns</Link>
            </div>
            <div className="resource-card">
              <h3>📊 Performance Analysis</h3>
              <p>Detailed insights and statistics for game improvement.</p>
              <Link to="/analysis" className="resource-link">Analyze Games</Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Master Tactics?</h2>
            <p>Start your tactical training journey today and become a stronger chess player.</p>
            <div className="cta-buttons">
              <button className="cta-btn primary">Start Training</button>
              <Link to="/resources" className="cta-btn secondary">Learn More</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tactics; 