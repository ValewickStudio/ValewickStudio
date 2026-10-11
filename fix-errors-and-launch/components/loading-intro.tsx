"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function LoadingIntro() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1100)
    return () => window.clearTimeout(timer)
  }, [])
  if (!visible) return null
  return <div className="loading-intro" aria-hidden="true"><Image src="/brand/valewick-lockup.png" alt="" width={240} height={80} priority /><span>DIGITAL GROWTH &amp; AI SYSTEMS</span><i /></div>
}
