import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './modern-howtoplay.css';

const HowToPlay: React.FC = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const modules = [
    {
      id: 1,
      title: 'Chess Basics',
      icon: '♟️',
      description: 'Learn the fundamentals of chess',
      topics: ['Piece Movement', 'Board Setup', 'Game Rules']
    },
    {
      id: 2,
      title: 'Opening Principles',
      icon: '📖',
      description: 'Master opening fundamentals',
      topics: ['Center Control', 'Piece Development', 'King Safety']
    },
    {
      id: 3,
      title: 'Tactical Patterns',
      icon: '🎯',
      description: 'Recognize tactical opportunities',
      topics: ['Forks', 'Pins', 'Skewers', 'Discovered Attacks']
    },
    {
      id: 4,
      title: 'Endgame Basics',
      icon: '🏁',
      description: 'Essential endgame techniques',
      topics: ['King and Pawn', 'Rook Endgames', 'Basic Checkmates']
    },
    {
      id: 5,
      title: 'Strategy',
      icon: '🧠',
      description: 'Strategic thinking in chess',
      topics: ['Pawn Structure', 'Piece Coordination', 'Space Advantage']
    },
    {
      id: 6,
      title: 'Game Analysis',
      icon: '🔍',
      description: 'Learn to analyze positions',
      topics: ['Position Evaluation', 'Planning', 'Calculation']
    }
  ];

  const pieces = [
    {
      symbol: '♔',
      name: 'King',
      description: 'Moves one square in any direction',
      color: '#fbbf24',
      power: 'Most Important'
    },
    {
      symbol: '♕',
      name: 'Queen',
      description: 'Moves any number of squares in any direction',
      color: '#ec4899',
      power: 'Most Powerful'
    },
    {
      symbol: '♖',
      name: 'Rook',
      description: 'Moves any number of squares horizontally or vertically',
      color: '#ef4444',
      power: 'Strong'
    },
    {
      symbol: '♗',
      name: 'Bishop',
      description: 'Moves any number of squares diagonally',
      color: '#3b82f6',
      power: 'Strong'
    },
    {
      symbol: '♘',
      name: 'Knight',
      description: 'Moves in L-shape: 2 squares in one direction, then 1 square perpendicular',
      color: '#8b5cf6',
      power: 'Medium'
    },
    {
      symbol: '♙',
      name: 'Pawn',
      description: 'Moves forward one square, captures diagonally',
      color: '#10b981',
      power: 'Basic'
    }
  ];

  const boardSetup = [
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜']
  ];

  const openModal = (content: string) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="cz-howtoplay">
      {/* Header */}
      <header className="cz-header">
        <div className="cz-header-content">
          <h1>How to Play Chess</h1>
          <p>Master the fundamentals and advanced concepts of chess</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="cz-main">
        {/* Learning Modules */}
        <section className="cz-modules-section">
          <h2>Learning Modules</h2>
          <div className="cz-modules-grid">
            {modules.map((module, index) => (
              <div
                key={module.id}
                className={`cz-module-card ${activeModule === index ? 'active' : ''}`}
                onClick={() => setActiveModule(index)}
              >
                <div className="cz-module-icon">{module.icon}</div>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
                <div className="cz-module-topics">
                  {module.topics.map((topic, topicIndex) => (
                    <span key={topicIndex} className="cz-topic-tag">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Active Module Content */}
        <section className="cz-content-section">
          {activeModule === 0 && (
            <div className="cz-lesson-content">
              <div className="cz-lesson-header">
                <h2>Chess Basics</h2>
                <p>Learn the fundamental rules and piece movements</p>
              </div>
              
              <div className="cz-lesson-grid">
                {/* Piece Movement Section */}
                <div className="cz-lesson-card enhanced">
                  <div className="cz-card-header">
                    <h3>Piece Movement</h3>
                    <div className="cz-card-badge">Essential</div>
                  </div>
                  
                  <div className="cz-pieces-grid">
                    {pieces.map((piece, index) => (
                      <div key={index} className="cz-piece-card" style={{ '--piece-color': piece.color } as React.CSSProperties}>
                        <div className="cz-piece-header">
                          <div className="cz-piece-symbol">{piece.symbol}</div>
                          <div className="cz-piece-info">
                            <h4>{piece.name}</h4>
                            <span className="cz-piece-power">{piece.power}</span>
                          </div>
                        </div>
                        <p className="cz-piece-description">{piece.description}</p>
                        <div className="cz-piece-highlight"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Board Setup Section */}
                <div className="cz-lesson-card enhanced">
                  <div className="cz-card-header">
                    <h3>Board Setup</h3>
                    <div className="cz-card-badge">Setup</div>
                  </div>
                  
                  <div className="cz-board-setup-container">
                    <div className="cz-board-visual">
                      <div className="cz-board-grid">
                        {boardSetup.map((row, rowIndex) => (
                          <div key={rowIndex} className="cz-board-row">
                            {row.map((piece, colIndex) => (
                              <div 
                                key={colIndex} 
                                className={`cz-square ${(rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark'}`}
                              >
                                {piece && <span className="cz-board-piece">{piece}</span>}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="cz-setup-tips">
                      <h4>Setup Tips</h4>
                      <div className="cz-tips-grid">
                        <div className="cz-tip-item">
                          <div className="cz-tip-icon">⚪</div>
                          <span>White pieces on the bottom rank</span>
                        </div>
                        <div className="cz-tip-item">
                          <div className="cz-tip-icon">⚫</div>
                          <span>Black pieces on the top rank</span>
                        </div>
                        <div className="cz-tip-item">
                          <div className="cz-tip-icon">👑</div>
                          <span>Queens on their own color</span>
                        </div>
                        <div className="cz-tip-item">
                          <div className="cz-tip-icon">👑</div>
                          <span>Kings next to queens</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="cz-practice-cta">
                <div className="cz-cta-content">
                  <h3>Ready to Practice?</h3>
                  <p>Apply what you've learned with interactive exercises and challenges.</p>
                  <div className="cz-cta-buttons">
                    <Link to="/openings" className="cz-cta-btn primary">
                      Study Openings
                    </Link>
                    <Link to="/endgames" className="cz-cta-btn secondary">
                      Practice Endgames
                    </Link>
                    <Link to="/analysis" className="cz-cta-btn secondary">
                      Analyze Games
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeModule === 1 && (
            <div className="cz-lesson-content">
              <h2>Opening Principles</h2>
              <div className="cz-principles-grid">
                <div className="cz-principle-card">
                  <div className="cz-principle-icon">🎯</div>
                  <h3>Center Control</h3>
                  <p>Control the center squares (e4, e5, d4, d5) to gain space and restrict your opponent's options.</p>
                </div>
                <div className="cz-principle-card">
                  <div className="cz-principle-icon">♟️</div>
                  <h3>Piece Development</h3>
                  <p>Develop your pieces quickly to active squares where they can influence the game.</p>
                </div>
                <div className="cz-principle-card">
                  <div className="cz-principle-icon">🏰</div>
                  <h3>King Safety</h3>
                  <p>Castle early to protect your king and connect your rooks for better coordination.</p>
                </div>
              </div>
            </div>
          )}

          {activeModule === 2 && (
            <div className="cz-lesson-content">
              <h2>Tactical Patterns</h2>
              <div className="cz-tactics-grid">
                <div className="cz-tactic-card">
                  <div className="cz-tactic-icon">🔱</div>
                  <h3>Forks</h3>
                  <p>Attack two or more pieces simultaneously with a single move.</p>
                </div>
                <div className="cz-tactic-card">
                  <div className="cz-tactic-icon">📌</div>
                  <h3>Pins</h3>
                  <p>Restrict a piece's movement by attacking it through a more valuable piece.</p>
                </div>
                <div className="cz-tactic-card">
                  <div className="cz-tactic-icon">⚡</div>
                  <h3>Skewers</h3>
                  <p>Attack a valuable piece through a less valuable one, forcing the valuable piece to move.</p>
                </div>
                <div className="cz-tactic-card">
                  <div className="cz-tactic-icon">🎭</div>
                  <h3>Discovered Attacks</h3>
                  <p>Move one piece to reveal an attack from another piece behind it.</p>
                </div>
              </div>
            </div>
          )}

          {activeModule === 3 && (
            <div className="cz-lesson-content">
              <h2>Endgame Basics</h2>
              <div className="cz-endgame-grid">
                <div className="cz-endgame-card">
                  <div className="cz-endgame-icon">♔♙</div>
                  <h3>King and Pawn</h3>
                  <p>Learn the basic techniques for promoting pawns and winning with king and pawn vs king.</p>
                </div>
                <div className="cz-endgame-card">
                  <div className="cz-endgame-icon">♖</div>
                  <h3>Rook Endgames</h3>
                  <p>Master the most common endgame type with rooks and pawns.</p>
                </div>
                <div className="cz-endgame-card">
                  <div className="cz-endgame-icon">♔♕</div>
                  <h3>Basic Checkmates</h3>
                  <p>Learn how to deliver checkmate with queen, rook, and two bishops.</p>
                </div>
              </div>
            </div>
          )}

          {activeModule === 4 && (
            <div className="cz-lesson-content">
              <h2>Strategy</h2>
              <div className="cz-strategy-grid">
                <div className="cz-strategy-card">
                  <div className="cz-strategy-icon">🏗️</div>
                  <h3>Pawn Structure</h3>
                  <p>Understand how pawn structure affects the position and plan accordingly.</p>
                </div>
                <div className="cz-strategy-card">
                  <div className="cz-strategy-icon">🤝</div>
                  <h3>Piece Coordination</h3>
                  <p>Coordinate your pieces to work together and create threats.</p>
                </div>
                <div className="cz-strategy-card">
                  <div className="cz-strategy-icon">📏</div>
                  <h3>Space Advantage</h3>
                  <p>Control more space to restrict your opponent's options and create opportunities.</p>
                </div>
              </div>
            </div>
          )}

          {activeModule === 5 && (
            <div className="cz-lesson-content">
              <h2>Game Analysis</h2>
              <div className="cz-analysis-grid">
                <div className="cz-analysis-card">
                  <div className="cz-analysis-icon">🔍</div>
                  <h3>Position Evaluation</h3>
                  <p>Learn to assess positions and identify advantages and disadvantages.</p>
                </div>
                <div className="cz-analysis-card">
                  <div className="cz-analysis-icon">📋</div>
                  <h3>Planning</h3>
                  <p>Create plans based on position evaluation and execute them effectively.</p>
                </div>
                <div className="cz-analysis-card">
                  <div className="cz-analysis-icon">🧮</div>
                  <h3>Calculation</h3>
                  <p>Calculate variations accurately to find the best moves in tactical positions.</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="cz-modal-overlay" onClick={closeModal}>
          <div className="cz-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cz-modal-close" onClick={closeModal}>×</button>
            <div className="cz-modal-content">
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HowToPlay; 