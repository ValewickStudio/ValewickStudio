import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Works } from "@/components/works"
import { TechMarquee } from "@/components/tech-marquee"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { CustomCursor } from "@/components/custom-cursor"
import { Services, Demo, VideoAndCareServices } from "@/components/offer"
import { WebsitePackages } from "@/components/website-packages"
import { ProjectEnquiry } from "@/components/project-enquiry"
import { ReviewCapsule } from "@/components/reviews"
import { AmbientBackdrop } from "@/components/ambient-backdrop"
import { LaunchBanner } from "@/components/launch-banner"
import LightRays from "@/components/react-bits/LightRays"
import { SoundNotice } from "@/components/sound-notice"

export const metadata: Metadata = {
  title: "Websites, Creative & Digital Systems",
  description: "Explore Valewick House services, selected work, website packages, and the $50 homepage concept. Tell us about your next project.",
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <>
      <CustomCursor />
      <SoundNotice />
      <SmoothScroll>
      <AmbientBackdrop />
      <LightRays raysOrigin="top-center" raysColor="#e9d8b1" raysSpeed={0.22} lightSpread={0.82} rayLength={1.6} followMouse mouseInfluence={0.07} noiseAmount={0.025} distortion={0.018} pulsating className="site-wide-rays" />
      <Navbar />
      <LaunchBanner />
      <main>
          <Hero />
          <About />
          <Services />
          <VideoAndCareServices />
          <Works />
          <Demo />
          <WebsitePackages />
          <ReviewCapsule />
          <ProjectEnquiry />
          <TechMarquee />
          <Footer />
      </main>
      </SmoothScroll>
    </>
  )
}
