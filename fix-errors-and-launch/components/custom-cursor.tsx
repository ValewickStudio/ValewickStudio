"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      if (target?.closest("iframe")) {
        hideCursor()
        return
      }
      setIsVisible(true)
      setIsHovering(Boolean(target?.closest("a, button, [data-cursor-hover]")))
    }

    const hideCursor = () => {
      setIsVisible(false)
      setIsHovering(false)
    }

    const handleMouseLeave = () => hideCursor()
    const handleWindowBlur = () => hideCursor()

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsHovering(Boolean(target.closest("a, button, [data-cursor-hover]")))
    }

    const handleHoverEnd = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const nextTarget = e.relatedTarget as HTMLElement | null
      const interactive = target.closest("a, button, [data-cursor-hover]")
      setIsHovering(Boolean(nextTarget?.closest("a, button, [data-cursor-hover]")) && Boolean(interactive))
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("blur", handleWindowBlur)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseover", handleHoverStart)
    document.addEventListener("mouseout", handleHoverEnd)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("blur", handleWindowBlur)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseover", handleHoverStart)
      document.removeEventListener("mouseout", handleHoverEnd)
    }
  }, [])

  const cursorClass = "hidden md:block fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={`${cursorClass} h-3 w-3 rounded-full bg-white`}
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isHovering ? 0 : 5,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      {/* Hover ring */}
      <motion.div
        className={`${cursorClass} h-12 w-12 rounded-full border border-white`}
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: isHovering ? 1 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.8 }}
      />
    </>
  )
}
