"use client"

import { motion } from "framer-motion"
import { FoldText } from "@/components/react-bits/fold-text"
import { ScrollReveal } from "@/components/react-bits/scroll-reveal"

const sites = [
  { title: "Scandiwest", url: "https://scandiwest.framer.website", category: "DESIGN REFERENCE" },
  { title: "Royal Template", url: "https://royaltemplate.framer.website", category: "DESIGN REFERENCE" },
  { title: "Blunt Umbrellas", url: "https://bluntumbrellas.com", category: "E-COMMERCE" },
  { title: "Stella", url: "https://stella.framer.media", category: "CREATIVE DIRECTION" },
  { title: "Edolus", url: "https://edolus.com", category: "DIGITAL EXPERIENCE" },
  { title: "Agrumea Farm", url: "https://www.agrumeafarm.it", category: "FOOD & ORIGIN" },
  { title: "Klausen", url: "https://klausen.com", category: "BRAND EXPERIENCE" },
]

export function WebsiteShowcase() {
  return (
    <section id="website-showcase" className="border-t border-white/10 px-5 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }} className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-4 font-mono text-[10px] tracking-[.28em] text-white/45">SELECTED DIGITAL REFERENCES</p>
            <h2 className="max-w-3xl text-4xl font-light leading-[1.05] tracking-tight md:text-6xl"><FoldText text="See the details." splitBy="word" fontSize="inherit" fontWeight={300} /><br /><span className="text-white/55"><FoldText text="Feel the difference." splitBy="word" fontSize="inherit" fontWeight={300} /></span></h2>
            <div className="mt-5 max-w-xl font-mono text-xs text-white/50"><ScrollReveal baseOpacity={0.16} baseRotation={2} enableBlur blurStrength={3}>Explore these websites right here. Each preview sits inside its own browser-style box, without sending you to a new tab.</ScrollReveal></div>
          </div>
          <span className="font-mono text-[10px] tracking-[.2em] text-white/35">07 REFERENCES / ON-PAGE PREVIEWS</span>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {sites.map((site, index) => (
            <motion.article key={site.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: .5, delay: (index % 3) * .07 }} className="group min-w-0 overflow-hidden rounded-xl border border-white/12 bg-[#0b0c0b] shadow-[0_18px_55px_rgba(0,0,0,.25)]">
              <div className="flex h-10 items-center gap-1.5 border-b border-white/10 bg-white/[.035] px-3">
                <span className="size-1.5 rounded-full bg-white/25" /><span className="size-1.5 rounded-full bg-white/25" /><span className="size-1.5 rounded-full bg-white/25" />
                <div className="ml-2 min-w-0 flex-1 truncate rounded border border-white/10 px-2 py-1 font-mono text-[9px] text-white/45">{site.url.replace(/^https?:\/\//, "")}</div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden bg-[#111210]">
                <iframe title={site.title + " website preview"} src={site.url} loading="lazy" className="absolute inset-0 h-full w-full border-0 bg-white" sandbox="allow-scripts allow-same-origin allow-forms" referrerPolicy="strict-origin-when-cross-origin" />
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-4">
                <div className="min-w-0"><p className="mb-1 font-mono text-[8px] tracking-[.18em] text-white/40">{String(index+1).padStart(2,"0")} / {site.category}</p><h3 className="truncate text-lg font-light tracking-tight">{site.title}</h3></div>
                <span className="shrink-0 font-mono text-[8px] tracking-[.12em] text-white/40">LIVE PREVIEW</span>
              </div>
            </motion.article>
          ))}
        </div>
        <p className="mt-5 font-mono text-[9px] leading-5 text-white/35">Some external websites restrict embedded previews. If a site blocks framing, its box may show the site’s own browser restriction; the other previews remain on this page.</p>
      </div>
    </section>
  )
}
