"use client"

import React, { useEffect, useRef } from "react"

interface Line {
  x: number
  y: number
  dx: number
  dy: number
  color: string
  length: number
  opacity: number
}

export interface AnimatedNeonLinesProps {
  /** Number of neon lines */
  lineCount?: number
  /** Speed of line movement */
  lineSpeed?: number
  /** Base line length in pixels */
  lineLength?: number
  /** Extra classes for styling */
  className?: string
}

const AnimatedNeonLines: React.FC<AnimatedNeonLinesProps> = ({
  lineCount = 15,
  lineSpeed = 1,
  lineLength = 100,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const linesRef = useRef<Line[]>([])
  const animationRef = useRef<number>()

  const neonColors = [
    "#ff0080", // Hot pink
    "#00ff80", // Neon green
    "#0080ff", // Electric blue
    "#ff8000", // Neon orange
    "#8000ff", // Electric purple
    "#00ffff", // Cyan
    "#ffff00", // Electric yellow
    "#ff0040", // Neon red
    "#40ff00", // Lime green
    "#ff4080", // Pink
  ]

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
    }

    const initLines = () => {
      linesRef.current = []
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return

      for (let i = 0; i < lineCount; i++) {
        const x = Math.random() * rect.width
        const y = Math.random() * rect.height
        const angle = Math.random() * Math.PI * 2
        const dx = Math.cos(angle) * lineSpeed
        const dy = Math.sin(angle) * lineSpeed

        linesRef.current.push({
          x,
          y,
          dx,
          dy,
          color: neonColors[Math.floor(Math.random() * neonColors.length)],
          length: lineLength + Math.random() * 50,
          opacity: 0.7 + Math.random() * 0.3,
        })
      }
    }

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return

      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, rect.width, rect.height)

      linesRef.current.forEach((line) => {
        line.x += line.dx
        line.y += line.dy

        if (line.x < -line.length) line.x = rect.width + line.length
        if (line.x > rect.width + line.length) line.x = -line.length
        if (line.y < -line.length) line.y = rect.height + line.length
        if (line.y > rect.height + line.length) line.y = -line.length

        const endX = line.x + Math.cos(Math.atan2(line.dy, line.dx)) * line.length
        const endY = line.y + Math.sin(Math.atan2(line.dy, line.dx)) * line.length

        ctx.save()

        // Outer glow
        ctx.strokeStyle = line.color
        ctx.globalAlpha = line.opacity * 0.1
        ctx.lineWidth = 8
        ctx.shadowColor = line.color
        ctx.shadowBlur = 20
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(endX, endY)
        ctx.stroke()

        // Middle glow
        ctx.globalAlpha = line.opacity * 0.3
        ctx.lineWidth = 4
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(endX, endY)
        ctx.stroke()

        // Inner bright line
        ctx.globalAlpha = line.opacity
        ctx.lineWidth = 2
        ctx.shadowBlur = 5
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(endX, endY)
        ctx.stroke()

        // White core
        ctx.globalAlpha = 1
        ctx.lineWidth = 1
        ctx.shadowBlur = 0
        ctx.strokeStyle = "#ffffff"
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(endX, endY)
        ctx.stroke()

        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initLines()
    animate()

    const handleResize = () => {
      resizeCanvas()
      initLines()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [lineCount, lineSpeed, lineLength])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: "block", background: "#000000" }}
    />
  )
}

AnimatedNeonLines.displayName = "AnimatedNeonLines"
export default AnimatedNeonLines
