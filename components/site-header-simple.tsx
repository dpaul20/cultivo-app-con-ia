"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "@/components/language-switcher"
import type { Dictionary } from "@/app/[lang]/dictionaries"
// Actualizar la importación del AppLogo
import { AppLogo } from "@/components/custom/app-logo"

export default function SiteHeader({
  lang,
  dict,
}: {
  lang: string
  dict?: Dictionary
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <AppLogo lang={lang} />
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

            {/* Botón de menú móvil */}
            <Button
              variant="default"
              size="sm"
              className="md:hidden flex items-center gap-1"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-4 w-4" />
              <span>Menú</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Overlay del menú móvil */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="container flex flex-col h-full">
            <div className="flex items-center justify-between py-4">
              <AppLogo lang={lang} />
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="flex flex-col gap-6 py-8">
              <Link href={`/${lang}`} className="text-xl font-medium" onClick={() => setIsMenuOpen(false)}>
                {dict?.navigation.home || "Home"}
              </Link>
              <Link
                href={`/${lang}/garden-planner`}
                className="text-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {dict?.navigation.gardenPlanner || "Garden Planner"}
              </Link>
              <Link
                href={`/${lang}/growth-tracker`}
                className="text-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {dict?.navigation.growthTracker || "Growth Tracker"}
              </Link>
              <Link
                href={`/${lang}/planting-calendar`}
                className="text-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {dict?.navigation.calendar || "Planting Calendar"}
              </Link>
            </nav>

            <div className="mt-auto pb-8">
              <Button className="w-full" size="lg" onClick={() => setIsMenuOpen(false)}>
                {dict?.navigation.signIn || "Sign In"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

