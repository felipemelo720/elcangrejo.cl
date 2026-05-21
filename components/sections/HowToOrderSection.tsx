import { ShoppingCart, CheckCircle, Package } from "lucide-react"
import RevealWrapper from "@/components/RevealWrapper"

const steps = [
  {
    number: "01",
    icon: <ShoppingCart size={18} />,
    title: "Elige del menú",
    desc: "Navega el menú, elige tu box, proteína y extras. Agrega todo al carrito desde acá — sin apps ni registro.",
  },
  {
    number: "02",
    icon: <CheckCircle size={18} />,
    title: "Confirma tu pedido",
    desc: "Ingresa tu nombre, elige retiro o delivery, y el método de pago. Se arma el mensaje automáticamente.",
  },
  {
    number: "03",
    icon: <Package size={18} />,
    title: "Retira o recibe",
    desc: "Te enviamos tu pedido por WhatsApp y lo coordinamos. Retiro en Aracena y Monkeberg 864 o delivery en Paine.",
  },
]

export default function HowToOrderSection() {
  return (
    <section id="como-pedir" className="bg-surface py-24 px-4 sm:px-6 border-y border-white/5">
      <div className="max-w-md mx-auto">
        <RevealWrapper>
          <div className="bg-card border border-white/12 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">

            {/* Header */}
            <div className="px-7 pt-7 pb-6 text-center border-b border-dashed border-white/15">
              <div
                className="flex items-center justify-center gap-3 text-white/22 text-[9px] uppercase tracking-[0.28em] mb-3"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span className="flex-1 h-px bg-white/12" />
                proceso de pedido
                <span className="flex-1 h-px bg-white/12" />
              </div>
              <h2 className="font-heading text-white" style={{ fontSize: "clamp(2rem, 6vw, 2.8rem)" }}>
                ¿CÓMO PEDIR?
              </h2>
              <p className="text-white/30 text-xs mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                3 pasos · sin vueltas
              </p>
            </div>

            {/* Steps */}
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`flex items-start gap-4 px-7 py-5 ${i < steps.length - 1 ? "border-b border-dashed border-white/10" : ""}`}
              >
                <span
                  className="font-heading leading-none text-white/8 select-none shrink-0"
                  style={{ fontSize: "3.5rem" }}
                >
                  {step.number}
                </span>
                <div className="flex items-start gap-3 pt-1.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-primary bg-primary/10">
                    {step.icon}
                  </div>
                  <div>
                    <p className="font-heading text-lg text-white leading-tight">{step.title}</p>
                    <p
                      className="text-white/38 text-xs mt-1.5 leading-relaxed"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Footer CTA */}
            <div className="px-7 py-6 border-t border-dashed border-white/12 bg-white/[0.015] flex flex-col items-center gap-4">
              <p
                className="text-white/18 text-[9px] uppercase tracking-[0.25em]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Sin apps · Sin registro · Solo WhatsApp
              </p>
              <a
                href="#menu"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-base px-8 py-4 rounded-2xl transition-colors duration-200 animate-glow shadow-lg shadow-primary/25"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <ShoppingCart size={18} />
                Armar mi Pedido
              </a>
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
