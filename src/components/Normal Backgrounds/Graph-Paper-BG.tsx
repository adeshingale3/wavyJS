"use client"

import React from "react"

export interface GraphPaperBackgroundProps {
  gridSize?: number
  strokeWidth?: number
  strokeColor?: string
  backgroundColor?: string
  className?: string
}

const GraphPaperBackground: React.FC<GraphPaperBackgroundProps> = ({
  gridSize = 20,
  strokeWidth = 1,
  strokeColor = "#e5e7eb", // default Tailwind gray-200
  backgroundColor = "#ffffff",
  className = "",
}) => {
  return (
    <div
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{
        backgroundColor,
        backgroundImage: `
          linear-gradient(${strokeColor} ${strokeWidth}px, transparent ${strokeWidth}px),
          linear-gradient(90deg, ${strokeColor} ${strokeWidth}px, transparent ${strokeWidth}px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }}
    />
  )
}

GraphPaperBackground.displayName = "GraphPaperBackground"
export default GraphPaperBackground
