"use client"

import { useEffect, useRef } from "react"
import { ArrowDownRight, ArrowUpRight, Globe2 } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import "./card-swap.css"

export type ShowcaseCardItem={label:string;title:string;description:string;url:string;category:string;monogram:string}
type CardSwapProps={items:ShowcaseCardItem[];activeIndex:number;onChange:(index:number)=>void}

export function CardSwap({items,activeIndex,onChange}:CardSwapProps){
  const reduceMotion=useReducedMotion()
  const startX=useRef<number|null>(null)
  useEffect(()=>{
    if(reduceMotion||items.length<2)return
    const timer=window.setInterval(()=>onChange((activeIndex+1)%items.length),7200)
    return()=>window.clearInterval(timer)
  },[activeIndex,items.length,onChange,reduceMotion])
  if(!items.length)return null
  return <div className="card-swap-showcase">
    <div className="card-swap-stage" onTouchStart={e=>{startX.current=e.touches[0]?.clientX??null}} onTouchEnd={e=>{if(startX.current===null)return;const dx=e.changedTouches[0].clientX-startX.current;if(Math.abs(dx)>45)onChange((activeIndex+(dx<0?1:-1)+items.length)%items.length);startX.current=null}}>
      {items.map((item,index)=>{
        let distance=(index-activeIndex+items.length)%items.length
        const active=distance===0
        const hidden=distance>2
        return <motion.button key={item.label} type="button" className={`card-swap-card ${active?"is-active":""}`} aria-label={`Show ${item.label} showcase`} aria-pressed={active} onClick={()=>active?window.open(item.url,"_blank","noopener,noreferrer"):onChange(index)} initial={false} animate={{x:distance*52,y:distance*-25,rotate:distance*-4,scale:1-distance*.085,opacity:hidden?0:1-distance*.17}} transition={{duration:reduceMotion?0:.7,ease:[.2,.8,.2,1]}} style={{zIndex:items.length-distance,pointerEvents:hidden?"none":"auto"}}>
          <div className="card-swap-browserbar"><span/><span/><span/><div><Globe2 size={10}/>{item.url.replace(/^https?:\/\//,"")}</div></div>
          <div className={`card-swap-art card-swap-art--${index%2}`}>
            <div className="card-swap-art-grid"/>
            <div className="card-swap-kicker">{item.category}</div>
            <div className="card-swap-monogram">{item.monogram}</div>
            <div className="card-swap-title">{item.title}</div>
            <div className="card-swap-line"/>
            <p>{item.description}</p>
            <div className="card-swap-open">EXPLORE EXPERIENCE <ArrowUpRight size={12}/></div>
          </div>
          <div className="card-swap-meta"><span>{String(index+1).padStart(2,"0")} / {item.category}</span><ArrowDownRight size={14}/></div>
        </motion.button>
      })}
    </div>
    <div className="card-swap-controls"><span className="card-swap-count"><b>{String(activeIndex+1).padStart(2,"0")}</b> — {String(items.length).padStart(2,"0")}</span><div className="card-swap-dots">{items.map((item,index)=><button key={item.label} type="button" aria-label={`Show ${item.label}`} aria-pressed={activeIndex===index} className={activeIndex===index?"is-active":""} onClick={()=>onChange(index)}/>)}</div><div className="card-swap-arrows"><button type="button" aria-label="Previous showcase" onClick={()=>onChange((activeIndex-1+items.length)%items.length)}>←</button><button type="button" aria-label="Next showcase" onClick={()=>onChange((activeIndex+1)%items.length)}>→</button></div></div>
    <div className="card-swap-description"><div><p>{items[activeIndex].category}</p><h3>{items[activeIndex].title}</h3><span>{items[activeIndex].description}</span></div><a href={items[activeIndex].url} target="_blank" rel="noreferrer">OPEN WEBSITE <ArrowUpRight size={14}/></a></div>
  </div>
}
