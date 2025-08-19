import React from "react";
import { motion } from "framer-motion";

interface TailwindCardIconProps {
  size?: number;
  color?: string;
  classname?: string;
}

const TailwindCardIcon: React.FC<TailwindCardIconProps> = ({
  size = 200,
  color = "#38BDF8", // Tailwind's sky blue
  classname,
}) => {
  // Calculate card dimensions
  const cardWidth = size * 0.3;
  const cardHeight = size * 0.4;
  const logoSize = size * 0.6;

  // Convert color to RGBA for opacity variations
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

            {/* Tailwind Logo */}
            <g transform="scale(4) translate(1,0)">
              <path
                fill="url(#tailwindGradient)"
                d="M16 7.999c-4.267 0-6.933 2.133-8 6.4 1.6-2.134 3.467-2.934 5.6-2.4 1.218.304 2.09 1.19 3.055 2.164C18.187 15.7 19.406 16.933 22.4 16.933c4.267 0 6.933-2.133 8-6.4-1.6 2.134-3.467 2.934-5.6 2.4-1.218-.304-2.09-1.19-3.055-2.164C19.813 9.233 18.594 7.999 16 7.999zM8 16c-4.267 0-6.933 2.133-8 6.4 1.6-2.134 3.467-2.934 5.6-2.4 1.218.304 2.09 1.19 3.055 2.164C10.187 23.7 11.406 24.933 14.4 24.933c4.267 0 6.933-2.133 8-6.4-1.6 2.134-3.467 2.934-5.6 2.4-1.218-.304-2.09-1.19-3.055-2.164C11.813 17.233 10.594 16 8 16z"
              />
            </g>

            {/* Glowing moving circle on border */}
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

            {/* Glow filters + Gradient */}
            <defs>
              {/* Tailwind gradient */}
              <linearGradient id="tailwindGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0EA5E9" />
              </linearGradient>

              {/* Soft glow */}
              <filter
                id="glowSoft"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="6"
                  result="blur"
                />
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
              <filter
                id="circleGlow"
                x="-50%"
                y="-50%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="12"
                  result="blur"
                />
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

export default TailwindCardIcon;
