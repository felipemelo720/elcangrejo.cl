"use server"

import { cookies } from "next/headers"
import { supabaseServer } from "@/lib/supabase-server"
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
    await supabaseServer.from("events").insert({ type, metadata })
  } catch { /* silent */ }
}

export async function toggleStore(isOpen: boolean) {
  const { error } = await supabaseServer
    .from("store_status")
    .upsert(
      { id: 1, is_open: isOpen, updated_at: new Date().toISOString() },
      { onConflict: "id" }
    )

  if (error) throw new Error(error.message)

  if (isOpen) {
    try { await trackEventServer("store_opened_silent") } catch { /* silent */ }
  }

  revalidatePath("/admin")
  revalidatePath("/")
  revalidatePath("/api/store/status")
  redirect("/admin")
}

export async function toggleDelivery(enabled: boolean) {
  const { error } = await supabaseServer
    .from("store_status")
    .upsert(
      { id: 1, delivery_enabled: enabled, updated_at: new Date().toISOString() },
      { onConflict: "id" }
    )

  if (error) throw new Error(error.message)

  revalidatePath("/admin")
  revalidatePath("/")
  revalidatePath("/api/store/status")
  redirect("/admin")
}

export async function toggleSoldOut(itemId: string, soldOut: boolean) {
  const { data } = await supabaseServer
    .from("store_status")
    .select("unavailable_items")
    .eq("id", 1)
    .single()

  const current: string[] = (data as any)?.unavailable_items ?? []
  const updated = soldOut
    ? [...new Set([...current, itemId])]
    : current.filter((id: string) => id !== itemId)

  const { error } = await supabaseServer
    .from("store_status")
    .upsert(
      { id: 1, unavailable_items: updated, updated_at: new Date().toISOString() },
      { onConflict: "id" }
    )

  if (error) throw new Error(error.message)

  revalidatePath("/admin")
  revalidatePath("/")
  revalidatePath("/api/store/status")
}

export async function sendPush(title: string, body: string) {
  const jar = await cookies()
  const token = jar.get(COOKIE)?.value

  const { count } = await supabaseServer
    .from("push_subscriptions")
    .select("*", { count: "exact", head: true })

  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/api/push/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${COOKIE}=${token}`,
    },
    body: JSON.stringify({ title, body }),
  })

  await trackEventServer("push_sent", { title, recipients: count ?? 0 })
}

export async function getAdminData() {
  const { data: statusData } = await supabaseServer
    .from("store_status")
    .select("is_open, delivery_enabled, unavailable_items")
    .eq("id", 1)
    .single()

  return {
    isOpen: statusData?.is_open ?? false,
    deliveryEnabled: (statusData as any)?.delivery_enabled ?? true,
    soldOutItems: (statusData as any)?.unavailable_items ?? [],
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

  const { data: events } = await supabaseServer
    .from("events")
    .select("type, created_at")
    .gte("created_at", since)

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

  for (const ev of events ?? []) {
    const age = Math.floor((Date.now() - new Date(ev.created_at).getTime()) / (24 * 60 * 60 * 1000))
    const idx = 6 - age
    if (idx >= 0 && idx < 7 && CHART_TYPES.includes(ev.type as (typeof CHART_TYPES)[number])) {
      days[idx][ev.type as (typeof CHART_TYPES)[number]]++
    }
  }

  const count = (type: string) => events?.filter((e) => e.type === type).length ?? 0

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
