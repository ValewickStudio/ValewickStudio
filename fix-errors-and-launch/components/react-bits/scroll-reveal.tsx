"use client"

import { useEffect, useRef, type ReactNode } from "react"

type ScrollRevealProps = {
  children: ReactNode
  enableBlur?: boolean
  baseOpacity?: number
  baseRotation?: number
  blurStrength?: number
  containerClassName?: string
  textClassName?: string
}

export function ScrollReveal({ children, enableBlur = true, baseOpacity = .08, baseRotation = 1.2, blurStrength = 4, containerClassName = "", textClassName = "" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.dataset.revealed = "true"; return }
    el.style.setProperty("--reveal-opacity", String(baseOpacity))
    el.style.setProperty("--reveal-rotation", `${baseRotation}deg`)
    el.style.setProperty("--reveal-blur", enableBlur ? `${blurStrength}px` : "0px")
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.dataset.revealed = "true"; observer.disconnect() }
    }, { threshold: .12 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [enableBlur,baseOpacity,baseRotation,blurStrength])
  return <div ref={ref} className={`scroll-reveal-wrap ${containerClassName}`}><div className={`scroll-reveal-content ${textClassName}`}>{children}</div></div>
}
