"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Bell, Check, X } from "lucide-react"

const DISMISSED_KEY = "push_dismissed_until"
const DISMISS_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days
const SHOW_DELAY_MS = 4000

function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4)
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/")
  const raw = window.atob(b64)
  const output = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) output[i] = raw.charCodeAt(i)
  return output
}

type State = "hidden" | "idle" | "loading" | "success" | "denied" | "unsupported"

export default function PushPromptBanner() {
  const pathname = usePathname()
  const [state, setState] = useState<State>("hidden")

  useEffect(() => {
    // Don't show on admin
    if (pathname.startsWith("/admin")) return

    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return

    // Check persistent dismiss
    const dismissedUntil = localStorage.getItem(DISMISSED_KEY)
    if (dismissedUntil && Date.now() < Number(dismissedUntil)) return

    // Check if already subscribed
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => reg.pushManager.getSubscription())
      .then((sub) => {
        if (sub) return // Already subscribed, don't show
        // Delay before showing
        setTimeout(() => setState("idle"), SHOW_DELAY_MS)
      })
      .catch(() => {/* unsupported, stay hidden */})
  }, [pathname])

  // Auto-hide after success
  useEffect(() => {
    if (state !== "success") return
    const t = setTimeout(() => setState("hidden"), 3000)
    return () => clearTimeout(t)
  }, [state])

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, String(Date.now() + DISMISS_TTL_MS))
    setState("hidden")
  }

  async function subscribe() {
    setState("loading")
    try {
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      })
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub),
      })
      setState("success")
    } catch {
      setState("denied")
    }
  }

  if (state === "hidden" || state === "unsupported") return null

  return (
    <div className="fixed bottom-24 left-4 z-40 max-w-xs bg-surface border border-white/15 rounded-2xl p-4 shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-300">
      {state !== "success" && (
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 text-white/30 hover:text-white/70 transition-colors"
          aria-label="Cerrar"
        >
          <X size={14} />
        </button>
      )}

      <div className="flex items-start gap-3 pr-4">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
          state === "success"
            ? "bg-green-500/20 border border-green-500/30 text-green-400"
            : "bg-primary/20 border border-primary/30 text-primary"
        }`}>
          {state === "success" ? <Check size={16} /> : <Bell size={16} />}
        </div>
        <div>
          {state === "success" ? (
            <>
              <p className="text-white text-sm font-semibold leading-snug" style={{ fontFamily: "var(--font-inter)" }}>
                ¡Listo!
              </p>
              <p className="text-white/40 text-xs mt-0.5 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                Te avisaremos cuando El Cangrejo abra.
              </p>
            </>
          ) : (
            <>
              <p className="text-white text-sm font-semibold leading-snug" style={{ fontFamily: "var(--font-inter)" }}>
                Avísame cuando abran
              </p>
              <p className="text-white/40 text-xs mt-0.5 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                Recibe una notificación cada vez que El Cangrejo abre.
              </p>
              {state === "denied" && (
                <p className="text-red-400 text-xs mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                  Permiso denegado. Actívalo en ajustes del navegador.
                </p>
              )}
              <button
                onClick={subscribe}
                disabled={state === "loading"}
                className="mt-3 bg-primary hover:bg-primary-dark disabled:opacity-60 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {state === "loading" ? "Activando..." : "Activar notificaciones"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
