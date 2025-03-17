"use client"

import { useState, useEffect } from "react"
import { Bot, Send, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Dictionary } from "@/app/[lang]/dictionaries"
// Actualizar la importación del AssistantAvatar
import { AssistantAvatar } from "@/components/custom/assistant-avatar"

type Message = {
  role: "user" | "assistant"
  content: string
}

// Respuestas mejoradas para el asistente
const enhancedResponses = {
  tomato: {
    en: "Tomatoes grow well with basil, onions, carrots, and garlic. Basil improves tomato flavor and repels insects, while onions and garlic prevent pests. Avoid planting them near potatoes (they can transmit diseases to each other), fennel (inhibits tomato growth), or cabbage family plants (compete for nutrients).",
    es: "Los tomates crecen bien junto a albahaca, cebolla, zanahoria y ajo. La albahaca mejora el sabor del tomate y repele insectos, mientras que las cebollas y el ajo previenen plagas. Evita plantarlos cerca de papas (pueden transmitirse enfermedades), hinojo (inhibe el crecimiento del tomate) o plantas de la familia del repollo (compiten por nutrientes).",
  },
  lettuce: {
    en: "Lettuce benefits from being near carrots, radishes, cucumbers, and strawberries. These companions don't compete for nutrients in the same soil layer. Strawberries can act as ground cover, reducing weeds. Keep lettuce away from sunflowers, which can inhibit lettuce growth, and broccoli, which competes for similar nutrients.",
    es: "La lechuga se beneficia de estar cerca de zanahorias, rábanos, pepinos y fresas. Estos compañeros no compiten por nutrientes en la misma capa de suelo. Las fresas pueden actuar como cobertura del suelo, reduciendo las malas hierbas. Mantén la lechuga alejada de los girasoles, que pueden inhibir su crecimiento, y del brócoli, que compite por nutrientes similares.",
  },
  carrot: {
    en: "Carrots grow well with tomatoes, onions, leeks, and rosemary. Tomatoes release solanine which protects carrots from pests, while rosemary repels carrot fly with its strong aroma. Avoid planting them near dill, which can cross-pollinate with carrots and reduce their quality, or other root vegetables that compete for space and nutrients.",
    es: "Las zanahorias crecen bien con tomates, cebollas, puerros y romero. Los tomates liberan solanina que protege a las zanahorias de plagas, mientras que el romero repele la mosca de la zanahoria con su fuerte aroma. Evita plantarlas cerca de eneldo, que puede polinizar cruzadamente con las zanahorias y reducir su calidad, u otras hortalizas de raíz que compiten por espacio y nutrientes.",
  },
}

// Función para detectar el cultivo en el texto
function detectCrop(text: string, lang: string): string | null {
  const lowerText = text.toLowerCase()

  // Detectar tomate
  if (lowerText.includes("tomate") || lowerText.includes("tomato") || lowerText.includes("tomatoes")) {
    return "tomato"
  }

  // Detectar lechuga
  if (lowerText.includes("lechuga") || lowerText.includes("lettuce")) {
    return "lettuce"
  }

  // Detectar zanahoria
  if (lowerText.includes("zanahoria") || lowerText.includes("carrot") || lowerText.includes("carrots")) {
    return "carrot"
  }

  // Detectar consulta general sobre asociación de cultivos
  if (
    (lowerText.includes("companion") && lowerText.includes("plant")) ||
    (lowerText.includes("grow") && lowerText.includes("together")) ||
    (lowerText.includes("compañero") && lowerText.includes("planta")) ||
    (lowerText.includes("crece") && lowerText.includes("junto"))
  ) {
    return "general"
  }

  return null
}

// Default messages in case dictionary is undefined
const defaultMessages = {
  title: "Crop Assistant",
  description: "Ask me about which plants grow well together",
  placeholder: "Ask about crop associations...",
  welcomeMessage: "Hello! I'm your crop association assistant. What plants are you growing or planning to grow?",
  tomatoResponse:
    "Tomatoes grow well with basil, onions, carrots, and garlic. Avoid planting them near potatoes, fennel, or cabbage.",
  lettuceResponse:
    "Lettuce benefits from being near carrots, radishes, cucumbers, and strawberries. Keep it away from sunflowers.",
  carrotResponse: "Carrots grow well with tomatoes, onions, leeks, and rosemary. Avoid planting them near dill.",
  defaultResponse:
    "To give you specific recommendations, I need to know which crop you're interested in. Could you mention a specific plant like tomato, lettuce, or carrot?",
}

