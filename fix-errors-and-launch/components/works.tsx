"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Pause, Play, Volume2, VolumeX, X } from "lucide-react"
import { showcaseVideos } from "@/lib/site-config"
import { FoldText } from "@/components/react-bits/fold-text"

export function Works() {
  const [activeVideo, setActiveVideo] = useState<(typeof showcaseVideos)[number] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
    video.muted = true
    setIsPlaying(false)
    setIsMuted(true)
  }, [activeVideo])

  useEffect(() => () => videoRef.current?.pause(), [])

  const closeViewer = () => {
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
      video.muted = true
    }
    setIsPlaying(false)
    setIsMuted(true)
    setProgress(0)
    setActiveVideo(null)
  }

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.muted = true
      setIsMuted(true)
      void video.play()
    } else video.pause()
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  return (
    <section id="distortion-gallery" className="relative border-t border-white/10 px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="mb-12 flex items-end justify-between gap-6 md:mb-16">
          <div><p className="mb-4 font-mono text-xs tracking-[0.3em] text-muted-foreground">04 — DISTORTION GALLERY</p><h2 className="text-4xl font-light tracking-tight md:text-6xl"><FoldText text="Selected campaigns." splitBy="word" fontSize="inherit" fontWeight={300} className="font-sans" /></h2></div>
          <span className="hidden font-mono text-xs tracking-widest text-muted-foreground md:block">SELECT / WATCH</span>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-3">
          {showcaseVideos.map((project, index) => (
            <motion.article key={project.id} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, delay: index * 0.1 }} whileHover={{ y: -8 }} className="liquid-glass spotlight-card glare-hover group rounded-2xl border border-white/10 p-3">
              <button type="button" onClick={() => setActiveVideo(project)} className="block w-full text-left" data-cursor-hover aria-label={`Watch ${project.title}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-white/5">
                  <video src={project.src} muted playsInline preload="metadata" className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-110 group-hover:saturate-125" aria-label={`${project.title} preview`} />
                  <div className="absolute inset-0 bg-black/25" />
                  <span className="absolute right-3 top-3 border border-white/30 bg-black/50 px-2 py-1 font-mono text-[10px] tracking-widest">{project.number}</span>
                  <span className="absolute bottom-4 left-4 flex items-center gap-2 font-mono text-[10px] tracking-widest text-white">WATCH PROJECT <ArrowUpRight className="size-3" /></span>
                </div>
                <div className="flex min-h-[112px] items-start justify-between gap-4 py-5"><div><p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">{project.category}</p><h3 className="mt-2 text-xl font-light">{project.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{project.description}</p></div><span className="font-mono text-xs text-muted-foreground">{project.number}</span></div>
              </button>
            </motion.article>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {activeVideo && <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={`${activeVideo.title} video viewer`} onClick={closeViewer}>
          <motion.div className="relative w-full max-w-4xl border border-white/20 bg-black p-3" initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 20 }} onClick={(event) => event.stopPropagation()}>
            <button type="button" aria-label="Close video viewer" onClick={closeViewer} className="absolute right-4 top-4 z-10 border border-white/20 bg-black/70 p-2 text-white transition hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><X className="size-5" /></button>
            <video ref={videoRef} src={activeVideo.src} muted playsInline preload="metadata" controls={false} className="max-h-[70vh] w-full object-contain" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onTimeUpdate={(event) => setProgress(event.currentTarget.duration ? (event.currentTarget.currentTime / event.currentTarget.duration) * 100 : 0)} />
            <input aria-label="Seek video" type="range" min="0" max="100" value={progress} onChange={(event) => { const video = videoRef.current; const next = Number(event.target.value); if (video?.duration) video.currentTime = (next / 100) * video.duration; setProgress(next) }} className="mt-3 h-1 w-full accent-white" />
            <div className="flex flex-wrap items-center justify-between gap-4 px-2 pt-4"><div><p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">{activeVideo.category}</p><h3 className="mt-1 text-xl">{activeVideo.title}</h3></div><div className="flex gap-2"><button type="button" onClick={togglePlayback} aria-label={isPlaying ? "Pause video" : "Play video"} className="flex items-center gap-2 border border-white/20 px-3 py-3 font-mono text-[10px] tracking-widest transition hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">{isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}{isPlaying ? "PAUSE" : "PLAY"}</button><button type="button" onClick={toggleMute} aria-label={isMuted ? "Unmute video" : "Mute video"} className="flex items-center gap-2 border border-white/20 px-3 py-3 font-mono text-[10px] tracking-widest transition hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">{isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}{isMuted ? "UNMUTE" : "MUTE"}</button></div></div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </section>
  )
}
