import { format, formatRelative, formatDistance } from "date-fns"
import { es, enUS } from "date-fns/locale"

// Función para obtener el locale correcto según el idioma
export function getLocale(lang: string) {
  switch (lang) {
    case "es":
      return es
    case "en":
    default:
      return enUS
  }
}

// Formatear fecha según el idioma
export function formatDate(date: Date, formatStr: string, lang: string): string {
  return format(date, formatStr, {
    locale: getLocale(lang),
  })
}

// Formatear fecha relativa según el idioma (ej: "hace 2 días", "2 days ago")
export function formatRelativeDate(date: Date, baseDate: Date, lang: string): string {
  return formatRelative(date, baseDate, {
    locale: getLocale(lang),
  })
}

// Formatear distancia de tiempo según el idioma (ej: "en 3 horas", "in 3 hours")
export function formatDistanceDate(date: Date, baseDate: Date, lang: string): string {
  return formatDistance(date, baseDate, {
    locale: getLocale(lang),
    addSuffix: true,
  })
}

// Formatear número según el idioma
export function formatNumber(num: number, lang: string): string {
  return new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-US").format(num)
}

// Formatear moneda según el idioma
export function formatCurrency(amount: number, lang: string): string {
  return new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-US", {
    style: "currency",
    currency: lang === "es" ? "EUR" : "USD",
  }).format(amount)
}

