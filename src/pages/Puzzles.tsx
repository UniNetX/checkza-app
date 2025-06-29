import React, { useEffect } from 'react';
import EnhancedPuzzleBoard from '../components/puzzles/EnhancedPuzzleBoard';
import { useAnalytics } from '../hooks/useAnalytics';
import './Puzzles.css';

const Puzzles: React.FC = () => {
  const { trackPageView, trackPuzzleAttempt } = useAnalytics();
  
  // Track page view on component mount
  useEffect(() => {
    trackPageView('puzzles');
  }, [trackPageView]);

  const handlePuzzleComplete = (success: boolean, puzzleId?: string, timeSpent?: number) => {
    console.log('Puzzle completed:', success ? 'success' : 'failed');
    
    // Track puzzle completion
    trackPuzzleAttempt(
      puzzleId || 'unknown', 
      success, 
      timeSpent || 0
    );
  };

  return (
    <div className="puzzles-page">
      <section className="puzzles-hero">
        <div className="puzzles-hero-content">
          <h1 className="puzzles-title">Infinite Chess Puzzles</h1>
          <p className="puzzles-subtitle">
            Solve unlimited high-quality puzzles from the Lichess database with advanced filtering by theme and rating.
          </p>
        </div>
      </section>
      
      <section className="puzzle-display">
        <EnhancedPuzzleBoard onComplete={handlePuzzleComplete} />
      </section>

      <section className="puzzle-tips">
        <div className="container">
          <h2>Puzzle Solving Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>🔍 Look for Checks</h3>
              <p>Always check if there's a check that leads to mate or material gain.</p>
            </div>
            <div className="tip-card">
              <h3>🎯 Find Forks</h3>
              <p>Look for moves that attack two pieces simultaneously.</p>
            </div>
            <div className="tip-card">
              <h3>📌 Spot Pins</h3>
              <p>Identify pieces that are pinned and can't move without losing material.</p>
            </div>
            <div className="tip-card">
              <h3>⚡ Calculate Variations</h3>
              <p>Think several moves ahead to find the best continuation.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Puzzles; 