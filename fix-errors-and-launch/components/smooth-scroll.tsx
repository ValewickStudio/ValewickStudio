"use client"

import { ReactLenis } from "lenis/react"
import type { ReactNode } from "react"

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.18, duration: 0.55, smoothWheel: true, wheelMultiplier: 1, syncTouch: false, anchors: true }}>
      {children}
    </ReactLenis>
  )
}
