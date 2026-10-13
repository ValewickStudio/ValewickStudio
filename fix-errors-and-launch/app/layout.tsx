import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist_Mono, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AmbientExperience } from "@/components/ambient-experience"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" })

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.valewickstudio.com"),
  title: {
    default: "Valewick House | Websites, Creative & Digital Systems",
    template: "%s | Valewick House",
  },
  description: "Valewick House builds considered websites, campaign creative, and practical digital systems for ambitious businesses. Explore services, view selected work, or enquire about a project.",
  applicationName: "Valewick House",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/brand/valewick-monogram.png", sizes: "512x512", type: "image/png" }],
    shortcut: "/brand/valewick-monogram.png",
    apple: "/brand/valewick-monogram.png",
  },
  openGraph: {
    type: "website",
    url: "https://www.valewickstudio.com/",
    siteName: "Valewick House",
    title: "Valewick House | Websites, Creative & Digital Systems",
    description: "Considered websites, campaign creative, and practical digital systems for ambitious businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valewick House | Websites, Creative & Digital Systems",
    description: "Considered websites, campaign creative, and practical digital systems for ambitious businesses.",
  },
}

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistMono.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <div className="noise-overlay" />
        {children}
        <AmbientExperience />
        <Analytics />
      </body>
    </html>
  )
}
