import React from "react";
import { motion } from "framer-motion";

interface JavascriptCardIconProps {
    size?: number;
    color?: string;
    classname?: string;
}

const JavascriptCardIcon: React.FC<JavascriptCardIconProps> = ({
    size = 200,
    color = "#f7df1e",
    classname
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
            className={["relative", classname].filter(Boolean).join(" ")}
            animate={{ rotateY: 360 }}
            transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
            }}
            style={{ width: cardWidth, height:cardHeight }}
        >
            <div
                className="relative rounded-md backdrop-blur-md border shadow-2xl z-10"
                style={{
                    width:cardWidth,
                    height:cardHeight,
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
                <div style={{height: cardHeight, width:cardWidth}} className="relative inset-0 h-full flex items-center justify-center">
                    <svg

                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 630 630"
                        width={logoSize}
                        height={logoSize}
                        className="svg"
                    >
                        {/* Base JS square with soft glow */}
                        <rect
                            width="630"
                            height="630"
                            fill={getColorWithOpacity(0.0)}
                            filter="url(#glowSoft)"
                            rx="30"
                        />

                        {/* Letters JS */}
                        <text
                            x="50%"
                            y="60%"
                            textAnchor="middle"
                            fontSize="280"
                            fontWeight="bold"
                            fill={color}
                            fontFamily="Arial, sans-serif"
                        >
                            JS
                        </text>

                        {/* Glowing moving circle (now on the border) */}
                        <motion.circle
                            r="18"
                            fill={color}
                            filter="url(#circleGlow)"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            {/* Path hugs the outer border */}
                            <animateMotion
                                dur="6s"
                                repeatCount="indefinite"
                                rotate="auto"
                                path="M 0,0 H 630 V 630 H 0 Z"
                            />
                        </motion.circle>

                        {/* Glow filters */}
                        <defs>
                            {/* Softer glow for square */}
                            <filter id="glowSoft" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                                <feColorMatrix
                                    in="blur"
                                    type="matrix"
                                    values="1 1 0 0  0
                    1 1 0 0  0
                    0 0 0 0  0
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
                                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                                <feColorMatrix
                                    in="blur"
                                    type="matrix"
                                    values="1 1 0 0  0
                    1 1 0 0  0
                    0 0 0 0  0
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

export default JavascriptCardIcon;