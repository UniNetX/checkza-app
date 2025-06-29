import React from 'react';
import '../../styles/components/filterChip.css';

interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  active = false,
  onClick,
  variant = 'default',
  size = 'medium',
  disabled = false,
  icon,
  className = ''
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`filter-chip ${variant} ${size} ${active ? 'active' : ''} ${disabled ? 'disabled' : ''} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      type="button"
    >
      {icon && <span className="filter-chip-icon">{icon}</span>}
      <span className="filter-chip-label">{label}</span>
    </button>
  );
};

export default FilterChip; 