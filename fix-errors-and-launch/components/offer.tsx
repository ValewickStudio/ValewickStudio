"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { prefillEnquiry } from "@/lib/enquiry-events"
import { ScrollReveal } from "@/components/react-bits/scroll-reveal"
import { FoldText } from "@/components/react-bits/fold-text"

const services = [
  ["01", "Websites with purpose.", "Custom websites and landing pages shaped around your brand, your audience, and the next step you want them to take."],
  ["02", "Campaigns that connect.", "Ad creative and campaign assets with a clear message and a distinctive point of view."],
  ["03", "Creative with character.", "Social content, promotional graphics, and brand visuals that belong to the same story."],
  ["04", "Less work. More flow.", "Hosting, maintenance, automation, and integrations that keep your digital presence working together."],
]

const videoFormats = ["Short-form social videos", "Cinematic product videos", "Product mini-movies", "Demonstrations and storytelling", "Advertising creative"]
const monthlyServices = ["Website care and maintenance", "Ongoing website improvements", "Monthly video and creative production", "AI automation and digital systems support"]
const serviceSocialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/valewickhouse/?hl=en" },
  { label: "Facebook", href: "https://www.facebook.com/ValewickHouse/" },
  { label: "TikTok", href: "https://www.tiktok.com/@valewickhouse_studio" },
]

function serviceInquiryUrl(subject: string) {
  const message = `Hello Valewick House, I would like to discuss ${subject}.`
  return `https://wa.me/959698077904?text=${encodeURIComponent(message)}`
}

export function Services() {
  const reduceMotion = useReducedMotion()
  return (
    <section id="systems" className="border-t border-white/10 px-6 py-24 md:px-12 md:py-28">
      <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mx-auto max-w-6xl">
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-muted-foreground">03 — WHAT WE BUILD</p>
        <h2 className="mb-12 text-4xl font-light tracking-tight md:text-6xl"><FoldText text="The pieces." splitBy="word" fontSize="inherit" fontWeight={300} /><br /><span className="italic"><FoldText text="The bigger picture." splitBy="word" fontSize="inherit" fontWeight={300} /></span></h2>
        <div className="grid gap-4 md:grid-cols-2">{services.map(([number, title, copy], index) => <motion.article initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index % 2 * 0.08 }} key={number} className="liquid-glass spotlight-card glare-hover group rounded-2xl border border-white/10 p-6 transition-colors duration-500 hover:border-white/30 hover:bg-white/[0.03] md:p-8"><span className="font-mono text-xs text-muted-foreground">{number}</span><h3 className="mt-8 text-3xl font-light">{title}</h3><p className="mt-4 max-w-md font-mono text-xs leading-7 text-muted-foreground">{copy}</p><a href="#apply" className="mt-8 inline-block font-mono text-[10px] tracking-widest transition-transform duration-300 group-hover:translate-x-1">LET’S TALK ABOUT IT →</a></motion.article>)}</div>
      </motion.div>
    </section>
  )
}

const videoPackages = [
  { title: "3 Videos — Focused Creative Test", description: "A compact set of three short-form videos exploring different hooks, product benefits, or storytelling approaches around one agreed campaign or offer." },
  { title: "5 Videos — Broader Creative Set", description: "Five coordinated videos offering a broader range of product demonstrations, benefits, brand storytelling, and creative angles." },
  { title: "10 Videos — Structured Creative Library", description: "Ten planned videos designed to create a broader library of creative variations for social media or advertising." },
  { title: "Monthly Video & Creative Production", description: "An ongoing creative service with an agreed production quantity, scope, schedule, and delivery plan." },
]

