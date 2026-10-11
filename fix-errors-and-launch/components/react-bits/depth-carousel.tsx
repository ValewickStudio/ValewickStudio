"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight, ArrowUpRight, Globe2 } from "lucide-react"

export type DepthCarouselItem = {
  label: string
  title: string
  description: string
  url: string
  category?: string
  monogram?: string
  onOpen?: () => void
}

type DepthCarouselProps = {
  items: DepthCarouselItem[]
  activeIndex?: number
  onChange?: (index: number, item: DepthCarouselItem) => void
  className?: string
}

export function DepthCarousel({ items, activeIndex, onChange, className = "" }: DepthCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const currentIndex = activeIndex ?? internalIndex
  const count = items.length

  useEffect(() => {
    if (currentIndex >= count && count > 0) setInternalIndex(0)
  }, [currentIndex, count])

  if (!count) return null
  const go = (next: number) => {
    const index = (next + count) % count
    setInternalIndex(index)
    onChange?.(index, items[index])
  }

  return (
    <div className={`depth-carousel ${className}`.trim()}>
      <div className="depth-carousel__stage" aria-label="Website showcase carousel">
        <div className="depth-carousel__ambient" aria-hidden="true" />
        {items.map((item, index) => {
          let distance = index - currentIndex
          if (distance > count / 2) distance -= count
          if (distance < -count / 2) distance += count
          const isActive = distance === 0
          const hidden = Math.abs(distance) > 2
          return (
            <motion.button
              key={item.label}
              type="button"
              className={`depth-carousel__card ${isActive ? "is-active" : ""}`}
              aria-label={`Show ${item.label} website`}
              aria-pressed={isActive}
              onClick={() => isActive ? item.onOpen?.() : go(index)}
              initial={false}
              animate={{
                x: distance * (typeof window !== "undefined" && window.innerWidth < 640 ? 94 : 154),
                z: -Math.abs(distance) * 135,
                rotateY: distance * -18,
                rotateZ: distance * -2,
                scale: isActive ? 1 : Math.max(0.72, 1 - Math.abs(distance) * 0.105),
                opacity: hidden ? 0 : 1 - Math.abs(distance) * 0.18,
                filter: isActive ? "blur(0px)" : `blur(${Math.abs(distance) * 1.2}px)`,
              }}
              transition={{ duration: reduceMotion ? 0.01 : 0.78, ease: [0.16, 1, 0.3, 1] }}
              style={{ zIndex: 10 - Math.abs(distance), pointerEvents: hidden ? "none" : "auto" }}
            >
              <div className={`depth-carousel__browser depth-carousel__browser--${index % 3}`}>
                <div className="depth-carousel__chrome">
                  <span /><span /><span />
                  <div className="depth-carousel__address"><Globe2 size={10} /> {item.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</div>
                </div>
                <div className="depth-carousel__screen">
                  <div className="depth-carousel__screen-grid" />
                  <span className="depth-carousel__screen-kicker">{item.category ?? "WEBSITE EXPERIENCE"}</span>
                  <span className="depth-carousel__screen-monogram">{item.monogram ?? item.label.slice(0, 2)}</span>
                  <span className="depth-carousel__screen-title">{item.title}</span>
                  <span className="depth-carousel__screen-rule" />
                  <span className="depth-carousel__screen-copy">{item.description}</span>
                  <span className="depth-carousel__screen-link">EXPLORE EXPERIENCE <ArrowUpRight size={12} /></span>
                </div>
                <div className="depth-carousel__base"><span /><span /><span /></div>
              </div>
              <div className="depth-carousel__caption">
                <span className="depth-carousel__caption-category">{item.category ?? "DIGITAL EXPERIENCE"}</span>
                <span className="depth-carousel__caption-title">{item.label}</span>
              </div>
            </motion.button>
          )
        })}
      </div>
      <div className="depth-carousel__footer">
        <div className="depth-carousel__count"><span>{String(currentIndex + 1).padStart(2, "0")}</span><i />{String(count).padStart(2, "0")}</div>
        <div className="depth-carousel__dots" role="tablist" aria-label="Choose a website">
          {items.map((item, index) => <button key={item.label} type="button" role="tab" aria-selected={currentIndex === index} aria-label={`Show ${item.label}`} className={currentIndex === index ? "is-active" : ""} onClick={() => go(index)} />)}
        </div>
        <div className="depth-carousel__controls">
          <button type="button" aria-label="Previous website" onClick={() => go(currentIndex - 1)}><ArrowLeft size={16} /></button>
          <button type="button" aria-label="Next website" onClick={() => go(currentIndex + 1)}><ArrowRight size={16} /></button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={items[currentIndex]?.label} className="depth-carousel__selected" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
          <div><p>{items[currentIndex]?.category ?? "WEBSITE EXPERIENCE"}</p><h3>{items[currentIndex]?.title}</h3><span>{items[currentIndex]?.description}</span></div>
          <a href={items[currentIndex]?.url} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>OPEN WEBSITE <ArrowUpRight size={14} /></a>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
