import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import CropAssistant from "@/components/crop-assistant"
import PopularCrops from "@/components/popular-crops"
import SiteHeader from "@/components/layout/site-header-simple"
import SiteFooter from "@/components/layout/site-footer"
import { getDictionary } from "./dictionaries"
import type { Dictionary } from "./dictionaries"

export default async function Home({
  params,
}: {
  params: { lang: string }
}) {
  // Add error handling for getDictionary
  let dict: Dictionary | undefined

  try {
    dict = await getDictionary(params.lang as "en" | "es")
  } catch (error) {
    console.error("Failed to load dictionary:", error)
    // We'll continue with dict as undefined, and our components will use fallbacks
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader lang={params.lang} dict={dict} />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    {dict?.hero.title || "Grow Better Together"}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {dict?.hero.subtitle ||
                      "Discover the perfect plant companions for your garden with our AI-powered crop association assistant."}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <div className="flex-1 relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder={dict?.hero.searchPlaceholder || "Search for a crop (e.g., tomato)"}
                      className="w-full pl-8"
                    />
                  </div>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    {dict?.hero.findCompanions || "Find Companions"}
                  </Button>
                </div>
              </div>
              <img
                alt="Garden with companion planting"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                src="/placeholder.svg?height=400&width=800"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  {dict?.howItWorks.title || "How It Works"}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  {dict?.howItWorks.subtitle ||
                    "Our AI-powered app helps you create the perfect garden by suggesting companion plants that grow well together."}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>{dict?.howItWorks.step1.title || "1. Select Your Crops"}</CardTitle>
                  <CardDescription>
                    {dict?.howItWorks.step1.description || "Choose the plants you want to grow in your garden."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    alt="Select crops illustration"
                    className="aspect-video w-full rounded-lg object-cover"
                    src="/placeholder.svg?height=200&width=400"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{dict?.howItWorks.step2.title || "2. Get AI Recommendations"}</CardTitle>
                  <CardDescription>
                    {dict?.howItWorks.step2.description ||
                      "Our AI suggests the best companion plants based on scientific data."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    alt="AI recommendations illustration"
                    className="aspect-video w-full rounded-lg object-cover"
                    src="/placeholder.svg?height=200&width=400"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{dict?.howItWorks.step3.title || "3. Plan Your Garden"}</CardTitle>
                  <CardDescription>
                    {dict?.howItWorks.step3.description ||
                      "Arrange your plants optimally using our interactive garden planner."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    alt="Garden planner illustration"
                    className="aspect-video w-full rounded-lg object-cover"
                    src="/placeholder.svg?height=200&width=400"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <PopularCrops lang={params.lang} dictionary={dict} />
              <CropAssistant lang={params.lang} dictionary={dict} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter dict={dict} />
    </div>
  )
}

