import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface AnimatedTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  animationType?: 'typewriter' | 'fadeIn' | 'slideIn' | 'bounceIn' | 'glow' | 'wave';
  speed?: number;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  className = '',
  style = {},
  animationType = 'fadeIn',
  speed = 50,
  delay = 0,
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const { elementRef, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce,
  });

  // Typewriter effect
  useEffect(() => {
    if (animationType === 'typewriter' && isVisible && !isTyping) {
      setIsTyping(true);
      setCurrentIndex(0);
      setDisplayText('');
    }
  }, [isVisible, animationType, isTyping]);

  useEffect(() => {
    if (animationType === 'typewriter' && isTyping && currentIndex < children.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + children[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (animationType === 'typewriter' && currentIndex >= children.length) {
      setIsTyping(false);
    }
  }, [currentIndex, children, speed, animationType, isTyping]);

  const getAnimationClass = () => {
    if (!isVisible) return '';
    
    switch (animationType) {
      case 'typewriter':
        return '';
      case 'fadeIn':
        return 'animate-fade-in';
      case 'slideIn':
        return 'animate-fade-in-up';
      case 'bounceIn':
        return 'animate-bounce-in';
      case 'glow':
        return 'animate-glow';
      case 'wave':
        return 'animate-wave';
      default:
        return 'animate-fade-in';
    }
  };

  const getTextContent = () => {
    if (animationType === 'typewriter') {
      return displayText;
    }
    return children;
  };

  const textStyle = {
    animationDelay: `${delay}s`,
    ...style,
  };

  return (
    <span
      ref={elementRef as React.Ref<HTMLSpanElement>}
      className={`animated-text ${getAnimationClass()} ${className}`}
      style={textStyle}
      data-animation-type={animationType}
    >
      {getTextContent()}
      {animationType === 'typewriter' && isTyping && currentIndex < children.length && (
        <span className="typewriter-cursor">|</span>
      )}
    </span>
  );
};

export default AnimatedText; 