import "server-only"

// Definir el tipo para los diccionarios
export type Dictionary = {
  navigation: {
    home: string
    plantDatabase: string
    gardenPlanner: string
    about: string
    signIn: string
    growthTracker: string
    calendar: string
  }
  hero: {
    title: string
    subtitle: string
    searchPlaceholder: string
    findCompanions: string
  }
  howItWorks: {
    title: string
    subtitle: string
    step1: {
      title: string
      description: string
    }
    step2: {
      title: string
      description: string
    }
    step3: {
      title: string
      description: string
    }
  }
  cropAssistant: {
    title: string
    description: string
    placeholder: string
    welcomeMessage: string
    tomatoResponse: string
    lettuceResponse: string
    carrotResponse: string
    defaultResponse: string
  }
  popularCrops: {
    title: string
    description: string
    benefits: string
    goodCompanions: string
    badCompanions: string
    tomato: {
      name: string
      benefits: string
      good: string[]
      bad: string[]
    }
    lettuce: {
      name: string
      benefits: string
      good: string[]
      bad: string[]
    }
    carrot: {
      name: string
      benefits: string
      good: string[]
      bad: string[]
    }
  }
  footer: {
    rights: string
    terms: string
    privacy: string
    contact: string
  }
  gardenPlanner: {
    title: string
    subtitle: string
    newGarden: string
    saveGarden: string
    loadGarden: string
    gardenName: string
    width: string
    height: string
    createGarden: string
    dragPlants: string
    clearGarden: string
    plantList: string
    gardenTools: string
    addBed: string
    addPath: string
    rotate: string
    delete: string
    noGarden: string
    companionInfo: string
    goodWith: string
    badWith: string
  }
  calendar: {
    title: string
    subtitle: string
    selectRegion: string
    detectLocation: string
    or: string
    selectMonth: string
    whatToPlant: string
    indoors: string
    outdoors: string
    harvest: string
    january: string
    february: string
    march: string
    april: string
    may: string
    june: string
    july: string
    august: string
    september: string
    october: string
    november: string
    december: string
    locationDetected: string
    hardiness: string
    customizeCalendar: string
    hardinessExplanation: string
  }
  growthTracker: {
    title: string
    subtitle: string
    myPlants: string
    addPlant: string
    plantName: string
    plantType: string
    plantingDate: string
    lastWatered: string
    nextWatering: string
    notes: string
    addNote: string
    uploadPhoto: string
    growthStage: string
    seedling: string
    vegetative: string
    flowering: string
    fruiting: string
    harvesting: string
    trackGrowth: string
    addMilestone: string
    viewHistory: string
    noPlants: string
    waterNow: string
    fertilizeNow: string
    plantHealth: string
    healthy: string
    needsAttention: string
    unhealthy: string
  }
  aiInfo: {
    title: string
    description: string
    sdkInfo: string
    costTitle: string
    sdkCost: string
    modelCost: string
    usageTitle: string
    basicExample: string
    advancedExample: string
    learnMore: string
    openaiPricing: string
    vercelAiDocs: string
  }
}

// Diccionarios para cada idioma con datos predeterminados
const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: async () => {
    try {
      return (await import("./dictionaries/en.json")).default as Dictionary
    } catch (error) {
      console.error("Failed to load English dictionary:", error)
      return getDefaultDictionary("en")
    }
  },
  es: async () => {
    try {
      return (await import("./dictionaries/es.json")).default as Dictionary
    } catch (error) {
      console.error("Failed to load Spanish dictionary:", error)
      return getDefaultDictionary("es")
    }
  },
}

