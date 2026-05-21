import webpush from "web-push"

let configured = false

function getWebpush() {
  if (!configured) {
    webpush.setVapidDetails(
      "mailto:admin@arrozenwok.cl",
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      process.env.VAPID_PRIVATE_KEY!
    )
    configured = true
  }
  return webpush
}

export default new Proxy(webpush, {
  get(_target, prop) {
    return (getWebpush() as unknown as Record<string | symbol, unknown>)[prop]
  },
})
