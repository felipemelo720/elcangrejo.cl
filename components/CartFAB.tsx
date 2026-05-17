"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/context/CartContext"

export default function CartFAB({ onOpen }: { onOpen: () => void }) {
  const { count } = useCart()

  if (count === 0) return null

  return (
    <button
      onClick={onOpen}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-bold px-5 py-3.5 rounded-full shadow-2xl transition-all duration-200 animate-glow"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <ShoppingBag size={20} />
      <span>Ver Pedido</span>
      <span className="bg-white text-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
        {count}
      </span>
    </button>
  )
}
