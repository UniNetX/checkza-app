import React from 'react';
import '../../styles/components/card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  accent?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', style = {}, onClick, accent = false }) => {
  return (
    <div
      className={`cz-card${accent ? ' cz-card-accent' : ''}${className ? ' ' + className : ''}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card; 