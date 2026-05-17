import { supabaseServer } from "@/lib/supabase-server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const subscription = await req.json()
  const { endpoint, keys } = subscription

  if (!endpoint || !keys?.p256dh || !keys?.auth) {
    return NextResponse.json({ error: "Invalid subscription" }, { status: 400 })
  }

  await supabaseServer
    .from("push_subscriptions")
    .upsert({ endpoint, p256dh: keys.p256dh, auth: keys.auth })

  return NextResponse.json({ ok: true })
}
