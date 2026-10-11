"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { SentientSphere } from "./sentient-sphere"
import { prefillEnquiry } from "@/lib/enquiry-events"
import { TrustpilotNote } from "@/components/reviews"
import { TextType } from "@/components/react-bits/text-type"
import { FoldText } from "@/components/react-bits/fold-text"
import { ParticleText } from "@/components/react-bits/particle-text"
import { ShinyText } from "@/components/react-bits/shiny-text"


export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <section ref={containerRef} className="hero-stage relative min-h-[760px] h-[100svh] w-full overflow-hidden md:min-h-[820px]">
      {/* 3D Sphere Background */}
      <div className="absolute inset-0">
        <SentientSphere />
      </div>

      {/* Typography Overlay */}
      <motion.div style={{ opacity, scale }} className="relative z-10 flex h-full flex-col justify-between px-6 pb-20 pt-28 md:px-12 md:pb-24 md:pt-32">
        {/* Top Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-sans text-5xl font-light leading-[0.98] tracking-[-0.045em] text-balance md:text-7xl lg:text-[6.5rem]">
            <ParticleText text="Digital presence." align="left" fontSize="clamp(2.5rem, 6.5vw, 6.5rem)" fontWeight={300} color="#f4f0e8" scatter={95} gatherDuration={1350} trigger="hover" />
            <br />
            <ParticleText text="Real ambition." align="left" fontSize="clamp(2.5rem, 6.5vw, 6.5rem)" fontWeight={300} color="#f4f0e8" scatter={115} gatherDuration={1450} trigger="hover" />
          </h2>
          <p className="mt-5 min-h-12 max-w-sm font-mono text-xs leading-6 text-muted-foreground"><ShinyText trigger="loop" speed={4.5} color="currentColor" shineColor="#ffffff"><TextType text={["Websites with purpose.", "Creative that connects.", "Systems that work smarter."]} typingSpeed={48} deletingSpeed={24} pauseDuration={1500} initialDelay={650} /></ShinyText></p><p className="mt-4 max-w-sm font-mono text-[10px] leading-5 tracking-[0.12em] text-white/55">CLEAR SCOPE · RESPONSIVE BUILD · HUMAN SUPPORT</p>
          <a href="#concept" className="liquid-glass mt-6 inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 py-3 font-mono text-[10px] tracking-[0.12em] text-white/85 transition-colors hover:border-white hover:bg-white hover:text-black">EXPLORE THE $50 HOMEPAGE CONCEPT →</a>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-7 flex flex-col items-start gap-3"
          >
            <motion.a
              href="#apply"
              onClick={() => prefillEnquiry("Website", "Lite")}
              data-cursor-hover
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="liquid-glass group relative flex min-w-[17rem] flex-col items-start rounded-full border border-white/20 px-8 py-4 font-mono text-sm uppercase tracking-widest transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              <span className="whitespace-nowrap">Start with Lite — $299</span>
              <span className="mt-2 block text-left text-[9px] tracking-[0.18em] text-white/50 transition-colors group-hover:text-black/60">A focused launch, without the guesswork</span>
            </motion.a>
            <p className="max-w-xs px-1 py-3 font-mono text-[10px] leading-5 tracking-[0.12em] text-white/70"><span className="block">BEGIN WITH CONFIDENCE.</span><span className="block">IF IT&apos;S NOT THE RIGHT FIT, THERE&apos;S NO OBLIGATION TO CONTINUE.</span></p>
          </motion.div>
        </motion.div>

        {/* Bottom Right */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="self-end text-right"
        >
          <p className="mb-2 font-mono text-xs tracking-[0.3em] text-muted-foreground">YOUR NEXT CHAPTER<span aria-hidden="true" className="chapter-ellipsis" /></p>
          <h2 className="font-sans text-3xl font-light tracking-tight text-balance md:text-5xl lg:text-6xl">
            <FoldText text="Made to stand out." splitBy="word" stagger={0.045} fontSize="inherit" fontWeight={300} className="font-sans" />
            <br />
            <FoldText text="Built to grow." splitBy="word" stagger={0.065} fontSize="inherit" fontWeight={300} className="font-sans" />
          </h2>
          <div className="mt-6 flex justify-end"><TrustpilotNote /></div>
        </motion.div>
      </motion.div>

    </section>
  )
}
