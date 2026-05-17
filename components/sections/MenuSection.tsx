"use client"

import { Flame, Star, Sparkles, Crown, Zap, UtensilsCrossed, Clock, Plus, Check } from "lucide-react"
import RevealWrapper from "@/components/RevealWrapper"
import Image from "next/image"
import { useState } from "react"
import { useCart } from "@/context/CartContext"

function parsePrice(label: string): number {
  return parseInt(label.replace(/\$|\./g, ""), 10)
}

interface MenuItem {
  name: string
  desc: string
  price: string
  gradient: string
  iconBg: string
  icon: React.ReactNode
  badge?: string
}

const riceBox: MenuItem[] = [
  {
    name: "Mongolian Rice",
    desc: "Carne Mongoliana con Arroz Frito",
    price: "$8.000",
    gradient: "linear-gradient(135deg, #3D0F0F 0%, #1A0505 100%)",
    iconBg: "#5C1515",
    icon: <Flame size={22} />,
  },
  {
    name: "Chicken Rice",
    desc: "Pollo a la Naranja con Arroz Frito",
    price: "$7.000",
    gradient: "linear-gradient(135deg, #3D2A08 0%, #1A0F00 100%)",
    iconBg: "#5C3A0A",
    icon: <Star size={22} />,
  },
  {
    name: "Shrimp Rice",
    desc: "Camarones Salteados con Arroz Frito",
    price: "$8.000",
    gradient: "linear-gradient(135deg, #082235 0%, #041018 100%)",
    iconBg: "#0D3550",
    icon: <Sparkles size={22} />,
  },
  {
    name: "Mix Rice",
    desc: "2 Proteínas a Elección con Arroz Frito",
    price: "$11.500",
    gradient: "linear-gradient(135deg, #250D3D 0%, #100518 100%)",
    iconBg: "#3A1560",
    icon: <Crown size={22} />,
    badge: "MÁS PEDIDO",
  },
  {
    name: "Mongolian Chips",
    desc: "Carne Mongoliana con Papas Fritas",
    price: "$7.500",
    gradient: "linear-gradient(135deg, #2A1A08 0%, #140D00 100%)",
    iconBg: "#45280A",
    icon: <Zap size={22} />,
  },
]

const chaumin: MenuItem[] = [
  {
    name: "Mongo Chaumin",
    desc: "Carne Mongoliana con Fideos Salteados",
    price: "$8.500",
    gradient: "linear-gradient(135deg, #2E0A28 0%, #140512 100%)",
    iconBg: "#4A1040",
    icon: <Flame size={22} />,
  },
  {
    name: "Shrimp Chaumin",
    desc: "Camarones con Fideos Salteados",
    price: "$8.500",
    gradient: "linear-gradient(135deg, #082030 0%, #040E18 100%)",
    iconBg: "#0D3048",
    icon: <Sparkles size={22} />,
  },
  {
    name: "Chicken Chaumin",
    desc: "Pollo a la Naranja con Fideos Salteados",
    price: "$7.500",
    gradient: "linear-gradient(135deg, #1C2A0A 0%, #0D1405 100%)",
    iconBg: "#2A3D0A",
    icon: <Star size={22} />,
  },
]

function AddButton({ item }: { item: MenuItem }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    add({ id: item.name, name: item.name, priceLabel: item.price, price: parsePrice(item.price) })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleAdd}
      className={`shrink-0 inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2.5 rounded-full border transition-all duration-200 ${
        added
          ? "bg-green-500/20 border-green-500/50 text-green-400"
          : "bg-white/8 hover:bg-primary text-white/70 hover:text-white border-white/15 hover:border-primary"
      }`}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {added ? <><Check size={14} /> Agregado</> : <><Plus size={14} /> Agregar</>}
    </button>
  )
}

function MenuCard({ item, delay }: { item: MenuItem; delay: 0 | 1 | 2 | 3 | 4 | 5 }) {
  return (
    <RevealWrapper delay={delay} className="h-full">
      <div
        className="card-hover group relative h-full rounded-2xl border border-white/10 overflow-hidden flex flex-col"
        style={{ background: item.gradient }}
      >
        {/* Top shimmer line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        {/* Badge */}
        {item.badge && (
          <div className="absolute top-4 right-4 bg-accent text-black text-xs font-bold px-3 py-1 rounded-full tracking-wide shadow-lg">
            {item.badge}
          </div>
        )}

        <div className="p-6 flex flex-col gap-4 flex-1">
          {/* Icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white/90 shadow-inner"
            style={{ backgroundColor: item.iconBg }}
          >
            {item.icon}
          </div>

          {/* Text */}
          <div className="flex-1">
            <h3 className="font-heading text-2xl text-white leading-tight">{item.name}</h3>
            <p className="text-white/45 text-sm leading-relaxed mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
              {item.desc}
            </p>
          </div>

          {/* Price + CTA */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                precio
              </p>
              <span className="font-heading text-3xl text-accent leading-none">{item.price}</span>
            </div>
            <AddButton item={item} />
          </div>
        </div>
      </div>
    </RevealWrapper>
  )
}

export default function MenuSection() {
  return (
    <section id="menu" className="bg-bg py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <RevealWrapper className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-5">
            <UtensilsCrossed size={14} />
            MENÚ COMPLETO
          </div>
          <h2 className="font-heading text-white" style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}>
            ELIGE TU BOX
          </h2>
          <p className="text-white/45 mt-2 text-base max-w-md mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
            Cada box preparado al momento en el wok. Sin recalentar, sin congelar.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/50 text-xs font-semibold px-4 py-2 rounded-full mt-4" style={{ fontFamily: "var(--font-inter)" }}>
            <Clock size={12} />
            SÁBADO · 17:30 A 21:30 HRS
          </div>
        </RevealWrapper>

        {/* Menu photo */}
        <RevealWrapper className="mb-14">
          <div className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-xl">
            <Image
              src="/menuarrozenwok.webp"
              alt="Menú Arroz en Wok"
              width={400}
              height={700}
              className="w-full h-auto object-cover"
            />
          </div>
        </RevealWrapper>

        {/* Rice & Chip Box */}
        <div className="mb-14">
          <RevealWrapper>
            <h3 className="font-heading text-3xl text-white/60 mb-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/10" />
              RICE & CHIP BOX
              <span className="h-px flex-1 bg-white/10" />
            </h3>
          </RevealWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {riceBox.map((item, i) => (
              <MenuCard key={item.name} item={item} delay={(Math.min(i, 5)) as 0 | 1 | 2 | 3 | 4 | 5} />
            ))}
          </div>
        </div>

        {/* Chaumin Box */}
        <div>
          <RevealWrapper>
            <h3 className="font-heading text-3xl text-white/60 mb-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/10" />
              CHAUMIN BOX
              <span className="h-px flex-1 bg-white/10" />
            </h3>
          </RevealWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {chaumin.map((item, i) => (
              <MenuCard key={item.name} item={item} delay={(Math.min(i, 5)) as 0 | 1 | 2 | 3 | 4 | 5} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
