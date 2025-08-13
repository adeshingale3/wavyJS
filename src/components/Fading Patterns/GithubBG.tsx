import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

const GithubBG: React.FC = () => {
  const [boxCount, setBoxCount] = useState(0);
  const boxRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    function calculateBoxes() {
      if (!containerRef.current) return;

      const { clientWidth: width, clientHeight: height } = containerRef.current;
      const boxSize = 16;
      const cols = Math.floor(width / boxSize);
      const rows = Math.floor(height / boxSize);
      setBoxCount(cols * rows);
    }

    calculateBoxes();
    window.addEventListener('resize', calculateBoxes);
    return () => window.removeEventListener('resize', calculateBoxes);
  }, []);

  useEffect(() => {
    if (boxCount > 0) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * boxCount);
        const box = boxRefs.current[randomIndex];
        if (box) {
          gsap.fromTo(
            box,
            { opacity: 0.2 },
            { opacity: 1, duration: 0.3, yoyo: true, repeat: 1, ease: 'power1.inOut' }
          );
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [boxCount]);

  const getRandomColor = () => {
    const colors = [
      'rgba(0, 0, 0, 0.5)',
      'rgba(155, 233, 168, 0.5)',
      'rgba(64, 196, 99, 0.5)',
      'rgba(48, 161, 78, 0.5)',
      'rgba(33, 110, 57, 0.5)',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        overflow: 'hidden',
        position: 'relative', // important so inner grid is relative to parent
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 80%, black 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 16px)',
          gridAutoRows: '16px',
          gap: 8,
          padding: 24,
          alignContent: 'end',
        }}
      >
        {Array.from({ length: boxCount }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (boxRefs.current[i] = el)}
            style={{
              width: 16,
              height: 16,
              backgroundColor: getRandomColor(),
              borderRadius: 6,
            }}
          />
        ))}
      </div>
    </div>
  );
};

GithubBG.displayName = 'GithubBG';
export default GithubBG;