export default function CropAssistant({
  lang,
  dictionary,
}: {
  lang: string
  dictionary?: Dictionary
}) {
  // Use dictionary.cropAssistant if available, otherwise use defaultMessages
  const messages = dictionary?.cropAssistant || defaultMessages

  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: messages.welcomeMessage,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isUsingAI, setIsUsingAI] = useState(false)

  // Función para generar una respuesta más detallada
  const generateEnhancedResponse = (cropType: string): string => {
    if (cropType === "tomato" || cropType === "lettuce" || cropType === "carrot") {
      return enhancedResponses[cropType][lang === "es" ? "es" : "en"]
    }

    if (cropType === "general") {
      if (lang === "es") {
        return "La asociación de cultivos es una técnica de jardinería que consiste en plantar diferentes especies juntas para beneficio mutuo. Algunas plantas repelen plagas, otras mejoran el sabor, y otras ayudan a maximizar el espacio. Por ejemplo, las tres hermanas (maíz, frijoles y calabaza) es una asociación tradicional donde el maíz proporciona soporte para los frijoles, los frijoles fijan nitrógeno, y la calabaza proporciona cobertura del suelo."
      } else {
        return "Companion planting is a gardening technique that involves planting different species together for mutual benefit. Some plants repel pests, others improve flavor, and some help maximize space. For example, the Three Sisters (corn, beans, and squash) is a traditional companion planting where corn provides support for beans, beans fix nitrogen, and squash provides ground cover."
      }
    }

    return messages.defaultResponse
  }

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = { role: "user", content: input }
    setChatMessages([...chatMessages, userMessage])
    setInput("")
    setIsLoading(true)

    // Detectar el cultivo en la consulta
    const cropType = detectCrop(input, lang)

    // Simular AI response con un retraso
    setTimeout(() => {
      let response = ""

      if (isUsingAI && cropType) {
        // Usar respuestas mejoradas
        response = generateEnhancedResponse(cropType)
      } else {
        // Usar respuestas básicas
        const lowerInput = input.toLowerCase()

        if (lowerInput.includes("tomate") || lowerInput.includes("tomato")) {
          response = messages.tomatoResponse
        } else if (lowerInput.includes("lechuga") || lowerInput.includes("lettuce")) {
          response = messages.lettuceResponse
        } else if (lowerInput.includes("zanahoria") || lowerInput.includes("carrot")) {
          response = messages.carrotResponse
        } else {
          response = messages.defaultResponse
        }
      }

      const assistantMessage: Message = { role: "assistant", content: response }
      setChatMessages((prevMessages) => [...prevMessages, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  // Obtener la ubicación del usuario para recomendaciones localizadas
  useEffect(() => {
    // Simulación de geolocalización - en una implementación real usaríamos la API de geolocalización
    const simulateGeolocation = () => {
      // Aquí se implementaría la lógica real de geolocalización
      console.log("Geolocation would be detected here")
    }

    simulateGeolocation()
  }, [])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-green-600" />
          {messages.title}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-6 w-6 rounded-full ${isUsingAI ? "bg-primary/20" : ""}`}
                  onClick={() => setIsUsingAI(!isUsingAI)}
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isUsingAI ? "Using enhanced AI responses" : "Click to enable enhanced AI responses"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>{messages.description}</CardDescription>
      </CardHeader>
      <CardContent className="overflow-y-auto max-h-[400px]">
        <div className="space-y-4">
          {chatMessages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex items-start gap-2 max-w-[80%]">
                {message.role === "assistant" && <AssistantAvatar />}
                <div
                  className={`rounded-lg px-3 py-2 text-sm ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8 mt-0.5">
                    <AvatarFallback className="bg-primary/10 text-primary">U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 max-w-[80%]">
                <AssistantAvatar />
                <div className="rounded-lg px-3 py-2 text-sm bg-muted">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            placeholder={messages.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Enviar</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

