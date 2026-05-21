import React from "react"
import { MessageCircle, AlertCircle } from "lucide-react"
import RevealWrapper from "@/components/RevealWrapper"

const WA = "https://wa.me/56964583021?text=Hola%2C%20quiero%20hacer%20un%20pedido%20%F0%9F%8D%A3"

const days = [
  { day: "LUNES",     short: "LUN" },
  { day: "MARTES",    short: "MAR" },
  { day: "MIÉRCOLES", short: "MIÉ" },
  { day: "JUEVES",    short: "JUE" },
  { day: "VIERNES",   short: "VIE" },
  { day: "SÁBADO",    short: "SÁB" },
]

export default function UrgencySection() {
  return (
    <section className="bg-bg py-28 px-4 sm:px-6 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse, rgba(232,93,74,0.08) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-xl mx-auto text-center">

        <RevealWrapper>
          <div
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 text-primary text-[10px] font-bold px-4 py-1.5 rounded-full mb-12 tracking-widest uppercase"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <AlertCircle size={11} />
            DISPONIBILIDAD LIMITADA
          </div>
        </RevealWrapper>

        <RevealWrapper delay={1}>
          <h2
            className="font-heading text-white leading-none mb-3"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)" }}
          >
            SOLO <span className="text-primary">6 DÍAS</span>
          </h2>
          <p
            className="text-white/30 text-xs tracking-[0.35em] uppercase mb-12"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            a la semana
          </p>
        </RevealWrapper>

        <RevealWrapper delay={2}>
          <div className="flex items-stretch justify-center max-w-xs mx-auto border border-white/10 rounded-2xl overflow-hidden divide-x divide-white/10 mb-8">
            {days.map((d) => (
              <div key={d.day} className="flex-1 py-5 text-center bg-white/[0.03]">
                <span className="font-heading text-2xl text-white block leading-none">{d.short}</span>
                <span
                  className="text-white/25 text-[9px] tracking-wider block mt-1.5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </RevealWrapper>

        <RevealWrapper delay={3}>
          <p className="font-heading text-2xl sm:text-3xl text-white/50 tracking-widest leading-none mb-1">
            16:00 — 00:00
          </p>
          <p
            className="text-white/20 text-[9px] tracking-[0.3em] uppercase mb-12"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            horas de atención
          </p>
        </RevealWrapper>

        <RevealWrapper delay={4}>
          <p
            className="text-white/35 text-sm mb-8 leading-relaxed max-w-xs mx-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Los cupos son limitados. No te quedes sin tu sushi esta semana.
          </p>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-glow inline-flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-8 py-3.5 rounded-2xl transition-colors duration-200 shadow-lg shadow-primary/20"
          >
            <MessageCircle size={15} />
            Asegurar mi Pedido
          </a>
        </RevealWrapper>

      </div>
    </section>
  )
}
