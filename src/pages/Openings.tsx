import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OpeningList from '../components/openings/OpeningList';
import OpeningExplorer from '../components/openings/OpeningExplorer';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import openingsData from '../data/openings.json';
import './Openings.css';

const Openings: React.FC = () => {
  const [selectedOpening, setSelectedOpening] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'explorer'>('list');

  const { elementRef: statsRef } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  const { elementRef: statsGridRef } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Filter openings based on search and filters
  const filteredOpenings = openingsData.filter(opening => {
    const matchesSearch = opening.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opening.eco.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || opening.difficulty === selectedDifficulty;
    const matchesTheme = selectedTheme === 'all' || opening.themes.includes(selectedTheme);
    
    return matchesSearch && matchesDifficulty && matchesTheme;
  });

  const stats = {
    total: openingsData.length,
    beginner: openingsData.filter(o => o.difficulty === 'beginner').length,
    intermediate: openingsData.filter(o => o.difficulty === 'intermediate').length,
    advanced: openingsData.filter(o => o.difficulty === 'advanced').length,
    popular: openingsData.filter(o => o.themes.includes('popular')).length
  };

  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];
  const themes = ['all', 'popular', 'aggressive', 'positional', 'defensive', 'gambit'];

  const handleOpeningSelect = (opening: any) => {
    setSelectedOpening(opening);
    setViewMode('explorer');
  };

  const handleBackToList = () => {
    setSelectedOpening(null);
    setViewMode('list');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDifficulty('all');
    setSelectedTheme('all');
  };

  return (
    <div className="openings-page">
      <div className="openings-container">
        {/* Header */}
        <header className="openings-header">
          <h1>Chess Openings</h1>
          <p>Master essential chess openings with comprehensive guides, analysis, and interactive exploration.</p>
        </header>

        {/* Stats */}
        <section className="openings-stats" ref={statsRef}>
          <div className="stats-grid" ref={statsGridRef as React.Ref<HTMLDivElement>}>
            {Object.entries(stats).map(([key, value], index) => (
              <div
                key={key}
                className="stat-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="stat-icon">
                  {key === 'total' && '📖'}
                  {key === 'beginner' && '🌱'}
                  {key === 'intermediate' && '📈'}
                  {key === 'advanced' && '🏆'}
                  {key === 'popular' && '⭐'}
                </div>
                <div className="stat-value">{value}</div>
                <div className="stat-label">
                  {key === 'total' && 'Total Openings'}
                  {key === 'beginner' && 'Beginner'}
                  {key === 'intermediate' && 'Intermediate'}
                  {key === 'advanced' && 'Advanced'}
                  {key === 'popular' && 'Popular'}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Search and Filters */}
        <section className="search-filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search openings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="filters-container">
            <div className="filter-group">
              <label>Difficulty:</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="filter-select"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Theme:</label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="filter-select"
              >
                {themes.map(theme => (
                  <option key={theme} value={theme}>
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {(searchTerm || selectedDifficulty !== 'all' || selectedTheme !== 'all') && (
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear Filters
              </button>
            )}
          </div>
        </section>

        {/* View Mode Toggle */}
        <section className="view-controls">
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              📋 List View
            </button>
            <button
              className={`view-btn ${viewMode === 'explorer' ? 'active' : ''}`}
              onClick={() => setViewMode('explorer')}
            >
              🔍 Explorer
            </button>
          </div>
        </section>

        {/* Main Content */}
        <main className="openings-main">
          {viewMode === 'list' ? (
            <OpeningList
              openings={filteredOpenings}
              onOpeningSelect={handleOpeningSelect}
              selectedOpening={selectedOpening}
            />
          ) : (
            selectedOpening && (
              <OpeningExplorer
                opening={selectedOpening}
                onBack={handleBackToList}
              />
            )
          )}
        </main>

        {/* Learning Tips */}
        <section className="learning-tips">
          <h2>Opening Study Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>🎯 Start with Principles</h3>
              <p>Learn opening principles before memorizing specific moves. Control the center, develop pieces, and protect the king.</p>
            </div>
            <div className="tip-card">
              <h3>📚 Study Both Sides</h3>
              <p>Learn to play both sides of your chosen openings. This gives you a complete understanding and helps you anticipate opponent plans.</p>
            </div>
            <div className="tip-card">
              <h3>🔍 Understand Plans</h3>
              <p>Don't stop studying after the opening. Learn typical middlegame plans and strategies for your chosen openings.</p>
            </div>
            <div className="tip-card">
              <h3>⚡ Practice Regularly</h3>
              <p>Regular practice helps reinforce opening knowledge. Use the explorer to test your understanding.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Master Openings?</h2>
            <p>Start your opening study journey and build a strong chess foundation.</p>
            <div className="cta-buttons">
              <button 
                className="cta-btn primary"
                onClick={() => setViewMode('list')}
              >
                Explore Openings
              </button>
              <Link to="/resources" className="cta-btn secondary">
                Study Resources
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Openings; 