"use client"

import { useCallback } from "react"
import { useLenis } from "lenis/react"

export function useScrollTo() {
  const lenis = useLenis()
  return useCallback(
    (href: string) => {
      const el = document.querySelector(href) as HTMLElement | null
      if (!el) return
      if (lenis) lenis.scrollTo(el, { offset: -72 })
      else el.scrollIntoView({ behavior: "smooth" })
    },
    [lenis],
  )
}
