"use client"

import { useState, useEffect } from "react"
import { Plus, Check, UtensilsCrossed } from "lucide-react"
import RevealWrapper from "@/components/RevealWrapper"
import { useCart } from "@/context/CartContext"
import { categories, type MenuItem, type CategoryKey } from "@/lib/menu-data"

function parsePrice(label: string): number {
  return parseInt(label.replace(/\$|\./g, ""), 10)
}

function AddButton({ item, soldOut }: { item: MenuItem; soldOut: boolean }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    if (soldOut) return
    add({ id: item.id, name: item.name, priceLabel: item.price, price: parsePrice(item.price) })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  if (soldOut) {
    return (
      <span
        className="shrink-0 inline-flex items-center text-xs font-bold px-4 py-2 rounded-full border bg-red-500/10 border-red-500/30 text-red-400"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Agotado
      </span>
    )
  }

  return (
    <button
      onClick={handleAdd}
      className={`shrink-0 inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full border transition-all duration-200 ${
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

function StandardCard({ item, soldOut }: { item: MenuItem; soldOut: boolean }) {
  return (
    <div className={`group relative bg-card border rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 h-full ${
      soldOut ? "border-white/5 opacity-60" : "border-white/10 hover:border-primary/40"
    }`}>
      {soldOut && (
        <span className="absolute top-4 right-4 bg-red-500/20 text-red-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-500/30">
          AGOTADO
        </span>
      )}
      {item.badge && !soldOut && (
        <span className="absolute top-4 right-4 bg-accent text-black text-xs font-bold px-2.5 py-0.5 rounded-full">
          {item.badge}
        </span>
      )}
      <div className="flex-1">
        <h3 className="font-heading text-xl text-white leading-tight pr-16">{item.name}</h3>
        {item.desc && (
          <p className="text-white/40 text-xs mt-1.5 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            {item.desc}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/8">
        <span className={`font-heading text-2xl leading-none ${soldOut ? "text-white/30" : "text-primary"}`}>{item.price}</span>
        <AddButton item={item} soldOut={soldOut} />
      </div>
    </div>
  )
}

function HanRollRow({ item, soldOut }: { item: MenuItem; soldOut: boolean }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    if (soldOut) return
    add({ id: item.id, name: `Han Roll ${item.name}`, priceLabel: item.price, price: parsePrice(item.price) })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className={`flex items-center justify-between gap-3 py-3 border-b border-white/8 last:border-0 ${soldOut ? "opacity-50" : ""}`}>
      <span className={`text-sm ${soldOut ? "text-white/40 line-through" : "text-white/80"}`} style={{ fontFamily: "var(--font-inter)" }}>
        {item.name}
      </span>
      <div className="flex items-center gap-3 shrink-0">
        <span className={`font-heading text-lg ${soldOut ? "text-white/30" : "text-primary"}`}>{item.price}</span>
        {soldOut ? (
          <span className="text-red-400 text-[10px] font-bold border border-red-500/30 bg-red-500/10 rounded-full px-2 py-0.5" style={{ fontFamily: "var(--font-inter)" }}>
            AGOTADO
          </span>
        ) : (
          <button
            onClick={handleAdd}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 ${
              added
                ? "bg-green-500/20 border-green-500/50 text-green-400"
                : "bg-white/5 hover:bg-primary border-white/15 hover:border-primary text-white/60 hover:text-white"
            }`}
          >
            {added ? <Check size={13} /> : <Plus size={13} />}
          </button>
        )}
      </div>
    </div>
  )
}

