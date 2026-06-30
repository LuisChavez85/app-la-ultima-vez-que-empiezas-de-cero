# LA ÚLTIMA VEZ QUE EMPIEZAS DE CERO
## Blueprint Completo de la Aplicación

---

## VISIÓN GENERAL

**Producto:** Aplicación web progresiva (PWA) desplegada en Vercel
**Precio del producto:** $27 USD (pago único, acceso de por vida)
**Duración del programa:** 30 días activos + acceso permanente
**Objetivo central:** Que el usuario reconstruya la confianza en su propia palabra mediante evidencia acumulada de cumplimiento diario
**Métrica de éxito del producto:** Que el usuario diga "valió cada peso"

**Principio rector de contenido:** Todo el contenido se basa en principios universales de psicología del comportamiento, autoeficacia y diseño de hábitos. No se citan autores directamente ni se reproduce material con derechos. Los principios se reformulan como enseñanzas propias del sistema.

---

## ARQUITECTURA DE LA APP

### Estructura de navegación

```
┌─────────────────────────────────────────┐
│            BARRA SUPERIOR               │
│  [Logo/Nombre]              [Perfil] ☰  │
├─────────────────────────────────────────┤
│                                         │
│         ÁREA DE CONTENIDO               │
│     (cambia según sección activa)       │
│                                         │
├─────────────────────────────────────────┤
│          NAVEGACIÓN INFERIOR            │
│  🏠 Inicio  📅 Cadena  🏆 Evidencia  ⚙️ │
└─────────────────────────────────────────┘
```

### Secciones principales

1. **Onboarding** (solo primera vez)
2. **Dashboard / Inicio** (pantalla principal diaria)
3. **Módulo 1:** Sistema Antiabandono de 5 Minutos
4. **Módulo 2:** Método Cadena Imparable
5. **Módulo 3:** Protocolo de Rescate Inmediato
6. **Módulo 4:** Mapa de Reconstrucción de Confianza Personal
7. **Módulo 5:** Sistema de Microvictorias Diarias
8. **Bono 1:** Protocolo Anti-Recaída de 24 Horas
9. **Bono 2:** Calendario Visual de Rachas Imparables
10. **Bono 3:** Reinicio Mental de Emergencia
11. **Tablero de Evidencia** (sección transversal)
12. **Micro-lecciones diarias** (contenido del día)
13. **Reflexión semanal** (cada 7 días)

---

## SECCIÓN 0: ONBOARDING

### Propósito
Personalizar la experiencia, establecer la línea base emocional del usuario y crear el primer ancla de compromiso. El usuario debe sentir desde el minuto uno que esto fue diseñado para él.

### Flujo completo (5 pantallas)

**Pantalla 1: Bienvenida**
- Headline: "Esta es la última vez que empiezas de cero."
- Subtexto: "Antes de comenzar, necesito conocerte. No para juzgarte. Para diseñar tu camino."
- Botón: "Estoy listo"

**Pantalla 2: Datos básicos**
- Campo: "¿Cómo te llamas?" (nombre que usará la app para dirigirse al usuario)
- Campo: "¿A qué hora sueles despertar?" (para calibrar la "Puerta de Entrada Diaria")
- Sin más campos. Simplicidad.

**Pantalla 3: Diagnóstico de Autoeficacia**
Cuestionario de 5 preguntas. Cada una con escala visual de 1-5 (no numérica, sino con frases).

Pregunta 1: "¿Cuántas veces has intentado cambiar un hábito importante en el último año?"
- Opciones: "Ninguna" / "1-2 veces" / "3-5 veces" / "Más de 5" / "Perdí la cuenta"

Pregunta 2: "Cuando empiezas algo nuevo, ¿cuánto suele durar tu motivación?"
- Opciones: "1-3 días" / "Una semana" / "2-3 semanas" / "Un mes" / "Depende"

Pregunta 3: "¿Cómo describirías tu relación con tus propias promesas?"
- Opciones: "Las cumplo casi siempre" / "Las cumplo a veces" / "Me cuesta mucho" / "Ya ni me las hago" / "Prefiero no responder"

Pregunta 4: "¿Qué área de tu vida sientes que más ha sufrido por falta de consistencia?"
- Opciones: "Salud/cuerpo" / "Finanzas" / "Relaciones" / "Proyectos/trabajo" / "Todo en general"

Pregunta 5: "Si pudieras cambiar UNA cosa de ti mismo en los próximos 30 días, ¿qué sería?"
- Campo de texto libre (máx 200 caracteres)

**Resultado del diagnóstico:** Se almacena como "Perfil de Partida" y se usa para:
- Personalizar mensajes en la app
- Comparar al final de los 30 días en la reflexión final
- Determinar el "nivel de autoeficacia percibida" inicial (1-10)

**Pantalla 4: Carta a Mi Yo Futuro**
- Instrucción: "Escríbele unas líneas al tú de dentro de 30 días. ¿Qué quieres decirle? ¿Qué esperas que haya logrado? ¿Qué necesitas que recuerde?"
- Campo de texto libre (textarea amplio)
- Nota: "Esta carta estará sellada y solo se desbloqueará cuando completes tu racha de 30 días."
- Ícono visual de sobre cerrado con candado

**Pantalla 5: Pacto de Compromiso**
- Texto: "[Nombre], al pulsar este botón estás haciendo algo que no has hecho en mucho tiempo: una promesa a ti mismo que vas a cumplir."
- Botón grande: "EMPIEZO HOY. ESTA ES LA ÚLTIMA VEZ."
- Efecto visual: Animación sutil de la pantalla (no exagerada — un resplandor que se expande desde el botón)
- Se registra la fecha de inicio

---

## SECCIÓN 1: DASHBOARD / INICIO

### Propósito
Centro de comando diario. Lo primero que ve el usuario al abrir la app. Debe responder tres preguntas en menos de 3 segundos: "¿Cuántos días llevo?", "¿Qué tengo que hacer hoy?", "¿Cómo voy?"

### Componentes

**1.1 Puerta de Entrada Diaria (reemplaza el concepto de "bloqueo matutino")**
- Si el usuario NO ha completado su ritual del día, al abrir la app ve PRIMERO la Puerta de Entrada
- La Puerta de Entrada es el Módulo 1 (Sistema Antiabandono de 5 Minutos)
- Una vez completado el ritual, el usuario accede al dashboard completo
- Si ya completó hoy, ve directo el dashboard
- NO es un bloqueo agresivo — es una pantalla que dice: "Tu ritual de hoy te está esperando" con botón para iniciar y opción sutil de "Ver mi progreso primero" (para no frustrar)

