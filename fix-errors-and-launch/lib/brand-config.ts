export const brandConfig = {
  name: "VALEWICK HOUSE",
  descriptor: "Digital Growth & AI Systems",
  foundingPrice: 899,
  referencePrice: 2499,
  monthlyHosting: "Editable monthly rate",
  offerDeadline: "2026-10-17T23:59:59",
  payment: { halfAndHalf: true, upfrontDiscount: "Configurable discount" },
  bundles: [
    { name: "ESSENTIAL", price: "$899", description: "A composed, credible online presence.", inclusions: ["Conversion website", "Mobile-first build", "Launch support"] },
    { name: "GROWTH", price: "Custom", description: "A sharper system for consistent growth.", inclusions: ["Website + landing pages", "Ad creative direction", "Analytics setup"] },
    { name: "COMPLETE", price: "Custom", description: "A broader operating system for your business.", inclusions: ["Web + creative", "Marketing systems", "Automation and integrations"] },
  ],
  budgets: ["Under $300", "$300–$599", "$600–$899", "$900–$1,499", "$1,500–$2,499", "$2,500+"],
} as const

export const services = [
  ["01", "HIGH-CONVERTING WEBSITES", "Custom websites, landing pages, storefronts, and conversion-focused experiences."],
  ["02", "HIGH-CONVERTING ADS", "Campaign-ready marketing assets designed around attention, clarity, and conversion."],
  ["03", "HIGH-CONVERTING CREATIVE", "Posters, social creatives, campaign visuals, and branded marketing assets."],
  ["04", "ADD-ONS", "Hosting, domains, maintenance, automation, integrations, pages, and creative production."],
] as const

export const upsells: Record<string, string[]> = {
  WEBSITE: ["Hosting", "Domain", "Additional pages", "Maintenance", "SEO", "Creative assets"],
  ADS: ["Landing page", "Tracking setup", "Creative variations"],
  CREATIVE: ["Social media pack", "Additional posters", "Ad variations", "Brand assets"],
  "AI AUTOMATION": ["Workflow mapping", "Integrations", "Ongoing maintenance"],
}
