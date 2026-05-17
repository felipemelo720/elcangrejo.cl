"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import StoreStatusBar from "@/components/StoreStatusBar"

const WA = "https://wa.me/56931358884?text=Hola%2C%20quiero%20hacer%20un%20pedido%20%F0%9F%8D%9C"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Image
          src="/logoarrrozenwok.jpg"
          alt="Arroz en Wok"
          width={52}
          height={52}
          className="rounded-full object-cover"
          priority
        />
        <div className="flex items-center gap-3">
          <StoreStatusBar />
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary-dark text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors duration-200"
          >
            Pedir Ahora →
          </a>
        </div>
      </div>
    </nav>
  )
}
