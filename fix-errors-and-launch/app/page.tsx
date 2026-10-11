import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Works } from "@/components/works"
import { TechMarquee } from "@/components/tech-marquee"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SectionBlend } from "@/components/section-blend"
import { Services, Demo, VideoAndCareServices } from "@/components/offer"
import { WebsitePackages } from "@/components/website-packages"
import { ProjectEnquiry } from "@/components/project-enquiry"
import { LoadingIntro } from "@/components/loading-intro"
import { ReviewCapsule } from "@/components/reviews"

export default function Home() {
  return (
    <SmoothScroll>
      <LoadingIntro />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <SectionBlend />
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
  )
}
