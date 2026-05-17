"use client"

import { useState, useEffect } from "react"
import { CartProvider } from "@/context/CartContext"
import CartFAB from "@/components/CartFAB"
import CartDrawer from "@/components/CartDrawer"

export default function CartShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [deliveryEnabled, setDeliveryEnabled] = useState(true)

  useEffect(() => {
    fetch("/api/store/status")
      .then((r) => r.json())
      .then((d) => setDeliveryEnabled(d.delivery_enabled ?? true))
      .catch(() => {})
  }, [])

  return (
    <CartProvider>
      {children}
      <CartFAB onOpen={() => setOpen(true)} />
      <CartDrawer open={open} onClose={() => setOpen(false)} deliveryEnabled={deliveryEnabled} />
    </CartProvider>
  )
}
