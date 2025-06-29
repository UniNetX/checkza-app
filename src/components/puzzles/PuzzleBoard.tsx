import React, { useState, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import './PuzzleBoard.css';

interface LichessPuzzle {
  id: string;
  game?: {
    id: string;
    pgn: string;
    clock: string;
    rated: boolean;
    players: Array<{
      user: {
        name: string;
        id: string;
      };
      rating: number;
    }>;
  };
  puzzle: {
    id: string;
    initialPly?: number;
    plays?: number;
    rating: number;
    themes: string[];
    solution: string[];
  };
  fen?: string; // For local puzzles
  source?: string; // 'lichess' or 'local'
}

interface PuzzleStats {
  totalSolved: number;
  currentStreak: number;
  bestStreak: number;
  averageTime: number;
  totalTime: number;
}

interface PuzzleBoardProps {
  onComplete?: (success: boolean) => void;
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ onComplete }) => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [currentPuzzle, setCurrentPuzzle] = useState<LichessPuzzle | null>(null);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [userMoves, setUserMoves] = useState<string[]>([]);
  const [solutionIndex, setSolutionIndex] = useState(0);
  const [isShowingSolution, setIsShowingSolution] = useState(false);
  const [isWalkthroughMode, setIsWalkthroughMode] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<string>('all');
  const [puzzleCount, setPuzzleCount] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<PuzzleStats>({
    totalSolved: 0,
    currentStreak: 0,
    bestStreak: 0,
    averageTime: 0,
    totalTime: 0
  });
  const [showStats, setShowStats] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementMessage, setAchievementMessage] = useState('');

  // Fetch puzzle from backend proxy
  const fetchPuzzle = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Build query params for theme/rating
      const params = [];
      if (selectedTheme && selectedTheme !== 'all') params.push(`theme=${encodeURIComponent(selectedTheme)}`);
      if (selectedRating && selectedRating !== 'all') {
        const rating = parseInt(selectedRating, 10);
        params.push(`minRating=${rating - 100}`);
        params.push(`maxRating=${rating + 100}`);
      }
      const query = params.length ? `?${params.join('&')}` : '';
      const url = `http://localhost:3001/api/puzzle${query}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch puzzle');
      const puzzle = await response.json();

      // Support both Lichess and local puzzle formats
      let newGame;
      if (puzzle.game && puzzle.game.pgn) {
        newGame = new Chess();
        newGame.loadPgn(puzzle.game.pgn);
        const moves = newGame.history();
        const puzzleStartMove = puzzle.puzzle.initialPly || 0;
        const puzzleGame = new Chess();
        for (let i = 0; i < puzzleStartMove; i++) {
          if (moves[i]) puzzleGame.move(moves[i]);
        }
        newGame = puzzleGame;
      } else if (puzzle.fen) {
        newGame = new Chess(puzzle.fen);
      } else {
        throw new Error('Invalid puzzle data');
      }

      setGame(newGame);
      setCurrentPuzzle(puzzle);
      setUserMoves([]);
      setSolutionIndex(0);
      setIsShowingSolution(false);
      setIsWalkthroughMode(false);
      setIsCorrect(null);
      setShowHint(false);
      setStartTime(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load puzzle. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedTheme, selectedRating]);

  // Load initial puzzle
  useEffect(() => {
    fetchPuzzle();
  }, [fetchPuzzle]);

  // Handle piece drop
  const onDrop = (sourceSquare: string, targetSquare: string) => {
    if (isShowingSolution || isWalkthroughMode || !currentPuzzle) return false;

    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // Always promote to queen for simplicity
      });

      if (move === null) return false;

      setGame(new Chess(game.fen()));
      
      // Convert to UCI format for comparison
      const moveString = `${sourceSquare}${targetSquare}`;
      setUserMoves(prev => [...prev, moveString]);

      // Check if this is the correct move
      if (userMoves.length < currentPuzzle.puzzle.solution.length) {
        const expectedMove = currentPuzzle.puzzle.solution[userMoves.length];
        
        // Compare UCI moves
        if (moveString === expectedMove) {
          setIsCorrect(true);
          // Check if puzzle is complete
          if (userMoves.length + 1 >= currentPuzzle.puzzle.solution.length) {
            handlePuzzleComplete();
          }
        } else {
          setIsCorrect(false);
          setTimeout(() => {
            setIsCorrect(null);
            // Reset to puzzle start
            resetPuzzle();
          }, 1500);
        }
      }

      return true;
    } catch (error) {
      console.error('Move error:', error);
      return false;
    }
  };

  // Handle puzzle completion
  const handlePuzzleComplete = () => {
    const solveTime = Date.now() - startTime;
    const newStats = {
      ...stats,
      totalSolved: stats.totalSolved + 1,
      currentStreak: stats.currentStreak + 1,
      bestStreak: Math.max(stats.bestStreak, stats.currentStreak + 1),
      totalTime: stats.totalTime + solveTime,
      averageTime: (stats.totalTime + solveTime) / (stats.totalSolved + 1)
    };
    setStats(newStats);
    setPuzzleCount(prev => prev + 1);

    // Call the onComplete callback if provided
    if (onComplete) {
      onComplete(true);
    }

    // Show achievement
    if (newStats.currentStreak === 5) {
      setAchievementMessage('🔥 5 Puzzle Streak! 🔥');
      setShowAchievement(true);
    } else if (newStats.currentStreak === 10) {
      setAchievementMessage('🎯 10 Puzzle Streak! 🎯');
      setShowAchievement(true);
    }

    setTimeout(() => {
      fetchPuzzle(); // Get next puzzle
    }, 1500);
  };

  // Show solution
  const showSolution = () => {
    if (!currentPuzzle) return;
    setIsShowingSolution(true);
    setSolutionIndex(0);
    animateSolution();
  };

  // Animate solution
  const animateSolution = () => {
    if (!currentPuzzle || !isShowingSolution) return;

    if (solutionIndex < currentPuzzle.puzzle.solution.length) {
      const move = currentPuzzle.puzzle.solution[solutionIndex];
      const from = move.substring(0, 2);
      const to = move.substring(2, 4);

      try {
        const newGame = new Chess(game.fen());
        const result = newGame.move({ from, to, promotion: 'q' });
        if (result) {
          setGame(newGame);
          setSolutionIndex(solutionIndex + 1);

          setTimeout(() => {
            animateSolution();
          }, 800);
        }
      } catch (error) {
        console.error('Solution animation error:', error);
      }
    }
  };

  // Start walkthrough mode
  const startWalkthrough = () => {
    if (!currentPuzzle) return;
    setIsWalkthroughMode(true);
    setSolutionIndex(0);
    resetPuzzle();
  };

  // Handle walkthrough move
  const handleWalkthroughMove = () => {
    if (!currentPuzzle || !isWalkthroughMode) return;

    if (solutionIndex < currentPuzzle.puzzle.solution.length) {
      const move = currentPuzzle.puzzle.solution[solutionIndex];
      const from = move.substring(0, 2);
      const to = move.substring(2, 4);

      try {
        const newGame = new Chess(game.fen());
        const result = newGame.move({ from, to, promotion: 'q' });
        if (result) {
          setGame(newGame);
          setSolutionIndex(solutionIndex + 1);
        }
      } catch (error) {
        console.error('Walkthrough move error:', error);
      }
    }
  };

  // Reset puzzle
  const resetPuzzle = () => {
    if (!currentPuzzle) return;
    
    // Reset to puzzle starting position
    const newGame = new Chess();
    if (currentPuzzle.game && currentPuzzle.game.pgn) {
      newGame.loadPgn(currentPuzzle.game.pgn);
      const moves = newGame.history();
      const puzzleStartMove = currentPuzzle.puzzle.initialPly || 0;
      const puzzleGame = new Chess();
      for (let i = 0; i < puzzleStartMove; i++) {
        if (moves[i]) {
          puzzleGame.move(moves[i]);
        }
      }
      setGame(puzzleGame);
    } else if (currentPuzzle.fen) {
      setGame(new Chess(currentPuzzle.fen));
    }
    
    setUserMoves([]);
    setSolutionIndex(0);
    setIsShowingSolution(false);
    setIsWalkthroughMode(false);
    setIsCorrect(null);
    setShowHint(false);
    setStartTime(Date.now());
  };

  // Show hint
  const handleShowHint = () => {
    if (!currentPuzzle || userMoves.length >= currentPuzzle.puzzle.solution.length) return;
    
    const nextMove = currentPuzzle.puzzle.solution[userMoves.length];
    if (nextMove) {
      const from = nextMove.substring(0, 2);
      const to = nextMove.substring(2, 4);
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3000);
    }
  };

  // Next puzzle
  const nextPuzzle = () => {
    fetchPuzzle();
  };

  // Toggle stats
  const toggleStats = () => {
    setShowStats(!showStats);
  };

  if (loading) {
    return (
      <div className="puzzle-board">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading puzzle from backend...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="puzzle-board">
        <div className="error-container">
          <h3>Error Loading Puzzle</h3>
          <p>{error}</p>
          <button onClick={fetchPuzzle} className="action-btn primary">
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="puzzle-board">
      <div className="puzzle-header">
        <h2>Chess Puzzles</h2>
        <div className="puzzle-controls">
          <div className="puzzle-nav">
            <span className="puzzle-counter">Puzzle #{puzzleCount + 1}</span>
            <button onClick={nextPuzzle} className="nav-btn">Next Puzzle →</button>
          </div>
        </div>
      </div>

      <div className="puzzle-content">
        <div className="board-container">
          <div className="chessboard-container">
            <Chessboard 
              position={game.fen()}
              onPieceDrop={onDrop}
              boardOrientation="white"
              customBoardStyle={{
                borderRadius: '12px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                width: '400px',
                height: '400px'
              }}
              boardWidth={400}
            />
          </div>
          
          {isCorrect === true && (
            <div className="feedback correct">✓ Correct!</div>
          )}
          {isCorrect === false && (
            <div className="feedback incorrect">✗ Incorrect</div>
          )}
          {showHint && currentPuzzle && (
            <div className="hint">
              Hint: {currentPuzzle.puzzle.solution[userMoves.length]}
            </div>
          )}
        </div>

        <div className="puzzle-info">
          {currentPuzzle && (
            <>
              <div className="puzzle-details">
                <h3>Puzzle #{currentPuzzle.puzzle.id}</h3>
                <div className="puzzle-meta">
                  <span className="rating-badge">Rating: {currentPuzzle.puzzle.rating}</span>
                  <span className="themes-badge">
                    Themes: {currentPuzzle.puzzle.themes.join(', ')}
                  </span>
                </div>
              </div>

              <div className="puzzle-actions">
                {!isShowingSolution && !isWalkthroughMode && (
                  <>
                    <button onClick={handleShowHint} className="action-btn hint-btn">
                      💡 Hint
                    </button>
                    <button onClick={resetPuzzle} className="action-btn reset-btn">
                      🔄 Reset
                    </button>
                    <button onClick={showSolution} className="action-btn solution-btn">
                      🎯 Show Solution
                    </button>
                    <button onClick={startWalkthrough} className="action-btn walkthrough-btn">
                      👣 Walkthrough
                    </button>
                  </>
                )}

                {isWalkthroughMode && (
                  <button onClick={handleWalkthroughMove} className="action-btn next-btn">
                    Next Move →
                  </button>
                )}

                {isShowingSolution && (
                  <button onClick={resetPuzzle} className="action-btn reset-btn">
                    🔄 Try Again
                  </button>
                )}
              </div>

              <div className="stats-section">
                <button onClick={toggleStats} className="stats-toggle">
                  📊 View Statistics
                </button>
                
                {showStats && (
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-value">{stats.totalSolved}</div>
                      <div className="stat-label">Solved</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">{stats.currentStreak}</div>
                      <div className="stat-label">Streak</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">{stats.bestStreak}</div>
                      <div className="stat-label">Best</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">{Math.round(stats.averageTime / 1000)}s</div>
                      <div className="stat-label">Avg Time</div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {showAchievement && (
        <div className="achievement-popup">
          <div className="achievement-content">
            <span className="achievement-icon">🏆</span>
            <span className="achievement-text">{achievementMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PuzzleBoard; 