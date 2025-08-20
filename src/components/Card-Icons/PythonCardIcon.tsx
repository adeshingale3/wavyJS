import React from "react";
import { motion } from "framer-motion";

interface PythonCardIconProps {
  size?: number;
  color?: string;
  classname?: string;
}

const PythonCardIcon: React.FC<PythonCardIconProps> = ({
  size = 200,
  color = "#3776AB", // Python blue
  classname,
}) => {
  // Card dimensions
  const cardWidth = size * 0.3;
  const cardHeight = size * 0.4;
  const logoSize = size * 0.6;

  // Convert color to RGBA with opacity
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
      {/* Card Box */}
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
        {/* Content Center */}
        <div
          style={{ height: cardHeight, width: cardWidth }}
          className="relative inset-0 h-full flex items-center justify-center"
        >
          {/* Python SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
            width={logoSize}
            height={logoSize}
          >
            {/* Base square with glow */}
            <rect
              width="128"
              height="128"
              fill={getColorWithOpacity(0.0)}
              filter="url(#glowSoft)"
              rx="16"
            />

            {/* Python Logo */}
            <g transform="translate(12,20) scale(0.7)">
              <path
                fill="#3776AB"
                d="M63.6,2c-3.2,0-6.4,0.3-9.5,0.9c-8.4,1.5-9.9,4.7-9.9,10.6V25h20v3H44.2
                  c-6.6,0-12.3,4-14.1,11.5c-2.1,8.8-2.2,14.3,0,23.4C32,70,37.5,75,44.2,75h7.1v-10c0-6.9,6.1-13,13-13h20.9
                  c5.8,0,10.6-4.7,10.6-10.6V13.5c0-5.8-4.8-9.4-10.6-10.6C78.6,2.5,71.1,2,63.6,2z M55.6,9.5c2.3,0,4.1,1.8,4.1,4.1
                  s-1.8,4.1-4.1,4.1c-2.2,0-4.1-1.9-4.1-4.1C51.6,11.3,53.4,9.5,55.6,9.5z"
              />
              <path
                fill="#FFD43B"
                d="M91.8,28v10c0,7.2-6,13-13,13H57.9c-5.8,0-10.6,4.7-10.6,10.6v28.3c0,5.8,5,9.2,10.6,10.6
                  c6.7,1.6,13.1,1.9,20.9,0c5.3-1.2,10.6-3.7,10.6-10.6v-9.4h-20v-3h30c6.6,0,9-4.5,10.6-11.5c2.2-9.1,2.1-15.8,0-23.4
                  C108,32.5,101.7,28,95,28H91.8z M73.2,96c2.2,0,4.1,1.8,4.1,4.1s-1.9,4.1-4.1,4.1c-2.2,0-4.1-1.9-4.1-4.1
                  C69.1,97.9,71,96,73.2,96z"
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
                  values="0 0 1 0 0
                          0 0.5 1 0 0
                          0 0.5 0 0 0
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
                          0.9 0.9 0 0 0
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

export default PythonCardIcon;
