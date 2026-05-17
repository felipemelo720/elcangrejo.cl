"use server"

import { cookies } from "next/headers"
import { supabaseServer } from "@/lib/supabase-server"
import { sendWhatsAppMessage } from "@/lib/whatsapp"
import { revalidatePath } from "next/cache"

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

export async function toggleStore(isOpen: boolean) {
  await supabaseServer
    .from("store_status")
    .upsert({ id: 1, is_open: isOpen, updated_at: new Date().toISOString() })

  if (isOpen) {
    const msg = "¡Arroz en Wok está abierto! 🍜\nHaz tu pedido ahora. Cerramos a las 21:30 hrs.\nhttps://wa.me/56931358884"

    await Promise.all([
      sendPush("¡Arroz en Wok está abierto! 🍜", "Haz tu pedido ahora. Cerramos a las 21:30 hrs."),
      sendWhatsAppBroadcast(msg),
    ])
  }

  revalidatePath("/admin")
}

export async function sendPush(title: string, body: string) {
  const jar = await cookies()
  const token = jar.get(COOKIE)?.value

  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/api/push/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${COOKIE}=${token}`,
    },
    body: JSON.stringify({ title, body }),
  })
}

export async function sendWhatsAppBroadcast(text: string) {
  const { data: subscribers } = await supabaseServer
    .from("whatsapp_subscribers")
    .select("phone")

  if (!subscribers?.length) return

  await Promise.allSettled(
    subscribers.map((s) => sendWhatsAppMessage(s.phone, text))
  )
}

export async function getAdminData() {
  const [statusRes, pushCountRes, waCountRes] = await Promise.all([
    supabaseServer.from("store_status").select("is_open").eq("id", 1).single(),
    supabaseServer.from("push_subscriptions").select("*", { count: "exact", head: true }),
    supabaseServer.from("whatsapp_subscribers").select("*", { count: "exact", head: true }),
  ])

  return {
    isOpen: statusRes.data?.is_open ?? false,
    subscriberCount: pushCountRes.count ?? 0,
    waSubscriberCount: waCountRes.count ?? 0,
  }
}
