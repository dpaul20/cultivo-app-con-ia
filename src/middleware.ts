import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

// Idiomas que soportamos
const locales = ["en", "es"]
const defaultLocale = "es"

// Función para obtener el idioma preferido del usuario
function getLocale(request: NextRequest): string {
  // Negotiator espera un objeto con headers
  const headers = new Headers(request.headers)
  const acceptLanguage = headers.get("accept-language") || ""

  // Crear un objeto Negotiator con los headers
  const negotiatorHeaders = { "accept-language": acceptLanguage }
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  // Usar intl-localematcher para encontrar el mejor idioma
  return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  // Obtener la ruta actual
  const pathname = request.nextUrl.pathname

  // Verificar si estamos en la raíz
  if (pathname === "/") {
    // Redirigir a la ruta con el locale detectado
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  // Verificar si la ruta ya tiene un locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  // Si ya tiene un locale, no hacer nada
  if (pathnameHasLocale) return NextResponse.next()

  // Si no tiene locale y no es una ruta especial, redirigir a la ruta con el locale detectado
  if (
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api") &&
    !pathname.includes("/favicon.ico") &&
    !pathname.includes(".")
  ) {
    const locale = getLocale(request)
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Excluir rutas internas de Next.js
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
}

