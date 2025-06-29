import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import PuzzleFilterBar, { PuzzleFilters } from './PuzzleFilterBar';
import './EnhancedPuzzleBoard.css';

interface Puzzle {
  id: string;
  fen: string;
  puzzle: {
    id: string;
    rating: number;
    themes: string[];
    solution: string[];
  };
  game?: {
    url: string;
  };
  source: string;
}

interface PuzzleStats {
  totalSolved: number;
  currentStreak: number;
  bestStreak: number;
  averageTime: number;
  totalTime: number;
  correctMoves: number;
  totalMoves: number;
}

interface EnhancedPuzzleBoardProps {
  onComplete?: (success: boolean) => void;
}

const EnhancedPuzzleBoard: React.FC<EnhancedPuzzleBoardProps> = ({ onComplete }) => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle | null>(null);
  const [userMoves, setUserMoves] = useState<string[]>([]);
  const [solutionIndex, setSolutionIndex] = useState(0);
  const [isShowingSolution, setIsShowingSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintMessage, setHintMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [puzzleCount, setPuzzleCount] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementMessage, setAchievementMessage] = useState('');
  const [isPuzzleComplete, setIsPuzzleComplete] = useState(false);
  const [showSolutionAnimation, setShowSolutionAnimation] = useState(false);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  const [filters, setFilters] = useState<PuzzleFilters>({
    minRating: 0,
    maxRating: 3000,
    themes: []
  });

  const [stats, setStats] = useState<PuzzleStats>({
    totalSolved: 0,
    currentStreak: 0,
    bestStreak: 0,
    averageTime: 0,
    totalTime: 0,
    correctMoves: 0,
    totalMoves: 0
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && !isPuzzleComplete) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isPuzzleComplete]);

  // Fetch puzzle from backend
  const fetchPuzzle = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Fetching puzzle with filters:', filters);
      
      const params = new URLSearchParams();
      if (filters.minRating > 0) params.append('minRating', filters.minRating.toString());
      if (filters.maxRating < 3000) params.append('maxRating', filters.maxRating.toString());
      if (filters.themes.length > 0) {
        filters.themes.forEach((theme: string) => params.append('themes', theme));
      }
      
      const url = `http://localhost:3001/api/puzzle?${params.toString()}`;
      console.log('Fetching from:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const puzzle = await response.json();
      console.log('Puzzle received:', puzzle);
      
      if (!puzzle || !puzzle.fen || !puzzle.puzzle || !puzzle.puzzle.solution) {
        throw new Error('Invalid puzzle data received');
      }
      
      // Initialize game with puzzle FEN
      const newGame = new Chess(puzzle.fen);
      setGame(newGame);
      setCurrentPuzzle(puzzle);
      setUserMoves([]);
      setSolutionIndex(0);
      setIsShowingSolution(false);
      setIsCorrect(null);
      setShowHint(false);
      setHintMessage('');
      setStartTime(Date.now());
      setElapsedTime(0);
      setIsTimerRunning(true);
      setIsPuzzleComplete(false);
      
      console.log('Puzzle loaded successfully:', { fen: puzzle.fen, solution: puzzle.puzzle.solution });
    } catch (err) {
      console.error('Error fetching puzzle:', err);
      setError(err instanceof Error ? err.message : 'Failed to load puzzle. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Load initial puzzle
  useEffect(() => {
    fetchPuzzle();
  }, [fetchPuzzle]);

  // Helper: Convert UCI solution to SAN array
  const getSanSolution = (fen: string, uciMoves: string[]): string[] => {
    const chess = new Chess(fen);
    const sanMoves: string[] = [];
    for (const uci of uciMoves) {
      const move = chess.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: 'q' });
      if (move) sanMoves.push(move.san);
      else sanMoves.push(uci); // fallback
    }
    return sanMoves;
  };

  // Handle piece drop with improved validation
  const onDrop = (sourceSquare: string, targetSquare: string) => {
    if (isShowingSolution || !currentPuzzle || isPuzzleComplete) {
      console.log('Drop blocked:', { isShowingSolution, hasPuzzle: !!currentPuzzle, isComplete: isPuzzleComplete });
      return false;
    }

    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // Always promote to queen for simplicity
      });

      if (move === null) {
        console.log('Invalid move:', { from: sourceSquare, to: targetSquare });
        return false;
      }

      // Convert to UCI format for comparison
      const moveString = `${sourceSquare}${targetSquare}`;
      const newUserMoves = [...userMoves, moveString];
      
      console.log('Move made:', { moveString, userMoves: newUserMoves, solution: currentPuzzle.puzzle.solution });
      
      // Check if this is the correct move
      if (newUserMoves.length <= currentPuzzle.puzzle.solution.length) {
        const expectedMove = currentPuzzle.puzzle.solution[newUserMoves.length - 1];
        
        if (moveString === expectedMove) {
          // Correct move
          console.log('Correct move!');
          setIsCorrect(true);
          setStats(prev => ({
            ...prev,
            correctMoves: prev.correctMoves + 1,
            totalMoves: prev.totalMoves + 1
          }));
          
          setUserMoves(newUserMoves);
          
          // Check if puzzle is complete
          if (newUserMoves.length >= currentPuzzle.puzzle.solution.length) {
            console.log('Puzzle completed successfully!');
            setIsPuzzleComplete(true);
            setIsTimerRunning(false);
            handlePuzzleComplete(true);
          } else {
            // Reset feedback after a short delay
            setTimeout(() => {
              setIsCorrect(null);
            }, 1000);
          }
        } else {
          // Incorrect move
          console.log('Incorrect move. Expected:', expectedMove, 'Got:', moveString);
          setIsCorrect(false);
          setStats(prev => ({
            ...prev,
            totalMoves: prev.totalMoves + 1
          }));
          
          // Show incorrect feedback and reset after delay
          setTimeout(() => {
            setIsCorrect(null);
            resetPuzzle();
          }, 2000);
        }
      }

      return true;
    } catch (error) {
      console.error('Move error:', error);
      return false;
    }
  };

  // Handle puzzle completion
  const handlePuzzleComplete = (success: boolean) => {
    const solveTime = elapsedTime;
    const newStats = {
      ...stats,
      totalSolved: stats.totalSolved + (success ? 1 : 0),
      currentStreak: success ? stats.currentStreak + 1 : 0,
      bestStreak: success ? Math.max(stats.bestStreak, stats.currentStreak + 1) : stats.bestStreak,
      totalTime: stats.totalTime + solveTime,
      averageTime: success ? (stats.totalTime + solveTime) / (stats.totalSolved + 1) : stats.averageTime
    };
    setStats(newStats);
    setPuzzleCount(prev => prev + 1);

    if (onComplete) {
      onComplete(success);
    }

    // Show achievement for streaks
    if (success && newStats.currentStreak === 5) {
      setAchievementMessage('🔥 5 Puzzle Streak! 🔥');
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 3000);
    } else if (success && newStats.currentStreak === 10) {
      setAchievementMessage('🚀 10 Puzzle Streak! 🚀');
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 3000);
    }
  };

  // Show solution with animation
  const showSolution = () => {
    if (!currentPuzzle || isShowingSolution) return;
    
    setIsShowingSolution(true);
    setShowSolutionAnimation(true);
    setCurrentMoveIndex(0);
    setIsTimerRunning(false);
    handlePuzzleComplete(false);
    
    // Animate through the solution
    animateSolution();
  };

  // Animate solution moves
  const animateSolution = () => {
    if (!currentPuzzle || !isShowingSolution) return;

    if (currentMoveIndex < currentPuzzle.puzzle.solution.length) {
      const move = currentPuzzle.puzzle.solution[currentMoveIndex];
      const from = move.substring(0, 2);
      const to = move.substring(2, 4);

      try {
        const result = game.move({ from, to, promotion: 'q' });
        if (result) {
          setGame(new Chess(game.fen()));
          setCurrentMoveIndex(prev => prev + 1);

          setTimeout(() => {
            animateSolution();
          }, 1000);
        }
      } catch (error) {
        console.error('Solution animation error:', error);
        // Continue with next move even if current one fails
        setCurrentMoveIndex(prev => prev + 1);
        setTimeout(() => {
          animateSolution();
        }, 1000);
      }
    }
  };

  // Show hint
  const handleShowHint = () => {
    if (!currentPuzzle || userMoves.length >= currentPuzzle.puzzle.solution.length) return;
    const nextMove = currentPuzzle.puzzle.solution[userMoves.length];
    if (nextMove) {
      const san = getSanSolution(currentPuzzle.fen, currentPuzzle.puzzle.solution)[userMoves.length];
      setHintMessage(`Hint: ${san || nextMove}`);
      setShowHint(true);
      setTimeout(() => {
        setShowHint(false);
        setHintMessage('');
      }, 3000);
    }
  };

  // Reset puzzle
  const resetPuzzle = () => {
    if (currentPuzzle) {
      setGame(new Chess(currentPuzzle.fen));
      setUserMoves([]);
      setSolutionIndex(0);
      setIsShowingSolution(false);
      setShowSolutionAnimation(false);
      setCurrentMoveIndex(0);
      setIsCorrect(null);
      setShowHint(false);
      setHintMessage('');
      setStartTime(Date.now());
      setElapsedTime(0);
      setIsTimerRunning(true);
      setIsPuzzleComplete(false);
    }
  };

  // Next puzzle
  const nextPuzzle = () => {
    fetchPuzzle();
  };

  // Handle filters change
  const handleFiltersChange = (newFilters: PuzzleFilters) => {
    setFilters(newFilters);
    fetchPuzzle();
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate accuracy
  const accuracy = stats.totalMoves > 0 ? (stats.correctMoves / stats.totalMoves) * 100 : 0;

  // In the component, after currentPuzzle is loaded:
  const sanSolution = currentPuzzle ? getSanSolution(currentPuzzle.fen, currentPuzzle.puzzle.solution) : [];

  return (
    <div className="enhanced-puzzle-board">
      {/* Filter Bar */}
      <PuzzleFilterBar
        filters={filters}
        onFiltersChange={handleFiltersChange}
        isLoading={loading}
      />

      {/* Main Puzzle Area */}
      <div className="puzzle-main-area">
        {/* Left Side - Board */}
        <div className="puzzle-board-section">
          <div className="enhanced-puzzle-board-container">
            {loading ? (
              <div className="puzzle-loading">
                <div className="loading-spinner"></div>
                <p>Loading puzzle...</p>
              </div>
            ) : error ? (
              <div className="puzzle-error">
                <h3>Error Loading Puzzle</h3>
                <p>{error}</p>
                <button className="retry-btn" onClick={fetchPuzzle}>
                  Try Again
                </button>
              </div>
            ) : currentPuzzle ? (
              <>
                <div className="chessboard-wrapper">
                  <Chessboard
                    position={game.fen()}
                    onPieceDrop={onDrop}
                  />
                </div>
                <div className="info-bar">
                  <span><b>Puzzle #{puzzleCount + 1}</b></span>
                  <span><span className="icon">🏅</span> Rating: {currentPuzzle.puzzle.rating}</span>
                  <span><span className="icon">⏱️</span> {formatTime(elapsedTime)}</span>
                </div>
                <div className="puzzle-tags">
                  {currentPuzzle.puzzle.themes.slice(0, 3).map((theme, index) => (
                    <span key={index} className="puzzle-tag">
                      {theme}
                    </span>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="puzzle-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${(userMoves.length / currentPuzzle.puzzle.solution.length) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <span className="progress-text">
                    {userMoves.length} / {currentPuzzle.puzzle.solution.length} moves
                  </span>
                </div>

                {/* Feedback Message */}
                {isCorrect !== null && (
                  <div className={`feedback-message ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? '✅ Correct!' : '❌ Incorrect. Try again!'}
                  </div>
                )}

                {/* Hint Message */}
                {showHint && (
                  <div className="hint-message">
                    {hintMessage}
                  </div>
                )}

                {/* Control Buttons */}
                <div className="puzzle-controls">
                  <button
                    className="control-btn secondary"
                    onClick={resetPuzzle}
                    disabled={loading}
                  >
                    🔄 Reset
                  </button>
                  <button
                    className="control-btn secondary"
                    onClick={handleShowHint}
                    disabled={loading || isShowingSolution || userMoves.length >= currentPuzzle.puzzle.solution.length}
                  >
                    💡 Hint
                  </button>
                  <button
                    className="control-btn secondary"
                    onClick={showSolution}
                    disabled={loading || isShowingSolution}
                  >
                    👁️ Solution
                  </button>
                  <button
                    className="control-btn primary"
                    onClick={nextPuzzle}
                    disabled={loading}
                  >
                    ➡️ Next Puzzle
                  </button>
                </div>

                {/* Completion Message */}
                {isPuzzleComplete && (
                  <div className="completion-message">
                    <h3>🎉 Puzzle Complete!</h3>
                    <p>Time: {formatTime(elapsedTime)}</p>
                    <p>Moves: {userMoves.length}/{currentPuzzle.puzzle.solution.length}</p>
                  </div>
                )}

                {/* Solution Section */}
                {isShowingSolution && (
                  <div className="solution-section">
                    <h4>Solution:</h4>
                    <div className="solution-moves">
                      {sanSolution.map((move, idx) => (
                        <span key={idx} className="move">{move}</span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>

        {/* Right Side - Stats & Info */}
        <div className="puzzle-sidebar">
          {/* Stats Panel */}
          <div className="stats-panel">
            <h3>📊 Your Progress</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{stats.totalSolved}</span>
                <span className="stat-label">Solved</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.currentStreak}</span>
                <span className="stat-label">Streak</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.bestStreak}</span>
                <span className="stat-label">Best</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{accuracy.toFixed(1)}%</span>
                <span className="stat-label">Accuracy</span>
              </div>
            </div>
          </div>

          {/* Current Puzzle Info */}
          {currentPuzzle && (
            <div className="puzzle-details">
              <h3>🧩 Puzzle Details</h3>
              <div className="detail-item">
                <span className="detail-label">Rating:</span>
                <span className="detail-value">{currentPuzzle.puzzle.rating}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Moves:</span>
                <span className="detail-value">{currentPuzzle.puzzle.solution.length}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Source:</span>
                <span className="detail-value">{currentPuzzle.source}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Themes:</span>
                <div className="themes-list">
                  {currentPuzzle.puzzle.themes.map((theme, index) => (
                    <span key={index} className="theme-tag">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Achievement Toast */}
      {showAchievement && (
        <div className="achievement-toast">
          {achievementMessage}
        </div>
      )}
    </div>
  );
};

export default EnhancedPuzzleBoard; 