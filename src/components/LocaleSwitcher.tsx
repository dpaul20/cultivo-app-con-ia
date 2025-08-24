import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "es" : "en";

  // Reemplaza el prefijo de idioma en la ruta actual
  const getOtherLocalePath = () => {
    if (!pathname) return "/" + otherLocale;
    const segments = pathname.split("/");
    if (segments[1] === "en" || segments[1] === "es") {
      segments[1] = otherLocale;
      return segments.join("/") || "/" + otherLocale;
    }
    // fallback: si no hay prefijo, lo agrega
    return "/" + otherLocale + pathname;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Globe className="h-4 w-4" />
          <span>{t("label")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href={getOtherLocalePath()} prefetch={false}>
            {t("locale", { locale: otherLocale })}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
