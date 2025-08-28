"use client"

import { useEffect, useRef } from "react"

interface BusinessAnimatedBackgroundProps {
  particleCount?: number
  primaryColor?: string
  secondaryColor?: string
  backgroundColor?: string
  speed?: number
  opacity?: number
}

export default function BusinessAnimatedBackground({
  particleCount = 50,
  primaryColor = "#e2e8f0",
  secondaryColor = "#cbd5e1",
  backgroundColor = "#f8fafc",
  speed = 0.5,
  opacity = 1,
}: BusinessAnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      opacity: number
    }>
  >([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Resize canvas properly for DPR
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.resetTransform()
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    // Initialize particles
    const initParticles = () => {
      const colors = [primaryColor, secondaryColor]
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * opacity + 0.2,
      }))
    }

    // Draw lines between close particles
    const drawConnections = () => {
      const particles = particlesRef.current
      const maxDistance = 120

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * 0.3
            ctx.strokeStyle = `rgba(0, 0, 0, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      drawConnections()

      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x <= 0 || p.x >= canvas.offsetWidth) p.vx *= -1
        if (p.y <= 0 || p.y >= canvas.offsetHeight) p.vy *= -1

        p.x = Math.max(0, Math.min(canvas.offsetWidth, p.x))
        p.y = Math.max(0, Math.min(canvas.offsetHeight, p.y))

        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate()

    const handleResize = () => {
      resizeCanvas()
      initParticles()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [particleCount, primaryColor, secondaryColor, backgroundColor, speed, opacity])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ background: backgroundColor }} />
}
