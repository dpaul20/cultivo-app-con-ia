import { Sprout } from "lucide-react"
import Link from "next/link"

export function AppLogo({ lang }: { lang: string }) {
  return (
    <Link href={`/${lang}`} className="flex items-center gap-2">
      <div className="relative w-8 h-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-green-100 dark:bg-green-900 rounded-full"></div>
        <Sprout className="h-5 w-5 text-green-600 dark:text-green-400 relative z-10" />
      </div>
      <span className="text-lg font-bold">CultivAI</span>
    </Link>
  )
}

