
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface ReactIconProps {
  size?: number;
  color?: string;
}

const ReactIcon: React.FC<ReactIconProps> = ({ 
  size = 200, 
  color = "cyan" 
}) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgRef.current) {
            gsap.to(svgRef.current, {
                rotate: 360,
                repeat: -1,
                duration: 6
            });
        }
    }, []);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 841.9 595.3"
      width={size}
      height={size}
      fill="none"
      className="svg"
    >
      {/* Base React logo (3 ellipses) with softer glow */}
      <g
        stroke={color}
        strokeWidth="20"
        opacity="0.5"
        filter="url(#glowSoft)"
      >
        <ellipse cx="420.9" cy="296.5" rx="300" ry="120" />
        <ellipse
          cx="420.9"
          cy="296.5"
          rx="300"
          ry="120"
          transform="rotate(60 420.9 296.5)"
        />
        <ellipse
          cx="420.9"
          cy="296.5"
          rx="300"
          ry="120"
          transform="rotate(120 420.9 296.5)"
        />
      </g>

      {/* Glowing moving circle (kept strong) */}
      <motion.circle
        r="14"
        fill={color}
        filter="url(#circleGlow)"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <animateMotion
          dur="5s"
          repeatCount="indefinite"
          rotate="auto"
          path="M 120,296.5 A 300,120 0 1,1 721,296.5 A 300,120 0 1,1 120,296.5 Z"
        />
      </motion.circle>

      {/* Glow filters */}
      <defs>
        {/* Softer glow for ellipses */}
        <filter id="glowSoft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0  0
                    0 0 0 0  1
                    0 0 0 0  1
                    0 0 0 0.7  0"
            result="glowColor"
          />
          <feMerge>
            <feMergeNode in="glowColor" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Strong glow for circle */}
        <filter id="circleGlow" x="-50%" y="-50%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0  0
                    0 0 0 0  1
                    0 0 0 0  1
                    0 0 0 1  0"
            result="glowColor"
          />
          <feMerge>
            <feMergeNode in="glowColor" />
            <feMergeNode in="glowColor" />
            <feMergeNode in="glowColor" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

export default ReactIcon;