**1.2 Anillo de Racha (Hero visual)**
- Anillo circular de progreso que se llena de 0 a 30 días
- Número grande central con los días de racha actual
- Emoji dinámico que escala con la racha:
  - Día 0: 🌱 (semilla)
  - Días 1-3: ⚡ (chispa)
  - Días 4-7: ✨ (destello)
  - Días 8-14: 🔥 (fuego)
  - Días 15-24: 🔥🔥 (doble fuego)
  - Días 25-30: 🔥🔥🔥 (triple fuego)
- Mensaje contextual debajo del anillo (cambia según racha):
  - 0 días: "Hoy empiezas a confiar en ti"
  - 1-3: "Estás construyendo evidencia"
  - 4-7: "La cadena se fortalece"
  - 8-14: "Tu mente ya no te sabotea"
  - 15-24: "Eres imparable"
  - 25-29: "La transformación está casi completa"
  - 30: "IDENTIDAD TRANSFORMADA"

**1.3 Estadísticas rápidas (fila horizontal debajo del anillo)**
- Racha actual
- Mejor racha histórica
- Total de días cumplidos
- % hacia meta de 30 días

**1.4 Tarjeta de Acción del Día**
- Si no ha completado hoy: Tarjeta verde con "⚡ Tu micro-acción de hoy te espera" → lleva al Módulo 1
- Si ya completó: Tarjeta con check "✅ Día completado. Tu cadena sigue viva."

**1.5 Micro-lección del Día**
- Tarjeta con la lección diaria (ver sección de Micro-lecciones)
- Párrafo corto (3-4 líneas) con un principio del sistema
- Botón "Entendido" que marca la lección como leída

**1.6 Acceso rápido a módulos**
- Grid de 5 tarjetas de módulos (acceso directo)
- Cada tarjeta con ícono, nombre, color distintivo

**1.7 Acceso a Bonos**
- 3 tarjetas horizontales debajo de los módulos
- El Bono 1 (Anti-Recaída) tiene acceso destacado si la racha está en peligro

**1.8 Botón flotante de Rescate**
- Botón siempre visible (esquina inferior o accesible desde cualquier pantalla)
- "🛟 SOS" → lleva directo al Módulo 3 (Protocolo de Rescate Inmediato)
- Este botón es la red de seguridad permanente

---

## MÓDULO 1: SISTEMA ANTIABANDONO DE 5 MINUTOS

### Nombre en la app: "Sistema Antiabandono de 5 Minutos"
### Etiqueta: "Control Absoluto"
### Color: #00D4AA (verde esmeralda)

### Propósito psicológico
Activar la claridad mental matutina y establecer intención diaria. Eliminar la fricción de "¿qué hago?" al despertar. Principio: la sugestibilidad y plasticidad mental son máximas en los primeros minutos del día. Si capturas esos minutos, capturas el día.

### Contenido educativo (pantalla de introducción, solo se muestra la primera vez)
"Tu mente es más receptiva en los primeros minutos después de despertar. Durante ese período, lo que piensas, lees y dices en voz alta se graba con más profundidad que en cualquier otro momento del día. Este módulo captura esos 5 minutos para programar tu día hacia el cumplimiento.

No necesitas motivación. No necesitas fuerza de voluntad. Solo necesitas 5 minutos y seguir estos dos pasos."

### Flujo diario (3 pasos)

**Paso 1: Escritura de 3 metas en tiempo presente (2 minutos)**
- Instrucción: "Escribe 3 metas como si ya fueran reales. En primera persona, en tiempo presente, en positivo."
- Ejemplos guía (se muestran la primera semana, luego desaparecen):
  - ✅ "Yo soy una persona que cumple lo que se propone"
  - ✅ "Yo gano [cantidad] al mes con mi negocio"
  - ✅ "Yo me siento fuerte, sano y con energía"
  - ❌ "Quiero dejar de ser flojo" (negativo)
  - ❌ "Algún día tendré dinero" (futuro vago)
- 3 campos de texto con prefijo "Yo..." pre-llenado
- Las metas se guardan y se pre-cargan al día siguiente (el usuario puede editarlas o mantenerlas)
- Cada meta escrita se registra en el Tablero de Evidencia

**Paso 2: Declaración en voz alta (1 minuto)**
- Pantalla con texto grande que el usuario lee en voz alta
- Texto de afirmación (rotativo, cambia cada día, 30 declaraciones diferentes)
- Botón de "Pulsa y mantén mientras lees en voz alta"
- El botón tiene un efecto visual de carga (llenado circular) que dura el tiempo estimado de lectura
- Al completar: animación de check + sonido sutil de confirmación
- Nota: NO se graba audio. Solo se registra la acción.

**Paso 3: Micro-acción del día (2 minutos)**
- Selector de micro-acción (el usuario elige una o crea la suya):
  - "Escribir 1 párrafo sobre mi meta principal"
  - "Hacer 10 sentadillas o estiramientos"
  - "Organizar 1 cosa de mi espacio"
  - "Leer 2 páginas de cualquier libro"
  - "Respirar conscientemente 2 minutos"
  - "Escribir 3 cosas por las que agradezco"
  - "+ Crear mi propia micro-acción"
- Temporizador visual de 5 minutos (cuenta regresiva)
- Al terminar el temporizador O al pulsar "Completado":
  - Animación de celebración (confeti sutil)
  - Texto: "¡Día registrado! Tu cadena crece."
  - Se registra el día como completado
  - Se actualiza la racha

### Datos que se almacenan
- Fecha y hora de completado
- Las 3 metas escritas
- Micro-acción seleccionada
- Declaración del día (cuál tocó)

### 30 Declaraciones diarias (una por día)
Principios reformulados. Ninguna es cita textual. Todas en primera persona.

