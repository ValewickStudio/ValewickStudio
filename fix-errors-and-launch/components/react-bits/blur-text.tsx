"use client"

import { motion, useReducedMotion } from "framer-motion"

type BlurTextProps = {
  text: string
  className?: string
  delay?: number
  animateBy?: "words" | "letters"
  direction?: "top" | "bottom"
}

export function BlurText({ text, className = "", delay = 55, animateBy = "words", direction = "bottom" }: BlurTextProps) {
  const reducedMotion = useReducedMotion()
  const segments = animateBy === "letters" ? Array.from(text) : text.split(" ")
  return (
    <span className={className} aria-label={text}>
      {segments.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          aria-hidden="true"
          className="inline-block will-change-transform"
          initial={reducedMotion ? false : { opacity: 0, y: direction === "top" ? -22 : 22, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, delay: reducedMotion ? 0 : index * delay / 1000, ease: [0.22, 1, 0.36, 1] }}
        >
          {segment === " " ? "\u00a0" : segment}{animateBy === "words" && index < segments.length - 1 ? "\u00a0" : ""}
        </motion.span>
      ))}
    </span>
  )
}
