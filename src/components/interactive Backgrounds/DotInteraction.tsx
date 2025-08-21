

import { useEffect, useRef, useState } from "react"

interface Dot {
  x: number
  y: number
  originalX: number
  originalY: number
  color: string
}

interface InteractiveDotGridProps {
  dotSize?: number
  dotSpacing?: number
  maxDistance?: number
  animationSpeed?: number
  className?: string
}

export default function InteractiveDotGrid({
  dotSize = 1.5,
  dotSpacing = 25,
  maxDistance = 100,
  animationSpeed = 0.1,
  className = "",
}: InteractiveDotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const colors = [
    "#10b981", // green-500
    "#ffffff", // white
  ]

  const initializeDots = (width: number, height: number) => {
    
    const dots: Dot[] = []
    const cols = Math.floor(width / dotSpacing)
    const rows = Math.floor(height / dotSpacing)

    const offsetX = (width - (cols - 1) * dotSpacing) / 2
    const offsetY = (height - (rows - 1) * dotSpacing) / 2

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = offsetX + i * dotSpacing
        const y = offsetY + j * dotSpacing
        dots.push({
          x,
          y,
          originalX: x,
          originalY: y,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    dotsRef.current = dots
  }
  

  const handleMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  const animate = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    dotsRef.current.forEach((dot) => {
      const dx = mouseRef.current.x - dot.originalX
      const dy = mouseRef.current.y - dot.originalY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance
        const moveX = (dx / distance) * force * 20
        const moveY = (dy / distance) * force * 20

        dot.x += (dot.originalX + moveX - dot.x) * animationSpeed
        dot.y += (dot.originalY + moveY - dot.y) * animationSpeed
      } else {
        dot.x += (dot.originalX - dot.x) * animationSpeed
        dot.y += (dot.originalY - dot.y) * animationSpeed
      }

      ctx.shadowColor = dot.color
      ctx.shadowBlur = 5
      ctx.fillStyle = dot.color
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2)
      ctx.fill()

      ctx.shadowBlur = 0
    })

    animationRef.current = requestAnimationFrame(animate)
  }

  const handleResize = () => {
    const canvas = canvasRef.current
    if (!canvas) return
  
    const width = window.innerWidth
    const height = window.innerHeight
  
    // CSS size
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
  
    // Pixel size
    canvas.width = width * window.devicePixelRatio
    canvas.height = height * window.devicePixelRatio
  
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0) // reset scaling
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
  
    setDimensions({ width, height })
    initializeDots(width, height)
  }
  

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    handleResize()

    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed ${className}`}
      style={{
        background: "#000000",
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: "hidden",
        position: "relative"
        
      }}
    />
  )
}