1. "Yo tengo el control de mis pensamientos. Lo que pienso determina lo que siento, y lo que siento determina lo que hago."
2. "Yo soy completamente responsable de mi vida. Nadie viene a salvarme. Nadie tiene que hacerlo. Yo soy suficiente."
3. "Yo me concentro en lo que puedo controlar. Suelto lo que no depende de mí."
4. "Yo actúo con decisión. La claridad viene de la acción, no de la reflexión infinita."
5. "Yo me niego a poner excusas. Las excusas son el lenguaje de las personas que abandonaron su poder."
6. "Yo invierto en mí mismo todos los días. Cada minuto de mejora personal es una inversión con interés compuesto."
7. "Yo hago primero lo más importante, aunque sea lo más incómodo."
8. "Yo persisto cuando otros se rinden. La persistencia es el ingrediente que separa a quienes lo logran de quienes lo intentan."
9. "Yo me perdono por los intentos fallidos. No definen mi futuro. Son evidencia de que sigo intentando."
10. "Yo construyo mi día antes de que el día me construya a mí."
11. "Yo no negocio conmigo mismo. Cuando me comprometo, actúo. Sin discusión interna."
12. "Yo acepto la incomodidad como señal de crecimiento. Si es fácil, probablemente no me está cambiando."
13. "Yo visualizo mi meta como si ya existiera. La veo, la siento, la habito mentalmente."
14. "Yo me rodeo de personas que me elevan. Mi entorno moldea mis decisiones más de lo que admito."
15. "Yo reemplazo los pensamientos negativos en el momento exacto en que aparecen. No les doy espacio."
16. "Yo defino mis propios estándares. No comparo mi capítulo 1 con el capítulo 20 de alguien más."
17. "Yo sé que el éxito se construye con acciones pequeñas repetidas con consistencia brutal."
18. "Yo trato cada promesa que me hago como un contrato sagrado conmigo mismo."
19. "Yo no espero estar motivado para actuar. Actúo y la motivación aparece después."
20. "Yo soy el tipo de persona que cumple. No porque sea fácil, sino porque es quien soy."
21. "Yo administro mi energía, no solo mi tiempo. Protejo las horas donde soy más productivo."
22. "Yo aprendo de cada error sin castigarme por haberlo cometido. Cada falla es información, no sentencia."
23. "Yo me atrevo a soñar en grande. Si supiera que es imposible fallar, ¿qué intentaría?"
24. "Yo cultivo la paciencia. Los resultados que duran requieren tiempo para construirse."
25. "Yo elijo la disciplina hoy para tener libertad mañana."
26. "Yo no postergo las decisiones difíciles. Cada hora que las retraso, más poder les doy sobre mí."
27. "Yo me comprometo con el proceso, no solo con el resultado. El resultado es consecuencia del proceso."
28. "Yo protejo mi mente como protegería mi cuenta bancaria. No dejo entrar basura."
29. "Yo celebro cada pequeño avance. Cada microvictoria es un voto a favor de mi nueva identidad."
30. "Yo ya no empiezo de cero. Cada día que cumplo es evidencia permanente de quién me estoy convirtiendo."

---

## MÓDULO 2: MÉTODO CADENA IMPARABLE

### Nombre en la app: "Método Cadena Imparable"
### Etiqueta: "Visualización Activa"
### Color: #8B5CF6 (púrpura)

### Propósito psicológico
Crear inercia psicológica mediante evidencia visual acumulada. Principio: cada día marcado es un "voto" por el tipo de persona que el usuario quiere ser. La identidad se construye con evidencia, no con deseos.

### Contenido educativo (pantalla de introducción)
"Tu mente no cree lo que le dices. Cree lo que le demuestras. Cada vez que marcas un día como completado, no estás tachando una casilla — estás depositando evidencia en tu cuenta de confianza personal.

Este módulo convierte esa evidencia en algo que puedes VER. Porque lo que ves, lo crees. Y lo que crees, lo cumples."

### Componentes

**2.1 Calendario de Identidad (no es un calendario de tareas)**
- Vista de mes completo
- Cada día completado se marca con un eslabón de cadena (🔗) y color púrpura
- Los días no completados permanecen grises
- El día actual se resalta con borde
- Al tocar un día completado: muestra un mini-resumen (meta escrita, micro-acción elegida)

**2.2 Sistema del Avatar (pieza central de gamificación)**
- Al iniciar el programa, el usuario ve un avatar pixelado/borroso (representa su "Yo ideal")
- Cada día completado desbloquea un fragmento del avatar (se va aclarando, definiendo)
- Al completar 30 días: avatar completamente definido + efecto de brillo
- MECANISMO DE AVERSIÓN A LA PÉRDIDA: Si el usuario rompe la racha (2 días sin completar), el avatar empieza a pixelarse de nuevo gradualmente
- NO se pierde todo — se pierde nitidez proporcional a los días perdidos
- Esto activa el dolor de la pérdida (más poderoso que el placer de la ganancia)

Diseño del avatar:
- No es un personaje tipo videojuego — es una silueta abstracta que representa "la mejor versión"
- Paleta que va de colores fríos/apagados (inicio) a dorados/cálidos (progreso)
- 30 niveles de nitidez (uno por día)

**2.3 Estadísticas de la cadena**
- Racha actual
- Mejor racha histórica
- Total de días cumplidos
- Porcentaje de cumplimiento (días cumplidos / días desde el inicio)
- Gráfica de barras semanal (últimas 4 semanas)

---

## MÓDULO 3: PROTOCOLO DE RESCATE INMEDIATO

### Nombre en la app: "Protocolo de Rescate Inmediato"
### Etiqueta: "Seguro Psicológico"
### Color: #F59E0B (ámbar/amarillo)

### Propósito psicológico
Detener la espiral de culpa antes de que se convierta en abandono. Principio: no se puede experimentar culpa y responsabilidad al mismo tiempo. Si sustituyes el pensamiento culpable por una acción de responsabilidad, detienes la caída.

### Contenido educativo (pantalla de introducción)
"El momento más peligroso no es cuando fallas. Es el momento inmediatamente después. Ahí es donde tu mente te dice: 'Ya arruinaste todo. ¿Para qué seguir?' Esa voz ha destruido más rachas que cualquier falta de disciplina.

Este protocolo existe para interrumpir esa voz ANTES de que te convenza. No es motivación. Es un procedimiento de emergencia."

### Acceso
- Botón "🛟 SOS" flotante visible en toda la app
- También accesible desde el menú de módulos
- Activación rápida: si el usuario abre la app después de 48+ horas sin registrar, la app sugiere automáticamente el protocolo

### Flujo del Protocolo (5 pasos secuenciales)

**Paso 1: ALTO — Interrupción de patrón**
- Pantalla con fondo oscuro
- Texto grande: "ALTO"
- Efecto: Vibración del teléfono (si es compatible) o flash visual
- Instrucción: "Detén lo que estás pensando. Ahora mismo. Solo por 10 segundos."
- Temporizador de 10 segundos (silencio obligado)
- Principio: Detención de pensamiento — interrumpir el patrón cognitivo negativo

**Paso 2: RESPIRA — Regulación fisiológica**
- Animación de respiración guiada:
  - Inhala 4 segundos (círculo se expande)
  - Sostén 4 segundos (círculo se mantiene)
  - Exhala 6 segundos (círculo se contrae)
- 3 repeticiones (total ~42 segundos)
- Principio: Activar el sistema nervioso parasimpático para salir del modo reactivo

