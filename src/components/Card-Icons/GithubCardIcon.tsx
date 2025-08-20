import React from "react";
import { motion } from "framer-motion";

interface GithubCardIconProps {
  size?: number;
  color?: string;
  classname?: string;
}

const GithubCardIcon: React.FC<GithubCardIconProps> = ({
  size = 200,
  color = "#000000", // GitHub black
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
          backgroundColor: getColorWithOpacity(0.05),
          borderColor: getColorWithOpacity(0.4),
          boxShadow: `0 0 25px ${getColorWithOpacity(0.3)}`,
        }}
      >
        {/* Content Center */}
        <div
          style={{ height: cardHeight, width: cardWidth }}
          className="relative inset-0 h-full flex items-center justify-center"
        >
          {/* GitHub SVG */}
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
              fill="white"
              filter="url(#glowSoft)"
              rx="16"
            />

            {/* GitHub Logo */}
            <g transform="translate(10,10) scale(0.85)">
              <path
                fill={color}
                d="M64,2C30.6,2,3.3,29.3,3.3,62.7c0,26.8,17.3,49.5,41.3,57.5c3,0.6,4.1-1.3,4.1-2.9
                  c0-1.4-0.1-6-0.1-10.9c-16.8,3.6-20.3-7.1-20.3-7.1c-2.7-6.8-6.7-8.6-6.7-8.6c-5.5-3.8,0.4-3.7,0.4-3.7c6,0.4,9.2,6.2,9.2,6.2
                  c5.4,9.2,14.2,6.6,17.7,5c0.5-3.9,2.1-6.6,3.8-8.1c-13.4-1.5-27.5-6.7-27.5-29.6c0-6.5,2.3-11.8,6.1-16c-0.6-1.5-2.6-7.6,0.6-15.9
                  c0,0,5-1.6,16.5,6.1c4.8-1.3,9.9-2,15-2c5.1,0,10.2,0.7,15,2c11.5-7.7,16.5-6.1,16.5-6.1c3.2,8.3,1.2,14.4,0.6,15.9
                  c3.8,4.2,6.1,9.5,6.1,16c0,23-14.2,28-27.6,29.5c2.2,1.9,4.2,5.7,4.2,11.5c0,8.3-0.1,14.9-0.1,16.9c0,1.6,1.1,3.5,4.1,2.9
                  c24-8,41.3-30.7,41.3-57.5C124.7,29.3,97.4,2,64,2z"
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
                  values="0 0 0 0 0
                          0 0 0 0 0
                          0 0 0 0 0
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
                  values="0 0 0 0 0
                          0 0 0 0 0
                          0 0 0 0 0
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

export default GithubCardIcon;