export function VideoAndCareServices() {
  const reduceMotion = useReducedMotion()
  const [videoPlansOpen, setVideoPlansOpen] = useState(false)
  return (
    <section id="ongoing-services" className="border-t border-white/10 px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12 grid gap-6 md:grid-cols-[1.1fr_.9fr] md:items-end">
          <div><p className="mb-4 font-mono text-xs tracking-[0.3em] text-muted-foreground">04 — VIDEO, CARE & CONTINUITY</p><h2 className="text-4xl font-light tracking-tight md:text-6xl"><FoldText text="Good work," splitBy="word" fontSize="inherit" fontWeight={300} /> <span className="italic"><FoldText text="kept in motion." splitBy="word" fontSize="inherit" fontWeight={300} /></span></h2></div>
          <div className="max-w-lg font-mono text-xs leading-7 text-muted-foreground"><ScrollReveal baseOpacity={0.18} baseRotation={1.5} enableBlur blurStrength={3}>From a single cinematic piece to ongoing support, we shape each engagement around what your business needs next. Every scope is discussed before work begins.</ScrollReveal></div>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          <motion.article initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="liquid-glass spotlight-card glare-hover group/video flex flex-col rounded-2xl border border-white/10 p-6 md:p-8">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">01 / VIDEO & CREATIVE</p><h3 className="mt-6 text-3xl font-light">A story in motion.</h3><p className="mt-3 font-mono text-xs leading-6 text-muted-foreground">Short-form social videos, cinematic product films, product mini-movies, demonstrations, storytelling, and advertising creative. Enquire for a quote; no public prices are listed.</p>
            <button type="button" aria-expanded={videoPlansOpen} onClick={() => setVideoPlansOpen((open) => !open)} className="mt-6 flex min-h-11 items-center justify-between gap-4 rounded-xl border border-white/15 bg-white/[0.035] px-4 py-3 text-left font-mono text-[10px] tracking-wider transition-colors hover:border-white/35"><span>EXPLORE FOUR VIDEO OPTIONS</span><span aria-hidden="true" className="text-base transition-transform duration-300 group-hover:rotate-45">{videoPlansOpen ? "−" : "+"}</span></button>
            <div className={`grid overflow-hidden transition-[max-height,opacity,margin] duration-500 ease-out group-hover/video:mt-3 group-hover/video:max-h-[34rem] group-hover/video:opacity-100 group-focus-within/video:mt-3 group-focus-within/video:max-h-[34rem] group-focus-within/video:opacity-100 ${videoPlansOpen ? "mt-3 max-h-[34rem] opacity-100" : "mt-0 max-h-0 opacity-0"}`}>
              <div className="grid gap-3">{videoPackages.map(({ title, description }) => <div key={title} className="rounded-xl border border-white/10 bg-white/[0.035] p-4 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.07]"><p className="font-mono text-[10px] leading-5 tracking-wider text-foreground">{title}</p><p className="mt-2 text-xs leading-5 text-muted-foreground">{description}</p></div>)}</div>
            </div>
            <ul className="mt-6 flex flex-col gap-3 font-mono text-[10px] leading-5 text-muted-foreground">{videoFormats.map((item) => <li key={item}>— {item}</li>)}</ul>
            <p className="mt-5 border-t border-white/10 pt-4 font-mono text-[9px] leading-5 text-muted-foreground">Each proposal confirms duration, platforms, filming or source-footage needs, scripts, captions, voiceover, licensing, revisions, turnaround, and usage rights. Views, sales, virality, and advertising results are not guaranteed.</p>
            <a href="#apply" onClick={() => prefillEnquiry("AI Video", "Help me choose")} className="mt-8 inline-flex min-h-11 items-center justify-between gap-3 rounded-full border border-white/20 px-5 py-3 font-mono text-[10px] tracking-widest transition-colors hover:border-white hover:bg-white hover:text-black">ENQUIRE ABOUT VIDEO <span aria-hidden="true">→</span></a>
          </motion.article>

          <motion.article initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }} className="liquid-glass flex flex-col rounded-2xl border border-white/10 p-6 md:p-8">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">02 / WEBSITE MANAGEMENT</p><h3 className="mt-6 text-3xl font-light">A site, looked after.</h3><p className="mt-3 font-mono text-xs leading-6 text-muted-foreground">Choose the way you want your website supported.</p>
            <div className="mt-7 flex flex-col gap-5 border-y border-white/10 py-6"><div><h4 className="font-mono text-xs tracking-wider">VALEWICK-MANAGED</h4><p className="mt-2 font-mono text-[10px] leading-5 text-muted-foreground">Hosting, maintenance, and agreed updates managed by our team.</p></div><div><h4 className="font-mono text-xs tracking-wider">CLIENT-MANAGED</h4><p className="mt-2 font-mono text-[10px] leading-5 text-muted-foreground">Source-code handover with documentation for your team to manage the site.</p></div></div>
            <p className="mt-5 font-mono text-[9px] leading-5 text-muted-foreground">Domains, paid hosting, third-party subscriptions, and work outside the agreed scope may involve additional costs.</p>
            <a href={serviceInquiryUrl("website management and maintenance")} target="_blank" rel="noreferrer" className="mt-auto inline-flex min-h-11 items-center justify-between gap-3 rounded-full border border-white/20 px-5 py-3 font-mono text-[10px] tracking-widest transition-colors hover:border-white hover:bg-white hover:text-black lg:mt-8">DISCUSS WEBSITE MANAGEMENT <span aria-hidden="true">↗</span></a>
          </motion.article>

          <motion.article initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.16 }} className="liquid-glass flex flex-col rounded-2xl border border-white/10 p-6 md:p-8">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">03 / MONTHLY SERVICES</p><h3 className="mt-6 text-3xl font-light">Steady, considered support.</h3><p className="mt-3 font-mono text-xs leading-6 text-muted-foreground">A continuing partnership, shaped around your priorities.</p>
            <ul className="mt-7 flex flex-1 flex-col gap-4 border-y border-white/10 py-6 font-mono text-[10px] leading-5 text-muted-foreground">{monthlyServices.map((item) => <li key={item} className="flex gap-3"><span className="text-foreground/50">—</span><span>{item}</span></li>)}</ul>
            <a href={serviceInquiryUrl("a monthly services plan")} target="_blank" rel="noreferrer" className="mt-8 inline-flex min-h-11 items-center justify-between gap-3 rounded-full border border-white/20 px-5 py-3 font-mono text-[10px] tracking-widest transition-colors hover:border-white hover:bg-white hover:text-black">DISCUSS A MONTHLY PLAN <span aria-hidden="true">↗</span></a>
          </motion.article>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="font-mono text-[10px] leading-5 tracking-wider text-muted-foreground">PREFER A DIFFERENT CHANNEL? FIND VALEWICK HOUSE ON</p><div className="flex flex-wrap gap-5">{serviceSocialLinks.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="font-mono text-[10px] tracking-widest text-muted-foreground transition-colors hover:text-white">{social.label} ↗</a>)}</div></div>
      </div>
    </section>
  )
}