**Paso 3: REENCUADRA — Sustitución cognitiva**
- Flashcard con texto:
  - "En el pasado, abandoné. Eso es verdad."
  - "Pero AHORA estoy aquí. Eso también es verdad."
  - "Una caída no es un reinicio. Mi progreso sigue existiendo."
  - "Lo que define mi identidad no es si caigo. Es si vuelvo."
- El usuario debe pulsar "Lo entiendo" para continuar
- Principio: Sustitución — reemplazar el pensamiento culpable por uno de responsabilidad activa

**Paso 4: ACTÚA — Micro-acción de rescate (2 minutos)**
- Instrucción: "Haz UNA cosa ahora mismo. Lo que sea. Pero hazla."
- Opciones rápidas:
  - "Escribir por qué estoy aquí ahora mismo"
  - "Hacer 5 sentadillas"
  - "Beber un vaso de agua conscientemente"
  - "Respirar 1 minuto con los ojos cerrados"
- Temporizador de 2 minutos
- Principio: La acción más pequeña rompe la inercia del abandono

**Paso 5: REGISTRA — Reflexión de 1 línea**
- Campo de texto: "¿Qué pasó y qué harás diferente?"
- Máximo 280 caracteres (brevedad forzada)
- Botón: "RESCATE COMPLETADO"
- Animación: El texto se transforma visualmente en una nota que se "archiva" (efecto de papel que se guarda)
- Se almacena en el Tablero de Evidencia como "Rescate exitoso"

### Resultado
- El rescate cuenta como actividad del día (mantiene la racha viva)
- Se registra en el historial con etiqueta especial "🛟 Día rescatado"
- El usuario ve en su calendario un color diferente (ámbar en vez de púrpura) para días rescatados — evidencia de que VOLVIÓ incluso cuando falló

---

## MÓDULO 4: MAPA DE RECONSTRUCCIÓN DE CONFIANZA PERSONAL

### Nombre en la app: "Mapa de Reconstrucción de Confianza Personal"
### Etiqueta: "Estructura Mental"
### Color: #EC4899 (rosa/magenta)

### Propósito psicológico
Reestructurar el autoconcepto del usuario. Pasar de "soy alguien que abandona" a "soy alguien que cumple". Principio: el mundo exterior es un reflejo del mundo interior. Para cambiar los resultados, hay que cambiar la imagen interna que tienes de ti mismo.

### Contenido educativo (pantalla de introducción)
"Hay una imagen de ti mismo que vive dentro de tu mente. Es como un termostato: no importa cuánto te esfuerces temporalmente, siempre terminas volviendo al nivel que esa imagen dicta.

Si tu imagen interna dice 'soy alguien que abandona', ningún sistema de hábitos te salvará a largo plazo. Primero hay que actualizar la imagen. Este módulo te guía para hacerlo."

### Componentes

**4.1 Ejercicio "Mi Yo 2.0" (se hace una vez, en el Día 1 o cuando el usuario entre por primera vez)**

Wizard guiado de 7 preguntas profundas. El usuario responde por escrito.

1. "Si supieras con absoluta certeza que no puedes fallar, ¿qué intentarías?"
2. "Si tuvieras todo el dinero que necesitas, ¿cómo pasarías tus días?"
3. "¿A quién admiras profundamente y por qué? Nombra 3 personas (reales o ficticias)"
4. "¿Qué dirían de ti las personas que más te importan si pudieras escuchar sus conversaciones?"
5. "Si tuvieras solo 6 meses de vida, ¿qué dejarías de hacer inmediatamente?"
6. "¿Qué talento o habilidad tienes que no estás usando al máximo?"
7. "Describe en un párrafo a tu Yo Ideal — la persona que quieres ser en 1 año"

Se guardan las respuestas. Se desbloquean para releer al día 15 y al día 30.

**4.2 Modelos a Seguir (configuración + recordatorios)**
- El usuario elige 3 modelos (personas que admira — pregunta 3 del wizard)
- La app genera "Desafíos de Modelo" — notificaciones o tarjetas que aparecen 1 vez al día:
  - "¿Cómo enfrentaría [Modelo 1] el obstáculo que tienes hoy?"
  - "¿Qué haría [Modelo 2] en los próximos 5 minutos?"
  - "¿[Modelo 3] negociaría consigo mismo o actuaría?"
- Estas preguntas aparecen como tarjeta en el dashboard (no como push notification, ya que es web app)

**4.3 Mapa de 7 Niveles de Confianza**
- Visualización de progreso basada en días cumplidos Y acciones completadas
- Cada nivel tiene nombre, descripción y se desbloquea con evidencia:

| Nivel | Nombre | Se desbloquea con | Descripción |
|-------|--------|-------------------|-------------|
| 1 | Escéptico | Día 0 (inicio) | "Aún no confías. Es normal. Estás empezando." |
| 2 | Curioso | 3 días cumplidos | "Empiezas a notar que puedes cumplir." |
| 3 | Esperanzado | 7 días cumplidos | "La evidencia se acumula. Tu mente lo nota." |
| 4 | Creyente | 12 días cumplidos | "Ya no dudas tanto. Los datos hablan." |
| 5 | Confiado | 18 días cumplidos | "Tu palabra empieza a valer de nuevo." |
| 6 | Sólido | 24 días cumplidos | "Cumplir es parte de quién eres." |
| 7 | Inquebrantable | 30 días cumplidos | "Tu identidad cambió. Ya no empiezas de cero." |

- Al subir de nivel: animación de desbloqueo + mensaje especial
- Cada nivel desbloqueado es irreversible (no se pierde aunque se rompa la racha)

---

## MÓDULO 5: SISTEMA DE MICROVICTORIAS DIARIAS

### Nombre en la app: "Sistema de Microvictorias Diarias"
### Etiqueta: "Identidad Reforzada"
### Color: #06B6D4 (cian)

### Propósito psicológico
Cablear el sistema de recompensa cerebral mediante acciones mínimas con celebración inmediata. Principio: el comportamiento ocurre cuando la motivación, la habilidad y el disparador se alinean. La clave es hacer la acción tan pequeña que la habilidad siempre supere el desafío.

### Contenido educativo (pantalla de introducción)
"Tu cerebro no distingue entre una victoria grande y una pequeña. Lo que registra es: 'cumplí'. Cada vez que cumples algo — por mínimo que sea — tu cerebro libera una señal que dice: 'esto funciona, repítelo'.

Este módulo te enseña a crear micro-hábitos y celebrarlos de una forma que reprograma tu sistema de recompensa."

### Componentes

