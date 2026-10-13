"use client"

import { useState } from "react"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

const sites = [
  { name: "Scandiwest", url: "https://scandiwest.framer.website", label: "Scandinavian-inspired digital design", tone: "from-stone-200/20 via-zinc-900 to-black", mark: "SW" },
  { name: "Royal Template", url: "https://royaltemplate.framer.website", label: "A refined template experience", tone: "from-amber-100/20 via-stone-900 to-black", mark: "RT" },
  { name: "Blunt Umbrellas", url: "https://bluntumbrellas.com", label: "Product-led retail and brand storytelling", tone: "from-slate-300/20 via-zinc-900 to-black", mark: "BLUNT" },
  { name: "Stella", url: "https://stella.framer.media", label: "Editorial visual direction", tone: "from-rose-100/20 via-neutral-900 to-black", mark: "STELLA" },
  { name: "Edolus", url: "https://edolus.com", label: "Modern digital presence", tone: "from-emerald-100/15 via-neutral-900 to-black", mark: "EDOLUS" },
  { name: "Agrumea Farm", url: "https://www.agrumeafarm.it", label: "Farm, produce, and origin", tone: "from-lime-100/20 via-stone-900 to-black", mark: "AGRUMEA" },
  { name: "Klausen", url: "https://klausen.com", label: "Contemporary brand experience", tone: "from-sky-100/15 via-zinc-900 to-black", mark: "KLAUSEN" },
]

function PreviewCard({ site, index }: { site: typeof sites[number]; index: number }) {
  const [previewFailed, setPreviewFailed] = useState(false)
  return (
    <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.55, delay: (index % 3) * 0.07 }} whileHover={{ y: -5 }} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-3 transition-colors duration-500 hover:border-white/25">
      <a href={site.url} target="_blank" rel="noopener noreferrer" className="block" aria-label={`Open ${site.name} website in a new tab`}>
        <div className={`relative isolate flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${site.tone}`}>
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 50% 40%, rgba(255,255,255,.16), transparent 48%), linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)", backgroundSize: "auto, 34px 34px, 34px 34px" }} />
          {!previewFailed && <iframe title={`${site.name} website preview`} src={site.url} loading="lazy" tabIndex={-1} sandbox="allow-scripts allow-same-origin" referrerPolicy="strict-origin-when-cross-origin" onError={() => setPreviewFailed(true)} className="pointer-events-none absolute inset-0 h-full w-full border-0 opacity-80 transition duration-700 group-hover:scale-[1.03]" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/10" />
          <span className="relative z-10 max-w-[90%] text-center font-sans text-2xl font-light tracking-[0.12em] text-white/90 drop-shadow-lg md:text-3xl">{site.mark}</span>
          <span className="absolute bottom-3 left-3 z-10 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 font-mono text-[9px] tracking-[0.18em] text-white/75 backdrop-blur-md">LIVE SITE PREVIEW</span>
          <span className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition group-hover:bg-white group-hover:text-black"><ArrowUpRight className="size-4" /></span>
        </div>
        <div className="flex items-start justify-between gap-4 px-1 pb-2 pt-5">
          <div><h3 className="text-xl font-light tracking-tight transition-colors group-hover:text-white">{site.name}</h3><p className="mt-2 text-sm leading-5 text-white/50">{site.label}</p></div>
          <ExternalLink className="mt-1 size-4 shrink-0 text-white/40 transition group-hover:text-white" />
        </div>
        <p className="px-1 pb-2 pt-1 font-mono text-[9px] tracking-wide text-white/35">{new URL(site.url).hostname}</p>
      </a>
    </motion.article>
  )
}

export function WebsiteShowcase() {
  return <section id="website-showcase" className="border-t border-white/10 px-5 py-20 md:px-12 md:py-28">
    <div className="mx-auto max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }} className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div><p className="mb-4 font-mono text-[10px] tracking-[.28em] text-white/45">SELECTED DIGITAL REFERENCES</p><h2 className="max-w-3xl text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">See the details.<br /><span className="text-white/55">Feel the difference.</span></h2><p className="mt-5 max-w-xl font-mono text-xs leading-6 text-white/50">A collection of digital experiences worth exploring. Open any reference to visit the original website.</p></div>
        <span className="font-mono text-[10px] tracking-[.2em] text-white/35">07 REFERENCES / EXTERNAL SITES</span>
      </motion.div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{sites.map((site, index) => <PreviewCard key={site.url} site={site} index={index} />)}</div>
      <p className="mt-5 font-mono text-[9px] leading-5 text-white/35">Third-party sites control whether they allow embedded previews. Each card retains a designed fallback and links directly to its original site.</p>
    </div>
  </section>
}
