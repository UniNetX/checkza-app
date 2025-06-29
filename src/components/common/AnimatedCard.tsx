import React, { useRef, useEffect, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface AnimatedCardProps {
  children: React.ReactNode;
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'zoomIn' | 'slideInUp' | 'bounceIn';
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  animationType = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  className = '',
  style = {},
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  onAnimationStart,
  onAnimationComplete
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  const { elementRef, isVisible, hasTriggered } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce,
    delay,
    duration
  });

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      onAnimationStart?.();
      
      // Trigger animation complete callback after animation duration
      const timer = setTimeout(() => {
        onAnimationComplete?.();
      }, (delay + duration) * 1000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, hasAnimated, delay, duration, onAnimationStart, onAnimationComplete]);

  const getAnimationStyles = () => {
    const baseStyles: React.CSSProperties = {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: `all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
      ...style
    };

    switch (animationType) {
      case 'fadeInLeft':
        return {
          ...baseStyles,
          transform: isVisible ? 'translateX(0)' : 'translateX(-50px)'
        };
      case 'fadeInRight':
        return {
          ...baseStyles,
          transform: isVisible ? 'translateX(0)' : 'translateX(50px)'
        };
      case 'zoomIn':
        return {
          ...baseStyles,
          transform: isVisible ? 'scale(1)' : 'scale(0.8)'
        };
      case 'slideInUp':
        return {
          ...baseStyles,
          transform: isVisible ? 'translateY(0)' : 'translateY(100px)'
        };
      case 'bounceIn':
        return {
          ...baseStyles,
          transform: isVisible ? 'scale(1)' : 'scale(0.3)',
          transition: `all ${duration}s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}s`
        };
      default:
        return baseStyles;
    }
  };

  return (
    <div
      ref={elementRef as React.Ref<HTMLDivElement>}
      className={`animated-card ${className}`}
      style={getAnimationStyles()}
    >
      {children}
    </div>
  );
};

export default AnimatedCard; 