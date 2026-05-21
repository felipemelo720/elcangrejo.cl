import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Bebas_Neue } from "next/font/google"
import "./globals.css"
import CartShell from "@/components/CartShell"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
})

export const metadata: Metadata = {
  title: "El Cangrejo | Sushi en Paine",
  description:
    "Rolls, nigiris y sashimi frescos. Delivery en Paine y retiro en Aracena y Monkeberg 864. Lunes a Sábado 16:00–00:00.",
  openGraph: {
    title: "El Cangrejo",
    description: "El sushi más fresco de Paine. Lun–Sáb 16:00 a 00:00.",
    siteName: "El Cangrejo",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${bebasNeue.variable} scroll-smooth`}>
      <body className="antialiased" suppressHydrationWarning>
        <CartShell>{children}</CartShell>
      </body>
    </html>
  )
}
