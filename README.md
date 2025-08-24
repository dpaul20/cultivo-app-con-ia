
# Cultivo App con IA

Aplicación web para planificación, seguimiento y asistencia inteligente en huertos, desarrollada con Next.js, TypeScript y Tailwind CSS.

## Tabla de Contenido

- [Introducción](#introducción)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Funcionalidades y páginas](#funcionalidades-y-páginas)
- [Componentes clave](#componentes-clave)
- [Tecnologías](#tecnologías)
- [ROADMAP](#roadmap)
- [ROADMAP TÉCNICO](#roadmap-técnico)

## Introducción

Cultivo App con IA es una plataforma personal para organizar, planificar y optimizar tu huerto, con soporte multilenguaje y funcionalidades inteligentes.

## Instalación y ejecución

1. Instala las dependencias:

    ```bash
    npm install
    # o
    yarn install
    ```

2. Inicia el servidor de desarrollo:

    ```bash
    npm run dev
    # o
    yarn dev
    ```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

Puedes editar cualquier página en `app/[lang]/` y los cambios se reflejarán automáticamente.

## Funcionalidades y páginas

### Páginas principales

- **Garden Planner** (`/[lang]/garden-planner`): Planificador interactivo de huertos para diseñar tu jardín arrastrando y soltando plantas.
- **Growth Tracker** (`/[lang]/growth-tracker`): Seguimiento de crecimiento para registrar y monitorear el progreso de tus plantas, incluyendo notas y fotos.
- **Planting Calendar** (`/[lang]/planting-calendar`): Calendario de siembra que sugiere los mejores momentos para sembrar según la ubicación y zona de rusticidad.
- **Harvest Calendar** (`/[lang]/harvest-calendar`): Calcula el calendario de cosecha basado en la ubicación y fechas de siembra.
- **Crop Assistant**: Asistente con IA para consultas sobre asociaciones de cultivos y plantas compañeras.
- **Soporte multilenguaje**: Navegación y contenido disponible en español e inglés.

## Componentes clave

- **SiteHeader y SiteFooter**: Encabezado y pie de página con navegación y selector de idioma.
- **MobileMenu**: Menú de navegación adaptado para dispositivos móviles.
- **Diccionarios**: Sistema de traducción y textos centralizados en `app/[lang]/dictionaries`.

## Tecnologías

- [Next.js](https://nextjs.org/) 15+
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## ROADMAP

### Mejoras y funcionalidades pendientes

- Mejorar la lógica de cálculo del calendario de cosecha (usar datos reales y personalización por región/variedad).
- Agregar autenticación y perfiles de usuario para guardar jardines y seguimientos personalizados.
- Permitir exportar/importar diseños de huertos y registros de crecimiento.
- Integrar notificaciones para recordatorios de riego, siembra y cosecha.
- Añadir más idiomas y mejorar la gestión de traducciones.
- Optimizar la experiencia móvil y accesibilidad.
- Incluir más cultivos y asociaciones en la base de datos.
- Mejorar la interfaz del asistente con IA y permitir consultas más complejas.
- Documentar la API interna y los endpoints disponibles.

---

## ROADMAP TÉCNICO

### Dependencias y posibles sustituciones

- **Gestión de estado**  
    Actualmente: React useState/useContext  
    Sugerencia: [Zustand](https://zustand-demo.pmnd.rs/) o [Redux Toolkit](https://redux-toolkit.js.org/) para manejo de estado global más robusto.

- **Internacionalización (i18n)**  
    Actualmente: Diccionarios manuales en `app/[lang]/dictionaries`  
    Sugerencia: [next-intl](https://github.com/amannn/next-intl) o [react-i18next](https://react.i18next.com/) para soporte avanzado de traducciones.

- **Gestión de formularios**  
    Actualmente: Formularios controlados con useState  
    Sugerencia: [React Hook Form](https://react-hook-form.com/) para validación y manejo eficiente de formularios.

- **Carga y almacenamiento de imágenes**  
    Actualmente: URLs directas y estado local  
    Sugerencia: [Cloudinary](https://cloudinary.com/) o [Firebase Storage](https://firebase.google.com/products/storage) para almacenamiento externo y optimización de imágenes.

- **Autenticación**  
    Actualmente: No implementada  
    Sugerencia: [NextAuth.js](https://next-auth.js.org/) para autenticación social y personalizada.

- **Notificaciones y recordatorios**  
    Actualmente: No implementado  
    Sugerencia: [react-toastify](https://fkhadra.github.io/react-toastify/) para notificaciones en la UI y [OneSignal](https://onesignal.com/) para push notifications.

- **Base de datos y persistencia**  
    Actualmente: Estado local  
    Sugerencia: [Prisma](https://www.prisma.io/) + [PostgreSQL](https://www.postgresql.org/) o [Firebase Firestore](https://firebase.google.com/products/firestore) para persistencia de datos.

- **Testing**  
    Actualmente: No implementado  
    Sugerencia: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) para pruebas unitarias y de integración.

- **Accesibilidad**  
    Sugerencia: [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) para mejorar la accesibilidad del código.

### Cómo migrar

- Reemplaza el manejo de estado local/global por la librería seleccionada.
- Sustituye los diccionarios manuales por una solución de i18n.
- Refactoriza los formularios para usar React Hook Form.
- Integra el proveedor de imágenes y la autenticación según la documentación oficial de cada paquete.
