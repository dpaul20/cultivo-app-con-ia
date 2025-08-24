"use client"

import { usePathname, useRouter } from "next/navigation"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function LanguageSwitcher({
  lang,
  labels = { en: "English", es: "Español" },
}: {
  lang: string
  labels?: Record<string, string>
}) {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (newLang: string) => {
    // Obtener la ruta sin el parámetro de idioma actual
    const segments = pathname.split("/")
    segments[1] = newLang
    const newPath = segments.join("/")

    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Globe className="h-4 w-4" />
          <span>{labels[lang as keyof typeof labels] || labels.en}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage("en")}>{labels.en}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage("es")}>{labels.es}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

