"use client"

import { useState } from "react"
import { addDays } from "date-fns"
import { Camera, Plus, Droplets, Sprout, FileText, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import type { Dictionary } from "@/app/[lang]/dictionaries"
import { formatDate } from "@/utils/format-utils"

// Definir tipos para las plantas
type GrowthStage = "seedling" | "vegetative" | "flowering" | "fruiting" | "harvesting"
type PlantHealth = "healthy" | "needsAttention" | "unhealthy"

type PlantNote = {
  id: string
  date: Date
  text: string
}

type PlantPhoto = {
  id: string
  date: Date
  url: string
}

type Plant = {
  id: string
  name: string
  type: string
  plantingDate: Date
  lastWatered: Date
  nextWatering: Date
  growthStage: GrowthStage
  health: PlantHealth
  notes: PlantNote[]
  photos: PlantPhoto[]
}

export default function GrowthTrackerApp({
  lang,
  dictionary,
}: {
  lang: string
  dictionary?: Dictionary
}) {
  const dict = dictionary?.growthTracker || {
    title: "Growth Tracker",
    subtitle: "Track the progress of your plants over time",
    myPlants: "My Plants",
    addPlant: "Add Plant",
    plantName: "Plant Name",
    plantType: "Plant Type",
    plantingDate: "Planting Date",
    lastWatered: "Last Watered",
    nextWatering: "Next Watering",
    notes: "Notes",
    addNote: "Add Note",
    uploadPhoto: "Upload Photo",
    growthStage: "Growth Stage",
    seedling: "Seedling",
    vegetative: "Vegetative",
    flowering: "Flowering",
    fruiting: "Fruiting",
    harvesting: "Harvesting",
    trackGrowth: "Track Growth",
    addMilestone: "Add Milestone",
    viewHistory: "View History",
    noPlants: "No plants added yet. Add your first plant to start tracking!",
    waterNow: "Water Now",
    fertilizeNow: "Fertilize Now",
    plantHealth: "Plant Health",
    healthy: "Healthy",
    needsAttention: "Needs Attention",
    unhealthy: "Unhealthy",
  }

  // Estados
  const [plants, setPlants] = useState<Plant[]>([
    {
      id: "1",
      name: "Cherry Tomato",
      type: "Tomato",
      plantingDate: new Date(2025, 2, 15),
      lastWatered: new Date(2025, 3, 14),
      nextWatering: addDays(new Date(2025, 3, 14), 2),
      growthStage: "vegetative",
      health: "healthy",
      notes: [
        { id: "n1", date: new Date(2025, 2, 15), text: "Planted seeds in starter pots" },
        { id: "n2", date: new Date(2025, 3, 1), text: "First true leaves appeared" },
      ],
      photos: [
        {
          id: "p1",
          date: new Date(2025, 2, 20),
          url: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=2091&auto=format&fit=crop",
        },
        {
          id: "p2",
          date: new Date(2025, 3, 5),
          url: "https://images.unsplash.com/photo-1588105538421-11c9b8edb523?q=80&w=2069&auto=format&fit=crop",
        },
      ],
    },
    {
      id: "2",
      name: "Butterhead Lettuce",
      type: "Lettuce",
      plantingDate: new Date(2025, 3, 1),
      lastWatered: new Date(2025, 3, 14),
      nextWatering: addDays(new Date(2025, 3, 14), 1),
      growthStage: "seedling",
      health: "needsAttention",
      notes: [{ id: "n3", date: new Date(2025, 3, 1), text: "Direct sowed seeds in garden bed" }],
      photos: [
        {
          id: "p3",
          date: new Date(2025, 3, 10),
          url: "https://images.unsplash.com/photo-1582012107971-5aee0b4d4b5e?q=80&w=2070&auto=format&fit=crop",
        },
      ],
    },
  ])

  const [selectedPlant, setSelectedPlant] = useState<string | null>(null)
  const [isAddingPlant, setIsAddingPlant] = useState(false)
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newNote, setNewNote] = useState("")

  // Formulario para nueva planta
  const [newPlantName, setNewPlantName] = useState("")
  const [newPlantType, setNewPlantType] = useState("")
  const [newPlantDate, setNewPlantDate] = useState("")

  // Obtener la planta seleccionada
  const getSelectedPlant = () => {
    return plants.find((p) => p.id === selectedPlant)
  }

  // Añadir una nueva planta
  const addPlant = () => {
    if (!newPlantName || !newPlantType || !newPlantDate) return

    const plantingDate = new Date(newPlantDate)
    const newPlant: Plant = {
      id: Date.now().toString(),
      name: newPlantName,
      type: newPlantType,
      plantingDate,
      lastWatered: new Date(),
      nextWatering: addDays(new Date(), 2),
      growthStage: "seedling",
      health: "healthy",
      notes: [{ id: `n-${Date.now()}`, date: new Date(), text: `Started tracking ${newPlantName}` }],
      photos: [],
    }

    setPlants([...plants, newPlant])
    setNewPlantName("")
    setNewPlantType("")
    setNewPlantDate("")
    setIsAddingPlant(false)
    setSelectedPlant(newPlant.id)
  }

  // Añadir una nota a la planta seleccionada
  const addNote = () => {
    if (!selectedPlant || !newNote) return

    const note: PlantNote = {
      id: `n-${Date.now()}`,
      date: new Date(),
      text: newNote,
    }

    setPlants(
      plants.map((plant) => {
        if (plant.id === selectedPlant) {
          return {
            ...plant,
            notes: [...plant.notes, note],
          }
        }
        return plant
      }),
    )

    setNewNote("")
    setIsAddingNote(false)
  }

  // Regar la planta
  const waterPlant = (plantId: string) => {
    setPlants(
      plants.map((plant) => {
        if (plant.id === plantId) {
          return {
            ...plant,
            lastWatered: new Date(),
            nextWatering: addDays(new Date(), 2),
            health: plant.health === "unhealthy" ? "needsAttention" : plant.health,
          }
        }
        return plant
      }),
    )
  }

  // Cambiar la etapa de crecimiento
  const updateGrowthStage = (plantId: string, stage: GrowthStage) => {
    setPlants(
      plants.map((plant) => {
        if (plant.id === plantId) {
          return {
            ...plant,
            growthStage: stage,
          }
        }
        return plant
      }),
    )
  }

  // Cambiar el estado de salud
  const updateHealth = (plantId: string, health: PlantHealth) => {
    setPlants(
      plants.map((plant) => {
        if (plant.id === plantId) {
          return {
            ...plant,
            health,
          }
        }
        return plant
      }),
    )
  }

  // Eliminar una planta
  const deletePlant = (plantId: string) => {
    setPlants(plants.filter((plant) => plant.id !== plantId))
    if (selectedPlant === plantId) {
      setSelectedPlant(null)
    }
  }

  // Renderizar la lista de plantas
  const renderPlantList = () => {
    if (plants.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[300px] border rounded-lg bg-muted/20">
          <p className="text-muted-foreground mb-4">{dict.noPlants}</p>
          <Button onClick={() => setIsAddingPlant(true)}>{dict.addPlant}</Button>
        </div>
      )
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plants.map((plant) => (
          <Card
            key={plant.id}
            className={`cursor-pointer hover:shadow-md transition-shadow ${selectedPlant === plant.id ? "ring-2 ring-primary" : ""}`}
            onClick={() => setSelectedPlant(plant.id)}
          >
            <div className="absolute inset-0 rounded-lg overflow-hidden opacity-10">
              {plant.photos.length > 0 && (
                <img src={plant.photos[0].url || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
              )}
            </div>
            <CardHeader className="pb-2 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{plant.name}</CardTitle>
                  <CardDescription>{plant.type}</CardDescription>
                </div>
                <Badge
                  variant={
                    plant.health === "healthy"
                      ? "default"
                      : plant.health === "needsAttention"
                        ? "outline"
                        : "destructive"
                  }
                >
                  {dict[plant.health]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{dict.plantingDate}:</span>
                  <span>{formatDate(plant.plantingDate, "PP", lang)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{dict.lastWatered}:</span>
                  <span>{formatDate(plant.lastWatered, "PP", lang)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{dict.growthStage}:</span>
                  <span>{dict[plant.growthStage]}</span>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{dict.nextWatering}:</span>
                    <span>{formatDate(plant.nextWatering, "PP", lang)}</span>
                  </div>
                  <Progress
                    value={Math.max(
                      0,
                      100 -
                        ((plant.nextWatering.getTime() - new Date().getTime()) /
                          (plant.nextWatering.getTime() - plant.lastWatered.getTime())) *
                          100,
                    )}
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 relative z-10">
              <Button variant="outline" size="sm" className="w-full" onClick={() => waterPlant(plant.id)}>
                <Droplets className="mr-2 h-4 w-4" />
                {dict.waterNow}
              </Button>
            </CardFooter>
          </Card>
        ))}

        <Card
          className="flex flex-col items-center justify-center h-[230px] border-dashed cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={() => setIsAddingPlant(true)}
        >
          <Plus className="h-8 w-8 mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">{dict.addPlant}</p>
        </Card>
      </div>
    )
  }

  // Renderizar los detalles de la planta seleccionada
  const renderPlantDetails = () => {
    const plant = getSelectedPlant()
    if (!plant) return null

    return (
      <Card className="mt-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{plant.name}</CardTitle>
            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deletePlant(plant.id)}>
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
          <CardDescription>{plant.type}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="notes">{dict.notes}</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>{dict.growthStage}</Label>
                  <Select
                    value={plant.growthStage}
                    onValueChange={(value) => updateGrowthStage(plant.id, value as GrowthStage)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seedling">{dict.seedling}</SelectItem>
                      <SelectItem value="vegetative">{dict.vegetative}</SelectItem>
                      <SelectItem value="flowering">{dict.flowering}</SelectItem>
                      <SelectItem value="fruiting">{dict.fruiting}</SelectItem>
                      <SelectItem value="harvesting">{dict.harvesting}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{dict.plantHealth}</Label>
                  <Select value={plant.health} onValueChange={(value) => updateHealth(plant.id, value as PlantHealth)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="healthy">{dict.healthy}</SelectItem>
                      <SelectItem value="needsAttention">{dict.needsAttention}</SelectItem>
                      <SelectItem value="unhealthy">{dict.unhealthy}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => waterPlant(plant.id)}>
                  <Droplets className="mr-2 h-4 w-4" />
                  {dict.waterNow}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Sprout className="mr-2 h-4 w-4" />
                  {dict.fertilizeNow}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="notes">
              <div className="space-y-4">
                {plant.notes.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">{`No notes yet. Add your first note about ${plant.name}.`}</p>
                ) : (
                  <div className="space-y-3">
                    {plant.notes.map((note) => (
                      <div key={note.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-muted-foreground">{formatDate(note.date, "PPp", lang)}</span>
                        </div>
                        <p className="text-sm">{note.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                <Button variant="outline" className="w-full" onClick={() => setIsAddingNote(true)}>
                  <FileText className="mr-2 h-4 w-4" />
                  {dict.addNote}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="photos">
              <div className="space-y-4">
                {plant.photos.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">{`No photos yet. Add your first photo of ${plant.name}.`}</p>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {plant.photos.map((photo) => (
                      <div key={photo.id} className="border rounded-lg overflow-hidden">
                        <img
                          src={photo.url || "/placeholder.svg"}
                          alt={`Photo of ${plant.name}`}
                          className="w-full aspect-square object-cover"
                        />
                        <div className="p-2">
                          <span className="text-xs text-muted-foreground">{formatDate(photo.date, "PP", lang)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Button variant="outline" className="w-full">
                  <Camera className="mr-2 h-4 w-4" />
                  {dict.uploadPhoto}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {renderPlantList()}
      {renderPlantDetails()}

      <Dialog open={isAddingPlant} onOpenChange={setIsAddingPlant}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dict.addPlant}</DialogTitle>
            <DialogDescription>{dict.subtitle}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{dict.plantName}</Label>
              <Input id="name" value={newPlantName} onChange={(e) => setNewPlantName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">{dict.plantType}</Label>
              <Input id="type" value={newPlantType} onChange={(e) => setNewPlantType(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">{dict.plantingDate}</Label>
              <Input id="date" type="date" value={newPlantDate} onChange={(e) => setNewPlantDate(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={addPlant}>{dict.addPlant}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dict.addNote}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Write your note here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button onClick={addNote}>{dict.addNote}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

