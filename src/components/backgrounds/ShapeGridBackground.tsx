'use client';

import React, { useEffect, useState, useRef } from 'react';
import ShapeGrid from './ShapeGrid';

interface ShapeGridBackgroundProps {
  paused?: boolean;
}

export default function ShapeGridBackground({ paused = false }: ShapeGridBackgroundProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isTabVisible, setIsTabVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect theme from DOM class list
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };

    checkTheme();

    // Observe theme changes on html element
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Detect browser tab visibility state to pause animation and save battery
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const bgThemeColor = theme === 'light' ? '#FFFFFF' : '#121214';
  const borderThemeColor = theme === 'light' 
    ? 'rgba(0, 0, 0, 0.07)' // Clear, elegant black border lines on white background
    : 'rgba(255, 255, 255, 0.09)'; // High visibility grid lines on dark background
  
  // Saturated neobrutalist accent colors for hover
  const hoverThemeColor = theme === 'light'
    ? 'rgba(255, 78, 136, 0.12)' // Solid neon pink accent on light mode hover
    : 'rgba(0, 229, 255, 0.12)'; // Solid cian accent on dark mode hover

  const shouldPause = paused || !isTabVisible;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
    >
      <ShapeGrid
        direction="diagonal"
        speed={0.3}
        squareSize={48}
        shape="square"
        hoverTrailAmount={6}
        borderColor={borderThemeColor}
        hoverFillColor={hoverThemeColor}
        backgroundColor={bgThemeColor}
        paused={shouldPause}
      />
    </div>
  );
}
