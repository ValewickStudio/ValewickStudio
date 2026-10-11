"use client"

import { useEffect, useRef } from "react"

type ClickSparkProps = {
  children: React.ReactNode
  sparkColor?: string
  sparkSize?: number
  sparkRadius?: number
  sparkCount?: number
  duration?: number
  easing?: "linear" | "ease-in" | "ease-in-out" | "ease-out"
  extraScale?: number
  className?: string
}

export function ClickSpark({ children, sparkColor = "#ffffff", sparkSize = 10, sparkRadius = 18, sparkCount = 8, duration = 440, easing = "ease-out", extraScale = 1, className = "" }: ClickSparkProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparks = useRef<{x:number;y:number;angle:number;start:number}[]>([])
  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!root || !canvas || !ctx) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let raf = 0
    const resize = () => {
      const rect = root.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(root)
    resize()
    const ease = (t:number) => easing === "linear" ? t : easing === "ease-in" ? t*t : easing === "ease-in-out" ? (t < .5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2) : 1-(1-t)*(1-t)
    const draw = (now:number) => {
      raf = 0
      const rect = root.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)
      sparks.current = sparks.current.filter(s => {
        const t = (now-s.start)/duration
        if (t >= 1) return false
        const progress = ease(Math.max(0,t))
        const distance = progress*sparkRadius*extraScale
        const length = sparkSize*(1-progress)
        ctx.globalAlpha = 1-progress
        ctx.strokeStyle = sparkColor
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(s.x+distance*Math.cos(s.angle),s.y+distance*Math.sin(s.angle))
        ctx.lineTo(s.x+(distance+length)*Math.cos(s.angle),s.y+(distance+length)*Math.sin(s.angle))
        ctx.stroke()
        return true
      })
      ctx.globalAlpha = 1
      if (sparks.current.length) raf = requestAnimationFrame(draw)
    }
    const onClick = (event:MouseEvent) => {
      if (reduced.matches || (event.target instanceof Element && event.target.closest("[data-no-click-spark]"))) return
      const rect = root.getBoundingClientRect()
      const x = event.clientX-rect.left
      const y = event.clientY-rect.top
      const start = performance.now()
      for(let i=0;i<sparkCount;i++) sparks.current.push({x,y,angle:2*Math.PI*i/sparkCount,start})
      if(!raf) raf=requestAnimationFrame(draw)
    }
    root.addEventListener("click",onClick)
    return () => { observer.disconnect(); root.removeEventListener("click",onClick); if(raf)cancelAnimationFrame(raf); sparks.current=[] }
  },[sparkColor,sparkSize,sparkRadius,sparkCount,duration,easing,extraScale])
  return <div ref={rootRef} className={`click-spark-root ${className}`}><canvas ref={canvasRef} className="click-spark-canvas" aria-hidden="true"/>{children}</div>
}
