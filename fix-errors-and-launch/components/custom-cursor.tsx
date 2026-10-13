"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const pointerX = useMotionValue(-100)
  const pointerY = useMotionValue(-100)
  const dotX = useSpring(pointerX, { stiffness: 500, damping: 34, mass: 0.35 })
  const dotY = useSpring(pointerY, { stiffness: 500, damping: 34, mass: 0.35 })
  const ringX = useSpring(pointerX, { stiffness: 300, damping: 25, mass: 0.6 })
  const ringY = useSpring(pointerY, { stiffness: 300, damping: 25, mass: 0.6 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const interactive = "a, button, [role='button'], [data-cursor-hover]"
    const handleMouseMove = (event: MouseEvent) => {
      pointerX.set(event.clientX)
      pointerY.set(event.clientY)
      setIsVisible(true)
      const target = event.target instanceof Element ? event.target : null
      setIsHovering(Boolean(target?.closest(interactive)))
    }
    const hideCursor = () => { setIsVisible(false); setIsHovering(false) }
    const handleOver = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null
      setIsHovering(Boolean(target?.closest(interactive)))
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("blur", hideCursor)
    document.addEventListener("mouseover", handleOver, { passive: true })
    document.addEventListener("mouseleave", hideCursor)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("blur", hideCursor)
      document.removeEventListener("mouseover", handleOver)
      document.removeEventListener("mouseleave", hideCursor)
    }
  }, [pointerX, pointerY])

  const cursorClass = "hidden md:block fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
  return (
    <div className="custom-cursor-layer" aria-hidden="true">
      <motion.div className={`${cursorClass} h-3 w-3 rounded-full bg-white`} style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }} animate={{ scale: isHovering ? 0 : 5, opacity: isVisible ? 1 : 0 }} transition={{ scale: { type: "spring", stiffness: 500, damping: 28 }, opacity: { duration: 0.15 } }} />
      <motion.div className={`${cursorClass} h-12 w-12 rounded-full border border-white`} style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }} animate={{ scale: isHovering ? 1 : 0, opacity: isVisible ? 1 : 0 }} transition={{ scale: { type: "spring", stiffness: 300, damping: 20 }, opacity: { duration: 0.15 } }} />
    </div>
  )
}
