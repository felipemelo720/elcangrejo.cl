import { supabaseServer } from "@/lib/supabase-server"
import { NextRequest, NextResponse } from "next/server"

// Meta webhook verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 })
  }
  return NextResponse.json({ error: "Forbidden" }, { status: 403 })
}

// Incoming messages — save sender phone as subscriber
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const messages = body.entry?.[0]?.changes?.[0]?.value?.messages
    if (!messages?.length) return NextResponse.json({ ok: true })

    for (const msg of messages) {
      const phone = msg.from as string | undefined
      if (!phone) continue
      await supabaseServer
        .from("whatsapp_subscribers")
        .upsert({ phone }, { onConflict: "phone" })
    }
  } catch {
    // Meta requires 200 always
  }

  return NextResponse.json({ ok: true })
}
