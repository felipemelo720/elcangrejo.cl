"use client"

import { createContext, useContext, useReducer, ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  priceLabel: string
  price: number
  qty: number
}

type Action =
  | { type: "ADD"; item: Omit<CartItem, "qty"> }
  | { type: "INCREMENT"; id: string }
  | { type: "DECREMENT"; id: string }
  | { type: "CLEAR" }

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.id === action.item.id)
      if (existing) {
        return state.map((i) =>
          i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...state, { ...action.item, qty: 1 }]
    }
    case "INCREMENT":
      return state.map((i) =>
        i.id === action.id ? { ...i, qty: i.qty + 1 } : i
      )
    case "DECREMENT":
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    case "CLEAR":
      return []
    default:
      return state
  }
}

interface CartCtx {
  items: CartItem[]
  add: (item: Omit<CartItem, "qty">) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  clear: () => void
  total: number
  count: number
}

const CartContext = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, [])

  const add = (item: Omit<CartItem, "qty">) => dispatch({ type: "ADD", item })
  const increment = (id: string) => dispatch({ type: "INCREMENT", id })
  const decrement = (id: string) => dispatch({ type: "DECREMENT", id })
  const clear = () => dispatch({ type: "CLEAR" })

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, add, increment, decrement, clear, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
