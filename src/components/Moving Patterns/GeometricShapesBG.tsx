"use client"

import { useEffect, useRef } from "react"

interface Shape {
  x: number
  y: number
  size: number
  type: "circle" | "triangle" | "square"
  color: string
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
  opacity: number
}

interface FloatingGeometricShapesProps {
  shapeCount?: number
  colors?: string[]
  minSize?: number
  maxSize?: number
  minSpeed?: number
  maxSpeed?: number
  backgroundColor?: string
}

export default function FloatingGeometricShapes({
  shapeCount = 25,
  colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316"],
  minSize = 20,
  maxSize = 80,
  minSpeed = 0.3,
  maxSpeed = 1.2,
  backgroundColor = "#0f172a",
}: FloatingGeometricShapesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shapesRef = useRef<Shape[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // --- Resize canvas to full window size ---
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0) // reset before scaling
      ctx.scale(dpr, dpr)

      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
    }

    // --- Create shapes ---
    const createShapes = () => {
      const newShapes: Shape[] = []
      const types: Shape["type"][] = ["circle", "triangle", "square"]

      for (let i = 0; i < shapeCount; i++) {
        newShapes.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * (maxSize - minSize) + minSize,
          type: types[Math.floor(Math.random() * types.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
          speedY: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          opacity: Math.random() * 0.6 + 0.2,
        })
      }
      shapesRef.current = newShapes
    }

    // --- Draw a shape ---
    const drawShape = (shape: Shape) => {
      ctx.save()
      ctx.globalAlpha = shape.opacity
      ctx.fillStyle = shape.color
      ctx.translate(shape.x, shape.y)
      ctx.rotate(shape.rotation)

      switch (shape.type) {
        case "circle":
          ctx.beginPath()
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2)
          ctx.fill()
          break
        case "triangle":
          ctx.beginPath()
          ctx.moveTo(0, -shape.size / 2)
          ctx.lineTo(-shape.size / 2, shape.size / 2)
          ctx.lineTo(shape.size / 2, shape.size / 2)
          ctx.closePath()
          ctx.fill()
          break
        case "square":
          ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
          break
      }

      ctx.restore()
    }

    // --- Animation loop ---
    const animate = () => {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      shapesRef.current.forEach((shape) => {
        shape.x += shape.speedX
        shape.y += shape.speedY
        shape.rotation += shape.rotationSpeed

        // Wrap around edges
        if (shape.x > window.innerWidth + shape.size) shape.x = -shape.size
        if (shape.x < -shape.size) shape.x = window.innerWidth + shape.size
        if (shape.y > window.innerHeight + shape.size) shape.y = -shape.size
        if (shape.y < -shape.size) shape.y = window.innerHeight + shape.size

        drawShape(shape)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    // --- Init ---
    resizeCanvas()
    createShapes()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      createShapes()
    })

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [shapeCount, colors, minSize, maxSize, minSpeed, maxSpeed, backgroundColor])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ background: backgroundColor }}
    />
  )
}
