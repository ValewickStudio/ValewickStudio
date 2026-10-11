import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <div className="w-full max-w-2xl">
        <p className="font-mono text-xs tracking-[0.24em] text-white/55">VALEWICK HOUSE / 404</p>
        <h1 className="mt-6 text-5xl font-light tracking-tight sm:text-7xl">This page isn&apos;t here.</h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-white/70">The link may be outdated, or the page may have moved. Head back to the homepage and find your way from there.</p>
        <Link href="/" className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-mono text-xs tracking-[0.12em] text-black transition-colors hover:bg-white/90">RETURN TO HOMEPAGE</Link>
      </div>
    </main>
  )
}
