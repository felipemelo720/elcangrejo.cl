import { BookOpen, MessageCircle, Package } from "lucide-react"
import RevealWrapper from "@/components/RevealWrapper"

const WA = "https://wa.me/56931358884?text=Hola%2C%20quiero%20hacer%20un%20pedido%20%F0%9F%8D%9C"

const steps = [
  {
    number: "01",
    icon: <BookOpen size={26} />,
    title: "Elige tu Box",
    desc: "Revisa el menú y decide qué proteínas y base quieres. Arroz, fideos o papas — tú mandas.",
  },
  {
    number: "02",
    icon: <MessageCircle size={26} />,
    title: "Escríbenos por WhatsApp",
    desc: "Manda tu pedido al +56 9 3135 8884. Te confirmamos disponibilidad y coordinas el detalle.",
  },
  {
    number: "03",
    icon: <Package size={26} />,
    title: "Retira o Recibe",
    desc: "Pasa por Villa Las Américas o recíbelo en tu puerta dentro de Paine. Así de fácil.",
  },
]

export default function HowToOrderSection() {
  return (
    <section className="bg-surface py-24 px-4 sm:px-6 border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <RevealWrapper className="text-center mb-16">
          <h2 className="font-heading text-white" style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)" }}>
            ¿CÓMO <span className="text-primary">PEDIR?</span>
          </h2>
          <p className="text-white/40 mt-2 text-base" style={{ fontFamily: "var(--font-inter)" }}>
            3 pasos. Sin vueltas.
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-12 left-[calc(33%-1px)] right-[calc(33%-1px)] h-px bg-white/10" />

          {steps.map((step, i) => (
            <RevealWrapper key={step.number} delay={(i + 1) as 1 | 2 | 3}>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-card border border-white/10 flex items-center justify-center text-primary">
                    {step.icon}
                  </div>
                  <span
                    className="absolute -top-3 -right-3 font-heading text-4xl leading-none"
                    style={{ color: "rgba(227,30,36,0.25)" }}
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="font-heading text-2xl text-white">{step.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-inter)" }}>
                  {step.desc}
                </p>
              </div>
            </RevealWrapper>
          ))}
        </div>

        <RevealWrapper delay={4} className="text-center mt-14">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-bold text-lg px-9 py-4 rounded-full transition-colors duration-200 animate-glow"
          >
            <MessageCircle size={20} />
            Comenzar Pedido Ahora
          </a>
        </RevealWrapper>
      </div>
    </section>
  )
}
