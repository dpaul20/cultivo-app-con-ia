import { redirect } from "next/navigation"

// Esta página redirige a la versión en español por defecto
export default function Home() {
  redirect("/es")
}

