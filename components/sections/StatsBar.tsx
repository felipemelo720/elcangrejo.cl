const row1 = [
  "🌀 HAN ROLLS",
  "🍱 GOHAN BOWL",
  "🎁 PIEZAS MIXTAS",
  "🥟 EMPANADAS FRITAS",
  "🍗 POLLO CRISPY",
  "🍟 PAPAS FRITAS",
  "🌊 SUSHI FRESCO",
  "🦀 SUSHI & CEVICHES",
]

const row2 = [
  "🦀 SUSHI & CEVICHES",
  "🌊 SUSHI FRESCO",
  "🍟 PAPAS FRITAS",
  "🍗 POLLO CRISPY",
  "🥟 EMPANADAS FRITAS",
  "🎁 PIEZAS MIXTAS",
  "🍱 GOHAN BOWL",
  "🌀 HAN ROLLS",
]

function Row({ items, cls }: { items: string[]; cls: string }) {
  const repeated = [...items, ...items]
  return (
    <div className="overflow-hidden py-2.5">
      <div className={`flex whitespace-nowrap ${cls}`}>
        {repeated.map((item, i) => (
          <span key={i} className="shrink-0 flex items-center gap-4">
            <span className="font-heading text-sm tracking-widest">{item}</span>
            <span className="text-primary/40 text-[10px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function StatsBar() {
  return (
    <div className="bg-bg border-y border-white/8 overflow-hidden py-1">
      <div className="text-white/45">
        <Row items={row1} cls="animate-marquee" />
      </div>
      <div className="h-px bg-white/5" />
      <div className="text-white/20">
        <Row items={row2} cls="animate-marquee-reverse" />
      </div>
    </div>
  )
}
