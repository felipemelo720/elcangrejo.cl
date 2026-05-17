import { cookies } from "next/headers"
import { login, logout, toggleStore, sendPush, getAdminData } from "./actions"

export default async function AdminPage() {
  const jar = await cookies()
  const isAuth = jar.get("admin_session")?.value === "authenticated"

  if (!isAuth) {
    return (
      <main className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-surface border border-white/10 rounded-2xl p-8">
          <h1 className="font-heading text-4xl text-white mb-2">ADMIN</h1>
          <p className="text-white/40 text-sm mb-8" style={{ fontFamily: "var(--font-inter)" }}>
            Arroz en Wok — Panel de control
          </p>
          <form action={login} className="space-y-4">
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              required
              className="w-full bg-card border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            />
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
    )
  }

  const { isOpen, subscriberCount, waSubscriberCount } = await getAdminData()

  return (
    <main className="min-h-screen bg-bg px-4 py-12">
      <div className="max-w-lg mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-4xl text-white">ADMIN</h1>
            <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
              Arroz en Wok
            </p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-white/40 hover:text-white text-sm border border-white/10 hover:border-white/30 px-4 py-2 rounded-full transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Cerrar sesión
            </button>
          </form>
        </div>

        {/* Store status */}
        <div className="bg-surface border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                Estado del negocio
              </p>
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${isOpen ? "bg-green-400" : "bg-red-500"}`} />
                <span className="font-heading text-2xl text-white">
                  {isOpen ? "ABIERTO" : "CERRADO"}
                </span>
              </div>
            </div>
            <div className="text-white/30 text-xs text-right space-y-1" style={{ fontFamily: "var(--font-inter)" }}>
              <p>{subscriberCount} push · {waSubscriberCount} WA</p>
              <p>recibirán notificación</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <form action={toggleStore.bind(null, true)}>
              <button
                type="submit"
                disabled={isOpen}
                className="w-full bg-green-500/20 hover:bg-green-500/30 disabled:opacity-40 disabled:cursor-not-allowed border border-green-500/40 text-green-400 font-bold py-3 rounded-xl transition-colors text-sm"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                🟢 Abrir negocio
              </button>
            </form>
            <form action={toggleStore.bind(null, false)}>
              <button
                type="submit"
                disabled={!isOpen}
                className="w-full bg-red-500/20 hover:bg-red-500/30 disabled:opacity-40 disabled:cursor-not-allowed border border-red-500/40 text-red-400 font-bold py-3 rounded-xl transition-colors text-sm"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                🔴 Cerrar negocio
              </button>
            </form>
          </div>
        </div>

        {/* Custom notification */}
        <div className="bg-surface border border-white/10 rounded-2xl p-6 space-y-4">
          <p className="text-white/40 text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-inter)" }}>
            Enviar notificación manual
          </p>
          <form
            action={async (fd: FormData) => {
              "use server"
              const title = fd.get("title") as string
              const body = fd.get("body") as string
              if (title) await sendPush(title, body)
            }}
            className="space-y-3"
          >
            <input
              name="title"
              type="text"
              placeholder="Título"
              required
              defaultValue="¡Arroz en Wok!"
              className="w-full bg-card border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            />
            <input
              name="body"
              type="text"
              placeholder="Mensaje"
              defaultValue="Ya estamos abiertos. Haz tu pedido ahora 🍜"
              className="w-full bg-card border border-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            />
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl transition-colors text-sm"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Enviar notificación
            </button>
          </form>
        </div>

      </div>
    </main>
  )
}
