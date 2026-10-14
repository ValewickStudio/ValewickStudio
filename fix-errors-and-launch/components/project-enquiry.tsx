"use client"

import { useEffect, useState, type FormEvent, type ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import type { EnquiryPrefill } from "@/lib/enquiry-events"
import { BlurText } from "@/components/react-bits/blur-text"

const services = ["Website", "Homepage Concept", "AI Video", "Creative", "Website Management", "Automation"]
const websitePackages = ["Lite", "Essential", "Growth", "Complete", "Help me choose"]
const videoPackages = ["3 Videos — Focused Creative Test", "5 Videos — Broader Creative Set", "10 Videos — Structured Creative Library", "Monthly Video & Creative Production", "Help me choose"]
const budgets = ["Under $300", "$300–$599", "$600–$899", "$900–$1,499", "$1,500–$2,499", "$2,500+"]
const timelines = ["As soon as practical", "Within 1 month", "Within 1–3 months", "More than 3 months", "Flexible / not sure"]
const fieldClass = "w-full rounded-lg border border-white/15 bg-background p-4 font-mono text-xs text-foreground placeholder:text-muted-foreground transition-colors focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
const labelClass = "flex w-full flex-col gap-2 font-mono text-[10px] tracking-wider"

function EnquiryField({ children }: { children: ReactNode }) {
  return <Field><FieldLabel className={labelClass}>{children}</FieldLabel></Field>
}

export function ProjectEnquiry() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [websitePackage, setWebsitePackage] = useState("Help me choose")
  const [videoPackage, setVideoPackage] = useState("Help me choose")
  const [budget, setBudget] = useState("")
  const [contactEntries, setContactEntries] = useState([{ method: "Telegram", value: "" }])
  const [websiteEntries, setWebsiteEntries] = useState([""])
  const [conceptChoice, setConceptChoice] = useState("")
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const handlePrefill = (event: Event) => {
      const detail = (event as CustomEvent<EnquiryPrefill>).detail
      if (!detail?.service) return
      setSelectedServices([detail.service])
      if (detail.service === "Website" && detail.selection) setWebsitePackage(detail.selection)
      if (detail.service === "AI Video" && detail.selection) setVideoPackage(detail.selection)
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    window.addEventListener("valewick:prefill-enquiry", handlePrefill)
    return () => window.removeEventListener("valewick:prefill-enquiry", handlePrefill)
  }, [])

  const hasWebsite = selectedServices.includes("Website")
  const hasConcept = selectedServices.includes("Homepage Concept")
  const hasVideo = selectedServices.includes("AI Video")
  const conceptOnly = hasConcept && selectedServices.length === 1

  function toggleService(service: string) {
    setSelectedServices((current) => current.includes(service)
      ? current.filter((item) => item !== service)
      : [...current, service])
  }

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting) return
    setAttemptedSubmit(true)
    const form = event.currentTarget
    if (!form.reportValidity() || selectedServices.length === 0) {
      setError(selectedServices.length === 0 ? "Choose a service so we can route your enquiry." : "Please complete the required fields before submitting.")
      return
    }

    setError("")
    setIsSubmitting(true)
    const data = new FormData(form)
    const value = (key: string) => String(data.get(key) ?? "").trim()
    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullName: value("fullName"),
          companyName: value("companyName"),
          email: value("email"),
          contactMethods: contactEntries.map((entry, index) => ({ method: value(`contactMethod_${index}`), value: value(`contactDetails_${index}`) })).filter((entry) => entry.value),
          sites: websiteEntries.map((_, index) => ({ type: "Website", value: value(`websiteUrl_${index}`) })).filter((site) => site.value),
          websiteUrl: (() => { const firstSite = websiteEntries.map((_, index) => value(`websiteUrl_${index}`)).find(Boolean) ?? ""; return firstSite && !/^https?:\/\//i.test(firstSite) ? `https://${firstSite}` : firstSite })(),
          socialLinks: value("socialLinks"),
          conceptChoice,
          service: selectedServices.join(", "),
          projectType: hasConcept ? "Homepage Concept" : hasWebsite ? "bundle" : "service",
          bundle: hasWebsite ? websitePackage : "",
          websitePackage: hasWebsite ? websitePackage : "",
          videoPackage: hasVideo ? videoPackage : "",
          budget,
          projectTimeline: value("projectTimeline"),
          conceptIndustryAudience: value("conceptIndustryAudience"),
          conceptGoal: value("conceptGoal"),
          conceptVisualDirection: value("conceptVisualDirection"),
          conceptContent: value("conceptContent"),
          projectScope: value("projectScope"),
          projectGoals: value("projectScope"),
          additionalDetails: value("additionalDetails"),
          honeypot: value("website"),
        }),
      })
      if (!response.ok) {
        const result = await response.json().catch(() => null) as {
          stage?: string
          error?: string
          validationIssues?: Array<{ message?: string }>
        } | null
        if (result?.stage === "validation" && result.validationIssues?.length) {
          throw new Error(result.validationIssues[0].message || "Please check the required fields and try again.")
        }
        if (result?.stage === "environment") {
          throw new Error("The enquiry service is not configured correctly yet. Please try again later.")
        }
        throw new Error("We couldn’t deliver your enquiry. Your details are still here—please try again.")
      }
      setSubmitted(true)
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "We couldn’t send your enquiry. Your details are still here—please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="apply" className="relative isolate scroll-mt-24 overflow-hidden border-t border-white/10 px-6 py-24 md:px-12 md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-16 -z-10 size-72 rounded-full bg-white/[0.035] blur-3xl" /><div aria-hidden="true" className="pointer-events-none absolute -bottom-20 right-0 -z-10 size-80 rounded-full bg-white/[0.025] blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">PROJECT ENQUIRY</p>
          <h2 className="mt-4 text-4xl font-light tracking-tight md:text-5xl"><BlurText text="Tell us about" delay={65} /><br /><span className="italic"><BlurText text="your next chapter." delay={80} direction="top" /></span></h2>
          <p className="mt-5 max-w-sm font-mono text-xs leading-7 text-muted-foreground">Share the idea, the challenge, or the ambition. We’ll help you find a sensible starting point.</p>
          <a href="#concept" className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-muted-foreground underline decoration-white/25 underline-offset-4 transition-colors hover:text-foreground">Explore the $50 Homepage Concept <ArrowUpRight aria-hidden="true" className="size-3" /></a>
        </div>

        {submitted ? (
          <div role="status" className="rounded-2xl border border-white/20 p-8">
            <h3 className="text-3xl">Enquiry received.</h3>
            <p className="mt-4 font-mono text-xs leading-7 text-muted-foreground">Thank you. We’ll review your project details and get in touch.</p>
            <a href="#systems" className="mt-8 inline-block font-mono text-xs">EXPLORE OUR SERVICES →</a>
          </div>
        ) : (
          <form onSubmit={submitApplication} onInvalid={() => setAttemptedSubmit(true)} className="liquid-glass spotlight-card glare-hover rounded-2xl border border-white/15 p-5 md:p-8" aria-busy={isSubmitting}>
            <FieldGroup className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <EnquiryField>FULL NAME<input name="fullName" autoComplete="name" required placeholder="Your name" className={fieldClass} /></EnquiryField>
              <EnquiryField>COMPANY / BRAND<input name="companyName" autoComplete="organization" required placeholder="Your business or brand" className={fieldClass} /></EnquiryField>
            </div>
            <EnquiryField>EMAIL ADDRESS<input name="email" autoComplete="email" required type="email" placeholder="you@example.com" className={fieldClass} /></EnquiryField>
            <FieldSet className="grid gap-3 rounded-xl border border-white/10 p-4">
              <FieldLegend variant="label" className="font-mono text-[10px] tracking-wider">SERVICE OF INTEREST <span className="text-muted-foreground">— SELECT ALL THAT APPLY</span></FieldLegend>
              <FieldGroup className="grid gap-2 sm:grid-cols-2">
                {services.map((service) => {
                  const id = `service-${service.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
                  return <Field key={service} orientation="horizontal" className="min-h-12 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/30">
                    <Checkbox id={id} checked={selectedServices.includes(service)} onCheckedChange={() => toggleService(service)} aria-invalid={attemptedSubmit && selectedServices.length === 0} />
                    <FieldLabel htmlFor={id} className="font-mono text-[10px] text-muted-foreground">{service}</FieldLabel>
                  </Field>
                })}
              </FieldGroup>
              {attemptedSubmit && selectedServices.length === 0 && <span role="alert" className="font-mono text-[10px] text-red-300">Choose at least one service.</span>}
            </FieldSet>

            {hasWebsite && <EnquiryField>WEBSITE PACKAGE<select name="websitePackage" value={websitePackage} onChange={(event) => setWebsitePackage(event.target.value)} required className={fieldClass}>{websitePackages.map((option) => <option key={option}>{option}</option>)}</select></EnquiryField>}
            {hasVideo && <EnquiryField>VIDEO PACKAGE<select name="videoPackage" value={videoPackage} onChange={(event) => setVideoPackage(event.target.value)} required className={fieldClass}>{videoPackages.map((option) => <option key={option}>{option}</option>)}</select></EnquiryField>}

            {!hasConcept && <fieldset className="liquid-glass grid gap-3 rounded-2xl p-5"><legend className="px-2 font-mono text-xs tracking-wider">Want the $50 concept before continuing?</legend><p className="font-mono text-[10px] leading-5 text-muted-foreground">A static homepage design preview. We&apos;ll confirm details and payment before starting.</p><div className="flex gap-3">{["yes", "no"].map((choice) => <button key={choice} type="button" aria-pressed={conceptChoice === choice} onClick={() => { setConceptChoice(choice); setSelectedServices((current) => choice === "yes" ? [...new Set([...current, "Homepage Concept"])] : current.filter((service) => service !== "Homepage Concept")) }} className={`rounded-full border px-6 py-3 font-mono text-xs uppercase tracking-wider transition-all ${conceptChoice === choice ? "border-white/50 bg-white/15 text-foreground" : "border-white/15 text-muted-foreground hover:border-white/35"}`}>{choice}</button>)}</div></fieldset>}

            {hasConcept && (
              <FieldSet className="grid gap-5 rounded-xl border border-white/10 bg-white/[0.02] p-4 md:p-6">
                <FieldLegend variant="label" className="px-2 font-mono text-[10px] tracking-[0.16em]">$50 HOMEPAGE CONCEPT DETAILS</FieldLegend>
                <p className="font-mono text-[10px] leading-5 text-muted-foreground">This is a static homepage design preview—not a coded or published website. Revisions are quoted separately; project details and payment are confirmed before work begins.</p>
                <EnquiryField>INDUSTRY AND TARGET AUDIENCE<textarea name="conceptIndustryAudience" required rows={3} placeholder="What does your business do, and who do you want to reach?" className={fieldClass} /></EnquiryField>
                <EnquiryField>MAIN GOAL FOR THE HOMEPAGE<textarea name="conceptGoal" required rows={3} placeholder="What should a visitor understand or do?" className={fieldClass} /></EnquiryField>
                <EnquiryField>PREFERRED VISUAL DIRECTION OR REFERENCE SITES<textarea name="conceptVisualDirection" required rows={3} placeholder="Share styles, links, or references you like." className={fieldClass} /></EnquiryField>
                <EnquiryField>IMPORTANT CONTENT, PRODUCTS, OR SERVICES<textarea name="conceptContent" required rows={3} placeholder="What should the concept feature?" className={fieldClass} /></EnquiryField>
              </FieldSet>
            )}

            <fieldset className="grid gap-4 rounded-xl border border-white/10 p-4"><legend className="px-2 font-mono text-[10px] tracking-wider">CONTACT METHODS</legend>{contactEntries.map((entry, index) => <div key={index} className="grid gap-3 sm:grid-cols-[.8fr_1.2fr_auto]"><EnquiryField>PREFERRED METHOD<select name={`contactMethod_${index}`} value={entry.method} onChange={(event) => setContactEntries((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, method: event.target.value } : item))} className={fieldClass}><option>Telegram</option><option>WhatsApp</option><option>WeChat</option><option>Email</option></select></EnquiryField><EnquiryField>CONTACT DETAILS<input name={`contactDetails_${index}`} required={index === 0} placeholder={entry.method === "Telegram" ? "@username" : entry.method === "Email" ? "you@example.com" : "Phone number or ID"} className={fieldClass} /></EnquiryField>{contactEntries.length > 1 && <button type="button" aria-label={`Remove contact method ${index + 1}`} onClick={() => setContactEntries((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="self-end rounded-lg border border-white/15 px-3 py-3 font-mono text-xs text-muted-foreground hover:text-foreground">REMOVE</button>}</div>)}<button type="button" onClick={() => setContactEntries((current) => current.length < 10 ? [...current, { method: "WhatsApp", value: "" }] : current)} disabled={contactEntries.length >= 10} className="justify-self-start rounded-full border border-white/15 px-4 py-2 font-mono text-[10px] tracking-wider text-muted-foreground transition hover:border-white/35 hover:text-foreground">+ ADD ANOTHER CONTACT</button></fieldset>
            <fieldset className="grid gap-4 rounded-xl border border-white/10 p-4"><legend className="px-2 font-mono text-[10px] tracking-wider">WEBSITES</legend>{websiteEntries.map((site, index) => <div key={index} className="flex items-end gap-3"><EnquiryField>WEBSITE URL {index === 0 && <span className="text-muted-foreground">(IF APPLICABLE)</span>}<input name={`websiteUrl_${index}`} type="url" placeholder="https://example.com" className={fieldClass} /></EnquiryField>{websiteEntries.length > 1 && <button type="button" aria-label={`Remove website ${index + 1}`} onClick={() => setWebsiteEntries((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="shrink-0 rounded-lg border border-white/15 px-3 py-3 font-mono text-xs text-muted-foreground hover:text-foreground">REMOVE</button>}</div>)}<button type="button" onClick={() => setWebsiteEntries((current) => current.length < 10 ? [...current, ""] : current)} disabled={websiteEntries.length >= 10} className="justify-self-start rounded-full border border-white/15 px-4 py-2 font-mono text-[10px] tracking-wider text-muted-foreground transition hover:border-white/35 hover:text-foreground">+ ADD ANOTHER WEBSITE</button><EnquiryField>SOCIAL LINKS <span className="text-muted-foreground">(OPTIONAL)</span><input name="socialLinks" placeholder="Instagram, TikTok, or other links" className={fieldClass} /></EnquiryField></fieldset>
            <div className={`grid gap-5 ${conceptOnly ? "" : "sm:grid-cols-2"}`}>
              {!conceptOnly && <EnquiryField>PROJECT BUDGET<select name="budget" value={budget} onChange={(event) => setBudget(event.target.value)} required className={fieldClass}><option value="">Choose your range</option>{budgets.map((option) => <option key={option}>{option}</option>)}</select></EnquiryField>}
              <EnquiryField>DESIRED TIMELINE<select name="projectTimeline" required className={fieldClass}><option value="">Choose a timeline</option>{timelines.map((option) => <option key={option}>{option}</option>)}</select></EnquiryField>
            </div>
            <EnquiryField>PROJECT REQUIREMENTS<textarea name="projectScope" required rows={5} placeholder="What would you like us to build, create, or support?" className={fieldClass} /></EnquiryField>
            <EnquiryField>ADDITIONAL NOTES <span className="text-muted-foreground">(OPTIONAL)</span><textarea name="additionalDetails" rows={3} placeholder="Anything else we should know?" className={fieldClass} /></EnquiryField>
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            {error && <p role="alert" className="font-mono text-xs leading-6 text-red-300">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="inline-flex min-h-12 items-center justify-between rounded-lg bg-foreground p-4 text-left font-mono text-xs tracking-wider text-background transition-opacity hover:opacity-80 disabled:opacity-50">{isSubmitting ? "SENDING YOUR ENQUIRY…" : "SEND PROJECT ENQUIRY"}<ArrowUpRight aria-hidden="true" className="size-4" /></button>
            </FieldGroup>
          </form>
        )}
      </div>
    </section>
  )
}

