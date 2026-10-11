export const brand = {
  name: "VALEWICK HOUSE",
  descriptor: "Digital Growth & AI Systems",
  tagline: "Built for Better Business.",
  pillars: ["WEB", "GROWTH", "SCALE"],
  logo: {
    lockup: "/brand/valewick-lockup.png",
    monogram: "/brand/valewick-monogram.png",
    wordmark: "/brand/valewick-wordmark.png",
    sheet: "/brand/valewick-brand-sheet.png",
  },
}

export const navLinks = [
  { label: "Systems", href: "#systems" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Apply", href: "#apply" },
]

/**
 * Trustpilot: nothing is rendered as a rating until real data exists.
 * - profileUrl: your public Trustpilot review page
 * - businessUnitId + templateId: official TrustBox widget (loads Trustpilot's own script)
 */
export const trustpilot: {
  profileUrl: string | null
  businessUnitId: string | null
  templateId: string | null
} = {
  profileUrl: null,
  businessUnitId: null,
  templateId: null,
}

export type ServiceKey = "website" | "ads" | "creative" | "automation" | "addons" | "bundle"

export const services = [
  {
    number: "01",
    key: "website" as ServiceKey,
    title: "High-Converting Websites",
    description:
      "Custom websites, landing pages, digital storefronts, and conversion-focused web experiences.",
  },
  {
    number: "02",
    key: "ads" as ServiceKey,
    title: "High-Converting Ads",
    description:
      "Ad creatives and campaign-ready marketing assets designed around attention, clarity, and conversion.",
  },
  {
    number: "03",
    key: "creative" as ServiceKey,
    title: "High-Converting Creative",
    description:
      "Posters, promotional graphics, social creatives, campaign visuals, and branded marketing assets.",
  },
  {
    number: "04",
    key: "addons" as ServiceKey,
    title: "Add-Ons",
    description:
      "Hosting, domains, maintenance, automation, integrations, additional pages, creative production, and other optional services.",
  },
]

export const pricing = {
  currency: "USD",
  referencePrice: 2499,
  foundingPrice: 899,
  /** ISO timestamp. Set to null to hide the countdown entirely. */
  foundingOfferDeadline: "2026-10-18T07:15:18Z" as string | null,
  /** Monthly hosting & related services. Set a number once finalised; null shows "quoted per project". */
  monthlyHosting: null as number | null,
  monthlyHostingNote: "Depends on the apps and services your project uses.",
  breakdown: ["Website", "Ads", "Creative", "Automation", "Hosting"],
}

export const paymentOptions = {
  halfAndHalf: {
    title: "Half & Half",
    summary: "50% to begin · 50% the following month",
    availability: "Available for approved projects.",
  },
  upfront: {
    title: "Pay Upfront",
    summary: "Pay in full and receive a small upfront-payment discount.",
    /** e.g. "5%" or "$50". null keeps the copy generic. */
    discount: null as string | null,
  },
}

export const bundles = [
  {
    id: "essential",
    name: "Essential",
    price: null as number | null,
    description: "For businesses that mainly need a professional online presence.",
    inclusions: ["Custom website (up to 5 pages)", "Mobile-first build", "Contact / lead form", "Launch support"],
  },
  {
    id: "growth",
    name: "Growth",
    price: null as number | null,
    description: "For businesses that want a website plus marketing and creative support.",
    inclusions: ["Everything in Essential", "Ad creative set", "Social creative pack", "Conversion tracking setup"],
  },
  {
    id: "complete",
    name: "Complete",
    price: null as number | null,
    description: "For businesses wanting web, creative, marketing, and automation together.",
    inclusions: ["Everything in Growth", "Campaign landing pages", "AI / workflow automation", "Priority revisions"],
  },
]

export const budgetOptions = [
  "Under $300",
  "$300–$599",
  "$600–$899",
  "$900–$1,499",
  "$1,500–$2,499",
  "$2,500+",
]

export const upsells: Record<ServiceKey, string[]> = {
  website: ["Hosting", "Domain", "Additional pages", "Maintenance", "SEO", "Creative assets"],
  ads: ["Ad creatives", "Landing page", "Tracking setup", "Additional creative variations"],
  creative: ["Social media pack", "Additional posters", "Ad variations", "Brand assets"],
  automation: ["CRM integration", "Lead routing", "Chat assistant", "Reporting dashboard"],
  addons: ["Hosting", "Domain", "Maintenance", "Integrations"],
  bundle: ["Hosting", "Domain", "Maintenance", "Additional creative variations"],
}

export const portfolioDemo = {
  title: "Kyo — Slow Sip",
  category: "Website · Digital Storefront",
  url: "https://kyo-slow-sip.base44.app",
  /** The site currently sends X-Frame-Options: DENY, so it cannot be embedded. Flip to true if that changes. */
  embeddable: false,
}

export type ShowcaseVideo = {
  id: string
  number: string
  category: string
  title: string
  description?: string
  src: string
  poster?: string
  aspect?: "9/16" | "16/9" | "1/1" | "4/5"
  /** Optional external destination, shown as OPEN FULL PROJECT. */
  externalUrl?: string
}

/** Centralized showcase media configuration. Add another object to extend the gallery. */
export const showcaseVideos: ShowcaseVideo[] = [
  {
    id: "video-01",
    number: "01",
    category: "AD CREATIVE",
    title: "Product Campaign",
    description: "A high-impact promotional creative designed to communicate the product clearly through fast visual storytelling and a strong opening hook.",
    src: "https://res.cloudinary.com/bg8kk11g/video/upload/v1790790997/INSTA_2_1.mp4",
    aspect: "9/16",
  },
  {
    id: "video-02",
    number: "02",
    category: "BRAND CREATIVE",
    title: "Brand Campaign",
    description: "A polished brand-focused video built around visual identity, presentation, and attention-grabbing creative direction.",
    src: "https://res.cloudinary.com/bg8kk11g/video/upload/v1790790985/INSTA_1_1.mp4",
    aspect: "9/16",
  },
  {
    id: "video-03",
    number: "03",
    category: "SOCIAL CREATIVE",
    title: "Social Campaign",
    description: "A short-form social creative designed for mobile viewing, rapid attention capture, and clear visual communication.",
    src: "https://res.cloudinary.com/bg8kk11g/video/upload/v1790790521/INSTA_3_1.mp4",
    aspect: "9/16",
  },
]

export const contactMethods = ["Telegram", "WhatsApp", "WeChat"] as const

export const socials = [
  { label: "TikTok", href: "https://www.tiktok.com/@valewickhouse_studio" },
  { label: "Instagram", href: "https://www.instagram.com/valewickhouse" },
  { label: "Facebook", href: "https://www.facebook.com/ValewickHouse/" },
]
