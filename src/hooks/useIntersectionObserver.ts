import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  animationClass?: string;
  delay?: number;
  duration?: number;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    animationClass = 'visible',
    delay = 0,
    duration = 0.8
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [animationState, setAnimationState] = useState<'idle' | 'entering' | 'entered' | 'exiting'>('idle');
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setAnimationState('entering');
          element.classList.add(animationClass);
          
          // Add animation delay if specified
          if (delay > 0) {
            setTimeout(() => {
              setAnimationState('entered');
            }, delay * 1000);
          } else {
            setAnimationState('entered');
          }
          
          if (triggerOnce) {
            setHasTriggered(true);
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
          setAnimationState('exiting');
          element.classList.remove(animationClass);
          setTimeout(() => {
            setAnimationState('idle');
          }, duration * 1000);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce, animationClass, delay, duration]);

  return { elementRef, isVisible, hasTriggered, animationState };
};

// Enhanced hook for staggered animations
export const useStaggeredAnimation = (
  items: any[],
  delay: number = 100,
  options: UseIntersectionObserverOptions = {}
) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [animationQueue, setAnimationQueue] = useState<number[]>([]);
  const { elementRef, isVisible } = useIntersectionObserver(options);

  useEffect(() => {
    if (isVisible) {
      const queue = items.map((_, index) => index);
      setAnimationQueue(queue);
      
      queue.forEach((index) => {
        setTimeout(() => {
          setVisibleItems(prev => new Set([...Array.from(prev), index]));
        }, index * delay);
      });
    }
  }, [isVisible, items, delay]);

  const isItemVisible = useCallback((index: number) => {
    return visibleItems.has(index);
  }, [visibleItems]);

  return { elementRef, visibleItems, isItemVisible, animationQueue };
};

// Enhanced parallax hook with better performance
export const useParallax = (speed: number = 0.5, enabled: boolean = true) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLElement | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      if (elementRef.current) {
        animationFrameRef.current = requestAnimationFrame((timestamp) => {
          const rect = elementRef.current!.getBoundingClientRect();
          const scrolled = window.pageYOffset;
          const rate = scrolled * -speed;
          setOffset(rate);
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [speed, enabled]);

  return { elementRef, offset };
};

// Enhanced smooth scroll hook
export const useSmoothScroll = () => {
  const scrollToElement = useCallback((elementId: string, offset: number = 0, duration: number = 800) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      requestAnimationFrame(animation);
    }
  }, []);

  const scrollToTop = useCallback((duration: number = 800) => {
    const startPosition = window.pageYOffset;
    const distance = -startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  }, []);

  return { scrollToElement, scrollToTop };
};

// Easing function for smooth scrolling
const easeInOutCubic = (t: number, b: number, c: number, d: number): number => {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t * t + b;
  t -= 2;
  return c / 2 * (t * t * t + 2) + b;
};

// New hook for scroll-triggered animations with different effects
export const useScrollAnimation = (
  animationType: 'fade' | 'slide' | 'scale' | 'rotate' | 'blur' = 'fade',
  threshold: number = 0.1,
  rootMargin: string = '0px'
) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const progress = entry.intersectionRatio;
          setAnimationProgress(progress);
        }
      },
      {
        threshold: Array.from({ length: 10 }, (_, i) => i * 0.1),
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin]);

  const getAnimationStyle = useCallback(() => {
    const progress = animationProgress;
    
    switch (animationType) {
      case 'fade':
        return {
          opacity: progress,
          transform: `translateY(${20 * (1 - progress)}px)`,
        };
      case 'slide':
        return {
          transform: `translateX(${50 * (1 - progress)}px)`,
        };
      case 'scale':
        return {
          transform: `scale(${0.8 + progress * 0.2})`,
        };
      case 'rotate':
        return {
          transform: `rotate(${45 * (1 - progress)}deg)`,
        };
      case 'blur':
        return {
          filter: `blur(${4 * (1 - progress)}px)`,
        };
      default:
        return {};
    }
  }, [animationProgress, animationType]);

  return { elementRef, animationProgress, getAnimationStyle };
};

// Hook for magnetic effect on hover
export const useMagneticEffect = (strength: number = 0.3) => {
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      setMagneticOffset({ x: deltaX, y: deltaY });
    }
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setMagneticOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return { elementRef, magneticOffset };
};

// Hook for tilt effect on hover
export const useTiltEffect = (maxTilt: number = 15) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      setTilt({
        x: deltaY * maxTilt,
        y: -deltaX * maxTilt,
      });
    }
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return { elementRef, tilt };
}; 