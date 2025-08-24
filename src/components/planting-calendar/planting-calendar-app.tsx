"use client";

import { useState } from "react";
import { MapPin, CalendarIcon, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

// Definir tipos para el calendario
type PlantingActivity = "indoors" | "outdoors" | "harvest";

type CalendarItem = {
  id: string;
  name: string;
  imageUrl?: string;
  activities: Record<string, PlantingActivity[]>;
};

type HardinessZone = {
  id: string;
  name: string;
  minTemp: number;
  maxTemp: number;
};

// Datos de ejemplo para el calendario
const calendarData: CalendarItem[] = [
  {
    id: "tomato",
    name: "Tomato",
    imageUrl:
      "https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=2070&auto=format&fit=crop",
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
    imageUrl:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=2076&auto=format&fit=crop",
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
    imageUrl:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=2070&auto=format&fit=crop",
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
    imageUrl:
      "https://images.unsplash.com/photo-1563252722-6434563a985d?q=80&w=2070&auto=format&fit=crop",
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
    imageUrl:
      "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?q=80&w=2070&auto=format&fit=crop",
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
];

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
];

// Función para convertir Fahrenheit a Celsius
function fahrenheitToCelsius(fahrenheit: number): number {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

export default function PlantingCalendarApp() {
  const t = useTranslations("calendar");
  const lang = useLocale();

  // Estados
  const [selectedZone, setSelectedZone] = useState<string>("8");
  const [selectedMonth, setSelectedMonth] = useState<string>(
    (new Date().getMonth() + 1).toString()
  );
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);

  // Nombres de los meses
  const months = [
    t("january"),
    t("february"),
    t("march"),
    t("april"),
    t("may"),
    t("june"),
    t("july"),
    t("august"),
    t("september"),
    t("october"),
    t("november"),
    t("december"),
  ];

  // Detectar ubicación
  const detectLocation = () => {
    setIsDetectingLocation(true);

    // Simular detección de ubicación
    setTimeout(() => {
      setSelectedZone("9");
      setLocationDetected(true);
      setIsDetectingLocation(false);
    }, 1500);
  };

  // Obtener plantas para el mes seleccionado
  const getPlantsForMonth = (activity: PlantingActivity) => {
    return calendarData.filter((plant) =>
      plant.activities[selectedMonth]?.includes(activity)
    );
  };

  // Renderizar el selector de zona y mes
  const renderSelectors = () => {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {t("selectRegion")}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded-full p-0"
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span className="sr-only">Hardiness Zone Info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{t("hardinessExplanation")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>{t("hardiness")}</CardDescription>
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
                        ? `${fahrenheitToCelsius(
                            zone.minTemp
                          )}°C a ${fahrenheitToCelsius(zone.maxTemp)}°C`
                        : `${zone.minTemp}°F to ${zone.maxTemp}°F`}
                      )
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{t("or")}</span>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={detectLocation}
                disabled={isDetectingLocation}
              >
                <MapPin className="mr-2 h-4 w-4" />
                {isDetectingLocation ? t("detecting") : t("detectLocation")}
              </Button>

              {locationDetected && (
                <Alert>
                  <MapPin className="h-4 w-4" />
                  <AlertTitle>{t("locationDetected")}</AlertTitle>
                  <AlertDescription>
                    {t("hardiness")}:{" "}
                    {hardinessZones.find((z) => z.id === selectedZone)?.name}
                    {lang === "es"
                      ? ` (${fahrenheitToCelsius(
                          hardinessZones.find((z) => z.id === selectedZone)
                            ?.minTemp || 0
                        )}°C a ${fahrenheitToCelsius(
                          hardinessZones.find((z) => z.id === selectedZone)
                            ?.maxTemp || 0
                        )}°C)`
                      : ` (${
                          hardinessZones.find((z) => z.id === selectedZone)
                            ?.minTemp || 0
                        }°F to ${
                          hardinessZones.find((z) => z.id === selectedZone)
                            ?.maxTemp || 0
                        }°F)`}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("selectMonth")}</CardTitle>
            <CardDescription>
              {t("whatToPlant")} {months[Number.parseInt(selectedMonth) - 1]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <Button
                  key={month}
                  variant={
                    selectedMonth === month.toString() ? "default" : "outline"
                  }
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
    );
  };

  // Renderizar el calendario para el mes seleccionado
  const renderCalendar = () => {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            {months[Number.parseInt(selectedMonth) - 1]} {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="indoors">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="indoors">{t("indoors")}</TabsTrigger>
              <TabsTrigger value="outdoors">{t("outdoors")}</TabsTrigger>
              <TabsTrigger value="harvest">{t("harvest")}</TabsTrigger>
            </TabsList>

            <TabsContent value="indoors">
              {renderPlantList("indoors")}
            </TabsContent>

            <TabsContent value="outdoors">
              {renderPlantList("outdoors")}
            </TabsContent>

            <TabsContent value="harvest">
              {renderPlantList("harvest")}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };

  // Devuelve el emoji correspondiente a la planta
  function getPlantEmoji(plantId: string) {
    switch (plantId) {
      case "tomato":
        return "🍅";
      case "lettuce":
        return "🥬";
      case "carrot":
        return "🥕";
      case "pepper":
        return "🌶️";
      case "cucumber":
        return "🥒";
      default:
        return "🌱";
    }
  }

  // Renderizar la lista de plantas para una actividad
  const renderPlantList = (activity: PlantingActivity) => {
    const plants = getPlantsForMonth(activity);

    if (plants.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[200px] border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">
            {t("noPlants", {
              activity,
              month: months[Number.parseInt(selectedMonth) - 1],
              zone: selectedZone,
              defaultValue: `No plants to ${activity} in ${
                months[Number.parseInt(selectedMonth) - 1]
              } for Zone ${selectedZone}`,
            })}
          </p>
        </div>
      );
    }

    return (
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {plants.map((plant) => {
          const emoji = getPlantEmoji(plant.id);
          return (
            <div
              key={plant.id}
              className="flex items-center p-3 border rounded-lg"
            >
              <div className="mr-3 h-12 w-12 overflow-hidden rounded-full">
                {plant.imageUrl ? (
                  <Image
                    src={plant.imageUrl || "/placeholder.svg"}
                    alt={plant.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                    unoptimized={plant.imageUrl.startsWith("http")}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted text-2xl">
                    {emoji}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium">{plant.name}</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {plant.activities[selectedMonth].map((act) => (
                    <Badge
                      key={act}
                      variant={act === activity ? "default" : "outline"}
                    >
                      {t(act)}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {renderSelectors()}
      {renderCalendar()}
    </div>
  );
}
