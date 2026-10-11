"use client"

import type { ReactNode } from "react"

type SpotlightCardProps = {
  children: ReactNode
  className?: string
}

export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  return <div className={`spotlight-card ${className}`}>{children}</div>
}
