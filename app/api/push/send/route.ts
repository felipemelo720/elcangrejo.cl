import { db } from "@/lib/db"
import webpush from "@/lib/webpush"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

type PushSub = { endpoint: string; p256dh: string; auth: string }

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  if (cookieStore.get("admin_session")?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { title, body } = await req.json()

  const res = await db().execute("SELECT endpoint, p256dh, auth FROM push_subscriptions")
  const subscriptions = res.rows as unknown as PushSub[]

  if (subscriptions.length === 0) {
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
    const placeholders = expired.map(() => "?").join(",")
    await db().execute({
      sql: `DELETE FROM push_subscriptions WHERE endpoint IN (${placeholders})`,
      args: expired.map((s) => s.endpoint),
    })
  }

  const sent = results.filter((r) => r.status === "fulfilled").length
  return NextResponse.json({ sent })
}
