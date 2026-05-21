import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

const ALLOWED = ["page_visit", "order_sent", "cart_abandoned"]

export async function POST(req: NextRequest) {
  try {
    const { type, metadata } = await req.json()
    if (!ALLOWED.includes(type)) return NextResponse.json({ ok: true })
    await db().execute({
      sql: "INSERT INTO events (type, metadata, created_at) VALUES (?, ?, ?)",
      args: [type, JSON.stringify(metadata ?? {}), new Date().toISOString()],
    })
  } catch { /* silent */ }
  return NextResponse.json({ ok: true })
}
