"use client"

import { useTransition, useState } from "react"
import { toggleSoldOut } from "@/app/admin/actions"
import { categories } from "@/lib/menu-data"

export default function SoldOutManager({ initialSoldOut }: { initialSoldOut: string[] }) {
  const [soldOut, setSoldOut] = useState<Set<string>>(new Set(initialSoldOut))
  const [pending, startTransition] = useTransition()

  function handleToggle(itemId: string) {
    const nowSoldOut = !soldOut.has(itemId)
    setSoldOut(prev => {
      const next = new Set(prev)
      if (nowSoldOut) next.add(itemId)
      else next.delete(itemId)
      return next
    })
    startTransition(() => toggleSoldOut(itemId, nowSoldOut))
  }

  const soldOutCount = soldOut.size

  return (
    <div className="bg-surface border border-white/10 rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-inter)" }}>
            Productos
          </p>
          <span className="font-heading text-xl text-white">STOCK</span>
        </div>
        {soldOutCount > 0 && (
          <span className="bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold px-3 py-1 rounded-full" style={{ fontFamily: "var(--font-inter)" }}>
            {soldOutCount} agotado{soldOutCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div className="space-y-4">
        {categories.map(cat => (
          <div key={cat.key}>
            <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2 flex items-center gap-1.5" style={{ fontFamily: "var(--font-inter)" }}>
              <span>{cat.emoji}</span> {cat.label}
            </p>
            <div className="space-y-1">
              {cat.items.map(item => {
                const isOut = soldOut.has(item.id)
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 py-2 px-3 rounded-xl hover:bg-white/4 transition-colors"
                  >
                    <span
                      className={`text-sm flex-1 min-w-0 truncate ${isOut ? "text-white/35 line-through" : "text-white/75"}`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {item.name}
                    </span>
                    <button
                      onClick={() => handleToggle(item.id)}
                      disabled={pending}
                      className={`shrink-0 text-xs font-bold px-3 py-1 rounded-full border transition-colors disabled:opacity-50 ${
                        isOut
                          ? "bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30"
                          : "bg-green-500/15 border-green-500/30 text-green-400 hover:bg-green-500/25"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {isOut ? "Agotado" : "Disponible"}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
