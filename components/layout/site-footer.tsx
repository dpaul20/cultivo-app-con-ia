import Link from "next/link"
import type { Dictionary } from "@/app/[lang]/dictionaries"
import { AppLogo } from "@/components/custom/app-logo"

export default function SiteFooter({
  dict,
  lang = "en",
}: {
  dict?: Dictionary
  lang?: string
}) {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <AppLogo lang={lang || "en"} />
          <p className="text-sm text-muted-foreground">
            {dict?.footer.rights || "© 2025 CultivAI. All rights reserved."}
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="#" className="text-sm text-muted-foreground hover:underline">
            {dict?.footer.terms || "Terms"}
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:underline">
            {dict?.footer.privacy || "Privacy"}
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:underline">
            {dict?.footer.contact || "Contact"}
          </Link>
        </div>
      </div>
    </footer>
  )
}

