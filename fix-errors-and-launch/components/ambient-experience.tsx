"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Volume2, VolumeX, Waves } from "lucide-react"

const chords = [
  [220, 261.63, 329.63, 392],
  [196, 246.94, 293.66, 369.99],
  [174.61, 220, 261.63, 329.63],
  [196, 246.94, 293.66, 349.23],
]

function playSoftChord(context: AudioContext, master: GainNode, notes: number[], startAt: number) {
  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator()
    const voice = context.createGain()
    oscillator.type = index === 0 ? "sine" : "triangle"
    oscillator.frequency.setValueAtTime(frequency, startAt)
    voice.gain.setValueAtTime(0.0001, startAt)
    voice.gain.exponentialRampToValueAtTime(index === 0 ? 0.12 : 0.055, startAt + 2.4)
    voice.gain.setValueAtTime(index === 0 ? 0.12 : 0.055, startAt + 5.8)
    voice.gain.exponentialRampToValueAtTime(0.0001, startAt + 8)
    oscillator.connect(voice)
    voice.connect(master)
    oscillator.start(startAt)
    oscillator.stop(startAt + 8.1)
  })
}

export function AmbientExperience() {
  const [soundOn, setSoundOn] = useState(false)
  const [soundLoading, setSoundLoading] = useState(false)
  const contextRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const chordTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const chordIndexRef = useRef(0)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.2 })

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section:not(.hero-stage)"))
    if (!("IntersectionObserver" in window)) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in-view")
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" })
    sections.forEach((section) => {
      section.classList.add("motion-reveal")
      observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  const stopSound = useCallback(async () => {
    if (chordTimerRef.current) {
      clearInterval(chordTimerRef.current)
      chordTimerRef.current = null
    }
    const context = contextRef.current
    const master = masterRef.current
    if (context && master && context.state !== "closed") {
      const now = context.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setTargetAtTime(0.0001, now, 0.18)
      window.setTimeout(() => { void context.close().catch(() => undefined) }, 750)
    }
    contextRef.current = null
    masterRef.current = null
    setSoundOn(false)
  }, [])

  const startSound = useCallback(async () => {
    setSoundLoading(true)
    try {
      const AudioContextConstructor = window.AudioContext
      const context = new AudioContextConstructor()
      const master = context.createGain()
      master.gain.setValueAtTime(0.0001, context.currentTime)
      master.gain.exponentialRampToValueAtTime(0.16, context.currentTime + 2)
      master.connect(context.destination)
      await context.resume()
      contextRef.current = context
      masterRef.current = master
      chordIndexRef.current = 0
      playSoftChord(context, master, chords[0], context.currentTime + 0.05)
      chordTimerRef.current = window.setInterval(() => {
        const activeContext = contextRef.current
        const activeMaster = masterRef.current
        if (!activeContext || !activeMaster || activeContext.state !== "running") return
        chordIndexRef.current = (chordIndexRef.current + 1) % chords.length
        playSoftChord(activeContext, activeMaster, chords[chordIndexRef.current], activeContext.currentTime + 0.05)
      }, 7800)
      setSoundOn(true)
    } catch {
      setSoundOn(false)
    } finally {
      setSoundLoading(false)
    }
  }, [])

  useEffect(() => () => {
    if (chordTimerRef.current) clearInterval(chordTimerRef.current)
    if (contextRef.current && contextRef.current.state !== "closed") void contextRef.current.close()
  }, [])

  const toggleSound = () => {
    if (soundOn) void stopSound()
    else void startSound()
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="scroll-progress"
        style={{ scaleX: smoothProgress }}
      />
      <div className="ambient-orbit ambient-orbit-one" aria-hidden="true" />
      <div className="ambient-orbit ambient-orbit-two" aria-hidden="true" />
      <motion.button
        type="button"
        onClick={toggleSound}
        disabled={soundLoading}
        whileHover={{ y: -2, scale: 1.025 }}
        whileTap={{ scale: 0.97 }}
        className="soundscape-control liquid-glass"
        aria-label={soundOn ? "Mute calm background music" : "Play calm background music"}
        aria-pressed={soundOn}
        title={soundOn ? "Mute ambient music" : "Play ambient music"}
      >
        <span className={soundOn ? "soundscape-icon soundscape-icon-active" : "soundscape-icon"} aria-hidden="true">
          {soundOn ? <Volume2 size={16} strokeWidth={1.6} /> : <VolumeX size={16} strokeWidth={1.6} />}
        </span>
        <span className="soundscape-copy">
          <span className="soundscape-eyebrow">{soundOn ? "SOUND ON" : "SOUND OFF"}</span>
          <span className="soundscape-label">{soundLoading ? "Waking the soundscape…" : soundOn ? "Mute ambience" : "Play calm ambience"}</span>
        </span>
        <span className={soundOn ? "soundscape-wave soundscape-wave-on" : "soundscape-wave"} aria-hidden="true">
          <Waves size={15} strokeWidth={1.5} />
        </span>
      </motion.button>
    </>
  )
}
