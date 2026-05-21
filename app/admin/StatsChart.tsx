import type { DayStat } from "./actions"

const SERIES = [
  { key: "page_visit",      label: "Visitas",           color: "bg-blue-400" },
  { key: "order_sent",      label: "Pedidos",           color: "bg-green-400" },
  { key: "cart_abandoned",  label: "Carritos abandonados", color: "bg-orange-400" },
] as const

export default function StatsChart({ days }: { days: DayStat[] }) {
  const max = Math.max(
    1,
    ...days.flatMap((d) => SERIES.map((s) => d[s.key]))
  )

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-sm ${s.color}`} />
            <span className="text-white/50 text-xs" style={{ fontFamily: "var(--font-inter)" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Bars */}
      <div className="flex items-stretch gap-2 h-32">
        {days.map((day) => (
          <div key={day.label} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex flex-col-reverse gap-0.5 flex-1 justify-start items-center overflow-hidden">
              {SERIES.map((s) => {
                const h = Math.round((day[s.key] / max) * 100)
                return h > 0 ? (
                  <div
                    key={s.key}
                    className={`w-full rounded-sm ${s.color} opacity-80`}
                    style={{ height: `${h}%` }}
                    title={`${s.label}: ${day[s.key]}`}
                  />
                ) : null
              })}
            </div>
            <span className="text-white/30 text-[10px] text-center leading-tight" style={{ fontFamily: "var(--font-inter)" }}>
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
