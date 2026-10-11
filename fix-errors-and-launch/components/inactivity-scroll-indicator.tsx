"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowUp } from "lucide-react"
import { useLenis } from "lenis/react"

interface InactivityScrollIndicatorProps {
  idleDelay?: number
}

export function InactivityScrollIndicator({ idleDelay = 2400 }: InactivityScrollIndicatorProps) {
  const [isIdle, setIsIdle] = useState(false)
  const [isAtEnd, setIsAtEnd] = useState(false)
  const [isInApplicationForm, setIsInApplicationForm] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lenis = useLenis()
  const reduceMotion = useReducedMotion()

  const checkScrollState = useCallback(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop
    const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    const maxScroll = Math.max(1, documentHeight - window.innerHeight)
    const applicationForm = document.querySelector("#apply")
    const formBounds = applicationForm?.getBoundingClientRect()
    setIsInApplicationForm(Boolean(formBounds && formBounds.top < window.innerHeight && formBounds.bottom > 0))
    setIsAtEnd(scrollY + window.innerHeight >= documentHeight - 48 || scrollY / maxScroll >= 0.97)
  }, [])

  const restartIdleTimer = useCallback(() => {
    setIsIdle(false)
    if (timerRef.current) clearTimeout(timerRef.current)
    checkScrollState()
    timerRef.current = setTimeout(() => {
      checkScrollState()
      setIsIdle(true)
    }, idleDelay)
  }, [checkScrollState, idleDelay])

  useEffect(() => {
    checkScrollState()
    timerRef.current = setTimeout(() => setIsIdle(true), idleDelay)
    const events: (keyof WindowEventMap)[] = ["scroll", "wheel", "mousemove", "touchstart", "keydown"]
    events.forEach((eventName) => window.addEventListener(eventName, restartIdleTimer, { passive: true }))
    window.addEventListener("resize", checkScrollState, { passive: true })
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      events.forEach((eventName) => window.removeEventListener(eventName, restartIdleTimer))
      window.removeEventListener("resize", checkScrollState)
    }
  }, [checkScrollState, idleDelay, restartIdleTimer])

  const scrollTo = (top: number) => {
    if (lenis) lenis.scrollTo(top, { duration: 1.2 })
    else window.scrollTo({ top, behavior: "smooth" })
  }

  const isVisible = isIdle && isAtEnd && !isInApplicationForm
  const Icon = isAtEnd ? ArrowUp : ArrowDown

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="inactivity-scroll-cue"
          type="button"
          onClick={() => scrollTo(isAtEnd ? 0 : window.scrollY + window.innerHeight * 0.82)}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.45, ease: [0.2, 0.75, 0.25, 1] }}
          className="fixed bottom-7 left-1/2 z-[9990] flex -translate-x-1/2 flex-col items-center gap-2 border-0 bg-transparent px-5 py-2 text-white/60 transition-colors hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-white"
          aria-label={isAtEnd ? "Return to the top of the page" : "Scroll down to continue"}
        >
          <span className="font-mono text-[10px] tracking-[0.2em]">{isAtEnd ? "BACK TO TOP" : "SCROLL"}</span>
          <span className="relative block h-8 w-px overflow-hidden bg-white/15" aria-hidden="true">
            <motion.span
              className="absolute left-0 top-0 h-full w-full origin-top bg-white/70"
              animate={reduceMotion ? undefined : { scaleY: [0.15, 1, 0.15], opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <Icon className="absolute -bottom-1 left-1/2 size-2.5 -translate-x-1/2 text-white/80" aria-hidden="true" />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
