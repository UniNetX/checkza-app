import React, { useRef, useEffect, useState } from 'react';
import { useIntersectionObserver, useMagneticEffect, useTiltEffect } from '../../hooks/useIntersectionObserver';

interface AdvancedAnimatedCardProps {
  children: React.ReactNode;
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'zoomIn' | 'slideInUp' | 'bounceIn' | 'elasticIn';
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  stagger?: boolean;
  staggerIndex?: number;
  hoverEffect?: 'magnetic' | 'tilt' | 'scale' | 'glow' | 'none';
  parallax?: boolean;
  parallaxSpeed?: number;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

const AdvancedAnimatedCard: React.FC<AdvancedAnimatedCardProps> = ({
  children,
  animationType = 'fadeInUp',
  delay = 0,
  duration = 0.8,
  className = '',
  style = {},
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  stagger = false,
  staggerIndex = 0,
  hoverEffect = 'magnetic',
  parallax = false,
  parallaxSpeed = 0.5,
  onAnimationStart,
  onAnimationComplete
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { elementRef, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce,
    delay: stagger ? delay + (staggerIndex * 0.1) : delay,
    duration
  });

  const { elementRef: magneticRef, magneticOffset } = useMagneticEffect(0.3);
  const { elementRef: tiltRef, tilt } = useTiltEffect(15);

  // Combine refs for different effects
  const combinedRef = (node: HTMLDivElement | null) => {
    if (elementRef.current !== node) {
      (elementRef as any).current = node;
    }
    if (hoverEffect === 'magnetic' && magneticRef.current !== node) {
      (magneticRef as any).current = node;
    }
    if (hoverEffect === 'tilt' && tiltRef.current !== node) {
      (tiltRef as any).current = node;
    }
  };

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      onAnimationStart?.();
      
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
      willChange: 'transform, opacity',
      ...style
    };

    // Apply hover effects
    let hoverStyles: React.CSSProperties = {};
    if (isHovered) {
      switch (hoverEffect) {
        case 'magnetic':
          hoverStyles = { 
            transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px)` 
          };
          break;
        case 'tilt':
          hoverStyles = { 
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` 
          };
          break;
        case 'scale':
          hoverStyles = { transform: 'scale(1.05)' };
          break;
        case 'glow':
          hoverStyles = { 
            boxShadow: '0 0 30px rgba(67, 233, 123, 0.3)',
            transform: 'translateY(-5px)'
          };
          break;
      }
    }

    // Apply animation type
    let animationStyles: React.CSSProperties = {};
    switch (animationType) {
      case 'fadeInLeft':
        animationStyles = {
          transform: isVisible ? 'translateX(0)' : 'translateX(-50px)'
        };
        break;
      case 'fadeInRight':
        animationStyles = {
          transform: isVisible ? 'translateX(0)' : 'translateX(50px)'
        };
        break;
      case 'zoomIn':
        animationStyles = {
          transform: isVisible ? 'scale(1)' : 'scale(0.8)'
        };
        break;
      case 'slideInUp':
        animationStyles = {
          transform: isVisible ? 'translateY(0)' : 'translateY(100px)'
        };
        break;
      case 'bounceIn':
        animationStyles = {
          transform: isVisible ? 'scale(1)' : 'scale(0.3)',
          transition: `all ${duration}s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}s`
        };
        break;
      case 'elasticIn':
        animationStyles = {
          transform: isVisible ? 'scale(1)' : 'scale(0.5)',
          transition: `all ${duration}s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}s`
        };
        break;
    }

    return {
      ...baseStyles,
      ...animationStyles,
      ...hoverStyles
    };
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      ref={combinedRef}
      className={`advanced-animated-card ${className}`}
      style={getAnimationStyles()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-animation-type={animationType}
      data-hover-effect={hoverEffect}
    >
      {children}
    </div>
  );
};

export default AdvancedAnimatedCard; 