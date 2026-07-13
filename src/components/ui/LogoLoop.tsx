"use client";

import React from "react";

interface LogoLoopProps {
  items: React.ReactNode[];
  speed?: "slow" | "medium" | "fast";
  direction?: "left" | "right";
  className?: string;
}

export const LogoLoop: React.FC<LogoLoopProps> = ({
  items,
  speed = "medium",
  direction = "left",
  className = "",
}) => {
  // Map speed to animation duration
  const duration = speed === "slow" ? "50s" : speed === "fast" ? "20s" : "35s";

  return (
    <div className={`relative w-full overflow-hidden py-2 ${className}`}>
      {/* Absolute gradient fade edges for visual depth */}
      <div className="absolute inset-y-0 left-0 w-8 bg-linear-to-r from-white to-transparent dark:from-(--c-bg) z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-8 bg-linear-to-l from-white to-transparent dark:from-(--c-bg) z-10 pointer-events-none" />

      <div
        className="flex w-max hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${duration} linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {/* Render twice for seamless loop */}
        <div className="flex gap-4 px-2">
          {items.map((item, idx) => (
            <div key={`loop-1-${idx}`} className="shrink-0">
              {item}
            </div>
          ))}
        </div>
        <div className="flex gap-4 px-2" aria-hidden="true">
          {items.map((item, idx) => (
            <div key={`loop-2-${idx}`} className="shrink-0">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoLoop;
