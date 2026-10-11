"use client"

import { motion, useReducedMotion } from "framer-motion"

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
      whileHover={reducedMotion ? undefined : { scale: onHover === "goBonkers" ? 0.92 : 1.04, transition: { duration: 0.3 } }}
      style={{ "--circular-letter-count": letters.length } as React.CSSProperties}
    >
      {letters.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          style={{ transform: `rotate(${(360 / letters.length) * index}deg) translateY(-42px)` }}
          aria-hidden="true"
        >
          {letter}
        </span>
      ))}
    </motion.div>
  )
}
