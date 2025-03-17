import Link from "next/link"
import { Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "@/components/language-switcher"
import MobileMenu from "./mobile-menu"
import type { Dictionary } from "@/app/[lang]/dictionaries"

export default function SiteHeader({
  lang,
  dict,
}: {
  lang: string
  dict?: Dictionary
}) {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Sprout className="h-6 w-6 text-green-600" />
          <span className="text-lg font-bold">CultivAI</span>
        </div>

        {/* Menú de escritorio */}
        <nav className="hidden md:flex gap-6">
          <Link href={`/${lang}`} className="text-sm font-medium">
            {dict?.navigation.home || "Home"}
          </Link>
          <Link href={`/${lang}/garden-planner`} className="text-sm font-medium">
            {dict?.navigation.gardenPlanner || "Garden Planner"}
          </Link>
          <Link href={`/${lang}/growth-tracker`} className="text-sm font-medium">
            {dict?.navigation.growthTracker || "Growth Tracker"}
          </Link>
          <Link href={`/${lang}/planting-calendar`} className="text-sm font-medium">
            {dict?.navigation.calendar || "Planting Calendar"}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher lang={lang} />
          <Button variant="outline" size="sm" className="hidden md:flex">
            {dict?.navigation.signIn || "Sign In"}
          </Button>

          {/* Menú móvil */}
          <MobileMenu lang={lang} dict={dict} />
        </div>
      </div>
    </header>
  )
}

