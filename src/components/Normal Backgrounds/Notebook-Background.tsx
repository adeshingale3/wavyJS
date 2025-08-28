"use client"

import React from "react"

export interface NotebookBackgroundProps {
  lineSpacing?: number
  lineColor?: string
  lineWidth?: number
  marginLineColor?: string
  marginWidth?: number
  showMargin?: boolean
  className?: string
}

const NotebookBackground: React.FC<NotebookBackgroundProps> = ({
  lineSpacing = 32,
  lineColor = "#000000",
  lineWidth = 1,
  marginLineColor = "#ff0000",
  marginWidth = 2,
  showMargin = true,
  className = "",
}) => {
  const patternId = React.useMemo(
    () => `notebook-pattern-${Math.random().toString(36).substr(2, 9)}`,
    []
  )

  return (
    <div className={`absolute inset-0 w-full h-full bg-white ${className}`}>
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern
            id={patternId}
            width="100%"
            height={lineSpacing}
            patternUnits="userSpaceOnUse"
          >
            {/* Horizontal ruled lines */}
            <line
              x1="0"
              y1={lineSpacing}
              x2="100%"
              y2={lineSpacing}
              stroke={lineColor}
              strokeWidth={lineWidth}
              opacity={0.3}
            />
          </pattern>
        </defs>

        {/* Apply the pattern */}
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />

        {/* Left margin line */}
        {showMargin && (
          <line
            x1="80"
            y1="0"
            x2="80"
            y2="100%"
            stroke={marginLineColor}
            strokeWidth={marginWidth}
            opacity={0.6}
          />
        )}

        {/* Top margin area */}
        <rect x="0" y="0" width="100%" height="40" fill="white" />
      </svg>
    </div>
  )
}

NotebookBackground.displayName = "NotebookBackground"
export default NotebookBackground
