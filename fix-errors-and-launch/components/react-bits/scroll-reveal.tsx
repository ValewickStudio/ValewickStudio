"use client"

import { useEffect, useMemo, useRef } from "react"
import type { ReactNode, RefObject } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./scroll-reveal.css"

gsap.registerPlugin(ScrollTrigger)

type ScrollRevealProps = {
  children: ReactNode
  scrollContainerRef?: RefObject<HTMLElement | null>
  enableBlur?: boolean
  baseOpacity?: number
  baseRotation?: number
  blurStrength?: number
  containerClassName?: string
  textClassName?: string
  rotationEnd?: string
  wordAnimationEnd?: string
}

export function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const splitText = useMemo(() => {
    if (typeof children !== "string") return null
    return children.split(/(\s+)/).map((word, index) =>
      /^\s+$/.test(word) ? word : <span className="scroll-reveal-word" key={index}>{word}</span>
    )
  }, [children])

  useEffect(() => {
    const element = containerRef.current
    if (!element) return
    const scroller = scrollContainerRef?.current ?? window
    const context = gsap.context(() => {
      gsap.fromTo(element, { transformOrigin: "0% 50%", rotate: baseRotation }, {
        rotate: 0,
        ease: "none",
        scrollTrigger: { trigger: element, scroller, start: "top bottom", end: rotationEnd, scrub: true },
      })
      const words = element.querySelectorAll(".scroll-reveal-word")
      gsap.fromTo(words, { opacity: baseOpacity, willChange: "opacity" }, {
        opacity: 1,
        ease: "none",
        stagger: 0.05,
        scrollTrigger: { trigger: element, scroller, start: "top bottom-=20%", end: wordAnimationEnd, scrub: true },
      })
      if (enableBlur) {
        gsap.fromTo(words, { filter: `blur(${blurStrength}px)` }, {
          filter: "blur(0px)",
          ease: "none",
          stagger: 0.05,
          scrollTrigger: { trigger: element, scroller, start: "top bottom-=20%", end: wordAnimationEnd, scrub: true },
        })
      }
    }, element)
    return () => context.revert()
  }, [scrollContainerRef, enableBlur, baseOpacity, baseRotation, blurStrength, rotationEnd, wordAnimationEnd, children])

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`.trim()}>
      <p className={`scroll-reveal-text ${textClassName}`.trim()}>{splitText ?? children}</p>
    </div>
  )
}