const websiteDemos = [
  { label: "Scandiwest", url: "https://scandiwest.framer.website", category: "DESIGN REFERENCE", description: "Scandinavian-inspired design with calm spacing, clean typography, and a considered visual hierarchy." },
  { label: "Royal Template", url: "https://royaltemplate.framer.website", category: "DESIGN REFERENCE", description: "An editorial, premium template reference for confident brand storytelling and polished section layouts." },
  { label: "Blunt Umbrellas", url: "https://bluntumbrellas.com", category: "E-COMMERCE", description: "A product-led storefront with bold product presentation and a direct shopping journey." },
  { label: "Stella", url: "https://stella.framer.media", category: "CREATIVE DIRECTION", description: "A creative portfolio reference for expressive art direction, motion, and a distinctive visual identity." },
  { label: "Edolus", url: "https://edolus.com", category: "DIGITAL EXPERIENCE", description: "A modern digital experience shaped around atmosphere, layout, and a clear brand presence." },
  { label: "Agrumea Farm", url: "https://www.agrumeafarm.it", category: "FOOD & ORIGIN", description: "A food and origin story that connects the product with its place and provenance." },
  { label: "Klausen", url: "https://klausen.com", category: "BRAND EXPERIENCE", description: "A cohesive brand experience with confident presentation and an uncluttered customer journey." },
  { label: "KYO KOHEE", url: "https://kyo-slow-sip.base44.app", category: "COFFEE & MATCHA SHOP", description: "A quiet, cinematic shop experience for a coffee and matcha brand, with a calm visual rhythm." },
  { label: "SELINE", url: "https://seline-smart-sync.base44.app", category: "SHOP / DIGITAL SYSTEMS", description: "A considered product storefront and digital systems experience, designed around clarity and premium presentation." },
]

export function Demo() {
  const reduceMotion = useReducedMotion()
  return (
    <section id="work" className="website-demo-section border-t border-white/10 px-5 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }} className="mb-10 grid gap-5 md:mb-14 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-4 font-mono text-xs tracking-[0.3em] text-muted-foreground">05 — WEBSITE DEMONSTRATIONS</p>
            <h2 className="text-4xl font-light tracking-tight md:text-6xl"><FoldText text="See the details." splitBy="word" fontSize="inherit" fontWeight={300} className="font-sans" /><br /><span className="italic"><FoldText text="Feel the difference." splitBy="word" fontSize="inherit" fontWeight={300} className="font-sans" /></span></h2>
            <p className="mt-5 max-w-2xl font-mono text-xs leading-6 text-muted-foreground">Nine independent website demonstrations, all shown on this page. Previews are examples of digital experiences, not client endorsements.</p>
          </div>
          <div className="flex flex-col gap-2 font-mono text-[10px] tracking-[0.2em] text-white/40 md:items-end">
            <span>09 WEBSITE DEMONSTRATIONS</span>
            <span>07 REFERENCES + 02 SHOPS</span>
          </div>
        </motion.div>
        <div className="website-demo-grid grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {websiteDemos.map((site, index) => (
            <motion.article key={site.label} initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.45, delay: reduceMotion ? 0 : (index % 3) * 0.05 }} className="website-demo-card min-w-0 overflow-hidden rounded-xl border border-white/12 bg-[#0b0c0b]">
              <div className="flex h-10 items-center gap-1.5 border-b border-white/10 bg-white/[.035] px-3">
                <span className="size-1.5 rounded-full bg-white/25" /><span className="size-1.5 rounded-full bg-white/25" /><span className="size-1.5 rounded-full bg-white/25" />
                <div className="ml-2 min-w-0 flex-1 truncate rounded border border-white/10 px-2 py-1 font-mono text-[9px] text-white/45">{site.url.replace(/^https?:\/\//, "")}</div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden bg-[#111210]">
                <iframe title={site.label + " website demonstration"} src={site.url} loading="lazy" className="website-demo-frame absolute inset-0 h-full w-full border-0 bg-white" referrerPolicy="strict-origin-when-cross-origin" />
              </div>
              <div className="px-4 py-4">
                <p className="mb-1 font-mono text-[8px] tracking-[.18em] text-white/40">{String(index + 1).padStart(2, "0")} / {site.category}</p>
                <h3 className="text-lg font-light tracking-tight">{site.label}</h3>
                <p className="mt-2 text-sm leading-6 text-white/55">{site.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
        <p className="mt-5 font-mono text-[9px] leading-5 text-white/35">Some external websites block embedded previews. If a site restricts framing, its own security settings may prevent the live page from appearing inside the box.</p>
      </div>
    </section>
  )
}
