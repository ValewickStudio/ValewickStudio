"use client"

import { motion, useReducedMotion } from "framer-motion"
import { CircularText } from "@/components/react-bits/circular-text"

const statements = [
  ["Presence", "A website that feels unmistakably yours."],
  ["Attention", "Creative that makes people stop and look."],
  ["Momentum", "Connected systems. Less busywork. More possibility."],
]

export function About() {
  const reduceMotion = useReducedMotion()
  return (
    <section id="about" className="relative border-t border-white/10 px-6 py-24 md:px-12 md:py-28">
      {/* Section Header */}
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
          <div><p className="mb-4 font-mono text-xs tracking-[0.3em] text-muted-foreground">02 — THE HOUSE APPROACH</p><h2 className="text-4xl font-light tracking-tight md:text-6xl">Not just seen.<br /><span className="italic">Remembered.</span></h2></div>
          <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.12 }} className="liquid-glass max-w-md rounded-2xl p-6"><p className="font-mono text-xs leading-7 text-muted-foreground">We bring your website, campaign creative, and everyday workflows together. One considered direction, from the first impression to the next opportunity.</p><p className="mt-5 border-l border-accent/70 pl-4 font-mono text-[10px] leading-5 tracking-[0.12em] text-white/70"><span className="block">BEGIN WITH CONFIDENCE.</span><span className="block">IF IT&apos;S NOT THE RIGHT FIT, THERE&apos;S NO OBLIGATION TO CONTINUE.</span></p></motion.div>
        </motion.div>
        {/* Brand statements */}
        <div className="flex flex-col">
          {statements.map(([label, statement], index) => (
            <motion.div key={label} initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.65, delay: index * 0.06 }} className="liquid-glass group grid gap-4 border-t border-white/10 px-5 py-8 md:grid-cols-[180px_1fr] md:px-7 md:py-10">
              <span className="font-mono text-xs tracking-widest text-muted-foreground">{label.toUpperCase()}</span>
              <p className="max-w-3xl text-2xl font-light leading-snug tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">{statement}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:flex-row sm:items-center sm:justify-between md:p-7">
          <div><p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">A FIRST STEP · $50 USD</p><p className="mt-2 text-xl font-light">Explore a homepage direction before a full website commitment.</p></div>
          <div className="flex items-center gap-5"><CircularText text="VALEWICK HOUSE • DIGITAL STUDIO • " spinDuration={30} onHover="speedUp" /><a href="#concept" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-white/25 px-5 py-3 font-mono text-[10px] tracking-[0.12em] transition-colors hover:bg-white hover:text-black">VIEW THE CONCEPT <span aria-hidden="true">→</span></a></div>
        </div>
        {/* Decorative Line */}
        <motion.a href="#systems" whileHover={reduceMotion ? undefined : { x: 8 }} className="group mt-8 inline-flex items-center gap-3 font-mono text-xs tracking-widest text-muted-foreground transition-colors hover:text-foreground">EXPLORE WHAT WE BUILD <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></motion.a>
      </div>
    </section>
  )
}
