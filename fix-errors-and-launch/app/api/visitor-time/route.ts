import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const requestHeaders = await headers()
  const timeZone = requestHeaders.get("x-vercel-ip-timezone") || "UTC"
  const now = new Date()
  let formatter: Intl.DateTimeFormat
  try {
    formatter = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
  } catch {
    formatter = new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
  }
  const safeTimeZone = formatter.resolvedOptions().timeZone
  return NextResponse.json({ time: formatter.format(now), timeZone: safeTimeZone })
}
