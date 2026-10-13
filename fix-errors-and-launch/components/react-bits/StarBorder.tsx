"use client"

import type { CSSProperties, ElementType, ReactNode } from "react"

type Props = { as?: ElementType; children: ReactNode; className?: string; color?: string; trailColor?: string; duration?: number; direction?: "clockwise" | "counterclockwise"; stars?: number; trailLength?: number; thickness?: number; radius?: number; glow?: number; hover?: "lap" | "brighten" | "reveal" | "none"; clickPulse?: boolean; theme?: "dark" | "light"; style?: CSSProperties }

export default function StarBorder({ as: Component = "div", children, className = "", color = "#e7d7b3", trailColor = "#ffffff", duration = 7, direction = "clockwise", stars = 2, thickness = 1, radius = 18, glow = .35, hover = "brighten", clickPulse = true, theme = "dark", style }: Props) {
  return <Component className={`star-border ${direction === "counterclockwise" ? "star-border-reverse" : ""} ${hover === "reveal" ? "star-border-reveal" : ""} ${className}`} style={{ "--star-color": color, "--star-trail": trailColor, "--star-duration": `${duration}s`, "--star-thickness": `${thickness}px`, "--star-radius": `${radius}px`, "--star-glow": glow, "--star-count": stars, "--star-surface": theme === "light" ? "#fff" : "#090909", "--star-text": theme === "light" ? "#090909" : "inherit" } as CSSProperties} data-star-hover={hover} data-click-pulse={clickPulse ? "true" : "false"}>{children}</Component>
}
