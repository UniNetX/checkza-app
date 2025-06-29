import React from 'react';
import { Opening } from './OpeningExplorer';

interface OpeningListProps {
  openings: Opening[];
  onOpeningSelect: (opening: Opening) => void;
  selectedOpening?: Opening;
  viewMode?: 'grid' | 'list';
}

const OpeningList: React.FC<OpeningListProps> = ({ 
  openings, 
  onOpeningSelect, 
  selectedOpening,
  viewMode = 'grid'
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  return (
    <div className={`openings-card-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
      {openings.map((opening) => (
        <div
          key={opening.id}
          className={`opening-card ${selectedOpening?.id === opening.id ? 'selected' : ''}`}
          onClick={() => onOpeningSelect(opening)}
        >
          {/* Card Header */}
          <div className="opening-card-header">
            <div className="opening-card-title-row">
              <h3 className="opening-card-name">{opening.name}</h3>
              <span className="opening-card-eco">{opening.eco}</span>
            </div>
            <span
              className="opening-card-difficulty"
              style={{ backgroundColor: getDifficultyColor(opening.difficulty) }}
            >
              {getDifficultyLabel(opening.difficulty)}
            </span>
          </div>

          {/* Card Description */}
          <div className="opening-card-description">
            {opening.description}
          </div>

          {/* Card Themes */}
          <div className="opening-card-themes">
            {opening.themes.map(theme => (
              <span key={theme} className="opening-theme-chip">{theme}</span>
            ))}
          </div>

          {/* Card Variations */}
          <div className="opening-card-variations">
            <span className="variations-label">Variations:</span>
            <span className="variations-count">{opening.variations.length}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OpeningList; 