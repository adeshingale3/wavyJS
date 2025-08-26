"use client"

import React, { useEffect, useRef } from "react"

export interface AnimatedDiamondGridProps {
  /** Size of each diamond in pixels */
  diamondSize?: number
  /** Distance between diamonds in pixels */
  diamondSpacing?: number
  /** Rotation speed multiplier */
  rotationSpeed?: number
  /** Extra classes for styling */
  className?: string
}

const AnimatedDiamondGrid: React.FC<AnimatedDiamondGridProps> = ({
  diamondSize = 8,
  diamondSpacing = 60,
  rotationSpeed = 2,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const rotationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const colors = [
      "#ef4444", "#f97316", "#eab308",
      "#22c55e", "#06b6d4", "#3b82f6",
      "#8b5cf6", "#ec4899",
    ]

    const resizeCanvas = () => {
      if (!canvas.parentElement) return
      const rect = canvas.parentElement.getBoundingClientRect() // ✅ use parent size
      const dpr = window.devicePixelRatio || 1

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"
    }

    const drawDiamond = (x: number, y: number, size: number, rotation: number, color: string) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      ctx.beginPath()
      ctx.moveTo(0, -size)
      ctx.lineTo(size, 0)
      ctx.lineTo(0, size)
      ctx.lineTo(-size, 0)
      ctx.closePath()

      ctx.shadowColor = color
      ctx.shadowBlur = 8
      ctx.fillStyle = color
      ctx.fill()

      ctx.restore()
    }

    const animate = () => {
      if (!canvas.parentElement) return
      const rect = canvas.parentElement.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      rotationRef.current += rotationSpeed * 0.02

      const cols = Math.ceil(rect.width / diamondSpacing) + 1
      const rows = Math.ceil(rect.height / diamondSpacing) + 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * diamondSpacing
          const y = row * diamondSpacing
          const color = colors[(row + col) % colors.length]
          drawDiamond(x, y, diamondSize, rotationRef.current, color)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [diamondSize, diamondSpacing, rotationSpeed])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`} // ✅ no absolute, just fill parent
      style={{ display: "block", background: "#000000" }}
    />
  )
}

AnimatedDiamondGrid.displayName = "AnimatedDiamondGrid"
export default AnimatedDiamondGrid
