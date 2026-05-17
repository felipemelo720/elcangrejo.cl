"use client"

import { useEffect, useState } from "react"

export default function StoreStatusBar() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)

  useEffect(() => {
    fetch("/api/store/status")
      .then((r) => r.json())
      .then((d) => setIsOpen(d.is_open))
      .catch(() => setIsOpen(false))
  }, [])

  if (isOpen === null) return null

  return (
    <div
      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
        isOpen
          ? "bg-green-500/15 border-green-500/30 text-green-400"
          : "bg-white/5 border-white/10 text-white/40"
      }`}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-400 animate-pulse" : "bg-white/30"}`} />
      {isOpen ? "Abierto ahora" : "Cerrado"}
    </div>
  )
}
