"use client"

import { X, Plus, Minus, MessageCircle, Trash2 } from "lucide-react"
import { useCart, CartItem } from "@/context/CartContext"

const WA_NUMBER = "56931358884"

function formatCLP(n: number): string {
  return "$" + n.toLocaleString("es-CL")
}

function buildWAUrl(items: CartItem[], total: number): string {
  const lines = items
    .map((i) => `• ${i.qty}x ${i.name} → ${formatCLP(i.price * i.qty)}`)
    .join("\n")
  const msg = `Hola! Quiero hacer un pedido 🍜\n\n${lines}\n\nTotal: ${formatCLP(total)}`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { items, increment, decrement, clear, total, count } = useCart()

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-surface border-l border-white/10 flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <h2 className="font-heading text-2xl text-white">TU PEDIDO</h2>
            <p
              className="text-white/40 text-xs mt-0.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {count} {count === 1 ? "item" : "items"}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {items.length > 0 && (
              <button
                onClick={clear}
                className="text-white/30 hover:text-white/70 transition-colors p-2 rounded-lg hover:bg-white/5"
                aria-label="Vaciar carrito"
              >
                <Trash2 size={16} />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-white/50 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <span className="text-5xl">🍜</span>
              <p
                className="text-white/40 text-sm"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Tu carrito está vacío.
                <br />
                Agrega algo del menú.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 bg-card border border-white/8 rounded-xl p-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-white text-lg leading-tight truncate">
                    {item.name}
                  </p>
                  <p
                    className="text-white/40 text-xs mt-0.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {item.priceLabel} c/u
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => decrement(item.id)}
                    className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
                    aria-label="Quitar uno"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-heading text-xl text-white w-5 text-center">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => increment(item.id)}
                    className="w-8 h-8 rounded-full bg-primary/20 hover:bg-primary border border-primary/30 hover:border-primary flex items-center justify-center text-primary hover:text-white transition-all"
                    aria-label="Agregar uno"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span
                className="text-white/50 text-sm"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Total
              </span>
              <span className="font-heading text-3xl text-accent">
                {formatCLP(total)}
              </span>
            </div>
            <a
              href={buildWAUrl(items, total)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white font-bold text-base px-6 py-4 rounded-full transition-colors duration-200 animate-glow"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <MessageCircle size={20} />
              Enviar Pedido por WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  )
}
