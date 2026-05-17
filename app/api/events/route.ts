import { supabaseServer } from "@/lib/supabase-server"
import { NextRequest, NextResponse } from "next/server"

const ALLOWED = ["page_visit", "order_sent", "cart_abandoned"]

export async function POST(req: NextRequest) {
  try {
    const { type, metadata } = await req.json()
    if (!ALLOWED.includes(type)) return NextResponse.json({ ok: true })
    await supabaseServer.from("events").insert({ type, metadata: metadata ?? {} })
  } catch { /* silent */ }
  return NextResponse.json({ ok: true })
}
