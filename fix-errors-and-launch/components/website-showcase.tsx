"use client"

import { useCallback, useState } from "react"
import { motion } from "framer-motion"
import { FoldText } from "@/components/react-bits/fold-text"
import { CardSwap, type ShowcaseCardItem } from "@/components/react-bits/card-swap"
import { ScrollReveal } from "@/components/react-bits/scroll-reveal"

const sites: ShowcaseCardItem[] = [
  { label: "Scandiwest", url: "https://scandiwest.framer.website", category: "01 / DESIGN REFERENCE", title: "Scandiwest", description: "A Scandinavian-inspired digital direction with considered typography and calm visual rhythm.", monogram: "SW" },
  { label: "Royal Template", url: "https://royaltemplate.framer.website", category: "02 / DESIGN REFERENCE", title: "Royal Template", description: "A polished template reference for a refined, premium online presence.", monogram: "RT" },
  { label: "Blunt Umbrellas", url: "https://bluntumbrellas.com", category: "03 / E-COMMERCE", title: "Blunt Umbrellas", description: "Product-led retail with bold brand storytelling and a clear path to purchase.", monogram: "BLUNT" },
  { label: "Stella", url: "https://stella.framer.media", category: "04 / CREATIVE DIRECTION", title: "Stella", description: "An editorial visual reference with a distinctive, image-led point of view.", monogram: "STELLA" },
  { label: "Edolus", url: "https://edolus.com", category: "05 / DIGITAL EXPERIENCE", title: "Edolus", description: "A modern digital experience to explore for its structure, presentation, and detail.", monogram: "EDOLUS" },
  { label: "Agrumea Farm", url: "https://www.agrumeafarm.it", category: "06 / FOOD & ORIGIN", title: "Agrumea Farm", description: "A farm and produce reference rooted in place, origin, and product.", monogram: "AGRUMEA" },
  { label: "Klausen", url: "https://klausen.com", category: "07 / BRAND EXPERIENCE", title: "Klausen", description: "A contemporary brand reference for visual consistency and digital presentation.", monogram: "KLAUSEN" },
]

export function WebsiteShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const changeActive = useCallback((index: number) => setActiveIndex(index), [])

  return (
    <section id="website-showcase" className="border-t border-white/10 px-5 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }} className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-4 font-mono text-[10px] tracking-[.28em] text-white/45">SELECTED DIGITAL REFERENCES</p>
            <h2 className="max-w-3xl text-4xl font-light leading-[1.05] tracking-tight md:text-6xl"><FoldText text="See the details." splitBy="word" fontSize="inherit" fontWeight={300} /><br /><span className="text-white/55"><FoldText text="Feel the difference." splitBy="word" fontSize="inherit" fontWeight={300} /></span></h2>
            <div className="mt-5 max-w-xl font-mono text-xs text-white/50"><ScrollReveal baseOpacity={0.16} baseRotation={2} enableBlur blurStrength={3}>A collection of digital experiences worth exploring. Select a card to bring it forward, then open the original website to explore it in full.</ScrollReveal></div>
          </div>
          <span className="font-mono text-[10px] tracking-[.2em] text-white/35">07 REFERENCES / EXTERNAL SITES</span>
        </motion.div>
        <CardSwap items={sites} activeIndex={activeIndex} onChange={changeActive} />
        <p className="mt-5 font-mono text-[9px] leading-5 text-white/35">These are independent third-party websites. Each card links directly to its original site; external pages may restrict embedded previews.</p>
      </div>
    </section>
  )
}
