"use client"

import { useState, useEffect } from "react"
import { socials } from "@/lib/site-config"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export function Footer() {
  const [time, setTime] = useState("")
  const [timeZone, setTimeZone] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let active = true
    const updateVisitorTime = async () => {
      try {
        const response = await fetch("/api/visitor-time", { cache: "no-store" })
        if (!response.ok) throw new Error("Unable to detect visitor time")
        const visitor = await response.json()
        if (active) {
          setTime(visitor.time)
          setTimeZone(visitor.timeZone.replace(/_/g, " "))
        }
      } catch {
        const zone = Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " ")
        if (active) {
          setTimeZone(zone)
          setTime(new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(new Date()))
        }
      }
    }
    void updateVisitorTime()
    const interval = setInterval(() => void updateVisitorTime(), 1000)
    return () => {
      active = false
      clearInterval(interval)
    }
  }, [])

  const copyFooterDetails = async () => {
    const details = `Vale Wick House
Email: valewickhouse@gmail.com
Telegram: @ValeWickHouse
WhatsApp: +95 9 698077904
WeChat: Available
Local time: ${time} (${timeZone})
TikTok: https://www.tiktok.com/@valewickhouse_studio
Instagram: https://www.instagram.com/valewickhouse
Facebook: https://www.facebook.com/ValewickHouse/`
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
    try {
      await navigator.clipboard?.writeText(details)
    } catch {
      const input = document.createElement("textarea")
      input.value = details
      input.style.position = "fixed"
      input.style.opacity = "0"
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy")
      input.remove()
    }
  }

  const copyEmail = async () => {
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
    try {
      await navigator.clipboard?.writeText("valewickhouse@gmail.com")
    } catch {
      const input = document.createElement("textarea")
      input.value = "valewickhouse@gmail.com"
      input.style.position = "fixed"
      input.style.opacity = "0"
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy")
      input.remove()
    }
  }

  return (
    <footer id="contact" className="relative">
      {/* Main CTA */}
      <motion.a
        href="#apply"
        data-cursor-hover
        className="relative block overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Curtain */}
        <motion.div
          className="absolute inset-0 bg-[#2563eb]"
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Content */}
        <div className="relative py-16 md:py-24 px-8 md:px-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.h2
              className="font-sans text-4xl md:text-6xl lg:text-8xl font-light tracking-tight text-center md:text-left"
              animate={{
                color: isHovered ? "#050505" : "#fafafa",
              }}
              transition={{ duration: 0.3 }}
            >
              Let&apos;s build <span className="italic">your next chapter.</span>
            </motion.h2>

            <motion.div
              animate={{
                rotate: isHovered ? 45 : 0,
                color: isHovered ? "#050505" : "#fafafa",
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-12 h-12 md:w-16 md:h-16" />
            </motion.div>
          </div>
        </div>
      </motion.a>

      {/* Footer Info */}
      <div className="border-t border-white/10 px-8 py-10 md:px-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground">KEEP THE DETAILS HANDY</p>
          <button type="button" onClick={() => void copyFooterDetails()} className="rounded-full border border-white/20 px-4 py-2 font-mono text-[10px] tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white hover:text-black" aria-label="Copy footer contact details">{copied ? "COPIED TO CLIPBOARD" : "COPY CONTACT DETAILS"}</button>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr_auto] lg:items-start">
          <div className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
            <span className="block text-white">LOCAL TIME</span>
            <span className="mt-2 block tabular-nums text-base tracking-wider text-white">{time}</span>
            <span className="mt-2 block max-w-[16rem] leading-5">YOUR TIME ZONE · {timeZone || "DETECTING"}</span>
          </div>
          <div className="grid gap-6 font-mono text-[10px] tracking-[0.14em] text-muted-foreground sm:grid-cols-2 xl:grid-cols-3">
            <div className="grid gap-3"><span className="text-white">CONTACT</span><a href="mailto:valewickhouse@gmail.com" className="w-fit text-left underline underline-offset-4 decoration-white/20 hover:text-white">valewickhouse@gmail.com</a><a href="tel:+959698077904" className="w-fit text-left hover:text-white">+95 9 698077904</a><button type="button" onClick={copyEmail} className="w-fit text-left text-white/50 underline underline-offset-4" aria-label="Copy email address">{copied ? "Email copied." : "Copy email address"}</button></div>
            <div className="grid gap-3"><span className="text-white">MESSAGE</span><span>Telegram @ValeWickHouse</span><a href="https://wa.me/959698077904" target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp +95 9 698077904</a><span>WeChat available</span></div>
            <div className="grid gap-3"><span className="text-white">FOLLOW</span><span className="flex flex-wrap gap-x-4 gap-y-2">{socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">{social.label}</a>)}</span></div>
          </div>
          <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground lg:text-right">© {new Date().getFullYear()} Vale Wick<br />All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
