"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { X, Volume2, VolumeX, ArrowDown } from "lucide-react"
import SquishSwitch from "@/components/react-bits/SquishSwitch"
import StarBorder from "@/components/react-bits/StarBorder"

export function SoundNotice() {
  const [visible, setVisible] = useState(true)
  const [soundOn, setSoundOn] = useState(true)
  const [needsGesture, setNeedsGesture] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<{ context: AudioContext; gain: GainNode; oscillators: OscillatorNode[] } | null>(null)

  const startSound = useCallback(async () => {
    try {
      const AudioContextCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AudioContextCtor) { setNeedsGesture(true); return }
      let rig = audioRef.current
      if (!rig) {
        const context = new AudioContextCtor()
        const gain = context.createGain()
        gain.gain.value = 0.012
        gain.connect(context.destination)
        const oscillators = [110, 164.81, 220].map((frequency, index) => {
          const osc = context.createOscillator()
          const toneGain = context.createGain()
          osc.type = index === 1 ? "sine" : "triangle"
          osc.frequency.value = frequency
          toneGain.gain.value = index === 2 ? 0.15 : 0.3
          osc.connect(toneGain); toneGain.connect(gain); osc.start()
          return osc
        })
        rig = { context, gain, oscillators }
        audioRef.current = rig
      }
      await rig.context.resume()
      rig.gain.gain.cancelScheduledValues(rig.context.currentTime)
      rig.gain.gain.setTargetAtTime(soundOn ? 0.012 : 0, rig.context.currentTime, 0.18)
      setPlaying(rig.context.state === "running")
      setNeedsGesture(rig.context.state !== "running")
    } catch { setNeedsGesture(true); setPlaying(false) }
  }, [soundOn])

  useEffect(() => {
    const id = window.setTimeout(() => { void startSound() }, 900)
    return () => {
      window.clearTimeout(id)
      const rig = audioRef.current
      if (rig) { rig.oscillators.forEach(osc => { try { osc.stop() } catch {} }); void rig.context.close() }
    }
  }, [])

  useEffect(() => {
    const rig = audioRef.current
    if (rig) {
      rig.gain.gain.setTargetAtTime(soundOn ? 0.012 : 0, rig.context.currentTime, 0.15)
      if (!soundOn) setPlaying(false)
      else if (rig.context.state === "running") setPlaying(true)
    }
  }, [soundOn])

  if (!visible) return null
  return <aside className="sound-notice" role="status" aria-live="polite">
    <StarBorder as="div" duration={9} stars={1} hover="brighten" clickPulse={false} color="#d7c39a" trailColor="#ffffff" className="sound-notice-border">
      <div className="sound-notice-content">
        <span className="sound-notice-icon">{soundOn && playing ? <Volume2 size={15} /> : <VolumeX size={15} />}</span>
        <div className="sound-notice-copy">
          <p className="sound-notice-title">{needsGesture ? "A little sound, when you're ready." : soundOn ? "Sound is on." : "Sound is off."}</p>
          <p className="sound-notice-description">{needsGesture ? "Your browser may block sound until you interact." : "Turn it off any time, then scroll all the way to the bottom."}</p>
          {needsGesture && <button type="button" className="sound-enable" onClick={() => { setSoundOn(true); void startSound() }}>ENABLE SOUND ↗</button>}
        </div>
        <div className="sound-notice-toggle"><SquishSwitch checked={soundOn} onChange={(next) => { setSoundOn(next); if (next) void startSound() }} ariaLabel="Turn ambient sound on or off" width={54} height={28} radius={15} /></div>
        <button type="button" aria-label="Close sound message" className="sound-notice-close" onClick={() => setVisible(false)}><X size={15} /></button>
        <span className="sound-notice-scroll"><ArrowDown size={12} /> SCROLL TO END</span>
      </div>
    </StarBorder>
  </aside>
}
