"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const pointerX = useMotionValue(-100)
  const pointerY = useMotionValue(-100)
  const x = useSpring(pointerX, { stiffness: 620, damping: 36, mass: 0.28 })
  const y = useSpring(pointerY, { stiffness: 620, damping: 36, mass: 0.28 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (event: MouseEvent) => {
      pointerX.set(event.clientX)
      pointerY.set(event.clientY)
      setVisible(true)
    }
    const hide = () => setVisible(false)
    window.addEventListener("mousemove", move, { passive: true })
    window.addEventListener("blur", hide)
    document.addEventListener("mouseleave", hide)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("blur", hide)
      document.removeEventListener("mouseleave", hide)
    }
  }, [pointerX, pointerY])

  return <div className="custom-cursor-layer" aria-hidden="true">
    <motion.div className="custom-cursor-ball" style={{ x, y, translateX: "-50%", translateY: "-50%" }} animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.65 }} transition={{ opacity: { duration: 0.12 }, scale: { type: "spring", stiffness: 520, damping: 30 } }} />
  </div>
}
