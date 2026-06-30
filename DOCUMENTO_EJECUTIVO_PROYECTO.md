# DOCUMENTO EJECUTIVO DEL PROYECTO
# "La Última Vez Que Empiezas De Cero" — App Web

---

## RESUMEN DEL PROYECTO

**Producto:** Aplicación web (PWA) que acompaña un programa de transformación personal de 30 días enfocado en reconstruir la consistencia y la autoconfianza del usuario.

**Modelo de negocio:** Se vende como producto digital a $27 USD (pago único) desde una landing page alojada en https://la-ultima-vez-que-empiezas-de-cero.vercel.app. El cliente compra, recibe acceso a la app, y la usa durante 30 días (con acceso permanente después).

**Propietario:** Luis Genaro Chávez Santana (proyecto personal, NO relacionado con LG Consultoría Jurídica & Administrativa).

**Objetivo central del producto:** Que el usuario reconstruya la confianza en su propia palabra mediante evidencia acumulada de cumplimiento diario. Métrica de éxito: que el usuario diga "valió cada peso."

**Despliegue:** Vercel / hosting propio.

---

## ESTADO ACTUAL DEL PROYECTO

### Lo que ya existe
1. **Landing page de ventas** desplegada en Vercel (URL arriba). Incluye copy completo, secciones de módulos, bonos, testimonios, precio, FAQ, garantía de 7 días.
2. **Blueprint completo de la app** (archivo: BLUEPRINT_APP.md) — documento maestro con arquitectura, flujos, contenido de los 5 módulos, 3 bonos, features transversales, 30 declaraciones diarias, 30 micro-lecciones, modelo de datos, y plan de construcción en 4 fases.
3. **Prototipo funcional inicial** (archivo: dashboard_prototype.jsx) — primer borrador del dashboard con racha, módulos interactivos básicos y storage persistente. Este prototipo fue SUPERADO por el blueprint y necesita reconstruirse desde cero siguiendo la arquitectura completa.

### Lo que falta por construir
Todo. El blueprint está completo pero no se ha comenzado la construcción real de la app.

---

## FUNDAMENTO TEÓRICO DEL CONTENIDO

La app fusiona principios de múltiples fuentes, PERO todo el contenido debe ser reformulado como enseñanzas propias del sistema. NUNCA se cita a ningún autor por nombre dentro de la app. NUNCA se reproducen frases textuales. Los principios se presentan como parte del sistema "La Última Vez Que Empiezas De Cero."

### Fuentes principales (para referencia interna, NO para la app)

**Brian Tracy (fuente primaria):**
- Seminario El Fénix (Phoenix Seminar)
- Maximum Achievement
- Goals!
- Change Your Thinking, Change Your Life
- Psychology of Achievement
- Eat That Frog
- The Power of Self Discipline
- No Excuses!
- Focal Point
- Success Mastery

Conceptos clave de Tracy usados: Ley de Control (locus interno), Ley de la Relajación (sugestibilidad matutina), Ley de la Acumulación (progreso compuesto), Ley de la Correspondencia (mundo exterior refleja interior), Ley de Sustitución (no se puede pensar en dos cosas a la vez), Ley de Causa y Efecto, Ley del Perdón, Hora de Oro (primeros minutos del día), Mecanismo de Éxito vs Mecanismo de Fracaso, las 7 preguntas de autoconcepto, visualización estándar, mapas del tesoro, modelado de roles.

**James Clear — Atomic Habits:**
- Identity-Based Habits (hábitos basados en identidad, no en resultados)
- Habit Stacking (apilar hábitos sobre anclas existentes)
- No romper la cadena (estrategia Seinfeld)
- Environment Design (diseño del entorno)
- Tracking (seguimiento visual)

**BJ Fogg — Tiny Habits:**
- Micro-acciones (reducir al mínimo viable)
- Celebración inmediata (el "Shine" — fertilizante del hábito)
- Conducta mínima
- Modelo B=MAP (Behavior = Motivation + Ability + Prompt)

**Charles Duhigg — The Power of Habit:**
- Cue (señal/disparador)
- Routine (rutina/acción)
- Reward (recompensa)

**Psicología complementaria:**
- Implementation Intentions (Si... Entonces)
- WOOP (Wish, Outcome, Obstacle, Plan)
- Self-Efficacy (Autoeficacia — Bandura)
- Cognitive Behavioral Therapy (Detención de Pensamiento, Reestructuración Cognitiva, Reatribución)
- Self Trust / Identity Change
- Autoconcepto como termostato
- Aversión a la pérdida (Kahneman)
- Análisis Minimax

---

## ARQUITECTURA DE LA APP

### Nombres oficiales (DEBEN coincidir con la landing page)

