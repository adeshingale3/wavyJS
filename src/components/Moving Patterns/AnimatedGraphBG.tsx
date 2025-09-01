"use client"

import React from "react"

export interface AnimatedGraphBGProps {
  gridSize?: number
  strokeWidth?: number
  strokeColor?: string
  backgroundColor?: string
  vignetteColor?:string
  className?: string
  speed?: number // pixels per second for horizontal scroll
}

const AnimatedGraphBG: React.FC<AnimatedGraphBGProps> = ({
  gridSize = 20,
  strokeWidth = 1,
  strokeColor = "#e5e7eb", // Tailwind gray-200
  backgroundColor = "#000000", // dark bg
  vignetteColor = "rgba(0,0,0,0.6)",
  className = "",
  speed = 30, // scroll speed
}) => {
  // Use background-position for pixel-perfect smooth scrolling
  const duration = gridSize / speed; // time to move one grid cell seamlessly
  
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Scrolling Graph using background-position animation */}
      <div
        className="absolute inset-0 w-full h-full animate-scroll-smooth"
        style={{
          backgroundColor,
          backgroundImage: `
            linear-gradient(${strokeColor} ${strokeWidth}px, transparent ${strokeWidth}px),
            linear-gradient(90deg, ${strokeColor} ${strokeWidth}px, transparent ${strokeWidth}px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            `radial-gradient(circle at center, transparent 40%, ${vignetteColor} 90%, ${vignetteColor} 100%)`,
        }}
      />
      
      <style>{`
        @keyframes scroll-smooth {
          from {
            background-position: 0 0, 0 0;
          }
          to {
            background-position: -${gridSize}px 0, -${gridSize}px 0;
          }
        }
        .animate-scroll-smooth {
          animation: scroll-smooth ${duration}s linear infinite;
          will-change: background-position;
        }
      `}</style>
    </div>
  )
}

AnimatedGraphBG.displayName = "AnimatedGraphBG"
export default AnimatedGraphBG