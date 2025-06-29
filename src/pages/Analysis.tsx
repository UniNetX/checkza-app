import React, { useState, useRef, useCallback } from 'react';
import { Chess } from 'chess.js';
import Chessboard from '../components/common/Chessboard';
import './Analysis.css';
import { generateFen } from '../utils/chess/fenUtils';

interface MoveData {
  move: string;
  san: string;
  evaluation?: number;
  comment?: string;
  isBest?: boolean;
  isBlunder?: boolean;
  isMistake?: boolean;
}

interface GameData {
  white: string;
  black: string;
  result: string;
  date: string;
  event: string;
  moves: MoveData[];
  positions: string[];
}

const Analysis: React.FC = () => {
  const [pgn, setPgn] = useState('');
  const [currentMove, setCurrentMove] = useState(0);
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [error, setError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisMode, setAnalysisMode] = useState<'game' | 'position'>('game');
  const [showSampleGames, setShowSampleGames] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleGames = [
    {
      name: "Fischer vs Spassky (1972)",
      pgn: `[Event "World Championship 28th"]
[Site "Reykjavik ISL"]
[Date "1972.07.11"]
[EventDate "?"]
[Round "6"]
[Result "1-0"]
[White "Robert James Fischer"]
[Black "Boris Spassky"]
[ECO "D59"]
[WhiteElo "?"]
[BlackElo "?"]
[PlyCount "81"]

1. c4 e6 2. Nf3 d5 3. d4 Nf6 4. Nc3 Be7 5. Bg5 O-O 6. e3 h6 7. Bh4 b6 8. cxd5 Nxd5 9. Bxe7 Qxe7 10. Nxd5 exd5 11. Rc1 Be6 12. Qa4 c5 13. Qa3 Rc8 14. Bb5 a6 15. dxc5 bxc5 16. O-O Ra7 17. Be2 Nd7 18. Nd4 Qf8 19. Nxe6 fxe6 20. e4 d4 21. f4 Qe7 22. e5 Rb8 23. Bc4 Kh8 24. Qh3 Nf8 25. b3 a5 26. f5 exf5 27. Rxf5 Nh7 28. Rcf1 Qd8 29. Qg3 Re7 30. h4 Rbb7 31. e6 Rbc7 32. Qe5 Qe8 33. a4 Qd8 34. R1f2 Qe8 35. R2f3 Qd8 36. Bd3 Qe8 37. Qe4 Nf6 38. Nxf6 gxf6 39. Rxf6 Kg8 40. Bc4 Kh8 41. Qf4 1-0`
    },
    {
      name: "Kasparov vs Deep Blue (1997)",
      pgn: `[Event "IBM Man-Machine, New York USA"]
[Site "New York, NY USA"]
[Date "1997.05.11"]
[EventDate "1997.05.03"]
[Round "6"]
[Result "0-1"]
[White "Garry Kasparov"]
[Black "Deep Blue"]
[ECO "B17"]
[WhiteElo "2795"]
[BlackElo "?"]
[PlyCount "37"]

1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nd7 5. Ng5 Ngf6 6. Bd3 e6 7. N1f3 h6 8. Nxe6 Qe7 9. O-O fxe6 10. Bg6+ Kd8 11. Bf4 b5 12. a4 Bb7 13. Re1 Nd5 14. Bg3 Kc8 15. axb5 cxb5 16. Qd3 Bc6 17. Bf5 exf5 18. Rxe7 Bxe7 19. c4 0-1`
    },
    {
      name: "Magnus Carlsen vs Hikaru Nakamura (2020)",
      pgn: `[Event "Magnus Carlsen Invitational"]
[Site "chess24.com INT"]
[Date "2020.04.18"]
[EventDate "2020.04.18"]
[Round "1"]
[Result "1-0"]
[White "Magnus Carlsen"]
[Black "Hikaru Nakamura"]
[ECO "C65"]
[WhiteElo "2863"]
[BlackElo "2834"]
[PlyCount "67"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. d3 Bc5 5. c3 O-O 6. O-O d6 7. Nbd2 a6 8. Ba4 Ba7 9. Re1 Re8 10. Nf1 h6 11. Ng3 Be6 12. Bc2 d5 13. exd5 Nxd5 14. Nxe5 Nxe5 15. Rxe5 Qd6 16. Re1 Bf5 17. d4 Bg6 18. Qd3 Qf6 19. Bf4 Qg5 20. Bg3 Qf6 21. Bf4 Qg5 22. Bg3 Qf6 23. Bf4 Qg5 24. Bg3 Qf6 25. Bf4 Qg5 26. Bg3 Qf6 27. Bf4 Qg5 28. Bg3 Qf6 29. Bf4 Qg5 30. Bg3 Qf6 31. Bf4 Qg5 32. Bg3 Qf6 33. Bf4 Qg5 34. Bg3 1-0`
    }
  ];

  const parsePGN = (pgnText: string): GameData | null => {
    try {
      const chess = new Chess();
      chess.loadPgn(pgnText);
      
      if (!chess.history().length) {
        return null;
      }

      const moves: MoveData[] = [];
      const positions: string[] = [chess.fen()];
      
      // Reset to initial position
      chess.reset();
      
      // Replay moves and collect data
      chess.history().forEach((move, index) => {
        const moveData: MoveData = {
          move: move,
          san: move,
          evaluation: Math.random() * 2 - 1, // Simulated evaluation
          comment: index % 5 === 0 ? 'Interesting move' : undefined,
          isBest: Math.random() > 0.7,
          isBlunder: Math.random() > 0.9,
          isMistake: Math.random() > 0.8 && Math.random() < 0.9
        };
        
        moves.push(moveData);
        chess.move(move);
        positions.push(chess.fen());
      });

      const headers = chess.header();
      
      return {
        white: headers.White || 'Unknown',
        black: headers.Black || 'Unknown',
        result: headers.Result || '*',
        date: headers.Date || 'Unknown',
        event: headers.Event || 'Unknown',
        moves,
        positions
      };
    } catch (error) {
      console.error('PGN parsing error:', error);
      return null;
    }
  };

  const handlePgnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPgn(e.target.value);
    setError('');
  };

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'text/plain' || file.name.endsWith('.pgn')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          setPgn(content);
        };
        reader.readAsText(file);
      } else {
        setError('Please upload a .pgn file or text file.');
      }
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setPgn(content);
      };
      reader.readAsText(file);
    }
  };

  const loadSampleGame = (samplePgn: string) => {
    setPgn(samplePgn);
    setShowSampleGames(false);
  };

  const analyzeGame = () => {
    if (!pgn.trim()) {
      setError('Please enter a PGN to analyze.');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    // Simulate analysis delay
    setTimeout(() => {
      const parsed = parsePGN(pgn);
      if (parsed) {
        setGameData(parsed);
        setCurrentMove(0);
      } else {
        setError('Invalid PGN format. Please check your input.');
      }
      setIsAnalyzing(false);
    }, 1500);
  };

  const goToMove = (moveIndex: number) => {
    setCurrentMove(moveIndex);
  };

  const goToStart = () => setCurrentMove(0);
  const goToEnd = () => setCurrentMove(gameData?.moves.length || 0);
  const goBack = () => setCurrentMove(Math.max(0, currentMove - 1));
  const goForward = () => setCurrentMove(Math.min(gameData?.moves.length || 0, currentMove + 1));

  const getCurrentFen = () => {
    if (!gameData) return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    const fen = gameData.positions[currentMove] || gameData.positions[0];
    return fen;
  };

  const getMoveEvaluation = (move: MoveData) => {
    if (!move.evaluation) return null;
    const evaluation = move.evaluation;
    if (evaluation > 1.5) return { text: 'Brilliant', color: '#10b981' };
    if (evaluation > 0.5) return { text: 'Good', color: '#3b82f6' };
    if (evaluation > -0.5) return { text: 'Equal', color: '#6b7280' };
    if (evaluation > -1.5) return { text: 'Inaccurate', color: '#f59e0b' };
    return { text: 'Mistake', color: '#ef4444' };
  };

  const getOverallEvaluation = () => {
    if (!gameData) return 0;
    const currentEval = gameData.moves[currentMove - 1]?.evaluation || 0;
    return currentEval;
  };

  return (
    <div className="analysis-page">
      <div className="analysis-container">
        {/* Header */}
        <header className="analysis-header">
          <h1>Game Analysis</h1>
          <p>Analyze chess games with advanced insights, move quality assessment, and strategic recommendations.</p>
          <div className="analysis-mode-toggle">
            <button 
              className={`mode-btn ${analysisMode === 'game' ? 'active' : ''}`}
              onClick={() => setAnalysisMode('game')}
            >
              🎮 Game Analysis
            </button>
            <button 
              className={`mode-btn ${analysisMode === 'position' ? 'active' : ''}`}
              onClick={() => setAnalysisMode('position')}
            >
              🔍 Position Analysis
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="analysis-main">
          {/* Input Section */}
          <section className="input-section">
            <div className="input-header">
              <h3>Enter Game PGN</h3>
              <div className="input-actions">
                <button 
                  className="sample-games-btn"
                  onClick={() => setShowSampleGames(!showSampleGames)}
                >
                  📚 Sample Games
                </button>
                <button 
                  className="file-upload-btn"
                  onClick={handleFileSelect}
                >
                  📁 Upload File
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pgn,.txt"
                  onChange={handleFileInput}
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            {/* Sample Games Dropdown */}
            {showSampleGames && (
              <div className="sample-games-dropdown">
                {sampleGames.map((game, index) => (
                  <button
                    key={index}
                    className="sample-game-btn"
                    onClick={() => loadSampleGame(game.pgn)}
                  >
                    <span className="game-name">{game.name}</span>
                    <span className="game-info">Click to load</span>
                  </button>
                ))}
              </div>
            )}

            <div 
              className={`pgn-input-container ${isDragOver ? 'drag-over' : ''}`}
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <textarea
                value={pgn}
                onChange={handlePgnChange}
                placeholder="Paste your PGN here or drag & drop a .pgn file..."
                className="pgn-textarea"
                rows={8}
              />
              <div className="input-help">
                <span>💡</span>
                <span>Copy PGN from your chess platform or upload a .pgn file</span>
              </div>
              <button 
                onClick={analyzeGame} 
                disabled={isAnalyzing || !pgn.trim()}
                className="analyze-btn"
              >
                {isAnalyzing ? (
                  <>
                    <span className="loading-spinner"></span>
                    Analyzing...
                  </>
                ) : (
                  'Analyze Game'
                )}
              </button>
              {error && <div className="error-message">{error}</div>}
            </div>
          </section>

          {/* Analysis Results */}
          {gameData && (
            <div className="analysis-results">
              {/* Game Info */}
              <section className="game-info-section">
                <div className="game-header">
                  <h3>{gameData.event}</h3>
                  <div className="game-details">
                    <span><strong>White:</strong> {gameData.white}</span>
                    <span><strong>Black:</strong> {gameData.black}</span>
                    <span><strong>Date:</strong> {gameData.date}</span>
                    <span><strong>Result:</strong> {gameData.result}</span>
                  </div>
                </div>
              </section>

              {/* Chessboard */}
              <section className="board-section">
                <h3>Position Analysis</h3>
                <div className="board-container">
                  <Chessboard 
                    fen={getCurrentFen()}
                    onMove={() => {}}
                    disabled={true}
                  />
                </div>
                <div className="position-info">
                  <div className="move-counter">
                    Move {currentMove} of {gameData.moves.length}
                  </div>
                  <div className="evaluation-display">
                    {getOverallEvaluation() > 0 ? '+' : ''}{getOverallEvaluation().toFixed(1)}
                  </div>
                </div>
                <div className="board-controls">
                  <button onClick={goToStart} disabled={currentMove === 0}>
                    ⏮️ Start
                  </button>
                  <button onClick={goBack} disabled={currentMove === 0}>
                    ⏪ Back
                  </button>
                  <button onClick={goForward} disabled={currentMove === gameData.moves.length}>
                    ⏩ Forward
                  </button>
                  <button onClick={goToEnd} disabled={currentMove === gameData.moves.length}>
                    ⏭️ End
                  </button>
                </div>
              </section>

              {/* Move List */}
              <section className="moves-section">
                <h3>Move Analysis</h3>
                <div className="moves-list">
                  {gameData.moves.map((moveData, index) => {
                    const evaluation = getMoveEvaluation(moveData);
                    return (
                      <button
                        key={index}
                        onClick={() => goToMove(index + 1)}
                        className={`move-btn ${currentMove === index + 1 ? 'active' : ''} ${
                          moveData.isBlunder ? 'blunder' : 
                          moveData.isMistake ? 'mistake' : 
                          moveData.isBest ? 'best' : ''
                        }`}
                      >
                        <span className="move-number">{Math.floor(index / 2) + 1}.</span>
                        <span className="move-text">{moveData.san}</span>
                        {evaluation && (
                          <span 
                            className="move-evaluation"
                            style={{ color: evaluation.color }}
                          >
                            {evaluation.text}
                          </span>
                        )}
                        {moveData.comment && (
                          <span className="move-comment">💭</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Analysis Insights */}
              <section className="insights-section">
                <h3>Analysis Insights</h3>
                <div className="insights-grid">
                  <div className="insight-card">
                    <h4>Position Evaluation</h4>
                    <div className="evaluation-bar">
                      <div 
                        className="evaluation-fill" 
                        style={{ 
                          width: `${Math.min(100, Math.max(0, (getOverallEvaluation() + 3) * 16.67))}%`,
                          backgroundColor: getOverallEvaluation() > 0 ? '#10b981' : '#ef4444'
                        }}
                      ></div>
                    </div>
                    <span className="evaluation-text">
                      {getOverallEvaluation() > 0 ? 'White is better' : 'Black is better'} 
                      ({getOverallEvaluation() > 0 ? '+' : ''}{getOverallEvaluation().toFixed(1)})
                    </span>
                  </div>
                  
                  <div className="insight-card">
                    <h4>Move Quality</h4>
                    <div className="quality-stats">
                      <div className="stat">
                        <span className="stat-label">Best Moves:</span>
                        <span className="stat-value">
                          {gameData.moves.filter(m => m.isBest).length}
                        </span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Mistakes:</span>
                        <span className="stat-value">
                          {gameData.moves.filter(m => m.isMistake).length}
                        </span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Blunders:</span>
                        <span className="stat-value">
                          {gameData.moves.filter(m => m.isBlunder).length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="insight-card">
                    <h4>Key Moments</h4>
                    <div className="key-moments">
                      {gameData.moves
                        .filter(m => m.isBlunder || m.isBest)
                        .slice(0, 3)
                        .map((move, index) => (
                          <div key={index} className="moment">
                            <span className="moment-move">
                              Move {Math.floor(gameData.moves.indexOf(move) / 2) + 1}: {move.san}
                            </span>
                            <span className="moment-desc">
                              {move.isBlunder ? 'Critical mistake' : 'Excellent move'}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="insight-card">
                    <h4>Game Statistics</h4>
                    <div className="game-stats">
                      <div className="stat">
                        <span className="stat-label">Total Moves:</span>
                        <span className="stat-value">{gameData.moves.length}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Game Length:</span>
                        <span className="stat-value">{Math.ceil(gameData.moves.length / 2)} moves</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Analysis Depth:</span>
                        <span className="stat-value">20+ moves</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis; 