**5.1 Constructor de Recetas de Hábitos (Tiny Recipe Builder)**
- Fórmula visual: "Después de [ANCLA], haré [MICRO-HÁBITO]"
- El usuario crea sus propias recetas:
  - ANCLA: un hábito que ya tiene (lavarse los dientes, servir el café, sentarse en el escritorio)
  - MICRO-HÁBITO: la acción nueva, reducida al mínimo viable
- Ejemplos pre-cargados:
  - "Después de servir mi café, escribiré 1 oración de mi proyecto"
  - "Después de lavarme los dientes, haré 2 sentadillas"
  - "Después de sentarme en mi escritorio, leeré 1 página"
- El usuario puede tener hasta 5 recetas activas
- Cada receta tiene un botón de "Completada hoy" individual

**5.2 Botón de Celebración**
- Al marcar una micro-acción como completada:
  - Animación expansiva en pantalla (estallido de partículas/confeti)
  - Texto dinámico de celebración (rotativo):
    - "¡Eso cuenta! 💪"
    - "¡Un voto más por tu nueva identidad!"
    - "¡Tu cerebro acaba de registrar una victoria!"
    - "¡Evidencia acumulada!"
    - "¡Eso es disciplina en acción!"
  - El usuario puede personalizar su frase de celebración
- Principio: La celebración inmediata es el fertilizante del hábito. Sin celebración, el hábito no se ancla.

**5.3 Checklist diario de Microvictorias**
- 5 acciones base (siempre presentes):
  1. Completar el ritual del Módulo 1
  2. Completar al menos 1 receta de hábito
  3. Leer la micro-lección del día
  4. Registrar 1 cosa por la que agradeces
  5. La micro-acción personalizada del usuario (de su receta)
- Al completar las 5: Animación especial + "🏆 ¡5/5 Microvictorias!"
- Se registra el conteo en el Tablero de Evidencia

---

## BONO 1: PROTOCOLO ANTI-RECAÍDA DE 24 HORAS

### Nombre en la app: "Protocolo Anti-Recaída de 24 Horas"
### Color: #EF4444 (rojo)

### Propósito
Red de seguridad extrema. Se activa cuando la racha se rompe completamente (el usuario no hizo NADA en un día completo — ni el ritual, ni un rescate).

### Contenido educativo
"Fallaste un día completo. No hiciste el ritual. No activaste el rescate. Y eso está bien — porque estás aquí AHORA. La diferencia entre alguien que transforma su vida y alguien que no, no es que nunca caiga. Es la velocidad con la que se levanta.

Este protocolo te da 24 horas exactas para volver."

### Mecanismo (CALIBRADO — sin destruir progreso)

**Lo que pasa cuando se rompe la racha:**
- La racha de días consecutivos se reinicia a 0
- PERO el total de días cumplidos NO se borra (es evidencia permanente)
- PERO el nivel de confianza NO retrocede (los niveles desbloqueados son irreversibles)
- El avatar pierde nitidez parcial (no todo — proporcional a los días perdidos)

**Cronómetro de 24 horas:**
- Se activa automáticamente al detectar que pasaron 24h sin actividad
- Pantalla con cronómetro en cuenta regresiva
- Instrucción: "Tienes 24 horas para completar el Entrenamiento de Recuperación"

**Entrenamiento de Recuperación (3 partes):**

Parte 1: Intención de Implementación
- "Completa esta frase: SI [situación que causó la caída], ENTONCES [lo que haré diferente]"
- Ejemplo: "SI me siento demasiado cansado después del trabajo, ENTONCES haré mi ritual de solo 2 minutos en vez de 5"

Parte 2: Análisis breve
- "¿Qué pasó?" (selección múltiple):
  - Me sentí abrumado
  - Tuve un día malo emocionalmente
  - Se me olvidó
  - No tenía ganas
  - Circunstancia externa (viaje, emergencia)
  - Otro (campo libre)
- "¿Qué hubiera funcionado para evitarlo?" (campo libre, max 200 chars)

Parte 3: Micro-acción de re-entrada
- Completar el ritual del Módulo 1 (versión reducida de 2 minutos)

**Si completa dentro de 24h:**
- La racha reinicia desde 1 (no desde 0)
- Mensaje: "Caíste. Pero volviste en menos de 24 horas. Eso es más de lo que el 90% de las personas hacen."
- Se registra en el Tablero de Evidencia como "Recuperación exitosa"

**Si NO completa en 24h:**
- La racha permanece en 0
- Pero NO hay castigo adicional — solo la consecuencia natural de la racha rota
- La app muestra un mensaje empático: "Cuando estés listo, aquí estaremos. Sin juicio."

---

## BONO 2: CALENDARIO VISUAL DE RACHAS IMPARABLES

### Nombre en la app: "Calendario Visual de Rachas Imparables"
### Color: #8B5CF6 (púrpura — comparte con Módulo 2)

### Propósito
Feedback visual-fisiológico de progreso. El usuario debe SENTIR el avance de forma visceral.

### Mecanismo

**Evolución cromática de la interfaz:**
- A medida que la cadena crece, elementos de la interfaz cambian sutilmente de color:
  - Días 0-5: Tonos fríos (azul oscuro, gris)
  - Días 6-12: Tonos neutros (azul medio, verde tenue)
  - Días 13-20: Tonos cálidos (verde, ámbar)
  - Días 21-29: Tonos dorados
  - Día 30: Dorado completo con destellos
- El cambio es gradual — el usuario lo nota día a día sin que sea agresivo

**Vista de racha expandida:**
- Línea de tiempo horizontal que muestra los 30 días como eslabones de una cadena
- Cada eslabón completado tiene peso visual (brillo, color sólido)
- Los eslabones no completados son transparentes/fantasma
- Al tocar un eslabón: detalle del día (meta, micro-acción, hora de completado)

**Integrado con Módulo 2** — comparten la misma pantalla de calendario pero este bono añade:
- La evolución cromática
- La vista de cadena horizontal
- Los hitos visuales (eslabón especial cada 7 días)

---

## BONO 3: REINICIO MENTAL DE EMERGENCIA

### Nombre en la app: "Reinicio Mental de Emergencia"
### Color: #10B981 (verde esmeralda oscuro)

### Propósito
Eliminar la culpa acumulada por años de intentos fallidos. Principio: el perdón propio no es debilidad — es la precondición para construir algo nuevo. Nadie construye sobre cimientos de culpa.

### Contenido educativo
"Antes de poder construir una nueva identidad, necesitas soltar la vieja. No la persona que eras — sino la CULPA por haber sido esa persona. Los fracasos pasados no son sentencias. Son borradores. Y hoy los vas a soltar."

### Flujo: "Quema de Culpa" (ejercicio de una sola sesión, repetible)

