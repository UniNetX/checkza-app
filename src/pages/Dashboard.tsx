import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Chessboard } from 'react-chessboard';
import { chessEngine } from '../services/chess/ChessEngine';
import { INITIAL_FEN, DIFFICULTY_LEVELS } from '../utils/constants/chessConstants';
import { generateFen } from '../utils/chess/fenUtils';
import { useAnalytics } from '../hooks/useAnalytics';
import AnalyticsDashboard from '../components/dashboard/AnalyticsDashboard';
import './dashboard.css';

const Dashboard: React.FC = () => {
  const { trackPageView, trackEvent } = useAnalytics();
  
  // Track page view on component mount
  useEffect(() => {
    trackPageView('dashboard');
  }, [trackPageView]);

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

  const [position, setPosition] = useState<(string | null)[][]>([]);
  const [gameState, setGameState] = useState(chessEngine.getGameState());
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  useEffect(() => {
    chessEngine.initStockfish();
    chessEngine.newGame();
    const board = chessEngine.getBoard();
    setPosition(board);
    setGameState(chessEngine.getGameState());
  }, []);

  const getCurrentFen = () => {
    return gameState.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  };

  const handleMove = (from: string, to: string) => {
    const result = chessEngine.makeMove({ from, to, piece: '' });
    if (result) {
      setPosition(chessEngine.getBoard());
      setGameState(chessEngine.getGameState());
      setSelectedSquare(null);
      
      // Track move made
      trackEvent('chess_move_made', { from, to, turn: gameState.turn });
      
      if (gameState.turn === 'b') {
        setTimeout(async () => {
          const aiMove = await chessEngine.getBestMove("MEDIUM");
          if (aiMove) {
            const aiResult = chessEngine.makeMoveFromSan(aiMove);
            if (aiResult) {
              setPosition(chessEngine.getBoard());
              setGameState(chessEngine.getGameState());
              // Track AI move
              trackEvent('ai_move_made', { move: aiMove });
            }
          }
        }, 500);
      }
    }
  };

  const handleSquareSelect = (square: string) => {
    setSelectedSquare(square);
  };

  const handleNewGame = () => {
    chessEngine.newGame();
    setPosition(chessEngine.getBoard());
    setGameState(chessEngine.getGameState());
    setSelectedSquare(null);
    
    // Track new game started
    trackEvent('new_game_started');
  };

  const handleFeatureClick = (featureTitle: string) => {
    trackEvent('feature_clicked', { feature: featureTitle });
  };

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
                onClick={() => handleFeatureClick(feature.title)}
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
        <section className="stats-section">
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

        {/* Analytics Dashboard */}
        <section className="analytics-section">
          <AnalyticsDashboard 
            title="Your Learning Analytics"
            showUserStats={true}
          />
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

        {/* Chessboard */}
        <section className="chessboard-section">
          <div className="modern-board-card">
            <h2 className="board-title">Practice Chessboard</h2>
            <div className="board-status-bar">
              <span>Turn: <b>{gameState.turn === 'w' ? 'White' : 'Black'}</b></span>
              <span>Move: <b>{gameState.moveNumber}</b></span>
              {gameState.isCheck && <span className="status-check">Check!</span>}
              {gameState.isCheckmate && <span className="status-checkmate">Checkmate!</span>}
              {gameState.isStalemate && <span className="status-stalemate">Stalemate!</span>}
              {gameState.isDraw && <span className="status-draw">Draw!</span>}
            </div>
            <div className="modern-board-container">
              <Chessboard
                position={getCurrentFen()}
                onPieceDrop={(from, to) => { handleMove(from, to); return true; }}
                boardOrientation="white"
                areArrowsAllowed={false}
                arePiecesDraggable={true}
                customBoardStyle={{
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
                  background: '#f0d9b5',
                  border: '3px solid #7fa7ff',
                  margin: '0 auto',
                  maxWidth: 400,
                  minWidth: 320,
                }}
                customDarkSquareStyle={{ backgroundColor: '#5a4632' }}
                customLightSquareStyle={{ backgroundColor: '#bfa97a' }}
              />
            </div>
            <div className="modern-board-controls">
              <button className="modern-btn primary" onClick={handleNewGame}>New Game</button>
              {/* <button className="modern-btn secondary" onClick={handleUndoMove}>Undo Move</button> */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard; 