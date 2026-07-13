"use client";

import React, { useRef, useState, useEffect } from "react";

interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  pixelColor?: string;
  gridSize?: number;
  revealRadius?: number;
  className?: string;
}

export const PixelCard: React.FC<PixelCardProps> = ({
  children,
  pixelColor = "#FFDE4D", // Neo-Yellow default
  gridSize = 16,
  revealRadius = 80,
  className = "",
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRectRef = useRef<DOMRect | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        canvasRectRef.current = rect;
      }
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const draw = () => {
      if (!isHovered) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const rect = canvasRectRef.current || canvas.getBoundingClientRect();
      
      // Translate window mouse coords to canvas relative coords
      const localX = mouse.x - rect.left;
      const localY = mouse.y - rect.top;

      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pixelX = c * gridSize;
          const pixelY = r * gridSize;

          // Center of the current pixel block
          const centerX = pixelX + gridSize / 2;
          const centerY = pixelY + gridSize / 2;

          const dx = centerX - localX;
          const dy = centerY - localY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < revealRadius) {
            // Calculate opacity based on proximity to cursor
            const opacity = (1 - dist / revealRadius) * 0.4;
            ctx.fillStyle = pixelColor;
            ctx.globalAlpha = opacity;
            ctx.fillRect(pixelX, pixelY, gridSize - 1, gridSize - 1);
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    if (isHovered) {
      draw();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return () => {
      resizeObserver.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isHovered, gridSize, revealRadius, pixelColor]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseRef.current = { x: -1000, y: -1000 };
      }}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden border-4 border-(--c-border) bg-(--c-surface) text-(--c-text) shadow-[4px_4px_0px_0px_rgba(var(--c-shadow),1)] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(var(--c-shadow),1)] ${className}`}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{ pointerEvents: 'none' }}
      />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

export default PixelCard;