**Parte 1: Escritura Catártica**
- Instrucción: "Escribe todo lo que te pesa. Los intentos fallidos. Las promesas rotas. Las metas abandonadas. Sin filtro, sin censura. Nadie más va a leer esto."
- Textarea amplio, sin límite de caracteres
- Tono de la interfaz: oscuro, íntimo, seguro
- Tiempo sugerido: 5-10 minutos

**Parte 2: Identificación de Etiquetas Negativas**
- Instrucción: "De todo lo que escribiste, ¿qué etiquetas te has puesto a ti mismo?"
- Campos con prefijo: "Yo soy..."
  - Ejemplo que el usuario podría escribir: "Yo soy inconsistente", "Yo soy flojo", "Yo soy alguien que nunca termina nada"
- Máximo 5 etiquetas

**Parte 3: La Quema**
- Animación: El texto escrito en la Parte 1 se muestra en pantalla y se simula que SE QUEMA
  - Efecto visual de llamas consumiendo el texto desde los bordes
  - El texto se desintegra gradualmente
  - Sonido sutil de fuego (opcional, controlable)
- Mientras se quema, aparece texto: "Lo que fue, ya no es. Lo que escribiste ya no te define."

**Parte 4: Reescritura de Identidad**
- Cada etiqueta negativa de la Parte 2 se muestra tachada
- Al lado, el usuario escribe la versión nueva:
  - "Yo soy inconsistente" → [tachado] → "Yo soy alguien que está aprendiendo a cumplir"
  - "Yo soy flojo" → [tachado] → "Yo soy alguien que actúa aunque no tenga ganas"
- Fórmula guía: "En el pasado yo era [X], pero AHORA soy [identidad nueva]"
- Las nuevas identidades se guardan y aparecen como recordatorios rotativos en el dashboard

**Parte 5: Cierre**
- Texto: "Acabas de hacer algo que la mayoría nunca hará: perdonarte. No para justificar el pasado. Para liberar el futuro."
- Se registra en el Tablero de Evidencia como "Reinicio Mental completado"

---

## FEATURE TRANSVERSAL: TABLERO DE EVIDENCIA

### Propósito
Un lugar donde se acumula TODA la evidencia de acción del usuario. Una sola pantalla que le dice al cerebro: "Mira todo lo que has hecho." Contrarresta la narrativa interna de "nunca cumplo nada."

### Contenido que se acumula automáticamente
- Total de días completados
- Total de metas escritas (Módulo 1)
- Total de micro-acciones realizadas
- Total de declaraciones leídas en voz alta
- Total de rescates exitosos (Módulo 3)
- Total de recetas de hábitos creadas y completadas (Módulo 5)
- Total de microvictorias registradas
- Nivel de confianza actual (Módulo 4)
- Recuperaciones exitosas (Bono 1)
- Reinicio Mental completado (Bono 3)
- Reflexiones semanales completadas

### Visualización
- Pantalla con "tarjetas de evidencia" — cada tipo de acción es una tarjeta con:
  - Ícono
  - Número acumulado
  - Texto: "X metas escritas" / "X rescates exitosos"
- Sección destacada: "Tu mayor logro hasta ahora" (el dato más impresionante del usuario)
- Sección al fondo: Comparación con su Perfil de Partida (del onboarding)
  - "Cuando empezaste, tu autoeficacia percibida era 3/10. Hoy, con X días cumplidos, tienes Y evidencias reales de que sí puedes."

### Hitos compartibles
Al alcanzar ciertos hitos, se genera una imagen compartible:
- 7 días: "🔥 7 días sin empezar de cero"
- 15 días: "🔥🔥 15 días de cadena imparable"
- 21 días: "💎 21 días. El hábito se está cableando."
- 30 días: "🏆 30 DÍAS. LA ÚLTIMA VEZ QUE EMPECÉ DE CERO."
- Cada imagen incluye: logo del sistema, dato del hito, diseño compartible para historias de Instagram/WhatsApp

---

## FEATURE TRANSVERSAL: MICRO-LECCIONES DIARIAS

### Propósito
Un párrafo corto (30-45 segundos de lectura) que aparece cada día con un principio del sistema. Educa mientras motiva. Le da contenido fresco diario para que la app no se sienta repetitiva.

### Formato
- Título de la lección (3-5 palabras)
- Párrafo de 3-5 líneas
- Sin citas textuales de autores — todo reformulado como enseñanza propia del sistema
- Botón "Entendido" que marca como leída

### Plan de 30 lecciones

**Semana 1: Fundamentos de por qué abandonas**

Día 1 — "Por qué siempre reiniciabas"
El cerebro tiene un mecanismo de protección que te regresa a lo conocido cada vez que intentas algo nuevo. No es debilidad — es biología. Este sistema existe para desactivar ese mecanismo con acciones tan pequeñas que tu cerebro no las percibe como amenaza.

Día 2 — "La cuenta invisible"
Cada vez que te haces una promesa y no la cumples, tu cerebro registra un "débito" en tu cuenta de confianza interna. Después de suficientes débitos, tu mente cierra la cuenta. Hoy empezamos a reabrirla con depósitos pequeños pero reales.

Día 3 — "La trampa de la motivación"
La motivación es una emoción, y las emociones son temporales. Construir tu vida sobre la motivación es como construir una casa sobre arena movediza. Lo que necesitas es un sistema que funcione incluso cuando no tengas ganas. Eso es exactamente lo que estás usando.

Día 4 — "El mito de los 21 días"
No existe un número mágico para formar un hábito. Lo que sí existe es un umbral de evidencia: el punto donde tu cerebro acumula suficientes pruebas de que "esto es lo que hago" y deja de resistirse. Cada día que cumples, te acercas a ese umbral.

Día 5 — "Identidad, no resultados"
La mayoría de personas se enfoca en lo que quiere LOGRAR. Las personas que realmente cambian se enfocan en quién quieren SER. "Quiero escribir un libro" fracasa. "Soy alguien que escribe todos los días" transforma. La diferencia es sutil pero lo cambia todo.

Día 6 — "El poder del entorno"
Tu fuerza de voluntad es un recurso limitado. Tu entorno es ilimitado. Si tienes que usar voluntad para hacer lo correcto, ya perdiste. Diseña tu espacio para que lo correcto sea lo más fácil: pon el libro en la almohada, las pesas al lado de la cama, la app como primer ícono del teléfono.

Día 7 — "Tu primera semana"
Llevas 7 días. No 7 días "intentando". 7 días CUMPLIENDO. Eso ya es más de lo que la mayoría logra cuando intenta cambiar. Tu cerebro lo ha registrado. Ahora vamos por la segunda semana.

