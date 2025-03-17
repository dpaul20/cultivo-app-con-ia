"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Trash2, RotateCw, Grid3X3, Route, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Dictionary } from "@/app/[lang]/dictionaries"

// Definir tipos para las plantas y el jardín
type Plant = {
  id: string
  name: string
  icon: string
  color: string
  width: number
  height: number
  goodCompanions: string[]
  badCompanions: string[]
  imageUrl?: string
}

type GardenItem = {
  id: string
  type: "plant" | "bed" | "path"
  plantId?: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  color: string
}

type Garden = {
  name: string
  width: number
  height: number
  items: GardenItem[]
}

// Lista de plantas disponibles
const availablePlants: Plant[] = [
  {
    id: "tomato",
    name: "Tomato",
    icon: "🍅",
    color: "#ff6b6b",
    width: 2,
    height: 2,
    goodCompanions: ["basil", "onion", "carrot", "garlic", "parsley"],
    badCompanions: ["potato", "fennel", "cabbage", "corn"],
    imageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "lettuce",
    name: "Lettuce",
    icon: "🥬",
    color: "#a1e3a1",
    width: 1,
    height: 1,
    goodCompanions: ["carrot", "radish", "cucumber", "strawberry", "onion"],
    badCompanions: ["sunflower", "broccoli"],
    imageUrl: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=2076&auto=format&fit=crop",
  },
  {
    id: "carrot",
    name: "Carrot",
    icon: "🥕",
    color: "#ffa94d",
    width: 1,
    height: 1,
    goodCompanions: ["tomato", "onion", "leek", "rosemary", "lettuce"],
    badCompanions: ["dill", "parsley", "celery"],
    imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "basil",
    name: "Basil",
    icon: "🌿",
    color: "#69db7c",
    width: 1,
    height: 1,
    goodCompanions: ["tomato", "pepper", "oregano"],
    badCompanions: ["rue"],
    imageUrl: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "onion",
    name: "Onion",
    icon: "🧅",
    color: "#e599f7",
    width: 1,
    height: 1,
    goodCompanions: ["tomato", "carrot", "beet", "strawberry"],
    badCompanions: ["bean", "pea"],
    imageUrl: "https://images.unsplash.com/photo-1618512496248-a07c50d136cd?q=80&w=1974&auto=format&fit=crop",
  },
]

