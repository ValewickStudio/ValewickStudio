"use client"

import { motion } from "framer-motion"
import { FoldText } from "@/components/react-bits/fold-text"
import { ScrollReveal } from "@/components/react-bits/scroll-reveal"

const sites = [
  {
    title: "Scandiwest",
    url: "https://scandiwest.framer.website",
    category: "DESIGN REFERENCE",
    description: "A Scandinavian-inspired digital direction built around restrained typography, clean spacing, and calm visual hierarchy.",
  },
  {
    title: "Royal Template",
    url: "https://royaltemplate.framer.website",
    category: "DESIGN REFERENCE",
    description: "A polished, editorial-style template reference for premium presentation, structured sections, and confident brand storytelling.",
  },
  {
    title: "Blunt Umbrellas",
    url: "https://bluntumbrellas.com",
    category: "E-COMMERCE",
    description: "A product-led storefront reference where bold product imagery, clear product choices, and direct shopping journeys do the work.",
  },
  {
    title: "Stella",
    url: "https://stella.framer.media",
    category: "CREATIVE DIRECTION",
    description: "A creative portfolio reference for expressive art direction, considered motion, and a distinctive visual identity.",
  },
  {
    title: "Edolus",
    url: "https://edolus.com",
    category: "DIGITAL EXPERIENCE",
    description: "A modern digital experience reference focused on atmosphere, strong layout decisions, and a clear brand presence.",
  },
  {
    title: "Agrumea Farm",
    url: "https://www.agrumeafarm.it",
    category: "FOOD & ORIGIN",
    description: "A food-and-origin reference that connects a product to its place, provenance, and the story behind it.",
  },
  {
    title: "Klausen",
    url: "https://klausen.com",
    category: "BRAND EXPERIENCE",
    description: "A brand experience reference for a confident presentation, cohesive identity, and an uncluttered customer journey.",
  },
  {
    title: "SELINE",
    url: "https://www.celine.com/en-us/home",
    category: "LUXURY FASHION",
    description: "A luxury fashion storefront reference for high-contrast art direction, precise product presentation, and understated premium commerce.",
  },
  {
    title: "KYO KOHEE",
    url: "https://www.kyokohee.com/",
    category: "COFFEE & MATCHA",
    description: "A coffee-and-matcha brand experience built around quiet storytelling, a calm visual system, and an inviting sense of place.",
  },
]

export function WebsiteShowcase() {
  return (
    <section id="website-showcase" className="border-t border-white/10 px-5 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-4 font-mono text-[10px] tracking-[.28em] text-white/45">SELECTED DIGITAL REFERENCES</p>
            <h2 className="max-w-3xl text-4xl font-light leading-[1.05] tracking-tight md:text-6xl"><FoldText text="See the details." splitBy="word" fontSize="inherit" fontWeight={300} /><br /><span className="text-white/55"><FoldText text="Feel the difference." splitBy="word" fontSize="inherit" fontWeight={300} /></span></h2>
            <div className="mt-5 max-w-xl font-mono text-xs text-white/50"><ScrollReveal baseOpacity={0.16} baseRotation={2} enableBlur blurStrength={3}>Explore these websites right here. Each preview sits inside its own browser-style box, without sending you to a new tab.</ScrollReveal></div>
          </div>
          <div className="flex flex-col gap-2 font-mono text-[10px] tracking-[.2em] text-white/35 md:items-end">
            <span>09 WEBSITE DEMONSTRATIONS</span>
            <span className="text-white/55">07 REFERENCES / ON-PAGE PREVIEWS</span>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {sites.map((site, index) => (
            <motion.article key={site.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.5, delay: (index % 3) * 0.07 }} className="group min-w-0 overflow-hidden rounded-xl border border-white/12 bg-[#0b0c0b] shadow-[0_18px_55px_rgba(0,0,0,.25)]">
              <div className="flex h-10 items-center gap-1.5 border-b border-white/10 bg-white/[.035] px-3">
                <span className="size-1.5 rounded-full bg-white/25" /><span className="size-1.5 rounded-full bg-white/25" /><span className="size-1.5 rounded-full bg-white/25" />
                <div className="ml-2 min-w-0 flex-1 truncate rounded border border-white/10 px-2 py-1 font-mono text-[9px] text-white/45">{site.url.replace(/^https?:\/\//, "")}</div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden bg-[#111210]">
                <iframe title={site.title + " website preview"} src={site.url} loading="lazy" className="absolute inset-0 h-full w-full border-0 bg-white" sandbox="allow-scripts allow-same-origin allow-forms" referrerPolicy="strict-origin-when-cross-origin" />
              </div>
              <div className="px-4 py-4">
                <p className="mb-1 font-mono text-[8px] tracking-[.18em] text-white/40">{String(index + 1).padStart(2, "0")} / {site.category}</p>
                <h3 className="text-lg font-light tracking-tight">{site.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/55">{site.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
        <p className="mt-5 font-mono text-[9px] leading-5 text-white/35">Some external websites restrict embedded previews. If a site blocks framing, its box may show the site’s own browser restriction; the other previews remain on this page.</p>
      </div>
    </section>
  )
}
