import { motion } from "framer-motion";
import React, { useRef } from "react";

interface TailwindIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const TailwindIcon: React.FC<TailwindIconProps> = ({
  size = 200,
  color = "#38BDF8", // Tailwind default blue
  className,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      className={["tailwind-svg", className].filter(Boolean).join(" ")}
      style={{ width: "100%", height: "auto", maxWidth: size }}
      overflow="visible"
    >   
      {/* White square with glow (like JS icon) */}
      <rect
        width="128"
        height="128"
        fill="white"
        filter="url(#glowSoft)"
        rx="16"
      />

      {/* Tailwind Logo */}
      <g transform="scale(4) translate(1,0)">
        <path
          fill={color}
          d="M16 7.999c-4.267 0-6.933 2.133-8 6.4 1.6-2.134 3.467-2.934 5.6-2.4 1.218.304 2.09 1.19 3.055 2.164C18.187 15.7 19.406 16.933 22.4 16.933c4.267 0 6.933-2.133 8-6.4-1.6 2.134-3.467 2.934-5.6 2.4-1.218-.304-2.09-1.19-3.055-2.164C19.813 9.233 18.594 7.999 16 7.999zM8 16c-4.267 0-6.933 2.133-8 6.4 1.6-2.134 3.467-2.934 5.6-2.4 1.218.304 2.09 1.19 3.055 2.164C10.187 23.7 11.406 24.933 14.4 24.933c4.267 0 6.933-2.133 8-6.4-1.6 2.134-3.467 2.934-5.6 2.4-1.218-.304-2.09-1.19-3.055-2.164C11.813 17.233 10.594 16 8 16z"
        />
      </g>

      {/* Glowing moving circle around border */}
      <motion.circle
        r="6"
        fill={color}
        filter="url(#circleGlow)"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Path hugs the outer border of 128x128 square */}
        <animateMotion
          dur="6s"
          repeatCount="indefinite"
          rotate="auto"
          path="M 0,0 H 128 V 128 H 0 Z"
        />
      </motion.circle>

      {/* Glow filters */}
      <defs>
        {/* Soft glow for square */}
        <filter id="glowSoft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 1 0  0
                    0 0 1 0  0
                    0 0 1 0  0
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
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0  0
                    0 0 1 0  0
                    0 0 1 0  0
                    0 0 0 1  0"
            result="glowColor"
          />
          <feMerge>
            <feMergeNode in="glowColor" />
            <feMergeNode in="glowColor" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

export default TailwindIcon;
