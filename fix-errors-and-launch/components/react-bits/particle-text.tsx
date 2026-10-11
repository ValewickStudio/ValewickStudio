"use client"

import { useEffect, useRef } from "react"
import "./particle-text.css"

type ParticleTextProps = {
  text: string
  className?: string
  fontSize?: string
  fontWeight?: number
  particleSize?: number
  density?: number
  color?: string
  scatter?: number
  gatherDuration?: number
  trigger?: "mount" | "hover" | "click"
}

export function ParticleText({
  text, className = "", fontSize = "clamp(2.7rem, 7vw, 6.5rem)", fontWeight = 300,
  particleSize = 1.65, density = 5, color = "#f4f0e8", scatter = 105,
  gatherDuration = 1250, trigger = "hover",
}: ParticleTextProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!root || !canvas || !ctx) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let raf = 0
    let build = 0
    let width = 0
    let height = 0
    let dpr = 1
    let started = 0
    let gathering = false
    let pointer = { x: -999, y: -999, active: false }
    let particles: { x:number;y:number;tx:number;ty:number;sx:number;sy:number;delay:number;size:number;seed:number }[] = []
    const clamp = (n:number,a:number,b:number) => Math.max(a,Math.min(b,n))
    const sample = async () => {
      const id = ++build
      width = root.clientWidth
      height = root.clientHeight
      if (!width || !height) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width*dpr)
      canvas.height = Math.round(height*dpr)
      ctx.setTransform(dpr,0,0,dpr,0,0)
      const computed = getComputedStyle(root)
      const probe = document.createElement("span")
      probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap"
      probe.style.font = `${fontWeight} ${fontSize} ${computed.fontFamily || "sans-serif"}`
      root.appendChild(probe)
      let size = parseFloat(getComputedStyle(probe).fontSize) || 72
      probe.remove()
      await document.fonts.ready
      if (id !== build) return
      const off = document.createElement("canvas")
      const octx = off.getContext("2d",{willReadFrequently:true})
      if (!octx) return
      const family = computed.fontFamily || "sans-serif"
      let font = `${fontWeight} ${size}px ${family}`
      octx.font = font
      let metrics = octx.measureText(text)
      if (metrics.width > width*.94) { size *= width*.94/metrics.width; font = `${fontWeight} ${size}px ${family}`; octx.font=font; metrics=octx.measureText(text) }
      const pad = 8
      const ascent = metrics.actualBoundingBoxAscent || size*.75
      const descent = metrics.actualBoundingBoxDescent || size*.2
      off.width = Math.ceil(metrics.width + pad*2)
      off.height = Math.ceil(ascent+descent+pad*2)
      octx.font=font; octx.textBaseline="alphabetic"; octx.fillStyle="#fff"; octx.fillText(text,pad,pad+ascent)
      const pixels=octx.getImageData(0,0,off.width,off.height).data
      const targets:{x:number;y:number;alpha:number}[]=[]
      for(let y=0;y<off.height;y+=Math.max(2,density)) for(let x=0;x<off.width;x+=Math.max(2,density)) {
        const alpha=pixels[(y*off.width+x)*4+3]
        if(alpha>45) targets.push({x:(align === "left" ? 0 : width/2-off.width/2)+x,y:height/2-off.height/2+y,alpha:alpha/255})
      }
      const max=2600, stride=Math.max(1,Math.ceil(targets.length/max))
      particles=targets.filter((_,i)=>i%stride===0).map((p,i)=>{
        const seed=((i*9301+49297)%233280)/233280
        const angle=seed*Math.PI*2, distance=reduced.matches?0:scatter*(.25+seed*.9)
        return {x:p.x+Math.cos(angle)*distance,y:p.y+Math.sin(angle)*distance,tx:p.x,ty:p.y,sx:p.x+Math.cos(angle)*distance,sy:p.y+Math.sin(angle)*distance,delay:seed*260,size:particleSize*(.75+p.alpha*.45),seed}
      })
      started=performance.now(); gathering=!reduced.matches
      if(reduced.matches) particles.forEach(p=>{p.x=p.tx;p.y=p.ty})
      if(!raf) raf=requestAnimationFrame(render)
    }
    const render=(now:number)=>{
      raf=0; ctx.clearRect(0,0,width,height)
      let active=false
      for(const p of particles){
        let x=p.tx,y=p.ty,progress=1
        if(gathering){
          progress=clamp((now-started-p.delay)/gatherDuration,0,1)
          const eased=1-Math.pow(1-progress,3)
          x=p.sx+(p.tx-p.sx)*eased; y=p.sy+(p.ty-p.sy)*eased
          if(progress<1) active=true
        } else if(!reduced.matches) {
          x+=Math.sin(now*.0007+p.seed*10)*.65
          y+=Math.cos(now*.0006+p.seed*8)*.5
        }
        if(pointer.active && !reduced.matches){
          const dx=x-pointer.x,dy=y-pointer.y,d=Math.hypot(dx,dy)
          if(d>0&&d<90){const f=(1-d/90)**2*14;x+=dx/d*f;y+=dy/d*f}
        }
        p.x+=(x-p.x)*(reduced.matches?1:.24);p.y+=(y-p.y)*(reduced.matches?1:.24)
        ctx.globalAlpha=.45+progress*.55;ctx.fillStyle=color;ctx.fillRect(p.x,p.y,p.size,p.size)
      }
      ctx.globalAlpha=1
      if(gathering&& !active) gathering=false
      if(gathering||(!reduced.matches&&particles.length)) raf=requestAnimationFrame(render)
    }
    const onMove=(e:PointerEvent)=>{const r=canvas.getBoundingClientRect();pointer={x:e.clientX-r.left,y:e.clientY-r.top,active:true}}
    const onLeave=()=>{pointer.active=false}
    const onEnter=()=>{if(trigger==="hover"&&!reduced.matches){particles.forEach(p=>{p.sx=p.x+(Math.random()-.5)*scatter;p.sy=p.y+(Math.random()-.5)*scatter});started=performance.now();gathering=true;if(!raf)raf=requestAnimationFrame(render)}}
    const onClick=()=>{if(trigger==="click"&&!reduced.matches){particles.forEach(p=>{p.sx=p.tx+(Math.random()-.5)*scatter*2;p.sy=p.ty+(Math.random()-.5)*scatter*2;p.x=p.sx;p.y=p.sy});started=performance.now();gathering=true;if(!raf)raf=requestAnimationFrame(render)}}
    const observer=new ResizeObserver(()=>{if(raf)cancelAnimationFrame(raf);raf=0;sample()})
    observer.observe(root);canvas.addEventListener("pointermove",onMove);canvas.addEventListener("pointerleave",onLeave);canvas.addEventListener("pointerenter",onEnter);canvas.addEventListener("click",onClick)
    sample()
    return ()=>{build++;observer.disconnect();canvas.removeEventListener("pointermove",onMove);canvas.removeEventListener("pointerleave",onLeave);canvas.removeEventListener("pointerenter",onEnter);canvas.removeEventListener("click",onClick);if(raf)cancelAnimationFrame(raf)}
  },[text,fontSize,fontWeight,particleSize,density,color,scatter,gatherDuration,trigger,align])

  return <div ref={rootRef} className={`particle-text ${className}`} aria-label={text}><canvas ref={canvasRef} aria-hidden="true"/><span className="particle-text__sr">{text}</span></div>
}
