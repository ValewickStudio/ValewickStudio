"use client"

import { useEffect, useState } from "react"
import "./text-type.css"

type TextTypeProps = {
  text: string | string[]
  typingSpeed?: number
  initialDelay?: number
  pauseDuration?: number
  deletingSpeed?: number
  loop?: boolean
  className?: string
  showCursor?: boolean
  cursorCharacter?: string
  cursorClassName?: string
  textColors?: string[]
  startOnVisible?: boolean
}

export function TextType({
  text,
  typingSpeed = 55,
  initialDelay = 250,
  pauseDuration = 1700,
  deletingSpeed = 26,
  loop = true,
  className = "",
  showCursor = true,
  cursorCharacter = "|",
  cursorClassName = "",
  textColors = [],
  startOnVisible = false,
}: TextTypeProps) {
  const phrases = Array.isArray(text) ? text : [text]
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [visibleText, setVisibleText] = useState("")
  const [deleting, setDeleting] = useState(false)
  const [inView, setInView] = useState(!startOnVisible)

  useEffect(() => {
    if (!startOnVisible) return
    const node = document.getElementById("hero-type-line")
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [startOnVisible])

  useEffect(() => {
    if (!inView || phrases.length === 0) return
    const phrase = phrases[phraseIndex % phrases.length]
    const finished = !deleting && visibleText === phrase
    const emptied = deleting && visibleText.length === 0

    if (finished) {
      if (!loop && phraseIndex === phrases.length - 1) return
      const timer = window.setTimeout(() => setDeleting(true), pauseDuration)
      return () => window.clearTimeout(timer)
    }
    if (emptied) {
      setDeleting(false)
      setPhraseIndex((index) => (index + 1) % phrases.length)
      return
    }

    const delay = visibleText.length === 0 && !deleting && phraseIndex === 0
      ? initialDelay
      : deleting ? deletingSpeed : typingSpeed
    const timer = window.setTimeout(() => {
      setVisibleText((current) => deleting ? current.slice(0, -1) : phrase.slice(0, current.length + 1))
    }, delay)
    return () => window.clearTimeout(timer)
  }, [deleting, inView, initialDelay, loop, pauseDuration, phraseIndex, phrases, typingSpeed, deletingSpeed, visibleText])

  return (
    <span id="hero-type-line" className={`text-type ${className}`} aria-label={phrases.join(". ")}>
      <span style={{ color: textColors.length ? textColors[phraseIndex % textColors.length] : "inherit" }} aria-hidden="true">{visibleText}</span>
      {showCursor && <span className={`text-type__cursor ${cursorClassName}`} aria-hidden="true">{cursorCharacter}</span>}
    </span>
  )
}
