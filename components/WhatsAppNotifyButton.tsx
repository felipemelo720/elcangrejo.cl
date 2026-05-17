"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"

const WA_NUMBER = "56931358884"
const MSG = encodeURIComponent("Avísame cuando abran 🍜")

export default function WhatsAppNotifyButton() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)

  useEffect(() => {
    fetch("/api/store/status")
      .then((r) => r.json())
      .then((d) => setIsOpen(d.is_open))
      .catch(() => setIsOpen(false))
  }, [])

  // Don't render until we know status, and don't show when open
  if (isOpen === null || isOpen === true) return null

  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 border border-green-500/30 bg-green-500/10 hover:bg-green-500/20 text-green-400 font-semibold text-base px-7 py-4 rounded-full transition-all duration-200 w-full sm:w-auto justify-center"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <Bell size={18} />
      Avísame cuando abran
    </a>
  )
}
