"use client";

import React, { useState } from "react";

interface CardSwapProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export const CardSwap: React.FC<CardSwapProps> = ({
  front,
  back,
  className = "",
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("play-click"));
    }
  };

  return (
    <div
      onClick={handleFlip}
      className={`relative cursor-pointer select-none h-full w-full ${className}`}
      style={{ perspective: 1000 }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 ease-out will-change-transform"
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {front}
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
};

export default CardSwap;
