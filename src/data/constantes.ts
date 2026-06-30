import type { NivelConfianza, MensajeRacha, Hito } from '@/types';

// ============================================
// 7 NIVELES DE CONFIANZA (Módulo 4)
// Los niveles son IRREVERSIBLES una vez desbloqueados
// ============================================
export const nivelesConfianza: NivelConfianza[] = [
  { id: 1, nombre: 'Escéptico', diasRequeridos: 0, descripcion: 'Aún no confías. Es normal. Estás empezando.', emoji: '🌱' },
  { id: 2, nombre: 'Curioso', diasRequeridos: 3, descripcion: 'Empiezas a notar que puedes cumplir.', emoji: '👀' },
  { id: 3, nombre: 'Esperanzado', diasRequeridos: 7, descripcion: 'La evidencia se acumula. Tu mente lo nota.', emoji: '✨' },
  { id: 4, nombre: 'Creyente', diasRequeridos: 12, descripcion: 'Ya no dudas tanto. Los datos hablan.', emoji: '💪' },
  { id: 5, nombre: 'Confiado', diasRequeridos: 18, descripcion: 'Tu palabra empieza a valer de nuevo.', emoji: '🔥' },
  { id: 6, nombre: 'Sólido', diasRequeridos: 24, descripcion: 'Cumplir es parte de quién eres.', emoji: '💎' },
  { id: 7, nombre: 'Inquebrantable', diasRequeridos: 30, descripcion: 'Tu identidad cambió. Ya no empiezas de cero.', emoji: '🏆' },
];

// ============================================
// MENSAJES CONTEXTUALES DE RACHA (Dashboard)
// ============================================
export const mensajesRacha: MensajeRacha[] = [
  { rangoMin: 0, rangoMax: 0, mensaje: 'Hoy empiezas a confiar en ti', emoji: '🌱' },
  { rangoMin: 1, rangoMax: 3, mensaje: 'Estás construyendo evidencia', emoji: '⚡' },
  { rangoMin: 4, rangoMax: 7, mensaje: 'La cadena se fortalece', emoji: '✨' },
  { rangoMin: 8, rangoMax: 14, mensaje: 'Tu mente ya no te sabotea', emoji: '🔥' },
  { rangoMin: 15, rangoMax: 24, mensaje: 'Eres imparable', emoji: '🔥🔥' },
  { rangoMin: 25, rangoMax: 29, mensaje: 'La transformación está casi completa', emoji: '🔥🔥🔥' },
  { rangoMin: 30, rangoMax: Infinity, mensaje: 'IDENTIDAD TRANSFORMADA', emoji: '🏆' },
];

// ============================================
// HITOS COMPARTIBLES
// ============================================
export const hitos: Hito[] = [
  { dias: 7, titulo: '7 días sin empezar de cero', emoji: '🔥' },
  { dias: 15, titulo: '15 días de cadena imparable', emoji: '🔥🔥' },
  { dias: 21, titulo: '21 días. El hábito se está cableando.', emoji: '💎' },
  { dias: 30, titulo: '30 DÍAS. LA ÚLTIMA VEZ QUE EMPECÉ DE CERO.', emoji: '🏆' },
];

// ============================================
// FRASES DE CELEBRACIÓN (Módulo 5)
// ============================================
export const frasesCelebracion: string[] = [
  '¡Eso cuenta! 💪',
  '¡Un voto más por tu nueva identidad!',
  '¡Tu cerebro acaba de registrar una victoria!',
  '¡Evidencia acumulada!',
  '¡Eso es disciplina en acción!',
  '¡La cadena crece!',
  '¡Así se construye confianza!',
  '¡Cada paso cuenta!',
];

// ============================================
// MICRO-ACCIONES PREDEFINIDAS (Módulo 1)
// ============================================
export const microAccionesPredefinidas: string[] = [
  'Escribir 1 párrafo sobre mi meta principal',
  'Hacer 10 sentadillas o estiramientos',
  'Organizar 1 cosa de mi espacio',
  'Leer 2 páginas de cualquier libro',
  'Respirar conscientemente 2 minutos',
  'Escribir 3 cosas por las que agradezco',
];

// ============================================
// OPCIONES DEL DIAGNÓSTICO (Onboarding)
// ============================================
export const preguntasDiagnostico = {
  intentosCambio: {
    pregunta: '¿Cuántas veces has intentado cambiar un hábito importante en el último año?',
    opciones: ['Ninguna', '1-2 veces', '3-5 veces', 'Más de 5', 'Perdí la cuenta'],
  },
  duracionMotivacion: {
    pregunta: 'Cuando empiezas algo nuevo, ¿cuánto suele durar tu motivación?',
    opciones: ['1-3 días', 'Una semana', '2-3 semanas', 'Un mes', 'Depende'],
  },
  relacionPromesas: {
    pregunta: '¿Cómo describirías tu relación con tus propias promesas?',
    opciones: ['Las cumplo casi siempre', 'Las cumplo a veces', 'Me cuesta mucho', 'Ya ni me las hago', 'Prefiero no responder'],
  },
  areaSufrida: {
    pregunta: '¿Qué área de tu vida sientes que más ha sufrido por falta de consistencia?',
    opciones: ['Salud/cuerpo', 'Finanzas', 'Relaciones', 'Proyectos/trabajo', 'Todo en general'],
  },
};

// ============================================
// PREGUNTAS WIZARD "MI YO 2.0" (Módulo 4)
// ============================================
export const preguntasWizardYo20: string[] = [
  'Si supieras con absoluta certeza que no puedes fallar, ¿qué intentarías?',
  'Si tuvieras todo el dinero que necesitas, ¿cómo pasarías tus días?',
  '¿A quién admiras profundamente y por qué? Nombra 3 personas (reales o ficticias)',
  '¿Qué dirían de ti las personas que más te importan si pudieras escuchar sus conversaciones?',
  'Si tuvieras solo 6 meses de vida, ¿qué dejarías de hacer inmediatamente?',
  '¿Qué talento o habilidad tienes que no estás usando al máximo?',
  'Describe en un párrafo a tu Yo Ideal — la persona que quieres ser en 1 año',
];

// ============================================
// MICRO-ACCIONES DE RESCATE (Módulo 3)
// ============================================
export const microAccionesRescate: string[] = [
  'Escribir por qué estoy aquí ahora mismo',
  'Hacer 5 sentadillas',
  'Beber un vaso de agua conscientemente',
  'Respirar 1 minuto con los ojos cerrados',
];

// ============================================
// COLORES DE EVOLUCIÓN CROMÁTICA (Bono 2)
// Cambian gradualmente según la racha
// ============================================
export const evolucionCromatica = {
  frio: { bg: '#0F0F12', accent: '#6B7280', ring: '#4B5563' },       // Días 0-5
  neutro: { bg: '#0F0F14', accent: '#6B8A8A', ring: '#4B7A7A' },     // Días 6-12
  calido: { bg: '#12100F', accent: '#D97706', ring: '#B45309' },      // Días 13-20
  dorado: { bg: '#14120F', accent: '#C8A44E', ring: '#B8943E' },      // Días 21-29
  completo: { bg: '#16140F', accent: '#E8D5A0', ring: '#C8A44E' },    // Día 30
};

export function getColorsPorRacha(racha: number) {
  if (racha <= 5) return evolucionCromatica.frio;
  if (racha <= 12) return evolucionCromatica.neutro;
  if (racha <= 20) return evolucionCromatica.calido;
  if (racha <= 29) return evolucionCromatica.dorado;
  return evolucionCromatica.completo;
}
