import type React from "react"

interface DarkGridBackgroundProps {
  /**
   * Size of each grid cell in pixels
   * @default 40
   */
  gridSize?: number
  /**
   * Color of the grid lines
   * @default "rgba(64, 64, 64, 0.5)"
   */
  gridColor?: string
  /**
   * Background color
   * @default "#000000"
   */
  backgroundColor?: string
  /**
   * Width of the grid lines in pixels
   * @default 1
   */
  lineWidth?: number
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Inline styles
   */
  style?: React.CSSProperties
}

export const DarkGridBackground: React.FC<DarkGridBackgroundProps> = ({
  gridSize = 40,
  gridColor = "rgba(238, 232, 232, 0.5)",
  backgroundColor = "#000000",
  lineWidth = 1,
  className = "",
  style = {},
}) => {
  const gridStyle: React.CSSProperties = {
    backgroundColor,
    backgroundImage: `
      linear-gradient(${gridColor} ${lineWidth}px, transparent ${lineWidth}px),
      linear-gradient(90deg, ${gridColor} ${lineWidth}px, transparent ${lineWidth}px)
    `,
    backgroundSize: `${gridSize}px ${gridSize}px`,
    ...style,
  }

  return <div className={`w-full h-full ${className}`} style={gridStyle} />
}

export default DarkGridBackground
