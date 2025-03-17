"use client"

import { useState } from "react"
import { MapPin, CalendarIcon, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Dictionary } from "@/app/[lang]/dictionaries"

// Definir tipos para el calendario
type PlantingActivity = "indoors" | "outdoors" | "harvest"

type CalendarItem = {
  id: string
  name: string
  activities: Record<string, PlantingActivity[]>
}

type HardinessZone = {
  id: string
  name: string
  minTemp: number
  maxTemp: number
}

// Datos de ejemplo para el calendario
const calendarData: CalendarItem[] = [
  {
    id: "tomato",
    name: "Tomato",
    activities: {
      "1": [],
      "2": ["indoors"],
      "3": ["indoors"],
      "4": ["indoors", "outdoors"],
      "5": ["outdoors"],
      "6": ["outdoors"],
      "7": [],
      "8": ["harvest"],
      "9": ["harvest"],
      "10": ["harvest"],
      "11": [],
      "12": [],
    },
  },
  {
    id: "lettuce",
    name: "Lettuce",
    activities: {
      "1": [],
      "2": ["indoors"],
      "3": ["indoors", "outdoors"],
      "4": ["outdoors"],
      "5": ["outdoors", "harvest"],
      "6": ["harvest"],
      "7": ["outdoors"],
      "8": ["outdoors"],
      "9": ["outdoors", "harvest"],
      "10": ["harvest"],
      "11": [],
      "12": [],
    },
  },
  {
    id: "carrot",
    name: "Carrot",
    activities: {
      "1": [],
      "2": [],
      "3": ["outdoors"],
      "4": ["outdoors"],
      "5": ["outdoors"],
      "6": ["outdoors", "harvest"],
      "7": ["harvest"],
      "8": ["outdoors"],
      "9": ["outdoors"],
      "10": ["harvest"],
      "11": [],
      "12": [],
    },
  },
  {
    id: "pepper",
    name: "Pepper",
    activities: {
      "1": [],
      "2": ["indoors"],
      "3": ["indoors"],
      "4": ["indoors"],
      "5": ["outdoors"],
      "6": ["outdoors"],
      "7": [],
      "8": ["harvest"],
      "9": ["harvest"],
      "10": ["harvest"],
      "11": [],
      "12": [],
    },
  },
  {
    id: "cucumber",
    name: "Cucumber",
    activities: {
      "1": [],
      "2": [],
      "3": ["indoors"],
      "4": ["indoors", "outdoors"],
      "5": ["outdoors"],
      "6": ["outdoors"],
      "7": ["harvest"],
      "8": ["harvest"],
      "9": ["harvest"],
      "10": [],
      "11": [],
      "12": [],
    },
  },
]

// Zonas de rusticidad
const hardinessZones: HardinessZone[] = [
  { id: "1", name: "Zone 1", minTemp: -60, maxTemp: -50 },
  { id: "2", name: "Zone 2", minTemp: -50, maxTemp: -40 },
  { id: "3", name: "Zone 3", minTemp: -40, maxTemp: -30 },
  { id: "4", name: "Zone 4", minTemp: -30, maxTemp: -20 },
  { id: "5", name: "Zone 5", minTemp: -20, maxTemp: -10 },
  { id: "6", name: "Zone 6", minTemp: -10, maxTemp: 0 },
  { id: "7", name: "Zone 7", minTemp: 0, maxTemp: 10 },
  { id: "8", name: "Zone 8", minTemp: 10, maxTemp: 20 },
  { id: "9", name: "Zone 9", minTemp: 20, maxTemp: 30 },
  { id: "10", name: "Zone 10", minTemp: 30, maxTemp: 40 },
  { id: "11", name: "Zone 11", minTemp: 40, maxTemp: 50 },
  { id: "12", name: "Zone 12", minTemp: 50, maxTemp: 60 },
  { id: "13", name: "Zone 13", minTemp: 60, maxTemp: 70 },
]

// Función para convertir Fahrenheit a Celsius
function fahrenheitToCelsius(fahrenheit: number): number {
  return Math.round(((fahrenheit - 32) * 5) / 9)
}

