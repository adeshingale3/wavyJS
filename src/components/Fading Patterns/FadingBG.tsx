import React, { useEffect } from 'react';
import gsap from 'gsap';

export interface FadingBGProps {
  rows?: number;
  cols?: number;
  dotSize?: number;
  dotColor?: string;
  animationDuration?: number;
}

export const FadingBG: React.FC<FadingBGProps> = ({
  rows = 16,
  cols = 18,
  dotSize = 8,
  dotColor = 'bg-white/40',
  animationDuration = 1.5,
}) => {
  useEffect(() => {
    const boxes = gsap.utils.toArray('.fading-box');

    gsap.fromTo(
      boxes,
      { scale: 0, opacity: 0.3 },
      {
        scale: 1,
        opacity: 0.8,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
        duration: animationDuration,
        stagger: {
          each: 0.015,
          from: 'center',
        },
      }
    );
  }, [animationDuration, rows, cols]);

  return (
<div className="fixed top-0 left-0 z-[-999] bg-black w-screen h-screen overflow-hidden">      <div className="absolute inset-0 z-2 bg-radial from-transparent from-5% to-black" />
      <div
        className="relative z-1 h-full w-full grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array(rows * cols).fill(0).map((_, i) => (
          <div
            key={i}
            className={`fading-box rounded-full ${dotColor}`}
            style={{ width: dotSize, height: dotSize }}
          />
        ))}
      </div>
    </div>
  );
};

FadingBG.displayName = 'FadingBG';
