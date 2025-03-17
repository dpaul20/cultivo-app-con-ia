import { getDictionary } from "../dictionaries"
import SiteHeader from "@/components/layout/site-header-simple"
import SiteFooter from "@/components/layout/site-footer"
import GardenPlannerApp from "@/components/garden-planner/garden-planner-app"

export default async function GardenPlannerPage({
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
                  {dict?.gardenPlanner.title || "Interactive Garden Planner"}
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  {dict?.gardenPlanner.subtitle || "Design your garden layout by dragging and dropping plants"}
                </p>
              </div>
            </div>

            <GardenPlannerApp lang={params.lang} dictionary={dict} />
          </div>
        </section>
      </main>
      <SiteFooter dict={dict} />
    </div>
  )
}

