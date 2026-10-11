"use client"

import { motion, useReducedMotion } from "framer-motion"

const capabilities = ["Distinctive websites", "Campaign creative", "Brand presence", "Business automation"]

export function TechMarquee() {
  const reduceMotion = useReducedMotion()
  return (
    <section id="capabilities" className="relative overflow-hidden border-t border-white/10 py-20 md:py-24">
      {/* Section Header */}
      <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mx-auto mb-10 max-w-6xl px-6 md:px-12">
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-muted-foreground">09 — ONE CONNECTED DIRECTION</p>
        <h2 className="text-3xl font-light md:text-5xl">Your brand. <span className="italic">Working together.</span></h2>
      </motion.div>
      {/* Marquee Rows */}
      <div className="brand-marquee overflow-hidden py-6" aria-label={capabilities.join(", ")}>
        <div aria-hidden="true" className="animate-marquee-left flex w-max gap-8">
          {[0, 1].map((copy) => <div key={copy} className="flex shrink-0 items-center gap-8">{capabilities.map((item) => <span key={item} className="flex items-center gap-8 whitespace-nowrap text-4xl font-light italic text-foreground/75 md:text-6xl">{item}<motion.span animate={reduceMotion ? undefined : { rotate: [0, 90, 180, 270, 360], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} className="text-xl not-italic text-muted-foreground">/</motion.span></span>)}</div>)}
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl px-6 md:px-12"><motion.a whileHover={reduceMotion ? undefined : { x: 8 }} href="#apply" className="group inline-flex items-center gap-3 font-mono text-xs tracking-widest text-muted-foreground transition-colors hover:text-foreground">LET’S FIND YOUR STARTING POINT <span className="transition-transform group-hover:translate-x-1">→</span></motion.a></div>
    </section>
  )
}
