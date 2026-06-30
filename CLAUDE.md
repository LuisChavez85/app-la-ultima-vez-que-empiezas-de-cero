# LA ÚLTIMA VEZ QUE EMPIEZAS DE CERO — Contexto del Proyecto

## QUÉ ES ESTO

PWA de transformación personal de 30 días. El usuario compra por $27 USD en Hotmart, recibe el link, abre en el móvil e instala como app. Todos los datos se guardan 100% local en el dispositivo del usuario con IndexedDB (Dexie.js). NO hay servidor, NO hay autenticación, NO hay base de datos remota.

## STACK TÉCNICO

- **Framework:** Next.js 15 (App Router)
- **Estilos:** Tailwind CSS 3.4
- **Almacenamiento:** IndexedDB via Dexie.js (100% local)
- **Animaciones:** Framer Motion
- **Íconos:** Lucide React
- **PWA:** next-pwa
- **Deploy:** Vercel
- **Pago/entrega:** Hotmart (externo, no se integra en la app)

## SISTEMA DE DISEÑO — "Obsidian Alchemy"

### Paleta
- Obsidiana: `#0F0F12` (fondo principal)
- Grafito: `#1A1A20` (cards, inputs)
- Humo: `#2A2A32` (bordes, separadores)
- Marfil: `#F7F5F0` (texto principal)
- Niebla: `#E8E5DE` (texto secundario)
- Oro Antiguo: `#C8A44E` (acento principal, CTAs)
- Oro Claro: `#E8D5A0` (hover dorado)
- Oro Tenue: `#8B7335` (oro apagado)

### Colores de módulos
- Módulo 1 (Antiabandono): `#00D4AA` (esmeralda)
- Módulo 2 (Cadena): `#8B5CF6` (púrpura)
- Módulo 3 (Rescate): `#F59E0B` (ámbar)
- Módulo 4 (Confianza): `#EC4899` (rosa)
- Módulo 5 (Microvictorias): `#06B6D4` (cian)
- Bono 1 (Anti-Recaída): `#EF4444` (rojo)
- Bono 3 (Reinicio Mental): `#10B981` (esmeralda oscuro)

### Tipografía
- **Display/emocional:** Instrument Serif (italic, títulos, momentos importantes)
- **Interface/body:** Instrument Sans (textos, botones, labels)
- Tags/labels: 11px, tracking 0.12em, uppercase, font-semibold
- Body: 14px, font-medium
- Headlines: 20-24px, Instrument Serif italic

### Principios visuales
- TODO debe sentirse PREMIUM y CARO, nunca genérico
- Mobile-first, max-width 600px
- Fondo siempre oscuro (obsidian)
- Acentos dorados con moderación
- Glass morphism sutil en cards
- Transiciones suaves (300ms cubic-bezier)
- Safe-area-insets para notch/home indicator

## ARQUITECTURA DE LA APP (FIJA — NO replantear)

### Estructura
```
5 Módulos:
1. Sistema Antiabandono de 5 Minutos (color: esmeralda)
2. Método Cadena Imparable (color: púrpura)
3. Protocolo de Rescate Inmediato (color: ámbar)
4. Mapa de Reconstrucción de Confianza Personal (color: rosa)
5. Sistema de Microvictorias Diarias (color: cian)

3 Bonos:
1. Protocolo Anti-Recaída de 24 Horas (color: rojo)
2. Calendario Visual de Rachas Imparables (color: púrpura)
3. Reinicio Mental de Emergencia (color: esmeralda oscuro)

Features transversales:
- Onboarding (5 pantallas + 5 preguntas diagnóstico)
- Dashboard con Puerta de Entrada Diaria
- Tablero de Evidencia
- 30 Micro-lecciones diarias
- Reflexión Semanal (días 7, 14, 21, 28)
- Ceremonia Día 30
- Botón SOS flotante
```

### Flujo del usuario
1. Compra en Hotmart → recibe link
2. Abre link → ve Onboarding (bienvenida → datos → diagnóstico x5 → carta al futuro → pacto)
3. Cada día abre la app → Puerta de Entrada (Módulo 1: ritual de 5 min) → Dashboard
4. Puede acceder a todos los módulos/bonos desde el Dashboard
5. Día 30 → Ceremonia final con desbloqueo de carta

## ARCHIVOS DE REFERENCIA

### `BLUEPRINT_APP.md` (en raíz del proyecto)
Documento maestro con TODA la arquitectura, flujos, textos, 30 declaraciones, 30 micro-lecciones, preguntas del diagnóstico, preguntas del wizard, mensajes contextuales, etc. CONSULTAR SIEMPRE antes de implementar cualquier pantalla.

### `/reference/stitch/` (diseños HTML de Google Stitch)
21 archivos HTML que son la FUENTE DE VERDAD del diseño visual. Cada carpeta tiene un `code.html` con el diseño implementado. Úsalos como referencia directa para clases de Tailwind, espaciado, colores y estructura visual.

