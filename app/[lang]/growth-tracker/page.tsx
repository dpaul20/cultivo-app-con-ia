import { getDictionary } from "../dictionaries"
import SiteHeader from "@/components/layout/site-header-simple"
import SiteFooter from "@/components/layout/site-footer"
import GrowthTrackerApp from "@/components/growth-tracker/growth-tracker-app"

export default async function GrowthTrackerPage({
  params,
}: {
  params: { lang: string }
}) {
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
                  {dict?.growthTracker.title || "Growth Tracker"}
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  {dict?.growthTracker.subtitle || "Track the progress of your plants over time"}
                </p>
              </div>
            </div>

            <GrowthTrackerApp lang={params.lang} dictionary={dict} />
          </div>
        </section>
      </main>
      <SiteFooter dict={dict} />
    </div>
  )
}

