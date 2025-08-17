import React from "react";
import { motion } from "framer-motion";

interface ReactCardIconProps {
  size?: number;
  color?: string;
}

const ReactCardIcon: React.FC<ReactCardIconProps> = ({ 
  size = 200, 
  color = "#00FFFF" 
}) => {
    // Calculate card dimensions based on size prop
    const cardWidth = size * 0.3; // 30% of the size
    const cardHeight = size * 0.4; // 40% of the size
    const logoSize = size * 0.6; // 60% of the size for the inner logo
    
    // Convert color to RGB for opacity variations
    const getColorWithOpacity = (opacity: number) => {
        if (color.startsWith('#')) {
            // Convert hex to RGB
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
        return color;
    };

    return (
        <motion.div
            className="relative"
            animate={{ rotateY: 360 }}
            transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
            }}
            style={{ width: cardWidth, height: cardHeight }}
        >
            <div 
                className="relative rounded-md backdrop-blur-md border shadow-2xl z-10"
                style={{
                    width: cardWidth,
                    height: cardHeight,
                    backgroundColor: getColorWithOpacity(0.1),
                    borderColor: getColorWithOpacity(0.6),
                    boxShadow: `0 0 25px ${getColorWithOpacity(0.4)}`
                }}
            >
                {/* Card border glow */}
                {/* <div 
                    className="relative inset-0 rounded-2xl border-2"
                    style={{
                        borderColor: getColorWithOpacity(0.9),
                        boxShadow: `0 0 25px ${getColorWithOpacity(0.4)}`
                    }}
                ></div> */}

                {/* Card content */}
                <div className="relative inset-0 h-full flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 841.9 595.3"
                        width={logoSize}
                        height={logoSize}
                        fill="none"
                        className="svg"
                        
                        
                    >
                        {/* Base React logo (3 ellipses) with softer glow */}
                        <g
                            stroke={color}
                            strokeWidth="20"
                            opacity="0.5"
                            filter="url(#glowSoft)"
                        >
                            <ellipse cx="420.9" cy="296.5" rx="300" ry="120" />
                            <ellipse
                                cx="420.9"
                                cy="296.5"
                                rx="300"
                                ry="120"
                                transform="rotate(60 420.9 296.5)"
                            />
                            <ellipse
                                cx="420.9"
                                cy="296.5"
                                rx="300"
                                ry="120"
                                transform="rotate(120 420.9 296.5)"
                            />
                        </g>

                        {/* Glowing moving circle (kept strong) */}
                        <motion.circle
                            r="14"
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
                                dur="5s"
                                repeatCount="indefinite"
                                rotate="auto"
                                path="M 120,296.5 A 300,120 0 1,1 721,296.5 A 300,120 0 1,1 120,296.5 Z"
                            />
                        </motion.circle>

                        {/* Glow filters */}
                        <defs>
                            {/* Softer glow for ellipses */}
                            <filter id="glowSoft" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                                <feColorMatrix
                                    in="blur"
                                    type="matrix"
                                    values="0 0 0 0  0
                    0 0 0 0  1
                    0 0 0 0  1
                    0 0 0 0.7  0"
                                    result="glowColor"
                                />
                                <feMerge>
                                    <feMergeNode in="glowColor" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            {/* Strong glow for circle */}
                            <filter id="circleGlow" x="-50%" y="-50%" width="300%" height="300%">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                                <feColorMatrix
                                    in="blur"
                                    type="matrix"
                                    values="0 0 0 0  0
                    0 0 0 0  1
                    0 0 0 0  1
                    0 0 0 1  0"
                                    result="glowColor"
                                />
                                <feMerge>
                                    <feMergeNode in="glowColor" />
                                    <feMergeNode in="glowColor" />
                                    <feMergeNode in="glowColor" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                    </svg>
                </div>
            </div>

            <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent rounded-full blur-4xl scale-200"
                style={{
                    background: `linear-gradient(to right, transparent, ${getColorWithOpacity(0.05)}, transparent)`
                }}
            ></div>
        </motion.div>
    );
};

export default ReactCardIcon;
