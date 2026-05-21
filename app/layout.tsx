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
    "Rolls, nigiris y sashimi frescos. Delivery en Paine y retiro en Villa Las Américas. Jueves a Sábado 17:30–21:30.",
  openGraph: {
    title: "El Cangrejo",
    description: "El sushi más fresco de Paine. Jue–Sáb 17:30 a 21:30.",
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
