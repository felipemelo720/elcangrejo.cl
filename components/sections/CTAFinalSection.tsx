import { MessageCircle, Package, MapPin } from "lucide-react"
import RevealWrapper from "@/components/RevealWrapper"

function IgIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

const WA = "https://wa.me/56964583021?text=Hola%2C%20quiero%20hacer%20un%20pedido%20%F0%9F%8D%A3"
const IG = "https://www.instagram.com/elcangrejo"

const days = [
  { label: "Lunes",     short: "LUN" },
  { label: "Martes",    short: "MAR" },
  { label: "Miércoles", short: "MIÉ" },
  { label: "Jueves",    short: "JUE" },
  { label: "Viernes",   short: "VIE" },
  { label: "Sábado",    short: "SÁB" },
]

const locations = [
  { icon: <Package size={12} />, label: "Retiro",   value: "Aracena y Monkeberg 864" },
  { icon: <MapPin   size={12} />, label: "Delivery", value: "Disponible en Paine" },
]

export default function CTAFinalSection() {
  return (
    <section className="bg-bg py-24 px-4 sm:px-6 border-t border-white/10">
      <div className="max-w-5xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-14 lg:gap-16 items-center">

          {/* Left */}
          <RevealWrapper>
            <p
              className="text-primary/55 text-[10px] font-bold tracking-[0.3em] uppercase mb-5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              — El sushi más fresco de Paine —
            </p>
            <h2
              className="font-heading text-white leading-none mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              ¿LISTO<br />
              PARA<br />
              <span className="text-primary">PEDIR?</span>
            </h2>
            <p
              className="text-white/38 text-base mb-8 max-w-sm leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Escríbenos y en minutos tienes tu sushi confirmado.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-base px-7 py-4 rounded-2xl transition-colors duration-200 animate-glow shadow-lg shadow-primary/25"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <MessageCircle size={18} />
                Pedir Ahora
              </a>
              <a
                href={IG}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-white/15 hover:border-white/35 bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white font-semibold text-base px-7 py-4 rounded-2xl transition-all duration-200"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <IgIcon />
                @elcangrejo
              </a>
            </div>
          </RevealWrapper>

          {/* Right — info card */}
          <RevealWrapper delay={1}>
            <div className="bg-card border border-white/10 rounded-2xl overflow-hidden">

              {/* Card header */}
              <div className="px-6 py-4 border-b border-white/8 bg-white/[0.025]">
                <p
                  className="text-white/30 text-xs uppercase tracking-[0.28em]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Información del local
                </p>
              </div>

              {/* Schedule */}
              <div className="px-6 py-5 border-b border-white/8">
                <p
                  className="text-white/22 text-[11px] uppercase tracking-[0.2em] mb-4"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Horario de atención
                </p>
                <div className="space-y-3">
                  {days.map((d) => (
                    <div key={d.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="text-primary/50 text-[11px] font-bold w-7 tabular-nums"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {d.short}
                        </span>
                        <span
                          className="text-white/55 text-sm"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {d.label}
                        </span>
                      </div>
                      <span
                        className="text-white/30 text-xs tabular-nums"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        16:00 – 00:00
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="px-6 py-5">
                <p
                  className="text-white/22 text-[11px] uppercase tracking-[0.2em] mb-4"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Dónde pedir
                </p>
                <div className="space-y-3.5">
                  {locations.map((loc) => (
                    <div key={loc.label} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-px text-primary">
                        {loc.icon}
                      </div>
                      <div>
                        <p
                          className="text-white/40 text-xs leading-none mb-1"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {loc.label}
                        </p>
                        <p
                          className="text-white/60 text-sm"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {loc.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </RevealWrapper>

        </div>
      </div>
    </section>
  )
}
