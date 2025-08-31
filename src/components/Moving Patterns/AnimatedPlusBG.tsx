"use client"

import React, { useEffect, useRef } from "react"

export interface AnimatedPlusGridProps {
  /** Size of each star */
  plusSize?: number
  /** Spacing between stars */
  spacing?: number
  /** Rotation speed multiplier (for twinkle/rotation effect) */
  rotationSpeed?: number
  /** Array of colors used for stars */
  colors?: string[]
  /** Extra classes for styling */
  className?: string
}

const AnimatedPlusGrid: React.FC<AnimatedPlusGridProps> = ({
  plusSize = 18,
  spacing = 60,
  rotationSpeed = 1,
  colors = ["#ffffff", "#facc15", "#60a5fa", "#a78bfa"], // white, yellow, blue, violet
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const stars = useRef<
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

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"

      // Generate stars
      stars.current = []
      const cols = Math.ceil(rect.width / spacing) + 1
      const rows = Math.ceil(rect.height / spacing) + 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          stars.current.push({
            x: col * spacing,
            y: row * spacing,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
          })
        }
      }
    }

    const drawPlus = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate((rotation * Math.PI) / 180)

      ctx.fillStyle = color
      ctx.font = `${size}px Arial`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      ctx.fillText("+", 0, 0)
      ctx.restore()
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, rect.width, rect.height)

      stars.current.forEach((star) => {
        star.rotation += rotationSpeed
        if (star.rotation >= 360) star.rotation = 0
        drawPlus(star.x, star.y, plusSize, star.rotation, star.color)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [plusSize, spacing, colors, rotationSpeed])

  return (
    <div className="relative w-full h-full">
      {/* Stars Canvas */}
      <canvas
        ref={canvasRef}
        className={className}
        style={{ display: "block", width: "100%", height: "100%", background: "#000000" }}
      />

      {/* Black vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 90%, rgba(0,0,0,1) 100%)",
        }}
      />
    </div>
  )
}

AnimatedPlusGrid.displayName = "AnimatedPlusGrid"
export default AnimatedPlusGrid
