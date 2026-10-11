"use client"

import type { CSSProperties, ReactNode } from "react"

type ShinyTextProps = {
  text?: string
  children?: ReactNode
  color?: string
  shineColor?: string
  speed?: number
  shineWidth?: number
  trigger?: "loop" | "hover" | "view"
  className?: string
  style?: CSSProperties
}

export function ShinyText({ text, children, color = "currentColor", shineColor = "#ffffff", speed = 2.8, shineWidth = 38, trigger = "loop", className = "", style }: ShinyTextProps) {
  return <span className={`shiny-text shiny-text--${trigger} ${className}`} style={{ "--shine-base": color, "--shine-highlight": shineColor, "--shine-speed": `${speed}s`, "--shine-width": `${shineWidth}%`, ...style } as CSSProperties}>{children ?? text}</span>
}