**Semana 2: Mecánicas del sistema**

Día 8 — "La regla del mínimo viable"
Cuando no tengas ganas, no busques hacer la versión completa. Busca la versión mínima. 1 sentadilla en vez de 30. 1 línea escrita en vez de 1 página. El objetivo no es el resultado — es no romper la cadena. El hábito se cuida. Los resultados llegan solos.

Día 9 — "Anclas y disparadores"
Cada hábito que ya tienes (lavarte los dientes, servir café, sentarte en el escritorio) es un ancla perfecta para uno nuevo. No necesitas crear un nuevo momento en tu día — solo necesitas enganchar la nueva acción a algo que ya haces automáticamente.

Día 10 — "La señal, la acción y la recompensa"
Todo hábito sigue un ciclo de tres partes: algo dispara la acción (señal), haces la acción (rutina), y tu cerebro recibe algo a cambio (recompensa). El secreto es hacer que la recompensa sea inmediata. Por eso celebras cada microvictoria — ese es el momento donde tu cerebro decide: "quiero repetir esto."

Día 11 — "Negocios consigo mismo"
"Mañana lo hago" es la frase más peligrosa del español. No porque sea falsa, sino porque tu cerebro la usa como escape cada vez que algo le incomoda. Hoy practica esto: cuando escuches esa voz interna, responde con una acción de 60 segundos. Solo 60 segundos. La negociación se detiene con movimiento.

Día 12 — "El efecto dominó"
Cuando cumples una cosa pequeña, tu cerebro activa un efecto cascada: "Si pude con esto, puedo con lo siguiente." Una microvictoria genera energía para la siguiente. Por eso el sistema empieza con acciones ridículamente pequeñas — no porque sean el objetivo, sino porque son la chispa que enciende todo lo demás.

Día 13 — "La visualización como herramienta"
Tu mente no distingue claramente entre una experiencia vívida imaginada y una real. Cuando visualizas tu meta con detalle — color, textura, sonido, emoción — tu cerebro empieza a crear los caminos neurales como si ya la estuvieras viviendo. Tus 3 metas del ritual matutino son exactamente esto: visualización activa.

Día 14 — "Dos semanas"
14 días. Estás en territorio donde la mayoría ya abandonó. Tú no. Y la razón no es que tengas más voluntad que ellos. Es que tienes un sistema. Tú no dependes de la motivación del lunes. Dependes de una estructura que funciona cualquier día.

**Semana 3: Profundización psicológica**

Día 15 — "Tu autoconcepto es un termostato"
Imagina un termostato puesto en 20°C. Si la habitación sube a 25°, el sistema la enfría. Si baja a 15°, la calienta. Tu autoconcepto funciona igual: si tus resultados superan la imagen que tienes de ti mismo, tu mente te sabotea para volver al "punto fijo". La única forma de subir los resultados de forma permanente es subir el termostato primero. Eso es lo que haces aquí cada día.

Día 16 — "La ley de la acumulación"
Todo gran logro es la acumulación de cientos de pequeñas acciones invisibles. Nadie ve las 500 páginas que escribiste antes de publicar el libro. Nadie ve los 200 entrenamientos antes del cuerpo que admiran. El mundo solo ve el resultado. Pero tú sabes la verdad: se construyó con días como HOY.

Día 17 — "La responsabilidad absoluta"
Aceptar responsabilidad total por tu vida es aterrador. Pero también es lo más liberador que existe. Porque si tú causaste el problema, tú puedes resolverlo. Si la culpa es del mundo, estás atrapado. Elige la incomodidad de la responsabilidad sobre la comodidad de la excusa.

Día 18 — "El perdón como combustible"
No puedes construir una nueva identidad mientras cargas la culpa de la anterior. Perdonarte no significa que lo que hiciste estaba bien. Significa que te niegas a dejar que el pasado siga secuestrando tu futuro. Cada día que cumples AHORA es más poderoso que cien días que no cumpliste ANTES.

Día 19 — "El control que sí tienes"
No controlas la economía, ni el clima, ni lo que otros piensan de ti. Pero controlas qué piensas, qué haces con tu próxima hora, y si cumples o no la promesa que te hiciste esta mañana. Enfocarte en lo que controlas elimina la ansiedad de lo que no.

Día 20 — "¿Qué harías si no pudieras fallar?"
Esta pregunta no es retórica — es una herramienta de diagnóstico. Lo que respondas revela lo que realmente quieres, sin el filtro del miedo. Porque el miedo al fracaso no te protege. Te paraliza. Y la parálisis tiene un costo mucho mayor que cualquier fracaso.

Día 21 — "Tres semanas"
21 días. Hay un cambio real sucediendo. No solo en tu racha — en tu conversación interna. Hace 3 semanas, tu voz interior decía "¿para qué intentar?". Hoy dice "¿qué sigue?". Ese cambio de pregunta es la señal de que tu identidad se está actualizando.

**Semana 4: Consolidación y futuro**

Día 22 — "El interés compuesto del carácter"
Cada día de cumplimiento no solo suma — multiplica. El día 1 de una racha es difícil. El día 22 tiene el peso de 21 días de evidencia detrás. La inercia ahora trabaja A TU FAVOR, no en tu contra. Esto es lo que significa cambiar la identidad: cuando la inercia empuja hacia el cumplimiento.

Día 23 — "Por qué lo simple vence a lo complejo"
Los sistemas complicados son frágiles. Un plan de productividad con 15 pasos se rompe con una sola interrupción. Un ritual de 5 minutos sobrevive a casi cualquier cosa. Por eso tu sistema funciona: porque es tan simple que tu mente no puede usar la complejidad como excusa.

Día 24 — "La hora más productiva"
Todos tenemos una hora del día donde nuestra mente está en su máximo. Para la mayoría es temprano, pero no para todos. Identifica la tuya y protégela como si fuera sagrada. Lo más importante del día se hace en esa hora. Todo lo demás puede esperar.

Día 25 — "El círculo de competencia"
No necesitas ser bueno en todo. Necesitas ser excelente en las 2-3 cosas que más impactan tu vida. Concentra tu energía ahí. Cada minuto que gastas en algo que no importa es un minuto que le robas a lo que sí importa.

Día 26 — "La persistencia es una habilidad"
La persistencia no es un rasgo de personalidad con el que naces o no. Es una habilidad que se entrena con repetición. Y llevas 26 días entrenándola. Cada día que no abandonaste fue una repetición. Cada tentación que resististe fue una repetición. Eres más fuerte hoy que hace 26 días — y tienes la evidencia.

