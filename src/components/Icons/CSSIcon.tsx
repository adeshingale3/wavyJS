import { motion } from "framer-motion";
import React, { useRef } from "react";

interface CssIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const CssIcon: React.FC<CssIconProps> = ({
  size = 200,
  color = "#264DE4", // CSS3 Blue
  className,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const getColorWithOpacity = (opacity: number) => {
    if (color.startsWith("#")) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  };
  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      className={["css-svg", className].filter(Boolean).join(" ")}
      style={{ width: "100%", height: "auto", maxWidth: size }}
      overflow="visible"
    >
      <rect width="128" height="128" fill={getColorWithOpacity(0.5)} filter="url(#glowSoft)" rx="16" />

      {/* CSS3 Logo */}
      <g transform="translate(20,25) scale(0.7)">
      <path fill="#264DE4" d="M19 3l9 100 36 10 36-10 9-100H19z" />
      <path fill="#2965F1" d="M64 116l29-8 8-92H64v100z" />
      <path fill="#EBEBEB" d="M64 52H44l-1-12h21V28H31l3 36h30V52zM64 82h-1l-15-4-1-11H35l2 23 27 7h1V82z" />
      <path fill="#fff" d="M64 52v12h19l-2 14-17 4v13l27-7 3-36H64zM64 28v12h33l1-12H64z" />
      </g>

      {/* Moving glow circle */}
      <motion.circle r="6" fill={color} filter="url(#circleGlow)"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}>
        <animateMotion dur="6s" repeatCount="indefinite" rotate="auto" path="M 0,0 H 128 V 128 H 0 Z"/>
      </motion.circle>

      {/* Filters */}
      <defs>
        <filter id="glowSoft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix in="blur" type="matrix"
            values="0 0 1 0 0
                    0 0.5 1 0 0
                    0 0 1 0 0
                    0 0 0 0.6 0"/>
          <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        <filter id="circleGlow" x="-50%" y="-50%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix in="blur" type="matrix"
            values="0 0 1 0 0
                    0 0.5 1 0 0
                    0 0 1 0 0
                    0 0 0 1 0"/>
          <feMerge><feMergeNode/><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
    </svg>
  );
};

export default CssIcon;
