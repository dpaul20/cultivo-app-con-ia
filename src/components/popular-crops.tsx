import { Check, X } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Dictionary } from "@/app/[lang]/dictionaries"

// Default data to use as fallback if dictionary is undefined
const defaultData = {
  title: "Popular Crops",
  description: "Information about common crop associations",
  benefits: "Benefits",
  goodCompanions: "Good Companions",
  badCompanions: "Bad Companions",
  tomato: {
    name: "Tomato",
    benefits: "Basil improves flavor and repels insects. Onions and garlic prevent pests.",
    good: ["Basil", "Onion", "Carrot", "Garlic", "Parsley"],
    bad: ["Potato", "Fennel", "Cabbage", "Corn"],
  },
  lettuce: {
    name: "Lettuce",
    benefits: "Grows well with root plants that don't compete for nutrients in the same soil layer.",
    good: ["Carrot", "Radish", "Cucumber", "Strawberry", "Onion"],
    bad: ["Sunflower", "Broccoli"],
  },
  carrot: {
    name: "Carrot",
    benefits: "Tomatoes release solanine which protects carrots from pests. Rosemary repels carrot fly.",
    good: ["Tomato", "Onion", "Leek", "Rosemary", "Lettuce"],
    bad: ["Dill", "Parsley", "Celery"],
  },
}

export default function PopularCrops({
  lang,
  dictionary,
}: {
  lang: string
  dictionary?: Dictionary
}) {
  // Use dictionary.popularCrops if available, otherwise use defaultData
  const cropData = dictionary?.popularCrops || defaultData

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{cropData.title}</CardTitle>
        <CardDescription>{cropData.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tomato">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tomato">{cropData.tomato.name}</TabsTrigger>
            <TabsTrigger value="lettuce">{cropData.lettuce.name}</TabsTrigger>
            <TabsTrigger value="carrot">{cropData.carrot.name}</TabsTrigger>
          </TabsList>

          <TabsContent value="tomato" className="space-y-4">
            <div className="mt-4 grid gap-4">
              <div>
                <h3 className="font-medium mb-2">{cropData.benefits}</h3>
                <p className="text-sm text-muted-foreground">{cropData.tomato.benefits}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-1">
                    <Check className="h-4 w-4 text-green-600" />
                    {cropData.goodCompanions}
                  </h3>
                  <ul className="text-sm space-y-1">
                    {cropData.tomato.good.map((companion) => (
                      <li key={companion} className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        {companion}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-1">
                    <X className="h-4 w-4 text-red-600" />
                    {cropData.badCompanions}
                  </h3>
                  <ul className="text-sm space-y-1">
                    {cropData.tomato.bad.map((companion) => (
                      <li key={companion} className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                        {companion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <img
                  alt={`${cropData.tomato.name}`}
                  className="aspect-video w-full rounded-lg object-cover"
                  src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=2070&auto=format&fit=crop"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lettuce" className="space-y-4">
            <div className="mt-4 grid gap-4">
              <div>
                <h3 className="font-medium mb-2">{cropData.benefits}</h3>
                <p className="text-sm text-muted-foreground">{cropData.lettuce.benefits}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-1">
                    <Check className="h-4 w-4 text-green-600" />
                    {cropData.goodCompanions}
                  </h3>
                  <ul className="text-sm space-y-1">
                    {cropData.lettuce.good.map((companion) => (
                      <li key={companion} className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        {companion}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-1">
                    <X className="h-4 w-4 text-red-600" />
                    {cropData.badCompanions}
                  </h3>
                  <ul className="text-sm space-y-1">
                    {cropData.lettuce.bad.map((companion) => (
                      <li key={companion} className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                        {companion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <img
                  alt={`${cropData.lettuce.name}`}
                  className="aspect-video w-full rounded-lg object-cover"
                  src="https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=2076&auto=format&fit=crop"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="carrot" className="space-y-4">
            <div className="mt-4 grid gap-4">
              <div>
                <h3 className="font-medium mb-2">{cropData.benefits}</h3>
                <p className="text-sm text-muted-foreground">{cropData.carrot.benefits}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-1">
                    <Check className="h-4 w-4 text-green-600" />
                    {cropData.goodCompanions}
                  </h3>
                  <ul className="text-sm space-y-1">
                    {cropData.carrot.good.map((companion) => (
                      <li key={companion} className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        {companion}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-1">
                    <X className="h-4 w-4 text-red-600" />
                    {cropData.badCompanions}
                  </h3>
                  <ul className="text-sm space-y-1">
                    {cropData.carrot.bad.map((companion) => (
                      <li key={companion} className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                        {companion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <img
                  alt={`${cropData.carrot.name}`}
                  className="aspect-video w-full rounded-lg object-cover"
                  src="https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=2070&auto=format&fit=crop"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

