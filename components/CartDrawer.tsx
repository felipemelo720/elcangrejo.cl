"use client"

import { useState, useEffect } from "react"
import { X, Plus, Minus, MessageCircle, Trash2, ChevronRight, MapPin, Package, Banknote, CreditCard, ArrowLeft } from "lucide-react"
import { useCart, CartItem } from "@/context/CartContext"

const WA_NUMBER = "56931358884"

function formatCLP(n: number): string {
  return "$" + n.toLocaleString("es-CL")
}

const EXTRAS = [
  { id: "Arrollados Primavera", name: "Arrollados Primavera", emoji: "🥟", price: 3500, priceLabel: "$3.500" },
  { id: "Papas Fritas",         name: "Papas Fritas",         emoji: "🍟", price: 4000, priceLabel: "$4.000" },
]

type DeliveryType = "retiro" | "delivery" | null
type Payment = "efectivo" | "transferencia" | null

function buildWAMessage(
  items: CartItem[],
  total: number,
  name: string,
  delivery: DeliveryType,
  address: string,
  payment: Payment
): string {
  const lines = items.map((i) => `• ${i.qty}x ${i.name}`).join("\n")
  const entrega = delivery === "delivery" ? `Delivery — ${address}` : "Retiro en Villa Las Américas"
  const pago = payment === "efectivo" ? "Efectivo" : "Transferencia"

  return [
    `Hola, quiero hacer un pedido:`,
    ``,
    lines,
    ``,
    `Total: ${formatCLP(total)}`,
    `Nombre: ${name}`,
    `Entrega: ${entrega}`,
    `Pago: ${pago}`,
  ].join("\n")
}