Pantallas con diseño HTML disponible:
- `bienvenida_dise_o_premium_refinado/` — Pantalla de bienvenida
- `onboarding_datos_b_sicos/` — Solo screenshot (implementar siguiendo el patrón)
- `onboarding_diagn_stico_1_corregido/` — Diagnóstico pregunta 1
- `onboarding_diagn_stico_2/` — Diagnóstico pregunta 2
- `onboarding_diagn_stico_3_corregido/` — Diagnóstico pregunta 3
- `onboarding_diagn_stico_4_consolidado/` — Diagnóstico pregunta 4
- `onboarding_diagn_stico_5_completo/` — Diagnóstico pregunta 5 (texto libre)
- `onboarding_carta_al_futuro/` — Carta al yo futuro
- `onboarding_pacto_de_compromiso_corregido/` — Pacto de compromiso
- `m_dulo_1_ritual_con_interacci_n_circular/` — Módulo 1
- `m_dulo_2_calendario_con_aura_restaurada/` — Módulo 2
- `m_dulo_4_mapa_de_confianza_premium/` — Módulo 4
- `m_dulo_5_sistema_de_microvictorias/` — Módulo 5
- `bono_1_protocolo_anti_reca_da_24h/` — Bono 1
- `bono_2_calendario_visual_de_rachas_imparables/` — Bono 2
- `bono_3_reinicio_mental_parte_1/` — Bono 3 escritura
- `bono_3_la_quema_de_culpa/` — Bono 3 quema
- `bono_3_nueva_identidad/` — Bono 3 reescritura
- `micro_lecci_n_d_a_1/` — Micro-lección
- `reflexi_n_semanal_paso_1/` — Reflexión semanal
- `reflexi_n_semanal_finalizada/` — Reflexión completada
- `tablero_de_evidencia_consolidado_de_logros/` — Tablero evidencia
- `ceremonia_d_a_30_desbloqueo_de_carta/` — Ceremonia día 30
- `ceremonia_d_a_30_comparativa_de_cambio/` — Comparación día 30
- `ceremonia_d_a_30_certificado_oficial/` — Certificado

Pantallas SIN diseño (implementar siguiendo el sistema de diseño):
- Dashboard principal
- Módulo 3 (Protocolo de Rescate)
- Wizard "Mi Yo 2.0" preguntas 2, 3, 4 y 7

### Mapeo de colores Stitch → Tailwind
Los HTML de Stitch usan nombres diferentes a los del tailwind.config.ts:
- `obsidiana` → `obsidian`
- `marfil` → `ivory`
- `grafito` → `graphite`
- `humo` → `smoke`
- `oro-antiguo` → `gold`
- `on-surface-variant` → `ivory/50`
- `surface-container-low` → `bg-[#1b1b21]` o `graphite`
- `surface-container-high` → `smoke`
- `on-surface` → `ivory/90`

Material Symbols (en Stitch) → Lucide React (en la app)

## ESTADO ACTUAL

### Lo que YA está construido (scaffolding)
- ✅ `package.json` con todas las dependencias
- ✅ `tailwind.config.ts` con sistema de diseño completo
- ✅ `globals.css` con clases de componentes (btn-gold, card, input-field, etc.)
- ✅ `src/types/index.ts` — Todos los tipos TypeScript
- ✅ `src/lib/db.ts` — Esquema Dexie.js + funciones helper
- ✅ `src/data/declaraciones.ts` — 30 declaraciones diarias
- ✅ `src/data/lecciones.ts` — 30 micro-lecciones por semana
- ✅ `src/data/constantes.ts` — 7 niveles confianza, mensajes racha, evolución cromática
- ✅ `src/app/layout.tsx` — Layout con fonts
- ✅ `src/app/page.tsx` — Router principal (onboarding ↔ dashboard)
- ✅ `src/app/globals.css` — Sistema de diseño CSS
- ✅ PWA manifest

### Lo que FALTA implementar (en este orden sugerido)
**Fase 1 — Onboarding + Dashboard (flujo core):**
1. Onboarding completo (8 sub-pantallas) ← EMPEZAR AQUÍ
2. Dashboard con anillo de racha y Puerta de Entrada
3. Módulo 1: Ritual diario de 5 minutos (flujo de 3 pasos)
4. Navegación inferior (4 tabs: Inicio, Cadena, Evidencia, Ajustes)

**Fase 2 — Módulos:**
5. Módulo 2: Calendario de Identidad + Avatar
6. Módulo 3: Protocolo de Rescate (5 pasos secuenciales)
7. Módulo 4: Mapa de Confianza (wizard + 7 niveles)
8. Módulo 5: Microvictorias (recipe builder + celebración)
9. Micro-lecciones diarias

**Fase 3 — Bonos + Transversales:**
10. Bono 1: Anti-Recaída 24h
11. Bono 2: Calendario Visual
12. Bono 3: Reinicio Mental (Quema de Culpa)
13. Tablero de Evidencia
14. Reflexiones semanales
15. Ceremonia Día 30

**Fase 4 — Pulido:**
16. Animaciones con Framer Motion
17. Hitos compartibles
18. Testing y responsive
19. Deploy a Vercel

## REGLAS DE IMPLEMENTACIÓN

1. **NO replantear la arquitectura** — está definida en BLUEPRINT_APP.md
2. **Consultar el HTML de Stitch** antes de implementar cada pantalla
3. **Mobile-first** — diseñar para 375px, max-width 600px
4. **Lucide React para íconos** — NO Material Symbols
5. **Todo el contenido está en español**
6. **Los datos se guardan en IndexedDB** con las funciones de `src/lib/db.ts`
7. **Sin autenticación** — acceso directo sin login
8. **Sin push notifications** — solo tarjetas in-app
9. **Instrument Serif para momentos emocionales**, Instrument Sans para interfaz
10. **Cada componente debe sentirse premium** — no genérico

## COMANDOS ÚTILES

```bash
npm run dev          # Dev server
npm run build        # Build producción
npx vercel           # Deploy a Vercel
npx vercel --prod    # Deploy producción
```
