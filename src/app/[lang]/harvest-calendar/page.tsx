
import { getDictionary } from "../dictionaries"
import SiteHeader from "@/components/layout/site-header-simple"
import SiteFooter from "@/components/layout/site-footer"
import HarvestCalendarApp from "@/components/harvest-calendar/harvest-calendar-app"

export default async function HarvestCalendarPage({
  params,
}: Readonly<{
  params: { lang: string }
}>) {
  const dict = await getDictionary(params.lang)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader lang={params.lang} dict={dict} />
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  {dict?.harvestCalendar?.title || "Calendario de Cosecha"}
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  {dict?.harvestCalendar?.subtitle || "Calcula tu calendario de cosecha según tu ubicación y siembra."}
                </p>
              </div>
            </div>
            <HarvestCalendarApp />
          </div>
        </section>
      </main>
      <SiteFooter dict={dict} lang={params.lang} />
    </div>
  )
}
