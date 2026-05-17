self.addEventListener("push", function (event) {
  const data = event.data?.json() ?? {}
  const title = data.title || "Arroz en Wok"
  const options = {
    body: data.body || "",
    icon: "/logoarrrozenwok.jpg",
    badge: "/logoarrrozenwok.jpg",
    data: { url: data.url || "/" },
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener("notificationclick", function (event) {
  event.notification.close()
  event.waitUntil(clients.openWindow(event.notification.data.url))
})
