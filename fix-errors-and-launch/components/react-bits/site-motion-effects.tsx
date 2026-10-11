"use client"

import { useEffect } from "react"

export function SiteMotionEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const apply = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("main section, main section article, main section h2, main section h3, main section h4, main section p, main section li, main section blockquote, main section a, main section button, main section label, main section .liquid-glass, main section .package-card, main section .spotlight-card, main section [class*="rounded-2xl"], main section [class*="rounded-3xl"]").forEach((el) => {
        if (el.closest(".hero-stage") || el.dataset.motionReady === "true") return
        el.dataset.motionReady = "true"
        if (el.matches("article, blockquote, a, button, label, .liquid-glass, .package-card, .spotlight-card, [class*=\"rounded-2xl\"], [class*=\"rounded-3xl\"], h2, h3, h4, p, li")) el.classList.add("site-glare-target")
        if (el.matches("h2,h3,h4,p")) el.classList.add("site-shine-target")
        if (!reduce) {
          el.classList.add("site-scroll-target")
          observer.observe(el)
        }
      })
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({target,isIntersecting}) => {
        if (isIntersecting) {
          target.classList.add("site-scroll-target--visible")
          observer.unobserve(target)
        }
      })
    }, { threshold: .12, rootMargin: "0px 0px -5% 0px" })
    apply(document)
    const mutation = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => { if (node instanceof HTMLElement) apply(node) })))
    mutation.observe(document.body,{childList:true,subtree:true})
    return () => { mutation.disconnect(); observer.disconnect() }
  },[])
  return null
}