**5 Módulos:**
1. Sistema Antiabandono de 5 Minutos
2. Método Cadena Imparable
3. Protocolo de Rescate Inmediato
4. Mapa de Reconstrucción de Confianza Personal
5. Sistema de Microvictorias Diarias

**3 Bonos:**
1. Protocolo Anti-Recaída de 24 Horas
2. Calendario Visual de Rachas Imparables
3. Reinicio Mental de Emergencia

**Features transversales (no están en la landing, son valor agregado):**
- Onboarding diagnóstico (5 pantallas incluyendo Carta a Mi Yo Futuro)
- Puerta de Entrada Diaria (ritual obligatorio antes del dashboard)
- Micro-lecciones diarias (30 lecciones, una por día)
- Reflexión semanal (días 7, 14, 21, 28 + ceremonia final día 30)
- Tablero de Evidencia (acumulación de todas las acciones)
- Hitos compartibles (imágenes para redes sociales en días 7, 15, 21, 30)
- Botón SOS flotante (acceso permanente al Protocolo de Rescate)

### Resumen de cada sección

**ONBOARDING:**
5 pantallas → Bienvenida → Datos básicos (nombre, hora de despertar) → Diagnóstico de autoeficacia (5 preguntas) → Carta a Mi Yo Futuro (se sella y desbloquea al día 30) → Pacto de Compromiso (botón de inicio).

**DASHBOARD:**
Puerta de Entrada Diaria (si no ha completado ritual) → Anillo de Racha (0-30 días con emoji dinámico y mensaje contextual) → Estadísticas rápidas → Tarjeta de acción del día → Micro-lección del día → Grid de módulos → Acceso a bonos → Botón SOS flotante.

