"use client"

import React, { useEffect, useRef } from "react"

export interface AnimatedChevronGridProps {
  /** Size of each chevron */
  chevronSize?: number
  /** Spacing between chevrons */
  spacing?: number
  /** Stroke width of chevrons */
  strokeWidth?: number
  /** Array of colors used for chevrons */
  colors?: string[]
  /** Rotation speed multiplier */
  rotationSpeed?: number
  /** Extra classes for styling */
  className?: string
}

const AnimatedChevronGrid: React.FC<AnimatedChevronGridProps> = ({
  chevronSize = 16,
  spacing = 60,
  strokeWidth = 2,
  colors = [
    "#ef4444", // red-500
    "#f97316", // orange-500
    "#eab308", // yellow-500
    "#22c55e", // green-500
    "#06b6d4", // cyan-500
    "#3b82f6", // blue-500
    "#8b5cf6", // violet-500
    "#ec4899", // pink-500
  ],
  rotationSpeed = 2,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const chevrons = useRef<
    Array<{
      x: number
      y: number
      color: string
      rotation: number
    }>
  >([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      const dpr = window.devicePixelRatio || 1

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      ctx.setTransform(1, 0, 0, 1, 0, 0) // reset
      ctx.scale(dpr, dpr)
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"

      // Generate chevrons
      chevrons.current = []
      const cols = Math.ceil(rect.width / spacing) + 1
      const rows = Math.ceil(rect.height / spacing) + 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          chevrons.current.push({
            x: col * spacing,
            y: row * spacing,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
          })
        }
      }
    }

    const drawChevron = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate((rotation * Math.PI) / 180)

      ctx.strokeStyle = color
      ctx.lineWidth = strokeWidth
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      ctx.beginPath()
      ctx.moveTo(-size / 2, size / 4)
      ctx.lineTo(0, -size / 4)
      ctx.lineTo(size / 2, size / 4)
      ctx.stroke()

      ctx.restore()
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, rect.width, rect.height)

      chevrons.current.forEach((chevron) => {
        chevron.rotation += rotationSpeed
        if (chevron.rotation >= 360) chevron.rotation = 0
        drawChevron(chevron.x, chevron.y, chevronSize, chevron.rotation, chevron.color)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    const handleResize = () => resizeCanvas()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [chevronSize, spacing, strokeWidth, colors, rotationSpeed])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", background: "#000000" }}
    />
  )
}

AnimatedChevronGrid.displayName = "AnimatedChevronGrid"
export default AnimatedChevronGrid
