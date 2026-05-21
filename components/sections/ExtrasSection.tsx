"use client"

import { Plus, Check, Flame } from "lucide-react"
import { useState } from "react"
import RevealWrapper from "@/components/RevealWrapper"
import { useCart } from "@/context/CartContext"

function parsePrice(label: string): number {
  return parseInt(label.replace(/\$|\./g, ""), 10)
}

const extras = [
  { id: "papas-chica", name: "Papas Fritas", desc: "Porción chica", price: "$2.000", emoji: "🍟" },
  { id: "papas-grande", name: "Papas Fritas", desc: "Porción grande", price: "$4.000", emoji: "🍟" },
  { id: "papas-familiar", name: "Papas Fritas Familiar", desc: "Para compartir", price: "$8.000", emoji: "🍟", badge: "FAMILIAR" },
  { id: "pollo-crispy-porcion", name: "Pollo Crispy + Papas", desc: "Porción", price: "$5.000", emoji: "🍗" },
  { id: "pollo-crispy-doble", name: "Pollo Crispy + Papas", desc: "Porción doble", price: "$10.000", emoji: "🍗", badge: "DOBLE" },
  { id: "arrollado-primavera", name: "Arrollado Primavera", desc: "5 unidades", price: "$3.500", emoji: "🥢" },
  { id: "arrollado-jamon-queso", name: "Arrollado Jamón Queso", desc: "5 unidades", price: "$3.500", emoji: "🥢" },
]

function ExtraRow({ item }: { item: typeof extras[number] }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    add({ id: item.id, name: `${item.name} (${item.desc})`, priceLabel: item.price, price: parsePrice(item.price) })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.025]">
      <span className="text-2xl leading-none shrink-0">{item.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-heading text-base sm:text-lg text-white leading-tight">{item.name}</h3>
          {item.badge && (
            <span
              className="text-[9px] font-bold px-2 py-0.5 rounded-full border bg-accent/12 text-accent border-accent/30"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {item.badge}
            </span>
          )}
        </div>
        <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{item.desc}</p>
      </div>
      <div className="shrink-0 flex flex-col items-end gap-2">
        <span className="font-heading text-xl leading-none text-primary">{item.price}</span>
        <button
          onClick={handleAdd}
          className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full border transition-all duration-200 ${
            added
              ? "bg-green-500/15 border-green-500/40 text-green-400"
              : "bg-white/6 hover:bg-primary text-white/55 hover:text-white border-white/12 hover:border-primary"
          }`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {added ? <><Check size={12} /> Agregado</> : <><Plus size={12} /> Agregar</>}
        </button>
      </div>
    </div>
  )
}

export default function ExtrasSection() {
  return (
    <section id="extras" className="bg-surface py-20 px-4 sm:px-6 border-y border-white/5">
      <div className="max-w-3xl mx-auto">
        <RevealWrapper className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 text-accent text-sm font-semibold px-4 py-2 rounded-full mb-5">
            <Flame size={14} />
            EXTRAS
          </div>
          <h2 className="font-heading text-white" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
            COMPLETA TU PEDIDO
          </h2>
          <p className="text-white/40 mt-2 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
            Suma papas, pollo crispy o arrollados a tu pedido.
          </p>
        </RevealWrapper>

        <RevealWrapper>
          <div className="bg-card border border-white/10 rounded-2xl overflow-hidden">

            <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
              <p className="text-white/35 text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-inter)" }}>
                Acompañamientos · para sumar a tu pedido
              </p>
              <span className="text-white/15 font-heading text-sm">🍟</span>
            </div>

            <div className="divide-y divide-white/8">
              {extras.map(item => (
                <ExtraRow key={item.id} item={item} />
              ))}
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
