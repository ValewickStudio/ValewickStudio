"use client"

import { useEffect, useRef } from "react"
import { Mesh, Program, Renderer, Triangle } from "ogl"

type Props = {
  raysOrigin?: "top-center" | "top-left" | "top-right" | "left" | "right" | "bottom-center" | "bottom-left" | "bottom-right"
  raysColor?: string
  raysSpeed?: number
  lightSpread?: number
  rayLength?: number
  followMouse?: boolean
  mouseInfluence?: number
  noiseAmount?: number
  distortion?: number
  pulsating?: boolean
  className?: string
}

function rgb(hex: string) {
  const value = hex.replace("#", "")
  const n = Number.parseInt(value.length === 3 ? value.split("").map(c => c + c).join("") : value, 16)
  return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]
}

export default function LightRays({
  raysOrigin = "top-center", raysColor = "#e9d8b1", raysSpeed = 0.28,
  lightSpread = 0.78, rayLength = 1.4, followMouse = true, mouseInfluence = 0.08,
  noiseAmount = 0.04, distortion = 0.025, pulsating = true, className = "",
}: Props) {
  const host = useRef<HTMLDivElement>(null)
  const settings = useRef({ raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, followMouse, mouseInfluence, noiseAmount, distortion, pulsating })
  settings.current = { raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, followMouse, mouseInfluence, noiseAmount, distortion, pulsating }

  useEffect(() => {
    const el = host.current
    if (!el) return
    let renderer: Renderer
    let raf = 0
    let visible = true
    let disposed = false
    let start = performance.now()
    const mouse = { x: 0.5, y: 0.45 }
    const smooth = { x: 0.5, y: 0.45 }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    try {
      renderer = new Renderer({ alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, 1.5) })
      const gl = renderer.gl
      gl.canvas.style.width = "100%"
      gl.canvas.style.height = "100%"
      gl.canvas.style.display = "block"
      el.appendChild(gl.canvas)
      const uniforms = {
        uTime: { value: 0 }, uResolution: { value: [1, 1] }, uColor: { value: rgb(settings.current.raysColor) },
        uMouse: { value: [0.5, 0.45] }, uSpread: { value: settings.current.lightSpread },
        uLength: { value: settings.current.rayLength }, uInfluence: { value: settings.current.mouseInfluence },
        uDistortion: { value: settings.current.distortion }, uNoise: { value: settings.current.noiseAmount },
        uPulse: { value: settings.current.pulsating ? 1 : 0 },
      }
      const vertex = `attribute vec2 position; varying vec2 vUv; void main(){vUv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`
      const fragment = `precision mediump float; varying vec2 vUv; uniform float uTime; uniform vec2 uResolution; uniform vec3 uColor; uniform vec2 uMouse; uniform float uSpread; uniform float uLength; uniform float uInfluence; uniform float uDistortion; uniform float uNoise; uniform float uPulse;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      void main(){vec2 uv=vUv; vec2 origin=vec2(.5,1.12); vec2 target=vec2(mix(.5,uMouse.x,uInfluence),mix(1.0,uMouse.y,uInfluence)); vec2 dir=normalize(vec2(target.x-origin.x, -1.0)); vec2 p=uv-origin; float d=length(p); float angle=atan(p.x,-p.y); float aim=atan(dir.x,-dir.y); float da=abs(atan(sin(angle-aim),cos(angle-aim))); float beam=pow(max(0.0,cos(da*max(1.2,2.6/max(.25,uSpread)))),7.0); float bands=.52+.48*sin(angle*25.0+uTime*.32); float wobble=sin(uv.y*7.0-uTime*.17)*uDistortion; float fall=clamp(1.0-d/max(.25,uLength*1.25),0.0,1.0); float pulse=mix(1.0,.88+.12*sin(uTime*.65),uPulse); float grain=mix(1.0,hash(uv*180.0+uTime*.03),uNoise); float vertical=pow(max(0.0,uv.y),.45); float strength=beam*(.3+.7*bands+wobble)*fall*vertical*pulse*grain; strength*=.42; gl_FragColor=vec4(uColor*strength,strength);}`
      const program = new Program(gl, { vertex, fragment, uniforms, transparent: true, depthTest: false, depthWrite: false })
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })
      const place = () => {
        if (!el || disposed) return
        renderer.setSize(el.clientWidth || window.innerWidth, el.clientHeight || window.innerHeight)
        uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height]
        const o = settings.current.raysOrigin
        if (o.includes("left")) uniforms.uMouse.value = [0.05, .5]
        else if (o.includes("right")) uniforms.uMouse.value = [.95, .5]
        else uniforms.uMouse.value = [.5, .45]
        uniforms.uColor.value = rgb(settings.current.raysColor)
        uniforms.uSpread.value = settings.current.lightSpread
        uniforms.uLength.value = settings.current.rayLength
        uniforms.uInfluence.value = settings.current.followMouse ? settings.current.mouseInfluence : 0
        uniforms.uDistortion.value = settings.current.distortion
        uniforms.uNoise.value = settings.current.noiseAmount
        uniforms.uPulse.value = settings.current.pulsating ? 1 : 0
      }
      const onMove = (event: MouseEvent) => { mouse.x = event.clientX / window.innerWidth; mouse.y = event.clientY / window.innerHeight }
      const observer = new IntersectionObserver(entries => { visible = Boolean(entries[0]?.isIntersecting) })
      observer.observe(el)
      const render = (now: number) => {
        if (disposed) return
        if (visible && !document.hidden) {
          const time = reduce ? 0 : (now - start) * .001 * settings.current.raysSpeed
          uniforms.uTime.value = time
          smooth.x += (mouse.x - smooth.x) * .035
          smooth.y += (mouse.y - smooth.y) * .035
          uniforms.uMouse.value = [smooth.x, smooth.y]
          renderer.render({ scene: mesh })
        }
        raf = requestAnimationFrame(render)
      }
      place()
      window.addEventListener("resize", place, { passive: true })
      window.addEventListener("mousemove", onMove, { passive: true })
      raf = requestAnimationFrame(render)
      return () => {
        disposed = true; cancelAnimationFrame(raf); observer.disconnect()
        window.removeEventListener("resize", place); window.removeEventListener("mousemove", onMove)
        const ext = gl.getExtension("WEBGL_lose_context"); ext?.loseContext()
        gl.canvas.remove()
      }
    } catch (error) {
      console.warn("LightRays could not initialize WebGL", error)
    }
    return () => { disposed = true; cancelAnimationFrame(raf); if (host.current) host.current.replaceChildren() }
  }, [])

  return <div ref={host} aria-hidden="true" className={`light-rays-layer ${className}`} />
}
