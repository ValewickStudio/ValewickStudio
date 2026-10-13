"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Props = {
  children: ReactNode
  container?: string | HTMLElement | null
  distance?: number
  direction?: "vertical" | "horizontal"
  reverse?: boolean
  duration?: number
  ease?: string
  initialOpacity?: number
  animateOpacity?: boolean
  scale?: number
  threshold?: number
  delay?: number
  className?: string
}

export default function AnimatedContent({
  children, container, distance = 48, direction = "vertical", reverse = false,
  duration = 0.85, ease = "power3.out", initialOpacity = 0.15,
  animateOpacity = true, scale = 0.985, threshold = 0.12, delay = 0, className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let scroller: HTMLElement | null = null
    const requested = container || document.getElementById("snap-main-container")
    if (typeof requested === "string") scroller = document.querySelector<HTMLElement>(requested)
    else scroller = requested
    const axis = direction === "horizontal" ? "x" : "y"
    const offset = reverse ? -distance : distance
    gsap.set(el, { [axis]: offset, scale, opacity: animateOpacity ? initialOpacity : 1, visibility: "visible" })
    const tween = gsap.to(el, {
      [axis]: 0, scale: 1, opacity: 1, duration, ease, delay,
      paused: true, clearProps: "transform,opacity",
    })
    const trigger = ScrollTrigger.create({
      trigger: el, scroller: scroller || undefined, start: `top ${(1 - threshold) * 100}%`,
      once: true, onEnter: () => tween.play(),
    })
    return () => { trigger.kill(); tween.kill() }
  }, [container, distance, direction, reverse, duration, ease, initialOpacity, animateOpacity, scale, threshold, delay])

  return <div ref={ref} className={className} style={{ visibility: "hidden" }}>{children}</div>
}
