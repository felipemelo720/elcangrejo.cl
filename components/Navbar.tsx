"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import StoreStatusBar from "@/components/StoreStatusBar"

const NAV_LINKS = [
  { label: "Menú",       href: "#menu" },
  { label: "Extras",     href: "#extras" },
  { label: "Cómo pedir", href: "#como-pedir" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      if (window.scrollY > 60) setMenuOpen(false)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function handleNavClick(href: string) {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Image
              src="/logoarrrozenwok.jpg"
              alt="Arroz en Wok"
              width={52}
              height={52}
              className="rounded-full object-cover"
              priority
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNavClick(l.href)}
                className="text-white/60 hover:text-white text-sm transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <StoreStatusBar />
            <button
              onClick={() => handleNavClick("#menu")}
              className="bg-primary hover:bg-primary-dark text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors duration-200"
            >
              Pedir Ahora →
            </button>
            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menú"
            >
              <span className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-48 border-t border-white/10" : "max-h-0"
          }`}
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNavClick(l.href)}
                className="text-left text-white/70 hover:text-white text-sm py-2.5 border-b border-white/5 last:border-0 transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}
