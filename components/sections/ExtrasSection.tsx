"use client"

import { Plus, Check } from "lucide-react"
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

function ExtraAddButton({ item }: { item: typeof extras[number] }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    add({ id: item.id, name: `${item.name} (${item.desc})`, priceLabel: item.price, price: parsePrice(item.price) })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleAdd}
      className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full border transition-all duration-200 ${
        added
          ? "bg-green-500/20 border-green-500/50 text-green-400"
          : "bg-white/8 hover:bg-primary text-white/50 hover:text-white border-white/15 hover:border-primary"
      }`}
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {added ? <><Check size={12} /> Agregado</> : <><Plus size={12} /> Agregar</>}
    </button>
  )
}

export default function ExtrasSection() {
  return (
    <section id="extras" className="bg-surface py-20 px-4 sm:px-6 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <RevealWrapper className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 text-accent text-sm font-semibold px-4 py-2 rounded-full mb-5">
            <Plus size={14} />
            EXTRAS
          </div>
          <h2 className="font-heading text-white" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>
            COMPLETA TU PEDIDO
          </h2>
          <p className="text-white/40 mt-2 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
            Suma papas, pollo crispy o arrollados a tu pedido.
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {extras.map((item, i) => (
            <RevealWrapper key={item.id} delay={(Math.min(i, 5)) as 0 | 1 | 2 | 3 | 4 | 5}>
              <div className="relative card-hover bg-card border border-white/8 rounded-2xl overflow-hidden flex flex-col hover:border-primary/30 transition-all duration-200">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <div className="p-5 flex flex-col gap-4 flex-1">
                  {item.badge && (
                    <span className="absolute top-4 right-4 bg-accent text-black text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <div className="flex items-center gap-4">
                    <span className="text-4xl leading-none">{item.emoji}</span>
                    <div className="flex-1 pr-12">
                      <h3 className="font-heading text-xl text-white leading-tight">{item.name}</h3>
                      <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{item.desc}</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-white/8 flex items-center justify-between">
                    <span className="font-heading text-2xl text-primary leading-none">{item.price}</span>
                    <ExtraAddButton item={item} />
                  </div>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
