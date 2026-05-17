const BASE = "https://graph.facebook.com/v19.0"

export async function sendWhatsAppMessage(to: string, text: string) {
  const res = await fetch(`${BASE}/${process.env.WHATSAPP_PHONE_ID}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: text },
    }),
  })
  return res.ok
}
