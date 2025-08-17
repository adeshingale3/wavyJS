
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";


interface JavaScriptIconProps {
  size?: number;
  color?: string;
}

const JavaScriptIcon: React.FC<JavaScriptIconProps> = ({ 
  size = 200, 
  color = "#f7df1e" 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 630 630"
      width={size}
      height={size}
      className="js-svg"
      overflow="visible"
    >
      {/* Base JS square with soft glow */}
      <rect
        width="630"
        height="630"
        fill={color}
        filter="url(#glowSoft)"
        rx="30"
      />

      {/* Letters JS */}
      <text
        x="50%"
        y="60%"
        textAnchor="middle"
        fontSize="280"
        fontWeight="bold"
        fill="black"
        fontFamily="Arial, sans-serif"
      >
        JS
      </text>

      {/* Glowing moving circle (now on the border) */}
      <motion.circle
        r="18"
        fill={color}
        filter="url(#circleGlow)"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Path hugs the outer border */}
        <animateMotion
          dur="6s"
          repeatCount="indefinite"
          rotate="auto"
          path="M 0,0 H 630 V 630 H 0 Z"
        />
      </motion.circle>

      {/* Glow filters */}
      <defs>
        {/* Softer glow for square */}
        <filter id="glowSoft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 1 0 0  0
                    1 1 0 0  0
                    0 0 0 0  0
                    0 0 0 0.6  0"
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
            values="1 1 0 0  0
                    1 1 0 0  0
                    0 0 0 0  0
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

export default JavaScriptIcon;
