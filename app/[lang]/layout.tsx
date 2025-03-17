import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CultivAI - Crop Association Assistant",
  description: "AI-powered crop association assistant for better gardening",
}

export async function generateStaticParams() {
  // Genera páginas estáticas para los idiomas soportados
  return [{ lang: "en" }, { lang: "es" }]
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

