"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, BadgeCheck, Quote } from "lucide-react"

const commitments = [
  { number: "01", title: "A considered first conversation.", copy: "We start by understanding the business, the audience, and what a useful next step looks like." },
  { number: "02", title: "Scope before the start.", copy: "Deliverables, timing, dependencies, and costs are agreed before work begins." },
  { number: "03", title: "A thoughtful handover.", copy: "You know what has been delivered, what comes next, and who to contact for support." },
]

const experienceNotes = [
  { title: "Clarity, before commitment.", copy: "You can ask questions and understand the proposed scope before deciding whether to proceed.", tag: "THE FIRST CONVERSATION" },
  { title: "A real person, throughout.", copy: "Communication stays direct, considered, and connected to the people doing the work.", tag: "HOW WE COLLABORATE" },
  { title: "Designed to be useful.", copy: "Every deliverable is shaped around your audience, your goals, and what happens next.", tag: "THE FINISHED WORK" },
]

export function ReviewCapsule() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="reviews" className="relative isolate overflow-hidden border-t border-white/10 px-6 py-24 md:px-12 md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute right-[8%] top-[18%] -z-10 size-64 rounded-full bg-white/[0.035] blur-3xl" />
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="mb-4 font-mono text-xs tracking-[0.3em] text-muted-foreground">10 — TRUST, WITHOUT THE THEATRE</p>
            <h2 className="text-4xl font-light tracking-tight md:text-6xl"><BlurText text="Good work." delay={70} /><br /><span className="italic"><BlurText text="Clear expectations." delay={85} direction="top" /></span></h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground">A thoughtful collaboration is built in the details: an honest scope, direct communication, and work made with care. Here&apos;s what you can expect from us.</p>
          </motion.div>
          <motion.aside initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }} className="liquid-glass rounded-2xl p-6 md:p-7">
            <div className="flex items-center justify-between gap-4"><div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06]"><BadgeCheck aria-hidden="true" className="size-5 text-white/80" /></span><span className="font-mono text-sm tracking-wide">Trustpilot</span></div><span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[9px] tracking-wider text-muted-foreground">4.4 / 5</span></div>
            <p className="mt-5 text-xl font-light">Your feedback should be verifiable.</p>
            <p className="mt-2 font-mono text-[10px] leading-5 text-muted-foreground">We&apos;ll link to our public profile here once it&apos;s confirmed. No borrowed reviews, invented quotes, or unverified scores.</p>
            <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 font-mono text-[9px] tracking-wider text-white/45"><Quote aria-hidden="true" className="size-3" /> CLIENT FEEDBACK WILL BE SHARED WITH PERMISSION</div>
          </motion.aside>
        </div>
        <p className="mb-5 mt-12 font-mono text-[10px] tracking-widest text-muted-foreground">A FEW THINGS YOU CAN EXPECT · OUR WORKING PRINCIPLES</p>
        <div className="review-ticker-mask overflow-hidden">
          <div className="review-capsule-track flex w-max gap-4 py-2">
            {[...experienceNotes, ...experienceNotes].map((item, index) => <motion.article aria-hidden={index >= experienceNotes.length} key={`${item.title}-${index}`} initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index % experienceNotes.length * 0.08 }} whileHover={reduceMotion ? undefined : { y: -5 }} className="liquid-glass group flex w-[min(82vw,360px)] shrink-0 flex-col rounded-[1.75rem] border border-white/10 p-6 md:p-7"><div className="flex items-center justify-between gap-3"><Quote aria-hidden="true" className="size-5 text-white/45 transition-transform duration-500 group-hover:-rotate-12" /><span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[9px] tracking-widest text-muted-foreground">OUR COMMITMENT</span></div><h3 className="mt-8 text-xl font-light tracking-tight">{item.title}</h3><p className="mb-8 mt-4 flex-1 text-sm leading-7 text-muted-foreground">{item.copy}</p><p className="border-t border-white/10 pt-5 font-mono text-[9px] tracking-wider text-white/45">{item.tag}</p></motion.article>)}
          </div>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {commitments.map((item, index) => <motion.article key={item.number} initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.09 }} whileHover={reduceMotion ? undefined : { y: -5 }} className="liquid-glass spotlight-card glare-hover rounded-2xl border border-white/10 p-6 md:p-7"><p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">{item.number} / OUR APPROACH</p><h3 className="mt-7 text-2xl font-light tracking-tight">{item.title}</h3><p className="mt-4 font-mono text-xs leading-6 text-muted-foreground">{item.copy}</p></motion.article>)}
        </div>
        <motion.a initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} href="#apply" className="group mt-9 inline-flex items-center gap-3 font-mono text-xs tracking-widest">LET'S BUILD YOUR NEXT CHAPTER <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" /></motion.a>
      </div>
    </section>
  )
}

export function TrustpilotNote() {
  return <a href="#reviews" aria-label="Trustpilot information and review policy" className="liquid-glass group inline-flex items-center gap-3 rounded-full px-4 py-3 transition-transform duration-300 hover:-translate-y-1"><BadgeCheck aria-hidden="true" className="size-4 text-white/70" /><span className="font-mono text-[10px] tracking-wider">Trustpilot <span className="text-muted-foreground">/ 4.4 / 5</span></span><ArrowUpRight aria-hidden="true" className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
}

export function PremiumTrust() {
  return <ReviewCapsule />
}
