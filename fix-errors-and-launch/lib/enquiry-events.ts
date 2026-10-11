export type EnquiryPrefill = {
  service: string
  selection?: string
}

export function prefillEnquiry(service: string, selection?: string) {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent<EnquiryPrefill>("valewick:prefill-enquiry", {
    detail: { service, selection },
  }))
}
