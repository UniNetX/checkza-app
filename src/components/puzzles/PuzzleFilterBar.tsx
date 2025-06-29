import React, { useState } from 'react';
import './PuzzleFilterBar.css';

export interface PuzzleFilters {
  minRating: number;
  maxRating: number;
  themes: string[];
}

interface PuzzleFilterBarProps {
  filters: PuzzleFilters;
  onFiltersChange: (filters: PuzzleFilters) => void;
  isLoading?: boolean;
}

const AVAILABLE_THEMES = [
  'advantage',
  'endgame',
  'middlegame',
  'opening',
  'tactics',
  'strategy',
  'mate',
  'mateIn1',
  'mateIn2',
  'mateIn3',
  'mateIn4',
  'mateIn5',
  'mateIn6',
  'mateIn7',
  'mateIn8',
  'fork',
  'pin',
  'skewer',
  'discoveredAttack',
  'doubleCheck',
  'backRankMate',
  'smotheredMate',
  'sacrifice',
  'defensiveMove',
  'zugzwang',
  'interference',
  'quietMove',
  'veryLong',
  'short',
  'oneMove',
  'trappedPiece',
  'windmill',
  'xRayAttack',
  'underPromotion',
  'promotion',
  'attraction',
  'clearance',
  'deflection',
  'overloading',
  'removingTheGuard',
  'simplification',
  'equalGame',
  'crushing',
  'mate',
  'anastasiaMate',
  'arabianMate',
  'hookMate',
  'cornerMate',
  'dovetailMate',
  'kingsideAttack',
  'queensideAttack',
  'queensGambit',
  'kingsGambit',
  'sicilianDefense',
  'frenchDefense',
  'caroKannDefense',
  'pircDefense',
  'modernDefense',
  'alekhineDefense',
  'scandinavianDefense',
  'budapestGambit',
  'latvianGambit',
  'elephantGambit',
  'englundGambit',
  'benkoGambit',
  'benoniDefense',
  'dutchDefense',
  'birdOpening',
  'englishOpening',
  'retiOpening',
  'nimzoIndianDefense',
  'queensIndianDefense',
  'bogoIndianDefense',
  'grunfeldDefense',
  'kingsIndianDefense',
  'catalanOpening',
  'londonSystem',
  'colleSystem',
  'stonewallAttack',
  'trompowskyAttack',
  'torreAttack',
  'veresovAttack',
  'budapestGambit',
  'latvianGambit',
  'elephantGambit',
  'englundGambit',
  'benkoGambit',
  'benoniDefense',
  'dutchDefense',
  'birdOpening',
  'englishOpening',
  'retiOpening',
  'nimzoIndianDefense',
  'queensIndianDefense',
  'bogoIndianDefense',
  'grunfeldDefense',
  'kingsIndianDefense',
  'catalanOpening',
  'londonSystem',
  'colleSystem',
  'stonewallAttack',
  'trompowskyAttack',
  'torreAttack',
  'veresovAttack'
];

const RATING_RANGES = [
  { label: 'All Ratings', min: 0, max: 3000 },
  { label: 'Beginner (0-1200)', min: 0, max: 1200 },
  { label: 'Intermediate (1200-1800)', min: 1200, max: 1800 },
  { label: 'Advanced (1800-2200)', min: 1800, max: 2200 },
  { label: 'Expert (2200-2500)', min: 2200, max: 2500 },
  { label: 'Master (2500+)', min: 2500, max: 3000 }
];

const PuzzleFilterBar: React.FC<PuzzleFilterBarProps> = ({
  filters,
  onFiltersChange,
  isLoading = false
}) => {
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRatingChange = (min: number, max: number) => {
    onFiltersChange({
      ...filters,
      minRating: min,
      maxRating: max
    });
  };

  const handleThemeToggle = (theme: string) => {
    const newThemes = filters.themes.includes(theme)
      ? filters.themes.filter(t => t !== theme)
      : [...filters.themes, theme];
    
    onFiltersChange({
      ...filters,
      themes: newThemes
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      minRating: 0,
      maxRating: 3000,
      themes: []
    });
  };

  const filteredThemes = AVAILABLE_THEMES.filter(theme =>
    theme.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedRatingRange = RATING_RANGES.find(
    range => range.min === filters.minRating && range.max === filters.maxRating
  );

  return (
    <div className="puzzle-filter-bar">
      <div className="filter-container">
        {/* Rating Range Filter */}
        <div className="filter-group">
          <label className="filter-label">Rating Range</label>
          <div className="rating-selector">
            <button
              className={`rating-dropdown ${isLoading ? 'loading' : ''}`}
              onClick={() => setIsThemeDropdownOpen(false)}
              disabled={isLoading}
            >
              <span className="rating-label">
                {selectedRatingRange?.label || 'Custom Range'}
              </span>
              <span className="rating-range">
                {filters.minRating}-{filters.maxRating}
              </span>
              <svg className="dropdown-arrow" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
            <div className="rating-options">
              {RATING_RANGES.map((range) => (
                <button
                  key={range.label}
                  className={`rating-option ${
                    range.min === filters.minRating && range.max === filters.maxRating
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => handleRatingChange(range.min, range.max)}
                >
                  <span className="option-label">{range.label}</span>
                  <span className="option-range">{range.min}-{range.max}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Theme Filter */}
        <div className="filter-group">
          <label className="filter-label">Themes</label>
          <div className="theme-selector">
            <button
              className={`theme-dropdown ${isThemeDropdownOpen ? 'open' : ''} ${isLoading ? 'loading' : ''}`}
              onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              disabled={isLoading}
            >
              <span className="theme-label">
                {filters.themes.length === 0
                  ? 'All Themes'
                  : filters.themes.length === 1
                  ? filters.themes[0]
                  : `${filters.themes.length} Themes Selected`}
              </span>
              <svg className="dropdown-arrow" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>
            
            {isThemeDropdownOpen && (
              <div className="theme-dropdown-content">
                <div className="theme-search">
                  <input
                    type="text"
                    placeholder="Search themes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="theme-search-input"
                  />
                </div>
                <div className="theme-options">
                  {filteredThemes.map((theme) => (
                    <label key={theme} className="theme-option">
                      <input
                        type="checkbox"
                        checked={filters.themes.includes(theme)}
                        onChange={() => handleThemeToggle(theme)}
                        className="theme-checkbox"
                      />
                      <span className="theme-name">{theme}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Clear Filters */}
        {(filters.themes.length > 0 || filters.minRating > 0 || filters.maxRating < 3000) && (
          <button
            className="clear-filters-btn"
            onClick={handleClearFilters}
            disabled={isLoading}
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {(filters.themes.length > 0 || filters.minRating > 0 || filters.maxRating < 3000) && (
        <div className="active-filters">
          {filters.minRating > 0 || filters.maxRating < 3000 ? (
            <span className="active-filter">
              Rating: {filters.minRating}-{filters.maxRating}
              <button
                onClick={() => handleRatingChange(0, 3000)}
                className="remove-filter"
              >
                ×
              </button>
            </span>
          ) : null}
          {filters.themes.map((theme) => (
            <span key={theme} className="active-filter">
              {theme}
              <button
                onClick={() => handleThemeToggle(theme)}
                className="remove-filter"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PuzzleFilterBar; 