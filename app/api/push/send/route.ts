import { supabaseServer } from "@/lib/supabase-server"
import webpush from "@/lib/webpush"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  if (cookieStore.get("admin_session")?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { title, body } = await req.json()

  const { data: subscriptions } = await supabaseServer
    .from("push_subscriptions")
    .select("*")

  if (!subscriptions || subscriptions.length === 0) {
    return NextResponse.json({ sent: 0 })
  }

  const results = await Promise.allSettled(
    subscriptions.map((sub) =>
      webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        JSON.stringify({ title, body, url: "/" })
      )
    )
  )

  // Remove expired/invalid subscriptions (410 Gone)
  const expired = subscriptions.filter((_, i) => {
    const r = results[i]
    if (r.status === "rejected") {
      const status = (r.reason as { statusCode?: number })?.statusCode
      return status === 410 || status === 404
    }
    return false
  })

  if (expired.length > 0) {
    await supabaseServer
      .from("push_subscriptions")
      .delete()
      .in("endpoint", expired.map((s) => s.endpoint))
  }

  const sent = results.filter((r) => r.status === "fulfilled").length
  return NextResponse.json({ sent })
}
