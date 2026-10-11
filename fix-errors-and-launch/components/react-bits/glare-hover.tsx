"use client"

import type { ReactNode } from "react"

type GlareHoverProps = {
  children: ReactNode
  className?: string
  disabled?: boolean
}

export function GlareHover({ children, className = "", disabled = false }: GlareHoverProps) {
  return <div className={`glare-hover ${disabled ? "glare-hover--static" : ""} ${className}`}>{children}</div>
}
