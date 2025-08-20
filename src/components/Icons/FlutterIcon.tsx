import { motion } from "framer-motion";
import React, { useRef } from "react";

interface FlutterIconProps {
    size?: number;
    color?: string;
    className?: string;
}

const FlutterIcon: React.FC<FlutterIconProps> = ({
    size = 200,
    color = "#02569B", // Flutter blue
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
  className={["flutter-svg", className].filter(Boolean).join(" ")}
  style={{ width: "100%", height: "auto", maxWidth: size }}
  overflow="visible"
>
  {/* Background square */}
  <rect width="128" height="128" fill={getColorWithOpacity(0.5)} filter="url(#glowSoft)" rx="16" />

  {/* Flutter Logo, scaled to fit */}
  <g transform="translate(4,6) scale(0.2)">
    <path fill="#5cc8f8" d="M191.45,342.89,249.11,401,407.75,241.12H292.4Z" />
    <path fill="#5cc8f8" d="M292.4,66.69H407.75L162.61,313.82l-57.7-58.13Z" />
    <path fill="#075b9d" d="M249.11,401l43.29,43.59H407.75L306.8,342.89Z" />
    <path fill="url(#f)" d="M334.67,371.16,306.8,342.89,249.11,401Z" />
    <path fill="#16b9fd" d="M191.45,342.87l57.69-58.18,57.7,58.15L249.14,401Z" />
  </g>

  {/* Moving glow circle */}
  <motion.circle
    r="6"
    fill={color}
    filter="url(#circleGlow)"
    animate={{ scale: [1, 1.2, 1] }}
    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
  >
    <animateMotion dur="6s" repeatCount="indefinite" rotate="auto" path="M 0,0 H 128 V 128 H 0 Z" />
  </motion.circle>

  {/* Filters */}
  <defs>
    <filter id="glowSoft" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="0 0.4 1 0 0
                0 0.6 1 0 0
                0 0.9 1 0 0
                0 0 0 0.6 0"
      />
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="circleGlow" x="-50%" y="-50%" width="300%" height="300%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="0 0.5 1 0 0
                0 0.7 1 0 0
                0 0.9 1 0 0
                0 0 0 1 0"
      />
      <feMerge>
        <feMergeNode />
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
</svg>

    );
};

export default FlutterIcon;
