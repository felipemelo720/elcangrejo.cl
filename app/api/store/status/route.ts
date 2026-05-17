import { supabaseServer } from "@/lib/supabase-server"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const { data } = await supabaseServer
    .from("store_status")
    .select("is_open, delivery_enabled")
    .eq("id", 1)
    .single()

  return NextResponse.json({
    is_open: data?.is_open ?? false,
    delivery_enabled: data?.delivery_enabled ?? true,
  })
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  if (cookieStore.get("admin_session")?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { is_open } = await req.json()

  await supabaseServer
    .from("store_status")
    .upsert({ id: 1, is_open, updated_at: new Date().toISOString() })

  return NextResponse.json({ ok: true })
}
