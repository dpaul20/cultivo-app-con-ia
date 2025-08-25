import Link from "next/link"
import { useTranslations } from "next-intl";
import { AppLogo } from "../Common";


export default function SiteFooter() {
  const t = useTranslations("footer");
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <AppLogo />
          <p className="text-sm text-muted-foreground">
              {t('rights')}
          </p>
        </div>
        <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              {t('terms')}
          </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              {t('privacy')}
          </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              {t('contact')}
          </Link>
        </div>
      </div>
    </footer>
  )
}

