"use client"

import { useEffect, useMemo, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import "./fold-text.css"

type FoldTextProps = {
  text: string
  splitBy?: "char" | "word" | "line"
  hinge?: "top" | "bottom" | "left" | "right"
  duration?: number
  stagger?: number
  perspective?: number
  trigger?: "mount" | "hover" | "loop"
  fontSize?: string | number
  fontWeight?: string | number
  color?: string
  className?: string
  style?: React.CSSProperties
}

export function FoldText({
  text,
  splitBy = "word",
  hinge = "top",
  duration = 0.72,
  stagger = 0.055,
  perspective = 760,
  trigger = "mount",
  fontSize = "inherit",
  fontWeight = 300,
  color = "currentColor",
  className = "",
  style,
}: FoldTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()
  const segments = useMemo(() => {
    if (splitBy === "line") return text.split("\n")
    if (splitBy === "word") return text.split(/(\s+)/).filter(Boolean)
    return Array.from(text)
  }, [text, splitBy])

  useEffect(() => {
    const root = rootRef.current
    if (!root || trigger !== "hover" || reducedMotion) return
    const pieces = Array.from(root.querySelectorAll<HTMLElement>("[data-fold-piece]"))
    const replay = () => {
      pieces.forEach((piece, index) => {
        piece.animate(
          [{ transform: `perspective(${perspective}px) rotateX(${hinge === "bottom" ? 88 : -88}deg)`, opacity: 0.15 }, { transform: "perspective(760px) rotateX(0deg)", opacity: 1 }],
          { duration: duration * 1000, delay: index * stagger * 1000, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" },
        )
      })
    }
    root.addEventListener("mouseenter", replay)
    return () => root.removeEventListener("mouseenter", replay)
  }, [trigger, reducedMotion, perspective, hinge, duration, stagger])

  const origin = hinge === "bottom" ? "50% 100%" : hinge === "left" ? "0% 50%" : hinge === "right" ? "100% 50%" : "50% 0%"
  return (
    <span
      ref={rootRef}
      className={`fold-text ${className}`.trim()}
      style={{ "--fold-size": typeof fontSize === "number" ? `${fontSize}px` : fontSize, "--fold-weight": fontWeight, "--fold-color": color, "--fold-perspective": `${perspective}px`, ...style } as React.CSSProperties}
    >
      <span className="fold-text__sr">{text}</span>
      <span className={splitBy === "line" ? "fold-text__visual fold-text__visual--lines" : "fold-text__visual"} aria-hidden="true">
        {segments.map((segment, index) => {
          if (splitBy === "word" && /^\s+$/.test(segment)) return <span key={`space-${index}`} className="fold-text__space">{segment.replace(/ /g, "\u00a0")}</span>
          const initial = reducedMotion ? {} : { rotateX: hinge === "bottom" ? 82 : -82, opacity: 0, y: 8 }
          return (
            <motion.span
              key={`${segment}-${index}`}
              data-fold-piece
              className={`fold-text__piece ${splitBy === "line" ? "fold-text__piece--line" : ""}`}
              style={{ transformOrigin: origin, transformPerspective: perspective }}
              initial={trigger === "hover" || reducedMotion ? false : initial}
              animate={trigger === "hover" ? { rotateX: 0, opacity: 1, y: 0 } : { rotateX: 0, opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0.01 : duration, delay: reducedMotion || trigger === "hover" ? 0 : index * stagger, ease: [0.22, 1, 0.36, 1] }}
            >
              {segment === " " ? "\u00a0" : segment}
            </motion.span>
          )
        })}
      </span>
    </span>
  )
}
