"use client"

import { useRef, type ReactNode, type PointerEvent } from "react"

type Props = { children: ReactNode; className?: string; edgeSensitivity?: number; glowColor?: string; backgroundColor?: string; borderRadius?: number; glowRadius?: number; glowIntensity?: number; coneSpread?: number; animated?: boolean; colors?: string[] }

export default function BorderGlow({ children, className = "", edgeSensitivity = 33, glowColor = "42 30 8", backgroundColor = "#0b0b0a", borderRadius = 24, glowRadius = 36, glowIntensity = 1.6, animated = true, colors = ["#d7c39a", "#ffffff", "#9b8c6b"] }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const move = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const edge = Math.min(x, y, rect.width - x, rect.height - y)
    event.currentTarget.style.setProperty("--glow-x", `${x}px`)
    event.currentTarget.style.setProperty("--glow-y", `${y}px`)
    event.currentTarget.style.setProperty("--glow-strength", String(Math.max(0, 1 - edge / Math.max(1, edgeSensitivity * 2)) * glowIntensity))
  }
  return <div ref={ref} onPointerMove={move} className={`border-glow-card ${animated ? "border-glow-intro" : ""} ${className}`} style={{ "--glow-radius": `${borderRadius}px`, "--glow-halo": `${glowRadius}px`, "--glow-bg": backgroundColor, "--glow-color": `hsl(${glowColor} / 1)`, "--glow-a": colors[0], "--glow-b": colors[1], "--glow-c": colors[2], "--glow-strength": 0 } as React.CSSProperties}>{children}</div>
}
