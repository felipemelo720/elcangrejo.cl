import { Flame, Leaf, Zap, HeartHandshake } from "lucide-react"
import RevealWrapper from "@/components/RevealWrapper"

const reasons = [
  {
    icon: <Flame size={18} />,
    iconBg: "#3D2008",
    iconColor: "#F97316",
    title: "Preparado al Momento",
    desc: "Han Rolls, Gohan y Piezas armadas al instante. Sin refrigerados de días anteriores.",
  },
  {
    icon: <Leaf size={18} />,
    iconBg: "#0D2D15",
    iconColor: "#4ADE80",
    title: "Ingredientes Frescos",
    desc: "Salmón, camarón y kanikama de calidad. Palta, cebollín y queso en cada preparación.",
  },
  {
    icon: <Zap size={18} />,
    iconBg: "#2D2A08",
    iconColor: "#FBBF24",
    title: "Sin Apps de Delivery",
    desc: "Pide directo por WhatsApp. Sin comisiones, sin apps que fallen. Precios justos para ti.",
  },
  {
    icon: <HeartHandshake size={18} />,
    iconBg: "#2D0D30",
    iconColor: "#C084FC",
    title: "Trato Directo",
    desc: "Hablamos contigo, coordinamos a tu medida. Retiro en Aracena y Monkeberg 864 o delivery en Paine.",
  },
]

export default function WhyUsSection() {
  return (
    <section className="bg-bg py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header — editorial split */}
        <RevealWrapper>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pb-10 border-b border-white/10">
            <h2
              className="font-heading text-white leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              ¿POR QUÉ<br />
              <span className="text-primary">ELEGIRNOS?</span>
            </h2>
            <p
              className="text-white/30 text-sm sm:text-right max-w-xs leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Calidad de restaurante,<br className="hidden sm:block" />
              sin intermediarios ni apps.
            </p>
          </div>
        </RevealWrapper>

        {/* Numbered rows */}
        {reasons.map((r, i) => (
          <RevealWrapper key={r.title} delay={(i + 1) as 1 | 2 | 3 | 4}>
            <div className="group grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3.5rem_1fr_1.6fr] gap-x-5 sm:gap-x-10 items-start py-8 border-b border-white/8 hover:bg-white/[0.025] transition-colors -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-xl sm:rounded-none">

              {/* Number */}
              <span
                className="font-heading text-white/12 group-hover:text-white/22 transition-colors leading-none mt-1"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon + Title */}
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: r.iconBg, color: r.iconColor }}
                >
                  {r.icon}
                </div>
                <div>
                  <h3
                    className="font-heading text-white leading-tight"
                    style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)" }}
                  >
                    {r.title}
                  </h3>
                  {/* Desc on mobile */}
                  <p
                    className="sm:hidden text-white/40 text-sm leading-relaxed mt-1.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {r.desc}
                  </p>
                </div>
              </div>

              {/* Desc on desktop — third column */}
              <p
                className="hidden sm:block text-white/40 text-sm leading-relaxed pt-1"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {r.desc}
              </p>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </section>
  )
}
