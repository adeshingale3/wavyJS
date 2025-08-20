import React from "react";
import { motion } from "framer-motion";

interface DartCardIconProps {
  size?: number;
  color?: string;
  classname?: string;
}

const DartCardIcon: React.FC<DartCardIconProps> = ({
  size = 200,
  color = "#0175C2", // Dart blue
  classname,
}) => {
  // Card dimensions
  const cardWidth = size * 0.3;
  const cardHeight = size * 0.4;
  const logoSize = size * 0.65;

  // Convert color → rgba
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
          {/* Dart SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 502.87 502.87"
            width={logoSize}
            height={logoSize}
          >
            {/* Background square */}
            <rect
              width="502.87"
              height="502.87"
              
              filter="url(#glowSoft)"
              rx="32"
            />

            {/* Dart logo paths */}
            <g transform="translate(40,50) scale(0.7)">
              <path
                fill="#01579b"
                d="M102.56,400.31l-86-86C6.32,303.82,0,289,0,274.58c0-6.69,3.77-17.16,6.62-23.15L86,86Z"
              />
              <path
                fill="#40c4ff"
                d="M397,102.56l-86-86C303.49,9,287.85,0,274.61,0c-11.38,0-22.55,2.29-29.76,6.62L86.07,86Z"
              />
              <polygon
                fill="#40c4ff"
                points="205.11 502.87 413.55 502.87 413.55 413.55 258.05 363.9 115.79 413.55 205.11 502.87"
              />
              <path
                fill="#29b6f6"
                d="M86,354c0,26.54,3.33,33.05,16.53,46.32l13.23,13.24H413.55L268,248.14,86,86Z"
              />
              <path
                fill="#01579b"
                d="M350.7,86H86L413.55,413.51h89.32V208.4L397,102.52C382.12,87.62,368.92,86,350.7,86Z"
              />
              <path
                fill="#fff"
                opacity="0.2"
                d="M105.88,403.6C92.65,390.33,89.36,377.24,89.36,354V89.32L86.07,86V354c0,23.25,0,29.69,19.81,49.61l9.91,9.91h0Z"
              />
              <polygon
                fill="#263238"
                opacity="0.2"
                points="499.58 205.11 499.58 410.22 410.26 410.22 413.55 413.55 502.87 413.55 502.87 208.4 499.58 205.11"
              />
              <path
                fill="#01579b"
                opacity="0.2"
                d="M397,102.56C380.61,86.14,367.19,86,347.41,86H86.07l3.29,3.29H347.41c9.87,0,34.79-1.66,49.61,13.24Z"
              />
              <path
                fill="url(#radial-gradient)"
                opacity="0.2"
                d="M499.58,205.11,397,102.56l-86-86C303.49,9,287.85,0,274.61,0c-11.38,0-22.55,2.29-29.76,6.62L86.07,86,6.65,251.43C3.81,257.46,0,267.92,0,274.58c0,14.45,6.36,29.2,16.52,39.7L95.83,393a92.42,92.42,0,0,0,6.73,7.32l3.29,3.29,9.9,9.91,86,86,3.29,3.29h208.4V413.51h89.32V208.4Z"
              />
            </g>

            {/* Moving glow circle */}
            <motion.circle
              r="10"
              fill={color}
              filter="url(#circleGlow)"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                rotate="auto"
                path="M 0,0 H 502.87 V 502.87 H 0 Z"
              />
            </motion.circle>

            {/* Filters + Gradient */}
            <defs>
              <radialGradient
                id="radial-gradient"
                cx="251.42"
                cy="631.97"
                r="251.4"
                gradientTransform="translate(0 -380.56)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#fff" stopOpacity="0.1" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </radialGradient>

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
                  values="0 0.5 1 0 0
                          0 0.7 1 0 0
                          0.9 0.9 0 0 0
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
          background: "white",
        }}
      ></div>
    </motion.div>
  );
};

export default DartCardIcon;
