"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from "framer-motion";

interface DecayCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  maxTilt?: number;
}

export const DecayCard: React.FC<DecayCardProps> = ({
  children,
  maxTilt = 15,
  className = "",
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasTouch = window.matchMedia("(pointer: coarse)").matches || 
                       'ontouchstart' in window || 
                       navigator.maxTouchPoints > 0 || 
                       ('msMaxTouchPoints' in navigator && 
                        (navigator as Navigator & { msMaxTouchPoints: number }).msMaxTouchPoints > 0);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsTouch(hasTouch);
    }
  }, []);

  // Motion values for tracking cursor offset (-0.5 to 0.5)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative positions from 0 to 1
    const relativeX = (e.clientX - rect.left) / width;
    const relativeY = (e.clientY - rect.top) / height;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    // Smoothly reset back to center
    x.set(0.5);
    y.set(0.5);
  };

  if (isTouch) {
    return (
      <div className={`inline-block w-full h-full ${className}`}>
        <motion.div
          ref={cardRef}
          className={`neo-card h-full w-full p-6 relative`}
          {...props}
        >
          <div className="relative z-10 w-full h-full">
            {children}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      style={{ perspective: 1000 }}
      className={`inline-block w-full h-full ${className}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`neo-card h-full w-full p-6 relative select-none`}
        {...props}
      >
        {/* Shadow glow layer visible only on hover */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="relative z-10 w-full h-full"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default DecayCard;
