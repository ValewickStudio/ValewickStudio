"use client"

import { useEffect, useRef, type ReactNode } from "react"

type AnimatedContentProps = {
  children: ReactNode
  distance?: number
  direction?: "vertical" | "horizontal"
  reverse?: boolean
  duration?: number
  initialOpacity?: number
  animateOpacity?: boolean
  scale?: number
  threshold?: number
  delay?: number
  className?: string
}

export function AnimatedContent({ children, distance = 34, direction = "vertical", reverse = false, duration = .9, initialOpacity = .12, animateOpacity = true, scale = .985, threshold = .12, delay = 0, className = "" }: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) { el.dataset.animated = "true"; return }
    el.style.setProperty("--animated-distance", `${reverse ? -distance : distance}px`)
    el.style.setProperty("--animated-duration", `${duration}s`)
    el.style.setProperty("--animated-delay", `${delay}s`)
    el.style.setProperty("--animated-opacity", animateOpacity ? String(initialOpacity) : "1")
    el.style.setProperty("--animated-scale", String(scale))
    el.dataset.animatedDirection = direction
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.dataset.animated = "true"
        observer.disconnect()
      }
    }, { threshold })
    observer.observe(el)
    return () => observer.disconnect()
  }, [distance,direction,reverse,duration,initialOpacity,animateOpacity,scale,threshold,delay])
  return <div ref={ref} className={`animated-content ${className}`}>{children}</div>
}
