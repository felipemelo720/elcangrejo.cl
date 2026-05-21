"use server"

import { cookies } from "next/headers"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const COOKIE = "admin_session"

export async function login(formData: FormData) {
  const password = formData.get("password") as string
  if (password === process.env.ADMIN_PASSWORD) {
    const jar = await cookies()
    jar.set(COOKIE, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      sameSite: "strict",
      path: "/",
    })
  }
}

export async function logout() {
  const jar = await cookies()
  jar.delete(COOKIE)
}

export async function trackEventServer(type: string, metadata: Record<string, unknown> = {}) {
  try {
    await db().execute({
      sql: "INSERT INTO events (type, metadata, created_at) VALUES (?, ?, ?)",
      args: [type, JSON.stringify(metadata), new Date().toISOString()],
    })
  } catch { /* silent */ }
}

export async function toggleStore(isOpen: boolean) {
  await db().execute({
    sql: `INSERT INTO store_status (id, is_open, updated_at) VALUES (1, ?, ?)
          ON CONFLICT(id) DO UPDATE SET is_open = excluded.is_open, updated_at = excluded.updated_at`,
    args: [isOpen ? 1 : 0, new Date().toISOString()],
  })

  if (isOpen) {
    try { await trackEventServer("store_opened_silent") } catch { /* silent */ }
  }

  revalidatePath("/admin")
  revalidatePath("/")
  revalidatePath("/api/store/status")
  redirect("/admin")
}

export async function toggleDelivery(enabled: boolean) {
  await db().execute({
    sql: `INSERT INTO store_status (id, delivery_enabled, updated_at) VALUES (1, ?, ?)
          ON CONFLICT(id) DO UPDATE SET delivery_enabled = excluded.delivery_enabled, updated_at = excluded.updated_at`,
    args: [enabled ? 1 : 0, new Date().toISOString()],
  })

  revalidatePath("/admin")
  revalidatePath("/")
  revalidatePath("/api/store/status")
  redirect("/admin")
}

export async function toggleSoldOut(itemId: string, soldOut: boolean) {
  const res = await db().execute("SELECT unavailable_items FROM store_status WHERE id = 1")
  const current: string[] = JSON.parse((res.rows[0]?.unavailable_items as string) ?? "[]")
  const updated = soldOut
    ? [...new Set([...current, itemId])]
    : current.filter((id: string) => id !== itemId)

  await db().execute({
    sql: `INSERT INTO store_status (id, unavailable_items, updated_at) VALUES (1, ?, ?)
          ON CONFLICT(id) DO UPDATE SET unavailable_items = excluded.unavailable_items, updated_at = excluded.updated_at`,
    args: [JSON.stringify(updated), new Date().toISOString()],
  })

  revalidatePath("/admin")
  revalidatePath("/")
  revalidatePath("/api/store/status")
}

export async function sendPush(title: string, body: string) {
  const jar = await cookies()
  const token = jar.get(COOKIE)?.value

  const countRes = await db().execute("SELECT COUNT(*) AS c FROM push_subscriptions")
  const count = Number(countRes.rows[0]?.c ?? 0)

  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/api/push/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${COOKIE}=${token}`,
    },
    body: JSON.stringify({ title, body }),
  })

  await trackEventServer("push_sent", { title, recipients: count })
}

export async function getAdminData() {
  const res = await db().execute(
    "SELECT is_open, delivery_enabled, unavailable_items FROM store_status WHERE id = 1"
  )
  const row = res.rows[0]

  return {
    isOpen: row ? Boolean(row.is_open) : false,
    deliveryEnabled: row ? Boolean(row.delivery_enabled) : true,
    soldOutItems: row ? (JSON.parse((row.unavailable_items as string) ?? "[]") as string[]) : [],
  }
}

export type DayStat = {
  label: string
  page_visit: number
  order_sent: number
  cart_abandoned: number
}

export type StatsData = {
  days: DayStat[]
  totals: {
    page_visit: number
    order_sent: number
    cart_abandoned: number
    push_sent: number
    wa_broadcast_sent: number
    wa_order_received: number
  }
}

export async function getStats(): Promise<StatsData> {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const res = await db().execute({
    sql: "SELECT type, created_at FROM events WHERE created_at >= ?",
    args: [since],
  })
  const events = res.rows.map((r) => ({
    type: String(r.type),
    created_at: String(r.created_at),
  }))

  const days: DayStat[] = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000)
    return {
      label: d.toLocaleDateString("es-CL", { weekday: "short", day: "numeric" }),
      page_visit: 0,
      order_sent: 0,
      cart_abandoned: 0,
    }
  })

  const CHART_TYPES = ["page_visit", "order_sent", "cart_abandoned"] as const

  for (const ev of events) {
    const age = Math.floor((Date.now() - new Date(ev.created_at).getTime()) / (24 * 60 * 60 * 1000))
    const idx = 6 - age
    if (idx >= 0 && idx < 7 && CHART_TYPES.includes(ev.type as (typeof CHART_TYPES)[number])) {
      days[idx][ev.type as (typeof CHART_TYPES)[number]]++
    }
  }

  const count = (type: string) => events.filter((e) => e.type === type).length

  return {
    days,
    totals: {
      page_visit: count("page_visit"),
      order_sent: count("order_sent"),
      cart_abandoned: count("cart_abandoned"),
      push_sent: count("push_sent"),
      wa_broadcast_sent: count("wa_broadcast_sent"),
      wa_order_received: count("wa_order_received"),
    },
  }
}