Día 27 — "La versión de ti que otros no ven"
Nadie sabe que llevas 27 días cumpliendo. Nadie vio tus rituales matutinos. Nadie leyó tus metas. Y no importa. Porque este proceso no era para impresionar a nadie. Era para demostrarte a TI MISMO que puedes confiar en tu palabra. Esa es la victoria que nadie te puede quitar.

Día 28 — "La mente que ya no negocia"
¿Recuerdas cuando "mañana lo hago" era tu frase predeterminada? Observa cómo tu diálogo interno cambió en estas 4 semanas. La voz negociadora no desaparece — pero ahora hay una voz más fuerte que responde: "No. Lo hago ahora."

Día 29 — "La víspera"
Mañana completas 30 días. Mañana se desbloquea tu carta. Mañana ves quién eras cuando empezaste y quién eres ahora. Pero hoy — hoy es el día 29. Y merece el mismo respeto que el día 1. Porque la consistencia no tiene días importantes y días prescindibles. Todos cuentan igual.

Día 30 — "Ya no empiezas de cero"
Llegaste. No porque tuvieras más disciplina que otros. No porque fuera fácil. Llegaste porque construiste un sistema, lo seguiste cuando no tenías ganas, te rescataste cuando caíste, y te negaste a aceptar que "así eres tú". La persona que escribió esa carta hace 30 días no te reconocería. Pero tú sí la reconoces a ella — porque recuerdas de dónde saliste.

---

## FEATURE TRANSVERSAL: REFLEXIÓN SEMANAL

### Propósito
Cada 7 días, un ejercicio de 3 minutos que produce evidencia tangible de cambio.

### Frecuencia
Día 7, 14, 21, 28 y día 30 (reflexión final especial)

### Formato (días 7, 14, 21, 28)
3 preguntas breves:

1. "¿Qué fue lo más difícil de esta semana y cómo lo manejaste?"
2. "¿Qué aprendiste de ti mismo que no sabías hace 7 días?"
3. "En una palabra, ¿cómo te sientes comparado con la semana pasada?"

Se guardan las respuestas. Se muestran en el Tablero de Evidencia como "línea de tiempo de reflexiones" — el usuario puede ver la evolución de sus propias palabras semana a semana.

### Reflexión Final (Día 30)

**Parte 1: Desbloqueo de la Carta**
- Animación del sobre sellado abriéndose
- Se muestra la carta que el usuario escribió en el onboarding
- Tiempo para leerla (sin presión, sin temporizador)

**Parte 2: Comparación de Perfil**
- Se muestran las respuestas del diagnóstico inicial junto a la situación actual:
  - "Hace 30 días dijiste que tu motivación duraba [X]. Hoy llevas 30 días."
  - "Hace 30 días tu área más afectada era [X]. ¿Cómo la ves ahora?"
  - "Hace 30 días lo que querías cambiar era: [respuesta]. ¿Lo lograste?"

**Parte 3: Carta de Mi Yo Actual a Mi Yo del Pasado**
- "Ahora escríbele a la persona que eras hace 30 días. ¿Qué le dirías?"
- Campo de texto libre

**Parte 4: Certificado de Transformación**
- Imagen generada con:
  - Nombre del usuario
  - "30 días de cadena imparable"
  - Fecha de inicio y fin
  - Logo del sistema
  - Compartible en redes sociales

---

## ARQUITECTURA TÉCNICA

### Stack recomendado para Vercel
- **Framework:** Next.js (App Router) o Vite + React
- **Estilos:** Tailwind CSS
- **Base de datos:** Supabase (para persistir datos del usuario entre dispositivos)
- **Autenticación:** Supabase Auth (email/password o magic link)
- **Hosting:** Vercel
- **PWA:** next-pwa o vite-plugin-pwa (para instalar en pantalla de inicio del móvil)

### Modelo de datos principal

```
usuario {
  id, nombre, email, hora_despertar,
  fecha_inicio, racha_actual, mejor_racha,
  total_dias, nivel_confianza,
  perfil_partida (JSON del diagnóstico),
  carta_yo_futuro (texto encriptado),
  modelos_a_seguir [3 strings],
  etiquetas_nuevas [hasta 5 strings],
  configuracion (JSON)
}

dia_completado {
  id, usuario_id, fecha,
  tipo (normal | rescate | recuperacion),
  metas_escritas [3 strings],
  declaracion_del_dia (número 1-30),
  micro_accion_elegida (string),
  microvictorias_completadas (número 0-5),
  hora_completado
}

receta_habito {
  id, usuario_id,
  ancla (string), micro_habito (string),
  activa (boolean),
  veces_completada (número)
}

reflexion_semanal {
  id, usuario_id, semana (1-4),
  respuesta_1, respuesta_2, respuesta_3,
  fecha
}

reinicio_mental {
  id, usuario_id, fecha,
  etiquetas_viejas [strings],
  etiquetas_nuevas [strings]
}
```

### Protección de contenido
- El contenido de la app solo es accesible con cuenta autenticada
- Las micro-lecciones se cargan desde la base de datos (no están hardcodeadas en el frontend)
- Se puede implementar verificación de compra (integrar con pasarela de pago de la landing)

---

## PLAN DE CONSTRUCCIÓN SUGERIDO

### Fase 1: Core funcional
1. Setup del proyecto (Next.js/Vite + Supabase + Vercel)
2. Autenticación (registro/login)
3. Onboarding completo (5 pantallas)
4. Dashboard con anillo de racha
5. Módulo 1: Sistema Antiabandono (ritual diario funcional)
6. Módulo 2: Calendario + Avatar básico
7. Sistema de racha (cálculo automático)

### Fase 2: Módulos completos
8. Módulo 3: Protocolo de Rescate (flujo de 5 pasos)
9. Módulo 4: Mapa de Confianza (wizard + 7 niveles)
10. Módulo 5: Microvictorias (recipe builder + celebración)
11. Micro-lecciones diarias (30 lecciones)

### Fase 3: Bonos y features transversales
12. Bono 1: Anti-Recaída 24h
13. Bono 2: Calendario Visual (evolución cromática)
14. Bono 3: Reinicio Mental (Quema de Culpa)
15. Tablero de Evidencia
16. Reflexiones semanales
17. Ceremonia Día 30 (carta + certificado)

### Fase 4: Pulido
18. Animaciones y efectos visuales
19. PWA (instalable)
20. Hitos compartibles (imágenes para redes)
21. Responsive y testing
22. Integración con pasarela de pago

---

*Documento de planificación v1.0 — La Última Vez Que Empiezas De Cero*
*Todos los principios son reformulaciones originales. Ningún contenido con derechos de autor de terceros.*
