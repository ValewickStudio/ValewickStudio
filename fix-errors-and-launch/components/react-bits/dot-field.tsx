"use client"

import { memo, useEffect, useRef } from "react"
import "./dot-field.css"

type DotFieldProps = { dotRadius?: number; dotSpacing?: number; bulgeStrength?: number; cursorRadius?: number; waveAmplitude?: number; className?: string }

export const DotField = memo(function DotField({ dotRadius=1.15,dotSpacing=17,bulgeStrength=34,cursorRadius=260,waveAmplitude=.15,className="" }:DotFieldProps) {
  const canvasRef=useRef<HTMLCanvasElement>(null)
  useEffect(()=>{
    const canvas=canvasRef.current,ctx=canvas?.getContext("2d")
    if(!canvas||!ctx)return
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)")
    let w=0,h=0,dpr=1,raf=0,t=0
    let mouse={x:-1000,y:-1000,active:false}
    let dots:{x:number;y:number}[]=[]
    const resize=()=>{
      const r=canvas.getBoundingClientRect();w=r.width;h=r.height;dpr=Math.min(window.devicePixelRatio||1,2)
      canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)
      dots=[];const step=dotRadius+dotSpacing
      for(let y=step/2;y<h;y+=step)for(let x=step/2;x<w;x+=step)dots.push({x,y})
      if(!raf)raf=requestAnimationFrame(draw)
    }
    const move=(e:PointerEvent)=>{const r=canvas.getBoundingClientRect();mouse={x:e.clientX-r.left,y:e.clientY-r.top,active:true};if(!raf)raf=requestAnimationFrame(draw)}
    const leave=()=>{mouse.active=false;if(!raf)raf=requestAnimationFrame(draw)}
    const draw=()=>{
      raf=0;t+=.012;ctx.clearRect(0,0,w,h);ctx.fillStyle="rgba(244,240,232,.38)"
      for(const d of dots){let x=d.x,y=d.y,alpha=.32
        if(!reduce.matches&&mouse.active){const dx=x-mouse.x,dy=y-mouse.y,dist=Math.hypot(dx,dy);if(dist<cursorRadius){const force=(1-dist/cursorRadius)**2*bulgeStrength;const angle=Math.atan2(dy,dx);x+=Math.cos(angle)*force;y+=Math.sin(angle)*force;alpha=.32+(1-dist/cursorRadius)*.42}}
        if(!reduce.matches&&waveAmplitude){y+=Math.sin(d.x*.018+t)*waveAmplitude*5}
        ctx.globalAlpha=alpha;ctx.beginPath();ctx.arc(x,y,dotRadius,0,Math.PI*2);ctx.fill()
      }
      ctx.globalAlpha=1
      if(!reduce.matches&&mouse.active)raf=requestAnimationFrame(draw)
    }
    const observer=new ResizeObserver(resize);observer.observe(canvas);window.addEventListener("pointermove",move,{passive:true});window.addEventListener("blur",leave);resize()
    return()=>{observer.disconnect();window.removeEventListener("pointermove",move);window.removeEventListener("blur",leave);if(raf)cancelAnimationFrame(raf)}
  },[dotRadius,dotSpacing,bulgeStrength,cursorRadius,waveAmplitude])
  return <div className={`dot-field ${className}`} aria-hidden="true"><canvas ref={canvasRef}/><div className="dot-field__vignette"/></div>
})
