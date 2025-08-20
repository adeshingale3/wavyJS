import React from "react";
import { motion } from "framer-motion";

interface FlutterCardIconProps {
  size?: number;
  color?: string;
  classname?: string;
}

const FlutterCardIcon: React.FC<FlutterCardIconProps> = ({
  size = 200,
  color = "#02569B", // Flutter blue
  classname,
}) => {
  // Card size
  const cardWidth = size * 0.3;
  const cardHeight = size * 0.4;
  const logoSize = size * 0.6;

  // Convert color to rgba with opacity
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
    <motion.div
      className={["relative", classname].filter(Boolean).join(" ")}
      animate={{ rotateY: 360 }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      style={{ width: cardWidth, height: cardHeight }}
    >
      <div
        className="relative rounded-md backdrop-blur-md border shadow-2xl z-10"
        style={{
          width: cardWidth,
          height: cardHeight,
          backgroundColor: getColorWithOpacity(0.1),
          borderColor: getColorWithOpacity(0.6),
          boxShadow: `0 0 25px ${getColorWithOpacity(0.4)}`,
        }}
      >
        {/* Card content */}
        <div
          style={{ height: cardHeight, width: cardWidth }}
          className="relative inset-0 h-full flex items-center justify-center"
        >
          {/* Flutter SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
            width={logoSize}
            height={logoSize}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Base square with glow */}
            <rect
              width="128"
              height="128"
              fill={getColorWithOpacity(0.0)}
              filter="url(#glowSoft)"
              rx="16"
            />

            {/* Flutter Logo */}
            <g transform="translate(4,6) scale(0.2)">
              <path
                fill="#5cc8f8"
                d="M191.45,342.89,249.11,401,407.75,241.12H292.4Z"
              />
              <path
                fill="#5cc8f8"
                d="M292.4,66.69H407.75L162.61,313.82l-57.7-58.13Z"
              />
              <path
                fill="#075b9d"
                d="M249.11,401l43.29,43.59H407.75L306.8,342.89Z"
              />
              <path fill="url(#f)" d="M334.67,371.16,306.8,342.89,249.11,401Z" />
              <path
                fill="#16b9fd"
                d="M191.45,342.87l57.69-58.18,57.7,58.15L249.14,401Z"
              />
            </g>

            {/* Glowing moving circle */}
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
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                rotate="auto"
                path="M 0,0 H 128 V 128 H 0 Z"
              />
            </motion.circle>

            {/* Filters */}
            <defs>
              <filter
                id="glowSoft"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="4"
                  result="blur"
                />
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

              <filter
                id="circleGlow"
                x="-50%"
                y="-50%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="6"
                  result="blur"
                />
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
        </div>
      </div>

      {/* Outer gradient glow */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent rounded-full blur-4xl scale-200"
        style={{
          background: `linear-gradient(to right, transparent, ${getColorWithOpacity(
            0.05
          )}, transparent)`,
        }}
      ></div>
    </motion.div>
  );
};

export default FlutterCardIcon;
