import { useEffect, useRef, useState } from 'react';

export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const elementOffset = rect.top + scrollTop;
        const windowHeight = window.innerHeight;
        const scrollPosition = scrollTop + windowHeight;
        const distance = scrollPosition - elementOffset;
        setOffset(distance * speed);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  const style = { transform: `translateY(${offset}px)` };
  return { ref, style };
} 