export default function CartDrawer({
  open,
  onClose,
  deliveryEnabled = true,
}: {
  open: boolean
  onClose: () => void
  deliveryEnabled?: boolean
}) {
  const { items, add, increment, decrement, clear, total, count } = useCart()

  const [step, setStep] = useState<"cart" | "checkout">("cart")
  const [name, setName] = useState("")
  const [delivery, setDelivery] = useState<DeliveryType>(null)
  const [address, setAddress] = useState("")
  const [payment, setPayment] = useState<Payment>(null)

  // Reset delivery selection if admin disables delivery
  useEffect(() => {
    if (!deliveryEnabled && delivery === "delivery") setDelivery(null)
  }, [deliveryEnabled, delivery])

  const checkoutValid =
    name.trim().length > 0 &&
    delivery !== null &&
    payment !== null &&
    (delivery === "retiro" || address.trim().length > 0)

  function handleClose() {
    if (items.length > 0 && step === "checkout") {
      fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "cart_abandoned" }),
      })
    }
    onClose()
    setTimeout(() => setStep("cart"), 300)
  }

  function handleSend() {
    const msg = buildWAMessage(items, total, name.trim(), delivery, address.trim(), payment)
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "order_sent" }),
    })
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank")
    clear()
    handleClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-surface border-l border-white/10 flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            {step === "checkout" && (
              <button
                onClick={() => setStep("cart")}
                className="text-white/40 hover:text-white transition-colors p-1"
                aria-label="Volver"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <div>
              <h2 className="font-heading text-2xl text-white">
                {step === "cart" ? "TU PEDIDO" : "CONFIRMAR"}
              </h2>
              <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                {step === "cart"
                  ? `${count} ${count === 1 ? "item" : "items"}`
                  : "Completa los datos"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {step === "cart" && items.length > 0 && (
              <button
                onClick={clear}
                className="text-white/30 hover:text-white/70 transition-colors p-2 rounded-lg hover:bg-white/5"
                aria-label="Vaciar carrito"
              >
                <Trash2 size={16} />
              </button>
            )}
            <button
              onClick={handleClose}
              className="text-white/50 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* ── STEP 1: Cart ── */}
        {step === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                  <span className="text-5xl">🍜</span>
                  <p className="text-white/40 text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    Tu carrito está vacío.<br />Agrega algo del menú.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 bg-card border border-white/8 rounded-xl p-4"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-white text-lg leading-tight truncate">{item.name}</p>
                      <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                        {item.priceLabel} c/u
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => decrement(item.id)}
                        className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-heading text-xl text-white w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() => increment(item.id)}
                        className="w-8 h-8 rounded-full bg-primary/20 hover:bg-primary border border-primary/30 hover:border-primary flex items-center justify-center text-primary hover:text-white transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (() => {
              const hasExtra = items.some((i) => EXTRAS.some((e) => e.id === i.id))
              return (
                <div className="shrink-0 space-y-0">
                  {/* Extras upsell */}
                  {!hasExtra && (
                    <div className="px-4 pt-3 pb-2 border-t border-white/10">
                      <p className="text-white/40 text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                        ¿Le agregamos algo?
                      </p>
                      <div className="flex gap-2">
                        {EXTRAS.map((ex) => (
                          <button
                            key={ex.id}
                            onClick={() => add({ id: ex.id, name: ex.name, price: ex.price, priceLabel: ex.priceLabel })}
                            className="flex-1 flex items-center gap-2 bg-card border border-white/10 hover:border-primary/50 hover:bg-primary/10 rounded-xl px-3 py-2.5 transition-all text-left"
                          >
                            <span className="text-xl">{ex.emoji}</span>
                            <div>
                              <p className="text-white text-xs font-semibold leading-tight" style={{ fontFamily: "var(--font-inter)" }}>{ex.name}</p>
                              <p className="text-white/40 text-xs" style={{ fontFamily: "var(--font-inter)" }}>{ex.priceLabel}</p>
                            </div>
                            <Plus size={14} className="ml-auto text-white/30 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Total + continue */}
                  <div className="p-5 border-t border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-sm" style={{ fontFamily: "var(--font-inter)" }}>Total</span>
                      <span className="font-heading text-3xl text-accent">{formatCLP(total)}</span>
                    </div>
                    <button
                      onClick={() => setStep("checkout")}
                      className="w-full inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white font-bold text-base px-6 py-4 rounded-2xl transition-colors duration-200 animate-glow"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Continuar
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )
            })()}
          </>
        )}

        {/* ── STEP 2: Checkout ── */}
        {step === "checkout" && (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-6">

              {/* Name */}
              <div>
                <label className="text-white/50 text-xs uppercase tracking-widest block mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                  Tu nombre
                </label>
                <input
                  type="text"
                  placeholder="Ej: María González"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-card border border-white/10 focus:border-primary text-white placeholder-white/25 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>

              {/* Delivery type */}
              <div>
                <label className="text-white/50 text-xs uppercase tracking-widest block mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                  ¿Retiro o delivery?
                </label>
                <div className={`grid gap-3 ${deliveryEnabled ? "grid-cols-2" : "grid-cols-1"}`}>
                  <button
                    onClick={() => setDelivery("retiro")}
                    className={`flex flex-col items-center gap-2 py-4 rounded-xl border transition-all text-sm font-semibold ${
                      delivery === "retiro"
                        ? "bg-primary/20 border-primary text-white"
                        : "bg-card border-white/10 text-white/50 hover:border-white/30"
                    }`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <Package size={20} />
                    Retiro
                    <span className="text-xs font-normal opacity-60">Villa Las Américas</span>
                  </button>
                  {deliveryEnabled && (
                    <button
                      onClick={() => setDelivery("delivery")}
                      className={`flex flex-col items-center gap-2 py-4 rounded-xl border transition-all text-sm font-semibold ${
                        delivery === "delivery"
                          ? "bg-primary/20 border-primary text-white"
                          : "bg-card border-white/10 text-white/50 hover:border-white/30"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <MapPin size={20} />
                      Delivery
                      <span className="text-xs font-normal opacity-60">Paine</span>
                    </button>
                  )}
                </div>
                {!deliveryEnabled && (
                  <p className="text-orange-400/70 text-xs mt-2" style={{ fontFamily: "var(--font-inter)" }}>
                    Delivery no disponible hoy. Solo retiro en Villa Las Américas.
                  </p>
                )}
              </div>

              {/* Address (only delivery) */}
              {delivery === "delivery" && (
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-widest block mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                    Dirección de entrega
                  </label>
                  <input
                    type="text"
                    placeholder="Calle, número, villa o sector"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-card border border-white/10 focus:border-primary text-white placeholder-white/25 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                </div>
              )}

              {/* Payment */}
              <div>
                <label className="text-white/50 text-xs uppercase tracking-widest block mb-2" style={{ fontFamily: "var(--font-inter)" }}>
                  Forma de pago
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPayment("efectivo")}
                    className={`flex flex-col items-center gap-2 py-4 rounded-xl border transition-all text-sm font-semibold ${
                      payment === "efectivo"
                        ? "bg-primary/20 border-primary text-white"
                        : "bg-card border-white/10 text-white/50 hover:border-white/30"
                    }`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <Banknote size={20} />
                    Efectivo
                  </button>
                  <button
                    onClick={() => setPayment("transferencia")}
                    className={`flex flex-col items-center gap-2 py-4 rounded-xl border transition-all text-sm font-semibold ${
                      payment === "transferencia"
                        ? "bg-primary/20 border-primary text-white"
                        : "bg-card border-white/10 text-white/50 hover:border-white/30"
                    }`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    <CreditCard size={20} />
                    Transferencia
                  </button>
                </div>
              </div>

              {/* Order summary */}
              <div className="bg-card border border-white/8 rounded-xl p-4 space-y-2">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "var(--font-inter)" }}>
                  Resumen
                </p>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                    <span className="text-white/60">{item.qty}x {item.name}</span>
                    <span className="text-white/80">{formatCLP(item.price * item.qty)}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-white/10 flex justify-between">
                  <span className="text-white/50 text-sm" style={{ fontFamily: "var(--font-inter)" }}>Total</span>
                  <span className="font-heading text-xl text-accent">{formatCLP(total)}</span>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-white/10 shrink-0">
              <button
                onClick={handleSend}
                disabled={!checkoutValid}
                className="w-full inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-base px-6 py-4 rounded-2xl transition-all duration-200 animate-glow"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <MessageCircle size={20} />
                Enviar Pedido por WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
