"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

type Props = { checked?: boolean; defaultChecked?: boolean; onChange?: (checked: boolean) => void; label?: string; disabled?: boolean; trackColor?: string; trackOnColor?: string; thumbColor?: string; thumbOnColor?: string; width?: number; height?: number; radius?: number; speed?: number; stretch?: number; hoverScale?: number; colorDuration?: number; ariaLabel?: string; className?: string; id?: string }

export default function SquishSwitch({ checked, defaultChecked = false, onChange, label = "", disabled = false, trackColor = "#27272a", trackOnColor = "#f5f5f5", thumbColor = "#777777", thumbOnColor = "#27272a", width = 64, height = 32, radius = 16, speed = 35, stretch = 36, hoverScale = 1.035, colorDuration = 320, ariaLabel, className = "", id }: Props) {
  const [inner, setInner] = useState(defaultChecked)
  const on = checked ?? inner
  const reduce = useReducedMotion()
  const toggle = () => { if (disabled) return; const next = !on; if (checked === undefined) setInner(next); onChange?.(next) }
  return <span className={`squish-switch-root ${className}`} style={{ gap: 10 }}>
    {label && <label className="squish-switch-label" htmlFor={id}>{label}</label>}
    <button id={id} type="button" role="switch" aria-checked={on} aria-label={ariaLabel || label || "Toggle sound"} disabled={disabled} onClick={toggle} className="squish-switch" style={{ width, height, borderRadius: radius, background: on ? trackOnColor : trackColor, transitionDuration: `${colorDuration}ms` }}>
      <motion.span className="squish-switch-thumb" animate={{ x: on ? width - height + 2 : 2, scaleX: reduce ? 1 : on ? 1.06 : 1, scaleY: reduce ? 1 : on ? .96 : 1 }} transition={{ type: "spring", stiffness: 170 + speed * 2, damping: 21, mass: .7 }} whileHover={{ scale: hoverScale }} style={{ width: height - 4, height: height - 4, borderRadius: Math.max(3, radius - 3), background: on ? thumbOnColor : thumbColor }} />
    </button>
  </span>
}
