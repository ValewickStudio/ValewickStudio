import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Works } from "@/components/works"
import { TechMarquee } from "@/components/tech-marquee"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Services, Demo, VideoAndCareServices } from "@/components/offer"
import { WebsitePackages } from "@/components/website-packages"
import { ProjectEnquiry } from "@/components/project-enquiry"
import { LoadingIntro } from "@/components/loading-intro"
import { ReviewCapsule } from "@/components/reviews"
import { AmbientBackdrop } from "@/components/ambient-backdrop"
import { ClickSpark } from "@/components/react-bits/click-spark"
import { SiteMotionEffects } from "@/components/react-bits/site-motion-effects"

export const metadata: Metadata = {
  title: "Websites, Creative & Digital Systems",
  description: "Explore Valewick House services, selected work, website packages, and the $50 homepage concept. Tell us about your next project.",
  alternates: { canonical: "/" },
}

export default function Home() {
  return (
    <SmoothScroll>
      <ClickSpark className="site-click-spark" sparkColor="#f4f0e8" sparkSize={9} sparkRadius={21} sparkCount={8} duration={480}>
        <AmbientBackdrop />
        <LoadingIntro />
        <Navbar />
        <SiteMotionEffects />
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
      </ClickSpark>
    </SmoothScroll>
  )
}
