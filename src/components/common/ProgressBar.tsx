import React from 'react';
import '../../styles/components/progressBar.css';

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
  size = 'medium',
  variant = 'primary',
  className = ''
}) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={`progress-bar-container ${size} ${variant} ${className}`}>
      {label && <div className="progress-label">{label}</div>}
      <div className="progress-bar-wrapper">
        <div 
          className="progress-bar-fill"
          style={{ width: `${clampedProgress}%` }}
        />
        {showPercentage && (
          <div className="progress-percentage">
            {Math.round(clampedProgress)}%
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar; 