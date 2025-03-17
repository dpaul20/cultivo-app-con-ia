"use client"

import { useState } from "react"
import Link from "next/link"
import { Sprout, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/app/[lang]/dictionaries"

export default function MobileMenu({
  lang,
  dict,
}: {
  lang: string
  dict?: Dictionary
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="relative z-20 flex items-center gap-1"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only md:not-sr-only">Menu</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="container h-full flex flex-col">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-2">
                <Sprout className="h-6 w-6 text-green-600" />
                <span className="text-lg font-bold">CultivAI</span>
              </div>
              <Button variant="outline" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            <nav className="flex flex-col gap-6 py-8">
              <Link href={`/${lang}`} className="text-xl font-medium" onClick={() => setIsOpen(false)}>
                {dict?.navigation.home || "Home"}
              </Link>
              <Link href={`/${lang}/garden-planner`} className="text-xl font-medium" onClick={() => setIsOpen(false)}>
                {dict?.navigation.gardenPlanner || "Garden Planner"}
              </Link>
              <Link href={`/${lang}/growth-tracker`} className="text-xl font-medium" onClick={() => setIsOpen(false)}>
                {dict?.navigation.growthTracker || "Growth Tracker"}
              </Link>
              <Link
                href={`/${lang}/planting-calendar`}
                className="text-xl font-medium"
                onClick={() => setIsOpen(false)}
              >
                {dict?.navigation.calendar || "Planting Calendar"}
              </Link>
            </nav>

            <div className="mt-auto pb-8">
              <Button className="w-full" size="lg" onClick={() => setIsOpen(false)}>
                {dict?.navigation.signIn || "Sign In"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

