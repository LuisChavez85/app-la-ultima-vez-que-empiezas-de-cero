// ============================================
// TIPOS PRINCIPALES - La Última Vez Que Empiezas De Cero
// ============================================

// --- Usuario ---
export interface Usuario {
  id?: number;
  nombre: string;
  email?: string;
  horaDespertar: string; // "06:00", "07:00", etc.
  fechaInicio: string; // ISO date
  rachaActual: number;
  mejorRacha: number;
  totalDias: number;
  nivelConfianza: NivelConfianzaId;
  perfilPartida: PerfilPartida;
  cartaYoFuturo: string;
  modelosASeguir: string[]; // 3 personas
  etiquetasNuevas: string[]; // hasta 5
  onboardingCompleto: boolean;
  wizardYo20Completo: boolean;
  reinicioMentalCompleto: boolean;
  configuracion: Configuracion;
}

export interface Configuracion {
  sonidosActivos: boolean;
  vibracionActiva: boolean;
  temaOscuro: boolean;
}

// --- Perfil de Partida (Diagnóstico Onboarding) ---
export interface PerfilPartida {
  intentosCambio: string;
  duracionMotivacion: string;
  relacionPromesas: string;
  areaSufrida: string;
  queCambiaria: string;
  autoeficaciaInicial: number; // 1-10, calculado
}

// --- Día Completado ---
export type TipoDia = 'normal' | 'rescate' | 'recuperacion';

export interface DiaCompletado {
  id?: number;
  fecha: string; // ISO date (YYYY-MM-DD)
  tipo: TipoDia;
  metasEscritas: string[]; // 3 metas
  declaracionDelDia: number; // 1-30
  microAccionElegida: string;
  microvictoriasCompletadas: number; // 0-5
  horaCompletado: string; // ISO datetime
  leccionLeida: boolean;
  gratitud?: string;
}

// --- Receta de Hábito (Módulo 5) ---
export interface RecetaHabito {
  id?: number;
  ancla: string;
  microHabito: string;
  activa: boolean;
  vecesCompletada: number;
  completadaHoy: boolean;
  ultimaFechaCompletada?: string;
}

// --- Reflexión Semanal ---
export interface ReflexionSemanal {
  id?: number;
  semana: number; // 1-5 (5 = reflexión final día 30)
  diaDelPrograma: number; // 7, 14, 21, 28, 30
  respuesta1: string;
  respuesta2: string;
  respuesta3: string;
  fecha: string; // ISO date
}

// --- Reinicio Mental (Bono 3) ---
export interface ReinicioMental {
  id?: number;
  fecha: string;
  escrituraCatartica: string;
  etiquetasViejas: string[];
  etiquetasNuevas: string[];
}

// --- Rescate (Módulo 3) ---
export interface Rescate {
  id?: number;
  fecha: string;
  reflexion: string; // max 280 chars
  microAccionRealizada: string;
}

// --- Recuperación (Bono 1) ---
export interface Recuperacion {
  id?: number;
  fecha: string;
  situacionCaida: string;
  intencionImplementacion: string; // SI [x] ENTONCES [y]
  quePaso: string[];
  queHubieraFuncionado: string;
  completadaEnTiempo: boolean;
}

// --- Wizard "Mi Yo 2.0" (Módulo 4) ---
export interface WizardYo20 {
  id?: number;
  fecha: string;
  respuestas: string[]; // 7 respuestas
}

// --- Niveles de Confianza ---
export type NivelConfianzaId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface NivelConfianza {
  id: NivelConfianzaId;
  nombre: string;
  diasRequeridos: number;
  descripcion: string;
  emoji: string;
}

// --- Micro-lección ---
export interface MicroLeccion {
  dia: number;
  titulo: string;
  contenido: string;
  semana: number;
  tematica: string;
}

// --- Declaración diaria ---
export interface Declaracion {
  dia: number;
  texto: string;
}

// --- Estado de la app ---
export interface EstadoApp {
  diaActual: number; // Día del programa (1-30+)
  ritualCompletadoHoy: boolean;
  leccionLeidaHoy: boolean;
  rachaActiva: boolean;
  ultimaActividad?: string; // ISO datetime
  horasDesdeUltimaActividad: number;
  antiRecaidaActiva: boolean;
  cronometro24h?: string; // ISO datetime cuando expira
}

// --- Navegación ---
export type SeccionApp =
  | 'inicio'
  | 'cadena'
  | 'evidencia'
  | 'ajustes'
  | 'onboarding'
  | 'modulo-1'
  | 'modulo-2'
  | 'modulo-3'
  | 'modulo-4'
  | 'modulo-5'
  | 'bono-1'
  | 'bono-2'
  | 'bono-3';

// --- Mensajes contextuales de racha ---
export interface MensajeRacha {
  rangoMin: number;
  rangoMax: number;
  mensaje: string;
  emoji: string;
}

// --- Hito compartible ---
export interface Hito {
  dias: number;
  titulo: string;
  emoji: string;
}