export default function PlantingCalendarApp({
  lang,
  dictionary,
}: {
  lang: string
  dictionary?: Dictionary
}) {
  const dict = dictionary?.calendar || {
    title: "Planting Calendar",
    subtitle: "Find the best times to plant based on your location",
    selectRegion: "Select your region",
    detectLocation: "Detect my location",
    or: "or",
    selectMonth: "Select month",
    whatToPlant: "What to plant in",
    indoors: "Indoors",
    outdoors: "Outdoors",
    harvest: "Harvest",
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
    locationDetected: "Location detected",
    hardiness: "Hardiness Zone",
    customizeCalendar: "Customize calendar for your specific needs",
    hardinessExplanation:
      "Hardiness zones are geographical areas defined by the minimum temperatures that plants can survive in.",
  }

  // Estados
  const [selectedZone, setSelectedZone] = useState<string>("8")
  const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth() + 1).toString())
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [locationDetected, setLocationDetected] = useState(false)

  // Nombres de los meses
  const months = [
    dict.january,
    dict.february,
    dict.march,
    dict.april,
    dict.may,
    dict.june,
    dict.july,
    dict.august,
    dict.september,
    dict.october,
    dict.november,
    dict.december,
  ]

  // Detectar ubicación
  const detectLocation = () => {
    setIsDetectingLocation(true)

    // Simular detección de ubicación
    setTimeout(() => {
      setSelectedZone("9")
      setLocationDetected(true)
      setIsDetectingLocation(false)
    }, 1500)
  }

  // Obtener plantas para el mes seleccionado
  const getPlantsForMonth = (activity: PlantingActivity) => {
    return calendarData.filter((plant) => plant.activities[selectedMonth]?.includes(activity))
  }

  // Renderizar el selector de zona y mes
  const renderSelectors = () => {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {dict.selectRegion}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                      <HelpCircle className="h-4 w-4" />
                      <span className="sr-only">Hardiness Zone Info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>
                      {dict.hardinessExplanation ||
                        "Hardiness zones are geographical areas defined by the minimum temperatures that plants can survive in."}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>{dict.hardiness}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {hardinessZones.map((zone) => (
                    <SelectItem key={zone.id} value={zone.id}>
                      {zone.name} (
                      {lang === "es"
                        ? `${fahrenheitToCelsius(zone.minTemp)}°C a ${fahrenheitToCelsius(zone.maxTemp)}°C`
                        : `${zone.minTemp}°F to ${zone.maxTemp}°F`}
                      )
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{dict.or}</span>
              </div>

              <Button variant="outline" className="w-full" onClick={detectLocation} disabled={isDetectingLocation}>
                <MapPin className="mr-2 h-4 w-4" />
                {isDetectingLocation ? "Detecting..." : dict.detectLocation}
              </Button>

              {locationDetected && (
                <Alert>
                  <MapPin className="h-4 w-4" />
                  <AlertTitle>{dict.locationDetected}</AlertTitle>
                  <AlertDescription>
                    {dict.hardiness}: {hardinessZones.find((z) => z.id === selectedZone)?.name}
                    {lang === "es"
                      ? ` (${fahrenheitToCelsius(hardinessZones.find((z) => z.id === selectedZone)?.minTemp || 0)}°C a ${fahrenheitToCelsius(hardinessZones.find((z) => z.id === selectedZone)?.maxTemp || 0)}°C)`
                      : ` (${hardinessZones.find((z) => z.id === selectedZone)?.minTemp || 0}°F to ${hardinessZones.find((z) => z.id === selectedZone)?.maxTemp || 0}°F)`}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dict.selectMonth}</CardTitle>
            <CardDescription>
              {dict.whatToPlant} {months[Number.parseInt(selectedMonth) - 1]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <Button
                  key={month}
                  variant={selectedMonth === month.toString() ? "default" : "outline"}
                  className="h-10 p-0"
                  onClick={() => setSelectedMonth(month.toString())}
                >
                  {month}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Renderizar el calendario para el mes seleccionado
  const renderCalendar = () => {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            {months[Number.parseInt(selectedMonth) - 1]} {dict.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="indoors">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="indoors">{dict.indoors}</TabsTrigger>
              <TabsTrigger value="outdoors">{dict.outdoors}</TabsTrigger>
              <TabsTrigger value="harvest">{dict.harvest}</TabsTrigger>
            </TabsList>

            <TabsContent value="indoors">{renderPlantList("indoors")}</TabsContent>

            <TabsContent value="outdoors">{renderPlantList("outdoors")}</TabsContent>

            <TabsContent value="harvest">{renderPlantList("harvest")}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    )
  }

  // Renderizar la lista de plantas para una actividad
  const renderPlantList = (activity: PlantingActivity) => {
    const plants = getPlantsForMonth(activity)

    if (plants.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[200px] border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">
            {`No plants to ${activity} in ${months[Number.parseInt(selectedMonth) - 1]} for Zone ${selectedZone}`}
          </p>
        </div>
      )
    }

    return (
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {plants.map((plant) => (
          <div key={plant.id} className="flex items-center p-3 border rounded-lg">
            <div className="mr-3 text-2xl">
              {plant.id === "tomato"
                ? "🍅"
                : plant.id === "lettuce"
                  ? "🥬"
                  : plant.id === "carrot"
                    ? "🥕"
                    : plant.id === "pepper"
                      ? "🌶️"
                      : plant.id === "cucumber"
                        ? "🥒"
                        : "🌱"}
            </div>
            <div>
              <h3 className="font-medium">{plant.name}</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {plant.activities[selectedMonth].map((act) => (
                  <Badge key={act} variant={act === activity ? "default" : "outline"}>
                    {dict[act]}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {renderSelectors()}
      {renderCalendar()}
    </div>
  )
}

