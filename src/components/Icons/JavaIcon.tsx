import { motion } from "framer-motion";
import React, { useRef } from "react";

interface JavaIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const JavaIcon: React.FC<JavaIconProps> = ({
  size = 200,
  color = "#0074BD", // default blue shade
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
      className={["java-svg", className].filter(Boolean).join(" ")}
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

      {/* Original Java logo paths */}
      <g transform="scale(1) translate(0,0)">
        <path
          fill="#0074BD"
          d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"
        />
        <path
          fill="#EA2D2E"
          d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"
        />
        <path
          fill="#0074BD"
          d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"
        />
        <path
          fill="#EA2D2E"
          d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"
        />
        <path
          fill="#0074BD"
          d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"
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

export default JavaIcon;