// Función para obtener un diccionario predeterminado si falla la carga del JSON
function getDefaultDictionary(locale: string): Dictionary {
  if (locale === "es") {
    return {
      navigation: {
        home: "Inicio",
        plantDatabase: "Base de Plantas",
        gardenPlanner: "Planificador",
        about: "Acerca de",
        signIn: "Iniciar Sesión",
        growthTracker: "Seguimiento",
        calendar: "Calendario",
      },
      hero: {
        title: "Cultiva Mejor en Compañía",
        subtitle:
          "Descubre las plantas compañeras perfectas para tu huerto con nuestro asistente de asociación de cultivos con IA.",
        searchPlaceholder: "Busca un cultivo (ej., tomate)",
        findCompanions: "Buscar Compañeros",
      },
      howItWorks: {
        title: "Cómo Funciona",
        subtitle:
          "Nuestra app con IA te ayuda a crear el huerto perfecto sugiriendo plantas compañeras que crecen bien juntas.",
        step1: {
          title: "1. Selecciona tus Cultivos",
          description: "Elige las plantas que quieres cultivar en tu huerto.",
        },
        step2: {
          title: "2. Obtén Recomendaciones de IA",
          description: "Nuestra IA sugiere las mejores plantas compañeras basadas en datos científicos.",
        },
        step3: {
          title: "3. Planifica tu Huerto",
          description: "Organiza tus plantas de manera óptima usando nuestro planificador interactivo.",
        },
      },
      cropAssistant: {
        title: "Asistente de Cultivos",
        description: "Pregúntame sobre qué plantas crecen bien juntas",
        placeholder: "Pregunta sobre asociación de cultivos...",
        welcomeMessage:
          "¡Hola! Soy tu asistente de asociación de cultivos. ¿Qué plantas estás cultivando o planeas cultivar?",
        tomatoResponse:
          "Los tomates crecen bien junto a albahaca, cebolla, zanahoria y ajo. Evita plantarlos cerca de papas, hinojo o repollo.",
        lettuceResponse:
          "La lechuga se beneficia de estar cerca de zanahorias, rábanos, pepinos y fresas. Mantén alejada de los girasoles.",
        carrotResponse:
          "Las zanahorias crecen bien con tomates, cebollas, puerros y romero. Evita plantarlas cerca de eneldo.",
        defaultResponse:
          "Para darte recomendaciones específicas, necesito saber qué cultivo te interesa. ¿Podrías mencionar alguna planta específica como tomate, lechuga o zanahoria?",
      },
      popularCrops: {
        title: "Cultivos Populares",
        description: "Información sobre asociaciones de cultivos comunes",
        benefits: "Beneficios",
        goodCompanions: "Buenos Compañeros",
        badCompanions: "Malos Compañeros",
        tomato: {
          name: "Tomate",
          benefits: "La albahaca mejora el sabor y repele insectos. Las cebollas y el ajo previenen plagas.",
          good: ["Albahaca", "Cebolla", "Zanahoria", "Ajo", "Perejil"],
          bad: ["Papa", "Hinojo", "Repollo", "Maíz"],
        },
        lettuce: {
          name: "Lechuga",
          benefits: "Crece bien con plantas de raíz que no compiten por nutrientes en la misma capa de suelo.",
          good: ["Zanahoria", "Rábano", "Pepino", "Fresa", "Cebolla"],
          bad: ["Girasol", "Brócoli"],
        },
        carrot: {
          name: "Zanahoria",
          benefits:
            "Los tomates liberan solanina que protege a las zanahorias de plagas. El romero repele la mosca de la zanahoria.",
          good: ["Tomate", "Cebolla", "Puerro", "Romero", "Lechuga"],
          bad: ["Eneldo", "Perejil", "Apio"],
        },
      },
      footer: {
        rights: "© 2025 CultivAI. Todos los derechos reservados.",
        terms: "Términos",
        privacy: "Privacidad",
        contact: "Contacto",
      },
      gardenPlanner: {
        title: "Planificador de Huertos",
        subtitle: "Diseña tu huerto perfecto",
        newGarden: "Nuevo Huerto",
        saveGarden: "Guardar Huerto",
        loadGarden: "Cargar Huerto",
        gardenName: "Nombre del Huerto",
        width: "Ancho",
        height: "Alto",
        createGarden: "Crear Huerto",
        dragPlants: "Arrastra las plantas al huerto",
        clearGarden: "Limpiar Huerto",
        plantList: "Lista de Plantas",
        gardenTools: "Herramientas del Huerto",
        addBed: "Añadir Parterre",
        addPath: "Añadir Camino",
        rotate: "Rotar",
        delete: "Eliminar",
        noGarden: "No hay huerto seleccionado",
        companionInfo: "Información de Compañeros",
        goodWith: "Crece bien con",
        badWith: "Crece mal con",
      },
      calendar: {
        title: "Calendario de Siembra",
        subtitle: "Planifica tu siembra según tu ubicación",
        selectRegion: "Selecciona tu región",
        detectLocation: "Detectar mi ubicación",
        or: "o",
        selectMonth: "Selecciona un mes",
        whatToPlant: "Qué plantar",
        indoors: "En interior",
        outdoors: "En exterior",
        harvest: "Cosecha",
        january: "Enero",
        february: "Febrero",
        march: "Marzo",
        april: "Abril",
        may: "Mayo",
        june: "Junio",
        july: "Julio",
        august: "Agosto",
        september: "Septiembre",
        october: "Octubre",
        november: "Noviembre",
        december: "Diciembre",
        locationDetected: "Ubicación detectada",
        hardiness: "Zona de rusticidad",
        customizeCalendar: "Personalizar Calendario",
        hardinessExplanation: "Explicación de la zona de rusticidad",
      },
      growthTracker: {
        title: "Seguimiento de Crecimiento",
        subtitle: "Monitorea el progreso de tus plantas",
        myPlants: "Mis Plantas",
        addPlant: "Añadir Planta",
        plantName: "Nombre de la Planta",
        plantType: "Tipo de Planta",
        plantingDate: "Fecha de Siembra",
        lastWatered: "Último Riego",
        nextWatering: "Próximo Riego",
        notes: "Notas",
        addNote: "Añadir Nota",
        uploadPhoto: "Subir Foto",
        growthStage: "Etapa de Crecimiento",
        seedling: "Plántula",
        vegetative: "Vegetativa",
        flowering: "Floración",
        fruiting: "Fructificación",
        harvesting: "Cosecha",
        trackGrowth: "Seguir Crecimiento",
        addMilestone: "Añadir Hito",
        viewHistory: "Ver Historial",
        noPlants: "No hay plantas registradas",
        waterNow: "Regar Ahora",
        fertilizeNow: "Fertilizar Ahora",
        plantHealth: "Salud de la Planta",
        healthy: "Saludable",
        needsAttention: "Necesita Atención",
        unhealthy: "No Saludable",
      },
      aiInfo: {
        title: "Información de la IA",
        description: "Detalles sobre el uso de la IA en esta aplicación",
        sdkInfo: "Información del SDK",
        costTitle: "Costos",
        sdkCost: "Costo del SDK",
        modelCost: "Costo del Modelo",
        usageTitle: "Uso",
        basicExample: "Ejemplo Básico",
        advancedExample: "Ejemplo Avanzado",
        learnMore: "Aprende Más",
        openaiPricing: "Precios de OpenAI",
        vercelAiDocs: "Documentación de Vercel AI",
      },
    }
  } else {
    return {
      navigation: {
        home: "Home",
        plantDatabase: "Plant Database",
        gardenPlanner: "Garden Planner",
        about: "About",
        signIn: "Sign In",
        growthTracker: "Growth Tracker",
        calendar: "Calendar",
      },
      hero: {
        title: "Grow Better Together",
        subtitle:
          "Discover the perfect plant companions for your garden with our AI-powered crop association assistant.",
        searchPlaceholder: "Search for a crop (e.g., tomato)",
        findCompanions: "Find Companions",
      },
      howItWorks: {
        title: "How It Works",
        subtitle:
          "Our AI-powered app helps you create the perfect garden by suggesting companion plants that grow well together.",
        step1: {
          title: "1. Select Your Crops",
          description: "Choose the plants you want to grow in your garden.",
        },
        step2: {
          title: "2. Get AI Recommendations",
          description: "Our AI suggests the best companion plants based on scientific data.",
        },
        step3: {
          title: "3. Plan Your Garden",
          description: "Arrange your plants optimally using our interactive garden planner.",
        },
      },
      cropAssistant: {
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
      },
      popularCrops: {
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
      },
      footer: {
        rights: "© 2025 CultivAI. All rights reserved.",
        terms: "Terms",
        privacy: "Privacy",
        contact: "Contact",
      },
      gardenPlanner: {
        title: "Garden Planner",
        subtitle: "Design your perfect garden",
        newGarden: "New Garden",
        saveGarden: "Save Garden",
        loadGarden: "Load Garden",
        gardenName: "Garden Name",
        width: "Width",
        height: "Height",
        createGarden: "Create Garden",
        dragPlants: "Drag plants to the garden",
        clearGarden: "Clear Garden",
        plantList: "Plant List",
        gardenTools: "Garden Tools",
        addBed: "Add Bed",
        addPath: "Add Path",
        rotate: "Rotate",
        delete: "Delete",
        noGarden: "No garden selected",
        companionInfo: "Companion Info",
        goodWith: "Good With",
        badWith: "Bad With",
      },
      calendar: {
        title: "Planting Calendar",
        subtitle: "Plan your planting based on your location",
        selectRegion: "Select your region",
        detectLocation: "Detect my location",
        or: "or",
        selectMonth: "Select a month",
        whatToPlant: "What to plant",
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
        hardiness: "Hardiness zone",
        customizeCalendar: "Customize Calendar",
        hardinessExplanation: "Hardiness zone explanation",
      },
      growthTracker: {
        title: "Growth Tracker",
        subtitle: "Monitor your plants' progress",
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
        noPlants: "No plants registered",
        waterNow: "Water Now",
        fertilizeNow: "Fertilize Now",
        plantHealth: "Plant Health",
        healthy: "Healthy",
        needsAttention: "Needs Attention",
        unhealthy: "Unhealthy",
      },
      aiInfo: {
        title: "AI Information",
        description: "Details about the AI usage in this application",
        sdkInfo: "SDK Information",
        costTitle: "Costs",
        sdkCost: "SDK Cost",
        modelCost: "Model Cost",
        usageTitle: "Usage",
        basicExample: "Basic Example",
        advancedExample: "Advanced Example",
        learnMore: "Learn More",
        openaiPricing: "OpenAI Pricing",
        vercelAiDocs: "Vercel AI Docs",
      },
    }
  }
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  // Validar que el locale es soportado
  if (!dictionaries[locale]) {
    console.warn(`Locale ${locale} not supported, falling back to 'en'`)
    return dictionaries["en"]()
  }

  try {
    return await dictionaries[locale]()
  } catch (error) {
    console.error(`Error loading dictionary for locale ${locale}:`, error)
    // Intentar usar inglés como respaldo si otro locale falla
    if (locale !== "en") {
      try {
        return dictionaries["en"]()
      } catch (fallbackError) {
        console.error("Error loading fallback dictionary:", fallbackError)
        // Si todo falla, usar un diccionario predeterminado en memoria
        return getDefaultDictionary("en")
      }
    }
    // Si el inglés falla, usar un diccionario predeterminado en memoria
    return getDefaultDictionary("en")
  }
}

