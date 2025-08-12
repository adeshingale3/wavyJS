import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

export const FadingBG: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Grid configuration (kept internal for now)
  const numColumns = 18;
  const numRows = 16;
  const totalDots = numColumns * numRows;

  useEffect(() => {
    if (!containerRef.current) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });

      timeline.from('.box', {
        scale: 0,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
        stagger: {
          amount: 1.5,
          grid: [numColumns, numRows],
          axis: 'x',
          ease: 'back.out(1.7)',
          from: 'center',
        },
      });

      timeline.to('.box', {
        yoyo: true,
        scale: 1,
        repeat: 1,
        ease: 'power1.inOut',
        stagger: {
          amount: 1.5,
          grid: [numColumns, numRows],
          axis: 'y',
          ease: 'back.out(1.7)',
          from: 'center',
        },
      });
    }, containerRef);

    return () => context.revert();
  }, [numColumns, numRows]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0, // keep visible by default
        backgroundColor: 'black',
        overflow: 'hidden',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 5%, black 100%)',
        }}
      />
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${numRows}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: totalDots }).map((_, i) => (
          <div
            key={i}
            className="box"
            style={{
              width: 8,
              height: 8,
              backgroundColor: 'rgba(255,255,255,0.5)',
              borderRadius: 9999,
              justifySelf: 'center',
              alignSelf: 'center',
            }}
          />
        ))}
      </div>
    </div>
  );
};

FadingBG.displayName = 'FadingBG';

export default FadingBG;
