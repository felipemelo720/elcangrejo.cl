"use client"

import { useEffect, useState } from "react"
import { Bell, X, MessageCircle } from "lucide-react"

const WA_NUMBER = "56931358884"
const MSG = encodeURIComponent("Hola! Avísame cuando El Cangrejo esté abierto 🍜")
const SUBSCRIBED_KEY = "wa_notify_subscribed"
const SHOW_DELAY_MS = 2000

export default function WhatsAppNotifyButton() {
  const [storeOpen, setStoreOpen] = useState<boolean | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [subscribed, setSubscribed] = useState(true) // true initially to avoid flash

  useEffect(() => {
    setSubscribed(localStorage.getItem(SUBSCRIBED_KEY) === "1")
    fetch("/api/store/status")
      .then((r) => r.json())
      .then((d) => setStoreOpen(d.is_open))
      .catch(() => setStoreOpen(false))
  }, [])

  // Auto-show if store closed and not yet subscribed
  useEffect(() => {
    if (storeOpen !== false || subscribed) return
    const t = setTimeout(() => setShowModal(true), SHOW_DELAY_MS)
    return () => clearTimeout(t)
  }, [storeOpen, subscribed])

  function dismiss() { setShowModal(false) }

  function handleSubscribe() {
    localStorage.setItem(SUBSCRIBED_KEY, "1")
    setSubscribed(true)
    setShowModal(false)
  }

  // Inline trigger button (shown in Hero when store is closed and not subscribed)
  const triggerButton = storeOpen === false && !subscribed ? (
    <button
      onClick={() => setShowModal(true)}
      className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors duration-200 py-1"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <Bell size={13} className="text-green-500/70" />
      Avísame cuando abran
      <span className="text-white/20">→</span>
    </button>
  ) : null

  const modal = showModal ? (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0">
      {/* Backdrop */}
      <div
        className="animate-fade-in absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Card */}
      <div className="animate-scale-in relative z-10 w-full max-w-sm bg-surface border border-white/10 rounded-3xl p-8 shadow-2xl">
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-green-500/15 border border-green-500/25 flex items-center justify-center text-green-400 mb-6">
          <Bell size={26} />
        </div>

        {/* Copy */}
        <h2
          className="text-white font-bold text-xl leading-tight mb-2"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          ¿Te avisamos cuando abramos?
        </h2>
        <p
          className="text-white/45 text-sm leading-relaxed mb-6"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Mándanos un mensaje por WhatsApp y te avisamos cada vez que El Cangrejo abra — sin apps, sin correos.
        </p>

        {/* CTA */}
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleSubscribe}
          className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white font-bold text-base py-4 rounded-2xl transition-colors shadow-lg shadow-green-500/20"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <MessageCircle size={20} />
          Sí, avísenme por WhatsApp
        </a>

        {/* Skip */}
        <button
          onClick={dismiss}
          className="w-full mt-3 text-white/30 hover:text-white/50 text-sm py-2 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Ahora no
        </button>
      </div>
    </div>
  ) : null

  return (
    <>
      {triggerButton}
      {modal}
    </>
  )
}
