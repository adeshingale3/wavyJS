import React from "react";
import { motion } from "framer-motion";

interface CssCardIconProps {
  size?: number;
  color?: string;
  classname?: string;
}

const CssCardIcon: React.FC<CssCardIconProps> = ({
  size = 200,
  color = "#264DE4", // CSS3 blue
  classname,
}) => {
  // Calculate card dimensions
  const cardWidth = size * 0.3;
  const cardHeight = size * 0.4;
  const logoSize = size * 0.6;

  // Convert color to RGBA
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
        <div
          style={{ height: cardHeight, width: cardWidth }}
          className="relative inset-0 h-full flex items-center justify-center"
        >
          {/* CSS3 SVG */}
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

            {/* CSS3 Logo */}
            <g transform="translate(20,20) scale(0.7)">
              <path fill="#264DE4" d="M19 0l9 108 36 10 36-10 9-108H19z" />
              <path fill="#2965F1" d="M64 116l29-8 8-92H64v100z" />
              <path
                fill="#EBEBEB"
                d="M64 52H45l-1-12h20V28H32l3 36h29V52zm0 30l-15-4-1-11H35l2 23 27 7v-15z"
              />
              <path
                fill="#fff"
                d="M64 52v12h18l-2 14-16 4v15l27-7 3-36H64zm0-24v12h33l1-12H64z"
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
              <filter id="glowSoft" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="0 0 1 0 0
                          0 0 1 0 0
                          0 0 1 0 0
                          0 0 0 0.6 0"
                  result="glowColor"
                />
                <feMerge>
                  <feMergeNode in="glowColor" />
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
                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="1 0 0 0 0
                          0 0 1 0 0
                          0 0 1 0 0
                          0 0 0 1 0"
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

export default CssCardIcon;
