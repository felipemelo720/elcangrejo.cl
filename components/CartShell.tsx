"use client"

import { useState } from "react"
import { CartProvider } from "@/context/CartContext"
import CartFAB from "@/components/CartFAB"
import CartDrawer from "@/components/CartDrawer"
import PushPromptBanner from "@/components/PushPromptBanner"

export default function CartShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <CartProvider>
      {children}
      <CartFAB onOpen={() => setOpen(true)} />
      <CartDrawer open={open} onClose={() => setOpen(false)} />
      <PushPromptBanner />
    </CartProvider>
  )
}
