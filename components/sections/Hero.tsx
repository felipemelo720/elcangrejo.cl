import { UtensilsCrossed, ChevronDown, MapPin, Clock, Star } from "lucide-react"

const pills = [
  { icon: <MapPin size={13} />, text: "Delivery en Paine" },
  { icon: <MapPin size={13} />, text: "Retiro Calle Aracena #864" },
  { icon: <Clock size={13} />, text: "17:30 – 21:30 hrs" },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg px-4 sm:px-6">

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="animate-drift absolute top-[-5%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px]"
          style={{ background: "radial-gradient(ellipse, rgba(232,93,74,0.18) 0%, transparent 70%)" }}
        />
        <div
          className="animate-drift2 absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse, rgba(232,93,74,0.10) 0%, transparent 70%)" }}
        />
        <div
          className="animate-drift absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.05) 0%, transparent 70%)", animationDelay: "-6s" }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Main content — centered */}
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center pt-28 pb-20">

        {/* Schedule badge */}
        <div
          className="inline-flex items-center gap-2.5 bg-white/5 border border-primary/30 text-white/80 text-xs font-semibold px-5 py-2 rounded-full mb-12 animate-float tracking-widest"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          JUE · VIE · SÁB &nbsp;—&nbsp; 17:30 a 21:30 HRS
        </div>

        {/* Headline */}
        <h1 className="font-heading leading-none text-white">

          {/* SUSHI — full bleed */}
          <span
            className="block"
            style={{ fontSize: "clamp(5rem, 22vw, 17rem)", letterSpacing: "-0.02em" }}
          >
            SUSHI
          </span>

          {/* Divider row */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 my-3 sm:my-4">
            <span className="flex-1 max-w-[100px] sm:max-w-[180px] h-px bg-white/10" />
            <span
              className="text-white/30 text-[9px] sm:text-[10px] tracking-[0.35em] uppercase whitespace-nowrap"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              en tu puerta · Paine
            </span>
            <span className="flex-1 max-w-[100px] sm:max-w-[180px] h-px bg-white/10" />
          </div>

          {/* & CEVICHES — gradient, smaller */}
          <span
            className="block text-gradient-animate"
            style={{ fontSize: "clamp(3rem, 11vw, 8.5rem)", letterSpacing: "-0.01em" }}
          >
            &amp; CEVICHES
          </span>
        </h1>

        {/* Desc */}
        <p
          className="text-white/45 text-base sm:text-lg max-w-sm mx-auto mt-8 mb-6 leading-relaxed"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Han Rolls, Gohan, Piezas Mixtas y Empanadas al momento.
          Sin apps — solo WhatsApp, precio directo.
        </p>

        {/* Social proof */}
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={13} className="text-accent fill-accent" />
            ))}
          </div>
          <span
            className="text-white/40 text-sm"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            +50 clientes felices en Paine
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
          <a
            href="#menu"
            className="animate-glow group relative inline-flex items-center gap-3 bg-primary text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-200 w-full sm:w-auto justify-center overflow-hidden shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <UtensilsCrossed size={18} />
            <span>Armar mi Pedido</span>
            <span className="text-white/55 font-normal text-sm">· desde $3.000</span>
          </a>
          <a
            href="#como-pedir"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white/65 hover:text-white font-semibold text-base px-7 py-4 rounded-2xl transition-all duration-200 w-full sm:w-auto justify-center"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            ¿Cómo pedir?
            <ChevronDown size={15} className="opacity-50" />
          </a>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {pills.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-1.5 bg-white/[0.04] border border-white/8 text-white/40 text-xs px-3.5 py-1.5 rounded-full"
            >
              <span className="text-primary/70">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>


      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 animate-bounce">
        <ChevronDown size={24} />
      </div>
    </section>
  )
}