function PiezasCard({ item, soldOut }: { item: MenuItem; soldOut: boolean }) {
  const count = item.name.split(" ")[0]
  return (
    <div className={`group relative bg-card border rounded-2xl p-5 flex flex-col gap-4 transition-all duration-200 h-full ${
      soldOut ? "border-white/5 opacity-60" : "border-white/10 hover:border-primary/40"
    }`}>
      {soldOut && (
        <span className="absolute top-4 right-4 bg-red-500/20 text-red-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-500/30">
          AGOTADO
        </span>
      )}
      {item.badge && !soldOut && (
        <span className="absolute top-4 right-4 bg-accent text-black text-xs font-bold px-2.5 py-0.5 rounded-full">
          {item.badge}
        </span>
      )}
      <div className="flex items-start gap-3">
        <div className={`border rounded-xl px-3 py-2 text-center shrink-0 ${soldOut ? "bg-white/5 border-white/10" : "bg-primary/10 border-primary/20"}`}>
          <span className={`font-heading text-3xl leading-none block ${soldOut ? "text-white/30" : "text-primary"}`}>{count}</span>
          <span className={`text-xs font-semibold ${soldOut ? "text-white/20" : "text-primary/60"}`} style={{ fontFamily: "var(--font-inter)" }}>PZS</span>
        </div>
        <div className="flex-1 pr-12">
          <h3 className="font-heading text-xl text-white leading-tight">{item.name}</h3>
          {item.desc && (
            <p className="text-white/35 text-xs mt-1.5 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              {item.desc}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/8 mt-auto">
        <span className={`font-heading text-2xl leading-none ${soldOut ? "text-white/30" : "text-primary"}`}>{item.price}</span>
        <AddButton item={item} soldOut={soldOut} />
      </div>
    </div>
  )
}

export default function MenuSection() {
  const [active, setActive] = useState<CategoryKey>("gohan")
  const [soldOutItems, setSoldOutItems] = useState<Set<string>>(new Set())
  const cat = categories.find(c => c.key === active)!

  useEffect(() => {
    fetch("/api/store/status")
      .then(r => r.json())
      .then(d => setSoldOutItems(new Set(d.sold_out_items ?? [])))
      .catch(() => {})
  }, [])

  return (
    <section id="menu" className="bg-bg py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <RevealWrapper className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-5">
            <UtensilsCrossed size={14} />
            MENÚ COMPLETO
          </div>
          <h2 className="font-heading text-white" style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}>
            ELIGE TU PEDIDO
          </h2>
          <p className="text-white/45 mt-2 text-base max-w-md mx-auto" style={{ fontFamily: "var(--font-inter)" }}>
            Sushi & ceviches preparados al momento. Sin apps, precio directo.
          </p>
        </RevealWrapper>

        {/* Tabs */}
        <RevealWrapper className="mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 flex-wrap justify-center">
            {categories.map(c => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-200 ${
                  active === c.key
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/25"
                    : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/25"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span>{c.emoji}</span>
                {c.label}
              </button>
            ))}
          </div>
        </RevealWrapper>

        {/* Content */}
        {active === "hanroll" ? (
          <RevealWrapper>
            <div className="max-w-2xl mx-auto bg-card border border-white/10 rounded-2xl p-6">
              <p className="text-white/35 text-xs mb-1 uppercase tracking-widest" style={{ fontFamily: "var(--font-inter)" }}>
                Han Rolls individuales
              </p>
              <p className="text-white/25 text-xs mb-5" style={{ fontFamily: "var(--font-inter)" }}>
                Relleno de arroz con queso y tu elección de proteína
              </p>
              {cat.items.map(item => (
                <HanRollRow key={item.id} item={item} soldOut={soldOutItems.has(item.id)} />
              ))}
            </div>
          </RevealWrapper>
        ) : active === "piezas" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.items.map((item, i) => (
              <RevealWrapper key={item.id} delay={(Math.min(i, 5)) as 0 | 1 | 2 | 3 | 4 | 5}>
                <PiezasCard item={item} soldOut={soldOutItems.has(item.id)} />
              </RevealWrapper>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.items.map((item, i) => (
              <RevealWrapper key={item.id} delay={(Math.min(i, 5)) as 0 | 1 | 2 | 3 | 4 | 5}>
                <StandardCard item={item} soldOut={soldOutItems.has(item.id)} />
              </RevealWrapper>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
