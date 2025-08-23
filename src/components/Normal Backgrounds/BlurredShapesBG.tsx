"use client"

import React from "react"

export interface BlurredShapesBackgroundProps {
  className?: string
  colors?: string[]
  shapeCount?: number
  animate?: boolean
  blur?: number
  opacity?: number
  backgroundColor?: string // ✅ added
}

export const BlurredShapesBackground: React.FC<BlurredShapesBackgroundProps> = ({
    className = "",
    colors = [
      "#ff6b6b", "#4ecdc4", "#45b7d1",
      "#96ceb4", "#feca57", "#ff9ff3", "#54a0ff",
    ],
    shapeCount = 10,
    animate = true,
    blur = 80,
    opacity = 0.9,
  }) => {
    const shapes = Array.from({ length: shapeCount }, (_, i) => {
      const color = colors[i % colors.length]
      const size = Math.random() * 300 + 200
      const x = Math.random() * 100
      const y = Math.random() * 100
      const animationDelay = Math.random()
      const animationDuration = Math.random() * 20
  
      return { id: i, color, size, x, y, animationDelay, animationDuration }
    })
  
    return (
      <div style={{
        height: "100%",
        width: "100%"
      }} className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className={animate ? "blurred-shape animate-float-shape" : "blurred-shape"}
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              background: `radial-gradient(circle, ${shape.color} 0%, transparent 70%)`,
              filter: `blur(${blur}px)`,
              opacity,
              animationDelay: animate ? `${shape.animationDelay}s` : undefined,
              animationDuration: animate ? `${shape.animationDuration}s` : undefined,
            }}
          />
        ))}
  
        <style>{`
          .blurred-shape {
            position: absolute;
            border-radius: 9999px;
            transform: translate(-50%, -50%);
          }
          @keyframes float-shape {
            0%, 100% {
              transform: translate(-50%, -50%) translateY(0px) rotate(0deg);
            }
            33% {
              transform: translate(-50%, -50%) translateY(-30px) rotate(120deg);
            }
            66% {
              transform: translate(-50%, -50%) translateY(30px) rotate(240deg);
            }
          }
          .animate-float-shape {
            animation: float-shape linear infinite;
          }
        `}</style>
      </div>
    )
  }
  

export default BlurredShapesBackground