**MÓDULO 1 — Sistema Antiabandono (Color: #00D4AA):**
3 pasos diarios: (1) Escribir 3 metas en presente/positivo/personal, (2) Declaración en voz alta con botón de mantener pulsado, (3) Micro-acción de 2 min con temporizador. 30 declaraciones rotativas (una por día). Las metas se pre-cargan al día siguiente.

**MÓDULO 2 — Cadena Imparable (Color: #8B5CF6):**
Calendario de Identidad (no de tareas) + Sistema del Avatar (se aclara con progreso, se pixela si abandona — aversión a la pérdida). 30 niveles de nitidez del avatar. Estadísticas de cadena.

**MÓDULO 3 — Protocolo de Rescate (Color: #F59E0B):**
5 pasos secuenciales: ALTO (interrupción + vibración) → RESPIRA (animación 4-4-6 x3) → REENCUADRA (flashcard de sustitución cognitiva) → ACTÚA (micro-acción de 2 min) → REGISTRA (reflexión de 1 línea, 280 chars max). El rescate cuenta como actividad del día y se marca en el calendario con color especial (ámbar).

**MÓDULO 4 — Mapa de Confianza (Color: #EC4899):**
Wizard "Mi Yo 2.0" (7 preguntas profundas de Tracy, una sola vez) + Modelos a Seguir (3 personas, generan "Desafíos de Modelo" diarios) + Mapa de 7 Niveles de Confianza (Escéptico → Curioso → Esperanzado → Creyente → Confiado → Sólido → Inquebrantable). Los niveles son IRREVERSIBLES.

**MÓDULO 5 — Microvictorias (Color: #06B6D4):**
Tiny Recipe Builder ("Después de [ANCLA], haré [MICRO-HÁBITO]", hasta 5 recetas activas) + Botón de Celebración con animación expansiva y textos rotativos + Checklist diario de 5 microvictorias.

**BONO 1 — Anti-Recaída 24h (Color: #EF4444):**
Cronómetro de 24h que se activa al romper racha. Entrenamiento de Recuperación en 3 partes: Intención de Implementación (Si/Entonces), Análisis breve, Micro-acción de re-entrada. CALIBRADO: la racha se reinicia pero el total de días y niveles de confianza son permanentes. Sin castigo excesivo.

**BONO 2 — Calendario Visual (Color: #8B5CF6):**
Evolución cromática de la interfaz (fríos → dorados según progreso) + Vista de cadena horizontal de 30 eslabones + Hitos visuales cada 7 días. Integrado con Módulo 2.

**BONO 3 — Reinicio Mental (Color: #10B981):**
"Quema de Culpa" en 5 partes: Escritura catártica → Identificación de etiquetas negativas → Animación de quema del texto → Reescritura de identidad ("En el pasado yo era [X], pero AHORA soy [Y]") → Cierre. Las nuevas identidades aparecen como recordatorios rotativos en el dashboard.

**TABLERO DE EVIDENCIA:**
Acumula automáticamente: días completados, metas escritas, micro-acciones, declaraciones, rescates exitosos, recetas de hábitos, microvictorias, nivel de confianza, recuperaciones, reinicio mental, reflexiones. Incluye "Tu mayor logro" y comparación con Perfil de Partida.

**MICRO-LECCIONES (30 lecciones escritas en el blueprint):**
Semana 1: Fundamentos de por qué abandonas (7 lecciones).
Semana 2: Mecánicas del sistema (7 lecciones).
Semana 3: Profundización psicológica (7 lecciones).
Semana 4: Consolidación y futuro (9 lecciones, incluye días 29 y 30 especiales).
Todas escritas en el BLUEPRINT_APP.md.

**REFLEXIÓN SEMANAL:**
3 preguntas breves cada 7 días. Día 30: Ceremonia especial con desbloqueo de carta, comparación de perfil, carta al yo del pasado, y certificado compartible.

---

## CONTENIDO YA ESCRITO

En el archivo BLUEPRINT_APP.md ya están escritos:
- 30 declaraciones diarias para el Módulo 1 (una por día, todas originales)
- 30 micro-lecciones diarias (párrafos completos, organizadas por semana)
- Textos educativos de introducción de cada módulo
- Textos de cada paso del Protocolo de Rescate
- Preguntas del diagnóstico de onboarding
- Preguntas del wizard "Mi Yo 2.0"
- Frases de celebración para Microvictorias
- Mensajes contextuales de la racha
- Textos de la ceremonia del Día 30

---

## DECISIONES TÉCNICAS TOMADAS

1. **Despliegue en Vercel** (confirmado por Luis)
2. **Stack sugerido:** Next.js o Vite+React, Tailwind CSS, Supabase (BD + Auth), PWA
3. **Sin audio de terceros** — no se incluyen clips de voz de ningún autor
4. **Sin bloqueo de teléfono** — reemplazado por "Puerta de Entrada Diaria" (compatible con web app)
5. **Notificaciones por tarjetas in-app** (no push notifications, ya que es web app, a menos que se implemente PWA con service workers o integración WhatsApp/Telegram)
6. **Contenido protegido** — solo accesible con autenticación
7. **Micro-lecciones desde base de datos** (no hardcodeadas en frontend)

## DECISIONES PENDIENTES

1. **Diseño del Avatar:** ¿Silueta abstracta? ¿Ícono geométrico? ¿Otra representación visual?
2. **Autenticación:** ¿Email/password o magic link?
3. **Pasarela de pago:** ¿Cuál usa la landing? (para integrar verificación de compra)
4. **Canal de notificaciones:** ¿Solo in-app o integrar WhatsApp/Telegram para los "Desafíos de Modelo"?
5. **Arranque de construcción:** ¿Prototipo iterativo aquí en Claude o proyecto completo Next.js/Vite directo?

---

## PLAN DE CONSTRUCCIÓN (4 FASES)

**Fase 1 — Core funcional:**
Setup proyecto + Auth + Onboarding + Dashboard + Módulo 1 + Módulo 2 + Sistema de racha

**Fase 2 — Módulos completos:**
Módulo 3 (Rescate) + Módulo 4 (Confianza) + Módulo 5 (Microvictorias) + 30 micro-lecciones

**Fase 3 — Bonos y features transversales:**
Bono 1 (Anti-Recaída) + Bono 2 (Calendario Visual) + Bono 3 (Reinicio Mental) + Tablero de Evidencia + Reflexiones semanales + Ceremonia Día 30

**Fase 4 — Pulido:**
Animaciones/efectos + PWA + Hitos compartibles + Responsive + Testing + Integración con pasarela de pago

---

## ARCHIVOS DEL PROYECTO

| Archivo | Descripción | Estado |
|---------|-------------|--------|
| BLUEPRINT_APP.md | Blueprint completo con toda la arquitectura, contenido y flujos | ✅ Completo v1.0 |
| dashboard_prototype.jsx | Primer prototipo del dashboard (superado por el blueprint) | ⚠️ Obsoleto — reconstruir |
| Este documento | Contexto ejecutivo para continuar en nuevos chats | ✅ Actual |

---

## INSTRUCCIONES PARA CONTINUAR EN NUEVOS CHATS

Al iniciar un nuevo chat en este proyecto:
1. Claude ya tendrá este documento como contexto del proyecto
2. Referirse al BLUEPRINT_APP.md para cualquier detalle de contenido, flujos o arquitectura
3. No reconstruir ni replantear la arquitectura — ya está definida
4. Comenzar con la fase de construcción donde se haya quedado
5. Cualquier cambio al blueprint debe actualizarse en ambos documentos

---

*Última actualización: 27 de junio de 2026*
*Versión: 1.0*
