"use client"

import type * as React from "react"

export type AnimatedGradientBackgroundProps = {
  className?: string
  colors?: string[] // 2-5 colors max recommended
  angle?: number // Degrees for linear/conic gradients (default 45)
  duration?: number // Animation duration in seconds (default 14)
  opacity?: number // Overall layer opacity (default 1)
  variant?: "linear" | "radial" | "conic"
  baseColor?: string // Optional solid base layer
}

export default function AnimatedGradientBackground({
  className = "",
  colors,
  angle = 45,
  duration = 14,
  opacity = 1,
  variant = "linear",
  baseColor,
}: AnimatedGradientBackgroundProps) {
  const palette = (colors && colors.length > 0 ? colors : ["#3b82f6", "#06b6d4", "#22c55e"]).slice(0, 5)

  const gradientString =
    variant === "radial"
      ? `radial-gradient(circle at 50% 50%, ${palette.join(", ")})`
      : variant === "conic"
        ? `conic-gradient(from ${angle}deg, ${palette.join(", ")})`
        : `linear-gradient(${angle}deg, ${palette.join(", ")})`

  const style: React.CSSProperties = {
    backgroundColor: baseColor,
    backgroundImage: gradientString,
    backgroundSize: variant === "linear" ? "400% 400%" : "200% 200%",
    backgroundPosition: "0% 50%",
    opacity,
    animation: `ag-shift ${Math.max(4, duration)}s ease-in-out infinite`,
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
      style={style}
    >
      <style>
        {`
          @keyframes ag-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @media (prefers-reduced-motion: reduce) {
            .animated-gradient-bg {
              animation: none !important;
            }
          }
        `}
      </style>
    </div>
  )
}
