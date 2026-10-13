"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Volume2, VolumeX, Waves } from "lucide-react"

const chords = [
  [220, 261.63, 329.63, 392],
  [196, 246.94, 293.66, 369.99],
  [174.61, 220, 261.63, 329.63],
  [196, 246.94, 293.66, 349.23],
]
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
  const [startFailed, setStartFailed] = useState(false)
  const contextRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const chordTimerRef = useRef<number | null>(null)
  const melodyTimerRef = useRef<number | null>(null)
  const chordIndexRef = useRef(0)
  const melodyIndexRef = useRef(0)
  const startingRef = useRef(false)

  const startSound = useCallback(async () => {
    if (startingRef.current) return
    startingRef.current = true
    setSoundLoading(true)
    try {
      let context = contextRef.current
      let master = masterRef.current

      if (!context || context.state === "closed" || !master) {
        const AudioContextConstructor = window.AudioContext
        context = new AudioContextConstructor()
        master = context.createGain()
        master.gain.setValueAtTime(0.0001, context.currentTime)
        master.connect(context.destination)
        contextRef.current = context
        masterRef.current = master

        await context.resume()
        if (context.state !== "running") throw new Error("Audio playback needs a user gesture")

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
      } else {
        await context.resume()
      }

      const activeContext = contextRef.current
      const activeMaster = masterRef.current
      if (!activeContext || !activeMaster || activeContext.state !== "running") throw new Error("Audio playback could not start")
      const now = activeContext.currentTime
      activeMaster.gain.cancelScheduledValues(now)
      activeMaster.gain.setTargetAtTime(0.12, now, 0.45)
      setSoundOn(true)
      setStartFailed(false)
    } catch {
      const failedContext = contextRef.current
      contextRef.current = null
      masterRef.current = null
      if (chordTimerRef.current !== null) window.clearInterval(chordTimerRef.current)
      if (melodyTimerRef.current !== null) window.clearInterval(melodyTimerRef.current)
      chordTimerRef.current = null
      melodyTimerRef.current = null
      if (failedContext && failedContext.state !== "closed") void failedContext.close().catch(() => undefined)
      setSoundOn(false)
      setStartFailed(true)
    } finally {
      startingRef.current = false
      setSoundLoading(false)
    }
  }, [])

  useEffect(() => () => {
    if (chordTimerRef.current !== null) window.clearInterval(chordTimerRef.current)
    if (melodyTimerRef.current !== null) window.clearInterval(melodyTimerRef.current)
    if (contextRef.current && contextRef.current.state !== "closed") void contextRef.current.close()
  }, [])

  const toggleSound = () => {
    if (soundLoading) return
    const context = contextRef.current
    const master = masterRef.current
    if (!context || context.state === "closed" || !master || !soundOn) {
      void startSound()
      return
    }

    const now = context.currentTime
    master.gain.cancelScheduledValues(now)
    master.gain.setTargetAtTime(0.0001, now, 0.12)
    setSoundOn(false)
  }

  const status = soundLoading ? "STARTING" : soundOn ? "NOW PLAYING" : startFailed ? "AUDIO BLOCKED" : contextRef.current ? "SOUND MUTED" : "SOUND OFF"
  const label = soundLoading ? "Preparing soundscape…" : soundOn ? "Mute soundscape" : startFailed ? "Tap to try again" : contextRef.current ? "Unmute soundscape" : "Enable soundscape"

  return (
    <>
      <div className="ambient-orbit ambient-orbit-one" aria-hidden="true" />
      <div className="ambient-orbit ambient-orbit-two" aria-hidden="true" />
      <button
        type="button"
        onClick={toggleSound}
        disabled={soundLoading}
        className="soundscape-control"
        aria-label={soundOn ? "Mute background music" : contextRef.current ? "Unmute background music" : "Enable background music"}
        aria-pressed={soundOn}
        title={label}
      >
        <span className={soundOn ? "soundscape-icon soundscape-icon-active" : "soundscape-icon"} aria-hidden="true">
          {soundOn ? <Volume2 size={16} strokeWidth={1.6} /> : <VolumeX size={16} strokeWidth={1.6} />}
        </span>
        <span className="soundscape-copy">
          <span className="soundscape-eyebrow">{status}</span>
          <span className="soundscape-label">{label}</span>
        </span>
        <span className={soundOn ? "soundscape-wave soundscape-wave-on" : "soundscape-wave"} aria-hidden="true">
          <Waves size={15} strokeWidth={1.5} />
        </span>
      </button>
    </>
  )
}
