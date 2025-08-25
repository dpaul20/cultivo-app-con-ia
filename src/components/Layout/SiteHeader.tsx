"use client";

import { useState } from "react";
import NavigationLink from "@/components/NavigationLink";
import { useTranslations } from "next-intl";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
// Actualizar la importación del AppLogo
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { AppLogo } from "../Common";

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("Navigation");
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <AppLogo />
          </div>

          {/* Menú de escritorio */}
          <nav className="hidden md:flex gap-6">
            <NavigationLink href="/" className="text-sm font-medium">
              {t("home")}
            </NavigationLink>
            <NavigationLink
              href="/garden-planner"
              className="text-sm font-medium"
            >
              {t("gardenPlanner")}
            </NavigationLink>
            <NavigationLink
              href="/growth-tracker"
              className="text-sm font-medium"
            >
              {t("growthTracker")}
            </NavigationLink>
            <NavigationLink
              href="/planting-calendar"
              className="text-sm font-medium"
            >
              {t("calendar")}
            </NavigationLink>
            <NavigationLink
              href="/harvest-calendar"
              className="text-sm font-medium"
            >
              {t("harvestCalendar")}
            </NavigationLink>
          </nav>

          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <Button variant="outline" size="sm" className="hidden md:flex">
              {t("signIn")}
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
              <AppLogo />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="flex flex-col gap-6 py-8">
              <NavigationLink
                href="/"
                className="text-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("home")}
              </NavigationLink>
              <NavigationLink
                href="/garden-planner"
                className="text-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("gardenPlanner")}
              </NavigationLink>
              <NavigationLink
                href="/growth-tracker"
                className="text-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("growthTracker")}
              </NavigationLink>
              <NavigationLink
                href="/planting-calendar"
                className="text-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("calendar")}
              </NavigationLink>
              <NavigationLink
                href="/harvest-calendar"
                className="text-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("harvestCalendar")}
              </NavigationLink>
            </nav>

            <div className="mt-auto pb-8">
              <Button
                className="w-full"
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("signIn")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