export default function GardenPlannerApp({
  lang,
  dictionary,
}: {
  lang: string
  dictionary?: Dictionary
}) {
  const dict = dictionary?.gardenPlanner || {
    title: "Interactive Garden Planner",
    subtitle: "Design your garden layout by dragging and dropping plants",
    newGarden: "New Garden",
    saveGarden: "Save Garden",
    loadGarden: "Load Garden",
    gardenName: "Garden Name",
    width: "Width (m)",
    height: "Height (m)",
    createGarden: "Create Garden",
    dragPlants: "Drag plants to your garden",
    clearGarden: "Clear Garden",
    plantList: "Plant List",
    gardenTools: "Garden Tools",
    addBed: "Add Bed",
    addPath: "Add Path",
    rotate: "Rotate",
    delete: "Delete",
    noGarden: "No garden created yet. Create a new garden to start planning!",
    companionInfo: "Companion Planting Info",
    goodWith: "Good with:",
    badWith: "Bad with:",
  }

  // Estados
  const [garden, setGarden] = useState<Garden | null>(null)
  const [newGardenName, setNewGardenName] = useState("")
  const [newGardenWidth, setNewGardenWidth] = useState(10)
  const [newGardenHeight, setNewGardenHeight] = useState(10)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [selectedTool, setSelectedTool] = useState<"plant" | "bed" | "path" | null>(null)
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null)
  const [isCreatingGarden, setIsCreatingGarden] = useState(false)
  const [draggedPlant, setDraggedPlant] = useState<string | null>(null)

  const canvasRef = useRef<HTMLDivElement>(null)

  // Crear un nuevo jardín
  const createGarden = () => {
    if (newGardenName && newGardenWidth > 0 && newGardenHeight > 0) {
      setGarden({
        name: newGardenName,
        width: newGardenWidth,
        height: newGardenHeight,
        items: [],
      })
      setIsCreatingGarden(false)
    }
  }

  // Limpiar el jardín
  const clearGarden = () => {
    if (garden) {
      setGarden({
        ...garden,
        items: [],
      })
    }
  }

  // Manejar el inicio del arrastre de una planta
  const handleDragStart = (plantId: string) => {
    setDraggedPlant(plantId)
    setSelectedTool("plant")
  }

  // Manejar el drop de una planta en el jardín
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (!garden || !canvasRef.current || !draggedPlant) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = Math.floor((e.clientX - rect.left) / 50)
    const y = Math.floor((e.clientY - rect.top) / 50)

    const plant = availablePlants.find((p) => p.id === draggedPlant)
    if (!plant) return

    // Asegurarse de que la planta cabe en el jardín
    if (x + plant.width > garden.width || y + plant.height > garden.height) return

    // Añadir la planta al jardín
    const newItem: GardenItem = {
      id: `plant-${Date.now()}`,
      type: "plant",
      plantId: plant.id,
      x,
      y,
      width: plant.width,
      height: plant.height,
      rotation: 0,
      color: plant.color,
    }

    setGarden({
      ...garden,
      items: [...garden.items, newItem],
    })

    setDraggedPlant(null)
  }

  // Permitir el drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  // Añadir un bancal o camino
  const addItem = (type: "bed" | "path") => {
    if (!garden) return

    const newItem: GardenItem = {
      id: `${type}-${Date.now()}`,
      type,
      x: Math.floor(garden.width / 2) - 2,
      y: Math.floor(garden.height / 2) - 1,
      width: type === "bed" ? 4 : 1,
      height: type === "bed" ? 2 : 1,
      rotation: 0,
      color: type === "bed" ? "#8d6e63" : "#90a4ae",
    }

    setGarden({
      ...garden,
      items: [...garden.items, newItem],
    })
  }

  // Seleccionar un item
  const selectItem = (id: string) => {
    setSelectedItem(id)
  }

  // Rotar un item
  const rotateItem = () => {
    if (!garden || !selectedItem) return

    setGarden({
      ...garden,
      items: garden.items.map((item) => {
        if (item.id === selectedItem) {
          // Intercambiar ancho y alto al rotar
          return {
            ...item,
            rotation: (item.rotation + 90) % 360,
            width: item.height,
            height: item.width,
          }
        }
        return item
      }),
    })
  }

  // Eliminar un item
  const deleteItem = () => {
    if (!garden || !selectedItem) return

    setGarden({
      ...garden,
      items: garden.items.filter((item) => item.id !== selectedItem),
    })

    setSelectedItem(null)
  }

  // Obtener información de compañeros de una planta
  const getCompanionInfo = (plantId: string) => {
    return availablePlants.find((p) => p.id === plantId)
  }

  // Renderizar el jardín
  const renderGarden = () => {
    if (!garden) {
      return (
        <div className="flex flex-col items-center justify-center h-[500px] border rounded-lg bg-muted/20">
          <p className="text-muted-foreground mb-4">{dict.noGarden}</p>
          <Button onClick={() => setIsCreatingGarden(true)}>{dict.newGarden}</Button>
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">{garden.name}</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={clearGarden}>
              {dict.clearGarden}
            </Button>
            <Button variant="outline" size="sm">
              {dict.saveGarden}
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          <div
            ref={canvasRef}
            className="relative border rounded-lg overflow-hidden bg-green-50 dark:bg-green-950/20"
            style={{
              width: `${garden.width * 50}px`,
              height: `${garden.height * 50}px`,
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 0 L 50 0 L 50 50 L 0 50 Z' fill='none' stroke='%23ccc' strokeWidth='0.5'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat",
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {garden.items.map((item) => (
              <div
                key={item.id}
                className={`absolute cursor-move ${selectedItem === item.id ? "ring-2 ring-primary" : ""}`}
                style={{
                  left: `${item.x * 50}px`,
                  top: `${item.y * 50}px`,
                  width: `${item.width * 50}px`,
                  height: `${item.height * 50}px`,
                  backgroundColor: item.color,
                  transform: `rotate(${item.rotation}deg)`,
                  transformOrigin: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  borderRadius: item.type === "bed" ? "8px" : item.type === "path" ? "0" : "50%",
                  zIndex: item.type === "plant" ? 10 : item.type === "bed" ? 5 : 1,
                }}
                onClick={() => selectItem(item.id)}
              >
                {item.type === "plant" && item.plantId && (
                  <span>{availablePlants.find((p) => p.id === item.plantId)?.icon}</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 w-64">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>{dict.plantList}</CardTitle>
                <CardDescription>{dict.dragPlants}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {availablePlants.map((plant) => (
                    <TooltipProvider key={plant.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className="flex flex-col items-center justify-center p-2 border rounded-lg cursor-grab hover:bg-accent"
                            draggable
                            onDragStart={() => handleDragStart(plant.id)}
                            onClick={() => setSelectedPlant(plant.id)}
                          >
                            <div className="w-full h-12 mb-1 overflow-hidden rounded">
                              {plant.imageUrl ? (
                                <img
                                  src={plant.imageUrl || "/placeholder.svg"}
                                  alt={plant.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-2xl flex items-center justify-center h-full">{plant.icon}</span>
                              )}
                            </div>
                            <span className="text-xs mt-1">{plant.name}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{plant.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>{dict.gardenTools}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" onClick={() => addItem("bed")} className="justify-start">
                    <Grid3X3 className="mr-2 h-4 w-4" />
                    {dict.addBed}
                  </Button>
                  <Button variant="outline" onClick={() => addItem("path")} className="justify-start">
                    <Route className="mr-2 h-4 w-4" />
                    {dict.addPath}
                  </Button>

                  {selectedItem && (
                    <>
                      <Button variant="outline" onClick={rotateItem} className="justify-start">
                        <RotateCw className="mr-2 h-4 w-4" />
                        {dict.rotate}
                      </Button>
                      <Button variant="outline" onClick={deleteItem} className="justify-start text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        {dict.delete}
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {selectedPlant && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    {dict.companionInfo}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const plantInfo = getCompanionInfo(selectedPlant)
                    if (!plantInfo) return null

                    return (
                      <div className="space-y-3">
                        {plantInfo.imageUrl && (
                          <div className="w-full h-32 overflow-hidden rounded-lg mb-3">
                            <img
                              src={plantInfo.imageUrl || "/placeholder.svg"}
                              alt={plantInfo.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-medium mb-1">{dict.goodWith}</h4>
                          <div className="flex flex-wrap gap-1">
                            {plantInfo.goodCompanions.map((companion) => (
                              <span
                                key={companion}
                                className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded text-xs"
                              >
                                {companion}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">{dict.badWith}</h4>
                          <div className="flex flex-wrap gap-1">
                            {plantInfo.badCompanions.map((companion) => (
                              <span
                                key={companion}
                                className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded text-xs"
                              >
                                {companion}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {renderGarden()}

      <Dialog open={isCreatingGarden} onOpenChange={setIsCreatingGarden}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dict.newGarden}</DialogTitle>
            <DialogDescription>{dict.subtitle}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{dict.gardenName}</Label>
              <Input id="name" value={newGardenName} onChange={(e) => setNewGardenName(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="width">{dict.width}</Label>
                <Input
                  id="width"
                  type="number"
                  min="1"
                  max="20"
                  value={newGardenWidth}
                  onChange={(e) => setNewGardenWidth(Number.parseInt(e.target.value))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="height">{dict.height}</Label>
                <Input
                  id="height"
                  type="number"
                  min="1"
                  max="20"
                  value={newGardenHeight}
                  onChange={(e) => setNewGardenHeight(Number.parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={createGarden}>{dict.createGarden}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

