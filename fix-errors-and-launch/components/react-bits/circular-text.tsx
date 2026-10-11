"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { CSSProperties } from "react"
import "./circular-text.css"

type CircularTextProps = {
  text?: string
  spinDuration?: number
  onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers"
  className?: string
}

export function CircularText({
  text = "VALEWICK HOUSE • DIGITAL STUDIO • ",
  spinDuration = 24,
  onHover = "speedUp",
  className = "",
}: CircularTextProps) {
  const reducedMotion = useReducedMotion()
  const letters = Array.from(text)
  const hoverDuration = onHover === "slowDown" ? spinDuration * 2
    : onHover === "speedUp" ? spinDuration / 4
    : onHover === "goBonkers" ? spinDuration / 12
    : spinDuration

  return (
    <motion.div
      className={`circular-text ${className}`}
      role="img"
      aria-label={text.replaceAll("•", "").trim()}
      animate={reducedMotion || onHover === "pause" ? undefined : { rotate: 360 }}
      transition={{ duration: spinDuration, repeat: Infinity, ease: "linear" }}
      whileHover={reducedMotion ? undefined : { rotate: 360, scale: onHover === "goBonkers" ? 0.92 : 1.04, transition: { rotate: { duration: hoverDuration, repeat: Infinity, ease: "linear" }, scale: { duration: 0.3 } } }}
      style={{ "--circular-letter-count": letters.length } as CSSProperties}
    >
      {letters.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          style={{ transform: `translate(-50%, -50%) rotate(${(360 / letters.length) * index}deg) translateY(-42px) rotate(-${(360 / letters.length) * index}deg)` }}
          aria-hidden="true"
        >
          {letter}
        </span>
      ))}
    </motion.div>
  )
}
