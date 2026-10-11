"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const navLinks = [
  { label: "Systems", href: "#systems" },
  { label: "Gallery", href: "#distortion-gallery" },
  { label: "Concept · $50", href: "#concept" },
  { label: "Enquire", href: "#apply" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-all duration-500 md:px-8 md:pt-5"
      >
        <nav className={`glass-nav mx-auto flex max-w-[1380px] items-center justify-between rounded-full px-4 py-3 transition-all duration-500 md:px-7 md:py-3.5 ${isScrolled ? "glass-nav-scrolled" : ""}`}>
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="group flex shrink-0 items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <Image
              src="/brand/valewick-lockup.png"
              alt="Valewick House"
              width={240}
              height={72}
              priority
              sizes="(max-width: 768px) 150px, 240px"
              className="h-9 w-auto object-contain brightness-0 invert transition-opacity duration-300 group-hover:opacity-75"
            />
          </a>

          {/* Desktop Navigation */}
          <motion.ul initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }} className="hidden md:flex items-center gap-4 lg:gap-7">
            {navLinks.map((link, index) => (
              <motion.li key={link.label} variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="group relative rounded-full px-2 py-2 font-mono text-[9px] tracking-[0.13em] text-white/65 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 lg:text-[10px]"
                >
                  <span className="text-accent mr-1">0{index + 1}</span>
                  {link.label.toUpperCase()}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
                </button>
              </motion.li>
            ))}
          </motion.ul>

          {/* Status Indicator */}
          <div className="hidden xl:flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.14em] text-white/65">AVAILABLE FOR WORK</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative ml-3 flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] transition-colors hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="w-6 h-px bg-foreground origin-center"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="w-6 h-px bg-foreground"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="w-6 h-px bg-foreground origin-center"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-nav-overlay fixed inset-0 z-40 bg-[#0b0b0a]/95 backdrop-blur-2xl md:hidden"
          >
            <nav id="mobile-navigation" aria-label="Mobile navigation" className="flex h-full flex-col items-center justify-center gap-8 px-6">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(link.href)}
                  className="group rounded-full border border-white/10 bg-white/[0.025] px-7 py-3 text-3xl font-light tracking-tight text-foreground transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] sm:text-4xl"
                >
                  <span className="text-accent font-mono text-sm mr-2">0{index + 1}</span>
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 mt-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="font-mono text-xs tracking-wider text-muted-foreground">AVAILABLE FOR WORK</span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
