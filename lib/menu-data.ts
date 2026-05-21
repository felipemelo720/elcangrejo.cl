export interface MenuItem {
  id: string
  name: string
  desc?: string
  price: string
  badge?: string
}

export const gohan: MenuItem[] = [
  { id: "gohan-pollo", name: "Gohan Pollo", desc: "Arroz, cebollín, queso y palta", price: "$5.500" },
  { id: "gohan-kamikama", name: "Gohan Kamikama", desc: "Arroz, cebollín, queso y palta", price: "$5.500" },
  { id: "gohan-churrasco", name: "Gohan Churrasco", desc: "Arroz, cebollín, queso y palta", price: "$6.000" },
  { id: "gohan-camaron", name: "Gohan Camarón", desc: "Arroz, cebollín, queso y palta", price: "$6.500" },
  { id: "gohan-salmon", name: "Gohan Salmón", desc: "Arroz, cebollín, queso y palta", price: "$7.000" },
  { id: "gohan-vegetariano", name: "Gohan Vegetariano", desc: "Arroz, cebollín, queso y palta", price: "$7.000" },
  { id: "gohan-extra", name: "Gohan Extra", desc: "Camarón + pollo + salmón · arroz, cebollín, queso y palta", price: "$8.000", badge: "ESPECIAL" },
]

export const hanrolls: MenuItem[] = [
  { id: "hr-pollo-queso", name: "Pollo Queso", price: "$3.000" },
  { id: "hr-kanikama-queso", name: "Kanikama Queso", price: "$3.000" },
  { id: "hr-churrasco-queso", name: "Churrasco Queso", price: "$3.500" },
  { id: "hr-pollo-palta", name: "Pollo Palta", price: "$3.500" },
  { id: "hr-pollo-queso-palta", name: "Pollo Queso Palta", price: "$3.500" },
  { id: "hr-pollo-queso-cebollin", name: "Pollo Queso Cebollín", price: "$3.500" },
  { id: "hr-kanikama-queso-palta", name: "Kanikama Queso Palta", price: "$3.500" },
  { id: "hr-kanikama-queso-cebollin", name: "Kanikama Queso Cebollín", price: "$3.500" },
  { id: "hr-churrasco-queso-palta", name: "Churrasco Queso Palta", price: "$4.000" },
  { id: "hr-churrasco-queso-cebollin", name: "Churrasco Queso Cebollín", price: "$4.000" },
  { id: "hr-camaron-queso-palta", name: "Camarón Queso Palta", price: "$4.000" },
  { id: "hr-camaron-queso-cebollin", name: "Camarón Queso Cebollín", price: "$4.000" },
  { id: "hr-champinon-queso-palta", name: "Champiñón Queso Palta", price: "$4.000" },
  { id: "hr-champinon-queso-cebollin", name: "Champiñón Queso Cebollín", price: "$4.000" },
  { id: "hr-palmito-queso-palta", name: "Palmito Queso Palta", price: "$4.000" },
  { id: "hr-palmito-queso-cebollin", name: "Palmito Queso Cebollín", price: "$4.000" },
  { id: "hr-choclillo-queso-palta", name: "Choclillo Queso Palta", price: "$4.000" },
  { id: "hr-choclillo-queso-cebollin", name: "Choclillo Queso Cebollín", price: "$4.000" },
  { id: "hr-salmon-queso-palta", name: "Salmón Queso Palta", price: "$4.500" },
  { id: "hr-salmon-queso-cebollin", name: "Salmón Queso Cebollín", price: "$4.500" },
]

export const piezas: MenuItem[] = [
  {
    id: "mix-20",
    name: "20 Piezas Mixtas",
    desc: "10 Envueltas palta (camarón, queso, cebollín) · 10 Fritas (pollo, queso, palta)",
    price: "$11.000",
  },
  {
    id: "mix-30",
    name: "30 Piezas Mixtas",
    desc: "10 Fritas (pollo queso cebollín) · 10 Envueltas sésamo (kanikama) · 10 Envueltas ciboulette (camarón queso palta)",
    price: "$14.000",
  },
  {
    id: "mix-40",
    name: "40 Piezas Mixtas",
    desc: "10 Fritas pollo · 10 Fritas camarón · 10 Envueltas palta (pollo) · 10 Envueltas queso (kanikama palta)",
    price: "$17.000",
  },
  {
    id: "mix-50",
    name: "50 Piezas Mixtas",
    desc: "10 Fritas pollo · 10 Fritas camarón · 10 Fritas kanikama · 10 Envueltas ciboulette · 10 Envueltas queso",
    price: "$19.000",
    badge: "POPULAR",
  },
  {
    id: "mix-60",
    name: "60 Piezas Mixtas",
    desc: "10 Fritas pollo · 10 Fritas camarón · 10 Fritas churrasco · 10 Envueltas palta · 10 Envueltas ciboulette · 10 Envueltas sésamo",
    price: "$22.000",
  },
  {
    id: "mix-80",
    name: "80 Piezas Mixtas",
    desc: "8 variedades distintas: fritas y envueltas en múltiples sabores",
    price: "$27.000",
  },
  {
    id: "mix-100",
    name: "100 Piezas Mixtas",
    desc: "10 variedades de fritas y envueltas — ideal para eventos y reuniones",
    price: "$32.000",
    badge: "EVENTO",
  },
]

export const snacks: MenuItem[] = [
  { id: "snack-camaron-furay", name: "Camarón Furay", desc: "6 unidades", price: "$5.000" },
  { id: "snack-salmon-furay", name: "Salmón Furay", desc: "6 unidades", price: "$5.000" },
  { id: "snack-palitos-queso", name: "Palitos de Queso", desc: "6 unidades", price: "$5.000" },
  { id: "snack-pollo-apanado", name: "Pollo Apanado", desc: "5 unidades", price: "$5.000" },
]

export const empanadas: MenuItem[] = [
  { id: "emp-queso", name: "Queso", price: "$2.000" },
  { id: "emp-pollo-queso", name: "Pollo Queso", price: "$2.500" },
  { id: "emp-camaron-queso", name: "Camarón Queso", price: "$2.500" },
  { id: "emp-champinon-queso", name: "Champiñón Queso", price: "$2.500" },
  { id: "emp-pollo-queso-choclo", name: "Pollo Queso Choclo", price: "$3.000" },
  { id: "emp-pollo-champinon-queso", name: "Pollo Champiñón Queso", price: "$3.000" },
]

export type CategoryKey = "gohan" | "hanroll" | "piezas" | "snacks" | "empanadas"

export const categories: { key: CategoryKey; label: string; emoji: string; items: MenuItem[] }[] = [
  { key: "piezas", label: "Piezas Mixtas", emoji: "🎁", items: piezas },
  { key: "gohan", label: "Gohan", emoji: "🍱", items: gohan },
  { key: "hanroll", label: "Han Roll", emoji: "🌀", items: hanrolls },
  { key: "snacks", label: "Snacks", emoji: "🍗", items: snacks },
  { key: "empanadas", label: "Empanadas", emoji: "🥟", items: empanadas },
]

export const allItems: MenuItem[] = [...gohan, ...hanrolls, ...piezas, ...snacks, ...empanadas]
