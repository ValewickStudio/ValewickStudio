"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Volume2, VolumeX, Waves } from "lucide-react"

const chords = [
  [220, 261.63, 329.63, 392],
  [196, 246.94, 293.66, 369.99],
  [174.61, 220, 261.63, 329.63],
  [196, 246.94, 293.66, 349.23],
]

// A slow, warm melody over the repeating four-chord progression.
const melody = [659.25, 587.33, 523.25, 587.33, 392, 440, 523.25, 440, 493.88, 440, 392, 329.63]

function playSoftChord(context: AudioContext, master: GainNode, notes: number[], startAt: number) {
  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator()
    const voice = context.createGain()
    const filter = context.createBiquadFilter()
    oscillator.type = index === 0 ? "sine" : "triangle"
    oscillator.frequency.setValueAtTime(frequency, startAt)
    filter.type = "lowpass"
    filter.frequency.setValueAtTime(index === 0 ? 520 : 1250, startAt)
    voice.gain.setValueAtTime(0.0001, startAt)
    voice.gain.exponentialRampToValueAtTime(index === 0 ? 0.11 : 0.042, startAt + 2.6)
    voice.gain.setValueAtTime(index === 0 ? 0.11 : 0.042, startAt + 5.6)
    voice.gain.exponentialRampToValueAtTime(0.0001, startAt + 8)
    oscillator.connect(filter)
    filter.connect(voice)
    voice.connect(master)
    oscillator.start(startAt)
    oscillator.stop(startAt + 8.1)
  })
}

function playSoftNote(context: AudioContext, master: GainNode, frequency: number, startAt: number) {
  const oscillator = context.createOscillator()
  const voice = context.createGain()
  const filter = context.createBiquadFilter()
  oscillator.type = "sine"
  oscillator.frequency.setValueAtTime(frequency, startAt)
  filter.type = "lowpass"
  filter.frequency.setValueAtTime(1800, startAt)
  voice.gain.setValueAtTime(0.0001, startAt)
  voice.gain.exponentialRampToValueAtTime(0.022, startAt + 0.16)
  voice.gain.exponentialRampToValueAtTime(0.0001, startAt + 2.2)
  oscillator.connect(filter)
  filter.connect(voice)
  voice.connect(master)
  oscillator.start(startAt)
  oscillator.stop(startAt + 2.25)
}

export function AmbientExperience() {
  const [soundOn, setSoundOn] = useState(false)
  const [soundLoading, setSoundLoading] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const contextRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const chordTimerRef = useRef<number | null>(null)
  const melodyTimerRef = useRef<number | null>(null)
  const chordIndexRef = useRef(0)
  const melodyIndexRef = useRef(0)

  const stopSound = useCallback(async () => {
    if (chordTimerRef.current !== null) {
      window.clearInterval(chordTimerRef.current)
      chordTimerRef.current = null
    }
    if (melodyTimerRef.current !== null) {
      window.clearInterval(melodyTimerRef.current)
      melodyTimerRef.current = null
    }
    const context = contextRef.current
    const master = masterRef.current
    if (context && master && context.state !== "closed") {
      const now = context.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setTargetAtTime(0.0001, now, 0.2)
      window.setTimeout(() => { void context.close().catch(() => undefined) }, 850)
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
      master.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 2.4)
      master.connect(context.destination)
      contextRef.current = context
      masterRef.current = master
      await context.resume()
      if (context.state !== "running") throw new Error("Audio playback requires a user gesture")
      chordIndexRef.current = 0
      melodyIndexRef.current = 0
      playSoftChord(context, master, chords[0], context.currentTime + 0.05)
      playSoftNote(context, master, melody[0], context.currentTime + 0.65)
      chordTimerRef.current = window.setInterval(() => {
        const activeContext = contextRef.current
        const activeMaster = masterRef.current
        if (!activeContext || !activeMaster || activeContext.state !== "running") return
        chordIndexRef.current = (chordIndexRef.current + 1) % chords.length
        playSoftChord(activeContext, activeMaster, chords[chordIndexRef.current], activeContext.currentTime + 0.05)
      }, 7800)
      melodyTimerRef.current = window.setInterval(() => {
        const activeContext = contextRef.current
        const activeMaster = masterRef.current
        if (!activeContext || !activeMaster || activeContext.state !== "running") return
        melodyIndexRef.current = (melodyIndexRef.current + 1) % melody.length
        playSoftNote(activeContext, activeMaster, melody[melodyIndexRef.current], activeContext.currentTime + 0.04)
      }, 1650)
      setSoundOn(true)
      setAutoplayBlocked(false)
    } catch {
      const failedContext = contextRef.current
      contextRef.current = null
      masterRef.current = null
      if (failedContext && failedContext.state !== "closed") void failedContext.close().catch(() => undefined)
      setSoundOn(false)
      setAutoplayBlocked(true)
    } finally {
      setSoundLoading(false)
    }
  }, [])

  // Try to begin the soundscape on page load. Browsers may block audible autoplay;
  // when they do, the control stays available for a one-tap start.
  useEffect(() => {
    void startSound()
  }, [startSound])

  useEffect(() => () => {
    if (chordTimerRef.current !== null) window.clearInterval(chordTimerRef.current)
    if (melodyTimerRef.current !== null) window.clearInterval(melodyTimerRef.current)
    if (contextRef.current && contextRef.current.state !== "closed") void contextRef.current.close()
  }, [])

  const toggleSound = () => {
    if (soundOn) void stopSound()
    else void startSound()
  }

  return (
    <>
      <div className="ambient-orbit ambient-orbit-one" aria-hidden="true" />
      <div className="ambient-orbit ambient-orbit-two" aria-hidden="true" />
      <button
        type="button"
        onClick={toggleSound}
        disabled={soundLoading}
        className="soundscape-control liquid-glass"
        aria-label={soundOn ? "Pause chill background music" : "Start chill background music"}
        aria-pressed={soundOn}
        title={soundOn ? "Pause chill music" : autoplayBlocked ? "Tap to enable chill music" : "Start chill music"}
      >
        <span className={soundOn ? "soundscape-icon soundscape-icon-active" : "soundscape-icon"} aria-hidden="true">
          {soundOn ? <Volume2 size={16} strokeWidth={1.6} /> : autoplayBlocked ? <VolumeX size={16} strokeWidth={1.6} /> : <Volume2 size={16} strokeWidth={1.6} />}
        </span>
        <span className="soundscape-copy">
          <span className="soundscape-eyebrow">{soundOn ? "NOW PLAYING" : soundLoading ? "STARTING" : autoplayBlocked ? "TAP TO START" : "SOUND ON"}</span>
          <span className="soundscape-label">{soundLoading ? "Waking the soundscape…" : soundOn ? "Pause chill music" : autoplayBlocked ? "Enable chill music" : "Start chill music"}</span>
        </span>
        <span className={soundOn ? "soundscape-wave soundscape-wave-on" : "soundscape-wave"} aria-hidden="true">
          <Waves size={15} strokeWidth={1.5} />
        </span>
      </button>
    </>
  )
}
