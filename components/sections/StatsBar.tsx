const items = [
  "🌀 HAN ROLLS",
  "🍱 GOHAN BOWL",
  "🎁 PIEZAS MIXTAS",
  "🥟 EMPANADAS FRITAS",
  "🍗 POLLO CRISPY",
  "🍟 PAPAS FRITAS",
  "🌊 SUSHI FRESCO",
  "🦀 SUSHI & CEVICHES",
]

export default function StatsBar() {
  const repeated = [...items, ...items]
  return (
    <div className="bg-primary overflow-hidden py-4 border-y border-primary-dark">
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="font-heading text-white text-lg tracking-widest mx-8 shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
