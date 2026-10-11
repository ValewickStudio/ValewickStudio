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
import { AnimatedContent } from "@/components/react-bits/animated-content"
import { ScrollReveal } from "@/components/react-bits/scroll-reveal"
import { SiteMotionEffects } from "@/components/react-bits/site-motion-effects"

export const metadata: Metadata = {
  title: "Websites, Creative & Digital Systems",
  description: "Explore Valewick House services, selected work, website packages, and the $50 homepage concept. Tell us about your next project.",
  alternates: { canonical: "/" },
}

const reveal = (content: React.ReactNode, delay = 0) => (
  <AnimatedContent distance={30} duration={0.9} threshold={0.08} delay={delay}>
    <ScrollReveal baseOpacity={0.12} baseRotation={0.8} blurStrength={2}>
      {content}
    </ScrollReveal>
  </AnimatedContent>
)

export default function Home() {
  return (
    <SmoothScroll>
      <ClickSpark className="site-click-spark" sparkColor="#f4f0e8" sparkSize={9} sparkRadius={21} sparkCount={8} duration={480}>
        <AmbientBackdrop />
        <LoadingIntro />
        <Navbar />
        <SiteMotionEffects />
        <main>
          {reveal(<Hero />)}
          {reveal(<About />, 0.04)}
          {reveal(<Services />, 0.02)}
          {reveal(<VideoAndCareServices />, 0.06)}
          {reveal(<Works />, 0.02)}
          {reveal(<Demo />, 0.06)}
          {reveal(<WebsitePackages />, 0.02)}
          {reveal(<ReviewCapsule />, 0.06)}
          {reveal(<ProjectEnquiry />, 0.02)}
          {reveal(<TechMarquee />, 0.04)}
          {reveal(<Footer />)}
        </main>
      </ClickSpark>
    </SmoothScroll>
  )
}
