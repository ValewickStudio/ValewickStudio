import { NextResponse } from "next/server"
import { z } from "zod"

const MAX_TEXT = 5000
const contactMethods = z.union([
  z.array(z.object({ method: z.string().trim().min(1).max(40), value: z.string().trim().min(1).max(200) })).max(10),
  z.object({
    telegram: z.string().max(200).optional(),
    discord: z.string().max(200).optional(),
    viber: z.string().max(200).optional(),
    wechat: z.string().max(200).optional(),
    whatsapp: z.string().max(200).optional(),
  }),
]).default([])

const inquirySchema = z.object({
  fullName: z.string().trim().min(1).max(200),
  companyName: z.string().trim().min(1).max(200),
  email: z.string().trim().email(),
  websiteUrl: z.string().trim().max(MAX_TEXT).optional().or(z.literal("")),
  socialLinks: z.string().trim().max(MAX_TEXT).optional().or(z.literal("")),
  currentWebsite: z.string().trim().max(MAX_TEXT).optional().or(z.literal("")),
  sites: z.array(z.object({ type: z.string().trim().min(1).max(100), value: z.string().trim().max(MAX_TEXT) })).max(10).optional().default([]),
  projectType: z.string().trim().max(100).optional().or(z.literal("")),
  inspirationWebsites: z.string().trim().max(MAX_TEXT).optional().or(z.literal("")),
  contactMethods,
  contact: z.string().trim().max(500).optional().or(z.literal("")),
  service: z.string().trim().max(300).optional().or(z.literal("")),
  bundle: z.string().trim().max(300).optional().or(z.literal("")),
  websitePackage: z.string().trim().max(100).optional().or(z.literal("")),
  videoPackage: z.string().trim().max(200).optional().or(z.literal("")),
  budget: z.string().trim().max(100).optional().or(z.literal("")),
  projectTimeline: z.string().trim().min(1).max(200),
  conceptIndustryAudience: z.string().trim().max(MAX_TEXT).optional().or(z.literal("")),
  conceptGoal: z.string().trim().max(MAX_TEXT).optional().or(z.literal("")),
  conceptVisualDirection: z.string().trim().max(MAX_TEXT).optional().or(z.literal("")),
  conceptContent: z.string().trim().max(MAX_TEXT).optional().or(z.literal("")),
  conceptChoice: z.enum(["yes", "no", ""]).optional(),
  paymentOption: z.string().trim().max(200).optional().or(z.literal("")),
  addOns: z.union([z.array(z.string().trim().max(200)).max(50), z.string().trim().max(MAX_TEXT)]).optional().default([]),
  projectGoals: z.string().trim().min(1).max(MAX_TEXT),
  projectScope: z.string().trim().max(MAX_TEXT).optional().or(z.literal("")),
  additionalDetails: z.string().trim().max(MAX_TEXT).optional().or(z.literal("")),
  honeypot: z.string().max(0).optional().or(z.literal("")),
}).superRefine((data, ctx) => {
  const hasStructuredContact = Array.isArray(data.contactMethods)
    ? data.contactMethods.length > 0
    : Object.values(data.contactMethods).some(Boolean)
  if (!hasStructuredContact && !data.contact) ctx.addIssue({ code: "custom", path: ["contact"], message: "At least one contact method is required" })
  if (!data.service) ctx.addIssue({ code: "custom", path: ["service"], message: "A service is required" })
  const selectedServices = (data.service ?? "").split(",").map((service) => service.trim().toLowerCase())
  if (selectedServices.includes("website") && !data.websitePackage && !data.bundle) ctx.addIssue({ code: "custom", path: ["websitePackage"], message: "Choose a website package or ask for help choosing" })
  if (selectedServices.includes("ai video") && !data.videoPackage) ctx.addIssue({ code: "custom", path: ["videoPackage"], message: "Choose a video package or ask for help choosing" })
  if (selectedServices.includes("homepage concept")) {
    for (const [key, value] of [["conceptIndustryAudience", data.conceptIndustryAudience], ["conceptGoal", data.conceptGoal], ["conceptVisualDirection", data.conceptVisualDirection], ["conceptContent", data.conceptContent]] as const) {
      if (!value?.trim()) ctx.addIssue({ code: "custom", path: [key], message: "This homepage concept detail is required" })
    }
  }
  if (data.websiteUrl) {
    try {
      const websiteUrl = new URL(data.websiteUrl)
      if (websiteUrl.protocol !== "http:" && websiteUrl.protocol !== "https:") throw new Error("Invalid protocol")
    } catch {
      ctx.addIssue({ code: "custom", path: ["websiteUrl"], message: "Enter a valid website URL" })
    }
  }
  for (const [index, site] of data.sites.entries()) {
    if (site.type !== "I don't have a website yet" && !/^(?:https?:\/\/)?(?:www\.)?[^\s.]+(?:\.[^\s/]+)+(?:[/?#][^\s]*)?$/i.test(site.value)) {
      ctx.addIssue({ code: "custom", path: ["sites", index, "value"], message: "Enter a website address beginning with www." })
    }
  }
  if (data.projectType === "custom" && !data.budget) ctx.addIssue({ code: "custom", path: ["budget"], message: "A custom budget is required" })
})

type RateEntry = { count: number; resetAt: number }
const requests = new Map<string, RateEntry>()

function clean(value: string | undefined, fallback = "None provided") {
  const normalized = value?.trim()
  return normalized && normalized !== "www." && normalized.toLowerCase() !== "null" && normalized.toLowerCase() !== "undefined"
    ? normalized.replace(/[<>`]/g, "")
    : fallback
}

function formatContacts(data: z.infer<typeof inquirySchema>) {
  const contacts = Array.isArray(data.contactMethods)
    ? data.contactMethods.filter(({ method, value }) => method.trim() && value.trim())
    : Object.entries(data.contactMethods).filter(([, value]) => Boolean(value?.trim())).map(([method, value]) => ({ method, value: value ?? "" }))
  if (contacts.length) return contacts.map(({ method, value }, index) => `${index + 1}. ${clean(method)}\n   Contact: ${clean(value)}`)
  return data.contact?.trim() ? `1. Contact\n   Contact: ${clean(data.contact)}` : "None provided"
}

function formatSites(sites: Array<{ type: string; value: string }>) {
  const actualSites = sites.filter(({ type, value }) => type !== "I don't have a website yet" && value.trim() && value.trim().toLowerCase() !== "www.")
  if (!actualSites.length && sites.some(({ type }) => type === "I don't have a website yet")) return "No website yet"
  if (!actualSites.length) return "None provided"
  return actualSites.map(({ type, value }, index) => {
    const entered = value.trim().replace(/^https?:\/\//i, "").replace(/^www\./i, "")
    const url = `www.${entered}`
    return `${index + 1}. ${clean(type)}\n   ${url}`
  }).join("\n\n")
}

function formatAddOns(addOns: string[] | string) {
  const values = (Array.isArray(addOns) ? addOns : addOns.split(",")).map((value) => value.trim()).filter(Boolean)
  return values.length ? values.map((value) => `• ${clean(value)}`).join("\n") : "None"
}

function formatServices(service: string | undefined) {
  const values = (service ?? "").split(",").map((value) => value.trim()).filter((value) => value && value.toLowerCase() !== "bundle")
  return values.length ? values.map((value) => clean(value)).join(", ") : "None provided"
}

function formatBundle(bundle: string | undefined) {
  return clean(bundle).toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function formatProjectType(projectType: string | undefined) {
  if (projectType?.toLowerCase() === "bundle") return "Bundle"
  if (projectType?.toLowerCase() === "custom") return "Custom Quotation"
  return clean(projectType)
}

function formatPayment(payment: string | undefined) {
  const normalized = payment?.trim().replace(/^half(?:\s*&\s*|\s+)half$/i, "Half & Half")
  return clean(normalized)
}

function diagnostic(body: Record<string, unknown>, status = 500) {
  return NextResponse.json({ success: false, ...body }, { status })
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const now = Date.now()
  const current = requests.get(ip)
  if (current && current.resetAt > now && current.count >= 5) return diagnostic({ stage: "unknown", error: "Too many requests" }, 429)
  requests.set(ip, current && current.resetAt > now ? { count: current.count + 1, resetAt: current.resetAt } : { count: 1, resetAt: now + 10 * 60 * 1000 })

  const length = Number(request.headers.get("content-length") || 0)
  if (length > 40_000) return diagnostic({ stage: "json", error: "Request body is too large." }, 400)

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return diagnostic({ stage: "json", error: "Request body could not be parsed as JSON." }, 400)
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    return diagnostic({
      stage: "environment",
      error: "Required Telegram environment variable is missing.",
      tokenPresent: Boolean(token),
      chatIdPresent: Boolean(chatId),
    })
  }

  const parsed = inquirySchema.safeParse(payload)
  if (!parsed.success) {
    return diagnostic({
      stage: "validation",
      error: "Request validation failed.",
      validationIssues: parsed.error.issues.map(({ path, code, message }) => ({ path, code, message })),
    }, 400)
  }
  if (parsed.data.honeypot) return NextResponse.json({ success: true }, { status: 200 })

  let endpoint: URL
  try {
    endpoint = new URL(`https://api.telegram.org/bot${encodeURIComponent(token)}/sendMessage`)
  } catch {
    return diagnostic({ stage: "url", error: "Telegram endpoint could not be constructed." })
  }

  const services = formatServices(parsed.data.service)
  const projectType = formatProjectType(parsed.data.projectType)
  const bundle = parsed.data.projectType?.toLowerCase() === "bundle" ? formatBundle(parsed.data.bundle) : "None provided"
  const projectScope = clean(parsed.data.projectScope || parsed.data.projectGoals)
  const additionalDetails = clean(parsed.data.additionalDetails)
  const message = [
    "━━━━━━━��━━━━━━━━━━━━",
    "🏠 NEW VALEWICK HOUSE APPLICATION",
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    "👤 CLIENT",
    `Name: ${clean(parsed.data.fullName)}`,
    `Company: ${clean(parsed.data.companyName)}`,
    `Email: ${clean(parsed.data.email)}`,
    "",
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    "📱 CONTACT METHODS",
    formatContacts(parsed.data),
    "",
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    "🌐 WEBSITE & SOCIAL LINKS",
    `Website: ${clean(parsed.data.websiteUrl, "None provided")}`,
    `Social links: ${clean(parsed.data.socialLinks, "None provided")}`,
    formatSites(parsed.data.sites),
    "",
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    "⚡ SERVICE",
    services,
    "",
    "📦 PROJECT TYPE",
    projectType,
    "",
    "🎁 WEBSITE PACKAGE",
    clean(parsed.data.websitePackage || bundle),
    "",
    "🎬 VIDEO PACKAGE",
    clean(parsed.data.videoPackage),
    "",
    "💰 BUDGET",
    clean(parsed.data.budget),
    "",
    "🗓 PROJECT TIMELINE",
    clean(parsed.data.projectTimeline),
    "",
    "💳 PAYMENT",
    formatPayment(parsed.data.paymentOption),
    "",
    "➕ ADD-ONS",
    formatAddOns(parsed.data.addOns),
    "",
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    "📝 PROJECT SCOPE",
    projectScope,
    "",
    "$50 HOMEPAGE CONCEPT DETAILS",
    `Interested before continuing: ${parsed.data.conceptChoice === "yes" ? "Yes" : parsed.data.conceptChoice === "no" ? "No" : "Not selected"}`,
    `Industry / audience: ${clean(parsed.data.conceptIndustryAudience)}`,
    `Homepage goal: ${clean(parsed.data.conceptGoal)}`,
    `Visual direction / references: ${clean(parsed.data.conceptVisualDirection)}`,
    `Content, products, or services: ${clean(parsed.data.conceptContent)}`,
    "",
    "📌 ADDITIONAL DETAILS",
    additionalDetails,
    "",
    "━━━━━━━━━━━━━━━━━━━━",
  ].join("\n")

  let telegram: Response
  try {
    telegram = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    })
  } catch {
    return diagnostic({ stage: "telegram_fetch", error: "Telegram request failed before receiving a response." })
  }

  let telegramBody: { ok?: boolean; error_code?: number; description?: string } | null = null
  try {
    telegramBody = await telegram.json()
  } catch {
    return diagnostic({
      stage: "telegram_response",
      error: "Telegram returned a response that was not valid JSON.",
      telegramStatus: telegram.status,
      telegramErrorCode: 0,
      telegramDescription: "Invalid JSON response.",
    })
  }

  const safeResponse = {
    telegramStatus: telegram.status,
    telegramOk: telegramBody?.ok ?? false,
    telegramErrorCode: telegramBody?.error_code ?? 0,
    telegramDescription: telegramBody?.description ?? "",
  }
  if (!telegram.ok || telegramBody?.ok !== true) {
    return diagnostic({ stage: "telegram_response", error: "Telegram rejected the request.", ...safeResponse })
  }

  try {
    return NextResponse.json({ success: true, ...safeResponse }, { status: 200 })
  } catch {
    return diagnostic({ stage: "success_handling", error: "Telegram succeeded, but the success response could not be returned." })
  }
}

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
