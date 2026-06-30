# La Última Vez Que Empiezas De Cero

PWA de transformación personal de 30 días. Todos los datos se almacenan localmente en el dispositivo del usuario.

## Stack técnico

- **Framework:** Next.js 15 (App Router)
- **Estilos:** Tailwind CSS 3.4 con sistema de diseño custom
- **Almacenamiento:** IndexedDB via Dexie.js (100% local, sin servidor)
- **Animaciones:** Framer Motion
- **Íconos:** Lucide React
- **PWA:** next-pwa (instalable en pantalla de inicio)
- **Deploy:** Vercel

## Estructura del proyecto

```
src/
├── app/                    # Páginas (App Router)
│   ├── layout.tsx          # Layout raíz (fonts, PWA meta)
│   ├── page.tsx            # Entry point (onboarding ↔ dashboard)
│   └── globals.css         # Sistema de diseño completo
├── components/
│   ├── onboarding/         # 5 pantallas de onboarding
│   ├── dashboard/          # Dashboard principal
│   ├── modules/            # Módulos 1-5
│   ├── layout/             # Navegación, header
│   └── ui/                 # Componentes reutilizables
├── lib/
│   ├── db.ts               # Esquema Dexie.js + helpers
│   └── hooks/              # Custom hooks
├── data/
│   ├── declaraciones.ts    # 30 declaraciones diarias
│   ├── lecciones.ts        # 30 micro-lecciones
│   └── constantes.ts       # Niveles, mensajes, opciones
└── types/
    └── index.ts            # Tipos TypeScript
```

## Sistema de diseño

- **Paleta:** Obsidiana (#0F0F12), Oro Antiguo (#C8A44E), Marfil (#F7F5F0)
- **Tipografía:** Instrument Serif (display) + Instrument Sans (body)
- **Componentes:** btn-primary, btn-gold, btn-ghost, card, pill, option-btn
- **Mobile-first:** Diseñado para teléfonos, con safe-area-insets

## Almacenamiento local

Toda la información se guarda en IndexedDB del navegador:
- Perfil de usuario y racha
- Días completados con metas y micro-acciones
- Recetas de hábitos
- Reflexiones semanales
- Rescates y recuperaciones
- Carta al yo futuro (sellada hasta día 30)

**Nota:** Si el usuario cambia de teléfono, puede reinstalar la app desde su link de compra y empezar de nuevo.

## Setup

```bash
npm install
npm run dev
```

## Deploy a Vercel

```bash
npx vercel
```

## Integración con Hotmart

El flujo de compra:
1. Usuario compra en Hotmart ($27 USD)
2. Hotmart envía email con link de la app
3. Usuario abre el link en su navegador móvil
4. Instala la PWA en su pantalla de inicio
5. Completa el onboarding y comienza el programa

## Archivos pendientes

- [ ] Íconos de la PWA (public/icons/)
- [ ] Logo de la marca (public/logo.png)
- [ ] Implementación completa de cada módulo
- [ ] Implementación de las pantallas según diseños de Stitch
