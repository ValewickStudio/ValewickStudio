"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const messages = [
  "A fresh digital chapter starts here",
  "Founding-client rates available for a limited time",
  "Thoughtful websites. Clear scope. Personal support",
  "Your next launch deserves a better first impression",
]

export function LaunchBanner() {
  const items = [...messages, ...messages]
  return <div className="relative z-30 overflow-hidden border-y border-white/10 bg-white/[0.045] py-3 backdrop-blur-xl" aria-label="Valewick House launch offer">
    <motion.div className="flex w-max items-center gap-8" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 34, ease: "linear", repeat: Infinity }}>
      {items.map((message, index) => <span key={`${message}-${index}`} className="flex shrink-0 items-center gap-8 font-mono text-[9px] tracking-[.18em] text-white/65 md:text-[10px]"><span className="size-1 rounded-full bg-white/70" />{message}<a href="#pricing" className="inline-flex items-center gap-1 text-white transition hover:text-white/70">EXPLORE <ArrowUpRight className="size-3" /></a></span>)}
    </motion.div>
  </div>
}
