import { Info, ExternalLink } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Dictionary } from "@/app/[lang]/dictionaries"

export default function AiSdkInfo({
  lang,
  dictionary,
}: {
  lang: string
  dictionary?: Dictionary
}) {
  // Textos predeterminados en caso de que no haya diccionario
  const defaultTexts = {
    title: lang === "es" ? "Información sobre Vercel AI SDK" : "Vercel AI SDK Information",
    description:
      lang === "es"
        ? "Información sobre costos y uso del SDK de IA de Vercel"
        : "Information about costs and usage of Vercel AI SDK",
    sdkInfo:
      lang === "es"
        ? "El Vercel AI SDK es una herramienta gratuita que simplifica la integración de modelos de IA en aplicaciones web."
        : "The Vercel AI SDK is a free tool that simplifies integrating AI models into web applications.",
    costTitle: lang === "es" ? "Información de Costos" : "Cost Information",
    sdkCost:
      lang === "es" ? "El SDK en sí es gratuito y de código abierto." : "The SDK itself is free and open source.",
    modelCost:
      lang === "es"
        ? "Los modelos de IA como GPT-4 tienen costos asociados con el proveedor (OpenAI)."
        : "AI models like GPT-4 have costs associated with the provider (OpenAI).",
    usageTitle: lang === "es" ? "Ejemplos de Uso" : "Usage Examples",
    basicExample: lang === "es" ? "Ejemplo Básico" : "Basic Example",
    advancedExample: lang === "es" ? "Ejemplo Avanzado" : "Advanced Example",
    learnMore: lang === "es" ? "Más información" : "Learn more",
    openaiPricing: lang === "es" ? "Precios de OpenAI" : "OpenAI Pricing",
    vercelAiDocs: lang === "es" ? "Documentación de Vercel AI" : "Vercel AI Documentation",
  }

  // Usar textos del diccionario si están disponibles, o los predeterminados
  const texts = dictionary?.aiInfo || defaultTexts

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          {texts.title}
        </CardTitle>
        <CardDescription>{texts.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTitle>{texts.costTitle}</AlertTitle>
          <AlertDescription className="space-y-2">
            <p>{texts.sdkInfo}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{texts.sdkCost}</li>
              <li>{texts.modelCost}</li>
            </ul>
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">{texts.basicExample}</TabsTrigger>
            <TabsTrigger value="advanced">{texts.advancedExample}</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="p-4 border rounded-md mt-2 bg-muted/30">
            <pre className="text-sm overflow-x-auto">
              <code>{`import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function generatePlantingAdvice(crop) {
  const { text } = await generateText({
    model: openai('gpt-4o'),
    prompt: \`Give advice for planting \${crop}\`,
  })
  
  return text
}`}</code>
            </pre>
          </TabsContent>
          <TabsContent value="advanced" className="p-4 border rounded-md mt-2 bg-muted/30">
            <pre className="text-sm overflow-x-auto">
              <code>{`import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function createChatbot(req, res) {
  const { prompt } = req.body
  
  const result = streamText({
    model: openai('gpt-4o'),
    system: "You are a gardening assistant",
    prompt,
    temperature: 0.7,
  })
  
  return new Response(result.stream)
}`}</code>
            </pre>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button variant="outline" className="flex items-center gap-2" asChild>
            <a href="https://openai.com/pricing" target="_blank" rel="noopener noreferrer">
              {texts.openaiPricing}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" className="flex items-center gap-2" asChild>
            <a href="https://sdk.vercel.ai/docs" target="_blank" rel="noopener noreferrer">
              {texts.vercelAiDocs}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

