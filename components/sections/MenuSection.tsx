"use client"

import { useState, useEffect } from "react"
import { Plus, Check, UtensilsCrossed } from "lucide-react"
import RevealWrapper from "@/components/RevealWrapper"
import { useCart } from "@/context/CartContext"
import { categories, type MenuItem, type CategoryKey } from "@/lib/menu-data"

function parsePrice(label: string): number {
  return parseInt(label.replace(/\$|\./g, ""), 10)
}

function AddBtn({ item, soldOut, nameOverride }: { item: MenuItem; soldOut: boolean; nameOverride?: string }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    if (soldOut) return
    add({ id: item.id, name: nameOverride ?? item.name, priceLabel: item.price, price: parsePrice(item.price) })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  if (soldOut) {
    return (
      <span className="text-red-400/60 text-[10px] font-bold border border-red-500/20 bg-red-500/8 rounded-full px-2.5 py-1" style={{ fontFamily: "var(--font-inter)" }}>
        AGOTADO
      </span>
    )
  }

  return (
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
  )
}

function PiezasRow({ item, soldOut }: { item: MenuItem; soldOut: boolean }) {
  const count = item.name.split(" ")[0]
  const priceNum = parseInt(item.price.replace(/\$|\./g, ""), 10)
  const perPiece = Math.round(priceNum / parseInt(count))
  const isSpecial = !!item.badge && !soldOut

  return (
    <div className={`relative flex items-start gap-4 sm:gap-5 px-5 py-4 transition-colors
      ${soldOut ? "opacity-50" : isSpecial ? "hover:bg-primary/[0.04]" : "hover:bg-white/[0.025]"}
      ${isSpecial ? "bg-primary/[0.018]" : ""}
    `}>
      {isSpecial && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r bg-primary/50" />
      )}

      {/* Count */}
      <div className="shrink-0 w-12 pt-0.5 text-center">
        <span className={`font-heading text-3xl leading-none block ${soldOut ? "text-white/20" : "text-primary"}`}>{count}</span>
        <span className={`text-[8px] font-bold tracking-widest ${soldOut ? "text-white/15" : "text-primary/40"}`} style={{ fontFamily: "var(--font-inter)" }}>PZS</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-heading text-base sm:text-lg text-white leading-tight">{item.name}</h3>
          {item.badge && !soldOut && (
            <span
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                item.badge === "POPULAR"
                  ? "bg-accent/12 text-accent border-accent/30"
                  : "bg-primary/12 text-primary/80 border-primary/30"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {item.badge}
            </span>
          )}
        </div>
        {item.desc && (
          <p className="text-white/40 text-xs mt-1 leading-relaxed line-clamp-2" style={{ fontFamily: "var(--font-inter)" }}>
            {item.desc}
          </p>
        )}
        <p className={`text-[10px] mt-1.5 tabular-nums ${soldOut ? "text-white/15" : "text-white/22"}`} style={{ fontFamily: "var(--font-inter)" }}>
          ~${perPiece.toLocaleString("es-CL")} / pz
        </p>
      </div>

      {/* Price + add */}
      <div className="shrink-0 flex flex-col items-end gap-2 pt-0.5">
        <span className={`font-heading text-xl leading-none ${soldOut ? "text-white/25" : "text-primary"}`}>{item.price}</span>
        <AddBtn item={item} soldOut={soldOut} />
      </div>
    </div>
  )
}

function StandardRow({ item, soldOut }: { item: MenuItem; soldOut: boolean }) {
  return (
    <div className={`flex items-center gap-4 px-5 py-4 transition-colors ${soldOut ? "opacity-50" : "hover:bg-white/[0.025]"}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-heading text-base sm:text-lg text-white leading-tight">{item.name}</h3>
          {item.badge && !soldOut && (
            <span
              className="text-[9px] font-bold px-2 py-0.5 rounded-full border bg-accent/12 text-accent border-accent/30"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {item.badge}
            </span>
          )}
        </div>
        {item.desc && (
          <p className="text-white/40 text-xs mt-1 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            {item.desc}
          </p>
        )}
      </div>
      <div className="shrink-0 flex flex-col items-end gap-2">
        <span className={`font-heading text-xl leading-none ${soldOut ? "text-white/25" : "text-primary"}`}>{item.price}</span>
        <AddBtn item={item} soldOut={soldOut} />
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
    <div className={`flex items-center justify-between gap-3 px-5 py-3.5 transition-colors ${soldOut ? "opacity-50" : "hover:bg-white/[0.025]"}`}>
      <span className={`text-sm ${soldOut ? "text-white/30 line-through" : "text-white/70"}`} style={{ fontFamily: "var(--font-inter)" }}>
        {item.name}
      </span>
      <div className="flex items-center gap-3 shrink-0">
        <span className={`font-heading text-lg ${soldOut ? "text-white/25" : "text-primary"}`}>{item.price}</span>
        {soldOut ? (
          <span className="text-red-400/60 text-[9px] font-bold border border-red-500/20 bg-red-500/8 rounded-full px-2 py-0.5" style={{ fontFamily: "var(--font-inter)" }}>AGOTADO</span>
        ) : (
          <button
            onClick={handleAdd}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 ${
              added
                ? "bg-green-500/15 border-green-500/40 text-green-400"
                : "bg-white/5 hover:bg-primary border-white/12 hover:border-primary text-white/50 hover:text-white"
            }`}
          >
            {added ? <Check size={12} /> : <Plus size={12} />}
          </button>
        )}
      </div>
    </div>
  )
}

export default function MenuSection() {
  const [active, setActive] = useState<CategoryKey>("piezas")
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
      <div className="max-w-3xl mx-auto">
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
        <RevealWrapper className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-1 justify-center flex-wrap">
            {categories.map(c => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-200 ${
                  active === c.key
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/25"
                    : "bg-white/5 border-white/10 text-white/55 hover:text-white hover:border-white/25"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span>{c.emoji}</span>
                {c.label}
              </button>
            ))}
          </div>
        </RevealWrapper>

        {/* Panel */}
        <RevealWrapper>
          <div className="bg-card border border-white/10 rounded-2xl overflow-hidden">

            {/* Panel header */}
            <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
              <div>
                <p className="text-white/35 text-[10px] uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-inter)" }}>
                  {active === "piezas" && "Sets de piezas mixtas · fritas y envueltas"}
                  {active === "gohan" && "Gohan · arroz con rellenos al gusto"}
                  {active === "hanroll" && "Han Rolls individuales · arroz, queso y proteína"}
                  {active === "snacks" && "Snacks para acompañar"}
                  {active === "empanadas" && "Empanadas artesanales"}
                </p>
              </div>
              <span className="text-white/15 font-heading text-sm">{cat.emoji}</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/8">
              {active === "hanroll"
                ? cat.items.map(item => <HanRollRow key={item.id} item={item} soldOut={soldOutItems.has(item.id)} />)
                : active === "piezas"
                ? cat.items.map(item => <PiezasRow key={item.id} item={item} soldOut={soldOutItems.has(item.id)} />)
                : cat.items.map(item => <StandardRow key={item.id} item={item} soldOut={soldOutItems.has(item.id)} />)
              }
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
