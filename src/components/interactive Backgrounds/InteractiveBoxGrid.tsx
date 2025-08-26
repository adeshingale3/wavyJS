"use client"

import React, { useEffect, useRef, useState } from "react"

interface Box {
  x: number
  y: number
  originalX: number
  originalY: number
  size: number
}

export interface InteractiveBoxGridProps {
  /** Size of each box */
  boxSize?: number
  /** Distance between boxes */
  spacing?: number
  /** Max cursor interaction distance */
  maxDistance?: number
  /** Strength of movement (0–1) */
  moveStrength?: number
  /** Extra classes for styling */
  className?: string

  boxColor? : string
}

const InteractiveBoxGrid: React.FC<InteractiveBoxGridProps> = ({
  boxSize = 20,
  spacing = 40,
  maxDistance = 150,
  moveStrength = 0.3,
  className = "",
  boxColor= "#6b7280"
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [boxes, setBoxes] = useState<Box[]>([])
  const mousePos = useRef({ x: 0, y: 0 })

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

      // Generate grid of boxes
      const newBoxes: Box[] = []
      const cols = Math.ceil(rect.width / spacing) + 2
      const rows = Math.ceil(rect.height / spacing) + 2

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing - spacing
          const y = j * spacing - spacing
          newBoxes.push({
            x,
            y,
            originalX: x,
            originalY: y,
            size: boxSize,
          })
        }
      }
      setBoxes(newBoxes)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [boxSize, spacing])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || boxes.length === 0) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      boxes.forEach((box) => {
        const dx = mousePos.current.x - box.originalX
        const dy = mousePos.current.y - box.originalY
        const distance = Math.sqrt(dx * dx + dy * dy)

        let currentX = box.originalX
        let currentY = box.originalY

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const moveX = (dx / distance) * force * moveStrength * 30
          const moveY = (dy / distance) * force * moveStrength * 30
          currentX += moveX
          currentY += moveY
        }

        // Draw box
        ctx.fillStyle = boxColor // gray-500
        ctx.fillRect(currentX, currentY, box.size, box.size)

        // Border/separator
        ctx.strokeStyle = "#f8fafc" // off-white
        ctx.lineWidth = 1
        ctx.strokeRect(currentX, currentY, box.size, box.size)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [boxes, maxDistance, moveStrength])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: "block", background: "#000000" }}
    />
  )
}

InteractiveBoxGrid.displayName = "InteractiveBoxGrid"
export default InteractiveBoxGrid
