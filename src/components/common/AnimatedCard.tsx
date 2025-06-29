import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
  style = {},
}) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const cardStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.6s ease, transform 0.6s ease',
    ...style,
  };

  return (
    <div
      ref={elementRef as React.Ref<HTMLDivElement>}
      className={`cz-module-card ${isVisible ? 'visible' : ''} ${className}`}
      style={cardStyle}
    >
      {children}
    </div>
  );
};

export default AnimatedCard; 