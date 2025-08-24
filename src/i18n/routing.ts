import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/garden-planner": {
      es: "/planificador"
    },
    "/growth-tracker": {
      es: "/seguimiento"
    },
    "/planting-calendar": {
      es: "/calendario-de-siembra"
    },
    "/harvest-calendar": {
      es: "/calendario-de-cosecha"
    }
  },
});
