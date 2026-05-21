import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const res = await db().execute(
    "SELECT is_open, delivery_enabled, unavailable_items FROM store_status WHERE id = 1"
  )
  const row = res.rows[0]

  return NextResponse.json({
    is_open: row ? Boolean(row.is_open) : false,
    delivery_enabled: row ? Boolean(row.delivery_enabled) : true,
    sold_out_items: row ? (JSON.parse((row.unavailable_items as string) ?? "[]") as string[]) : [],
  })
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  if (cookieStore.get("admin_session")?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { is_open } = await req.json()

  await db().execute({
    sql: `INSERT INTO store_status (id, is_open, updated_at) VALUES (1, ?, ?)
          ON CONFLICT(id) DO UPDATE SET is_open = excluded.is_open, updated_at = excluded.updated_at`,
    args: [is_open ? 1 : 0, new Date().toISOString()],
  })

  return NextResponse.json({ ok: true })
}
