// ============================================
// BASE DE DATOS LOCAL - IndexedDB con Dexie.js
// Todos los datos se guardan en el teléfono del usuario
// ============================================

import Dexie, { type Table } from 'dexie';
import type {
  Usuario,
  DiaCompletado,
  RecetaHabito,
  ReflexionSemanal,
  ReinicioMental,
  Rescate,
  Recuperacion,
  WizardYo20,
} from '@/types';

export class AppDatabase extends Dexie {
  usuario!: Table<Usuario>;
  diasCompletados!: Table<DiaCompletado>;
  recetasHabito!: Table<RecetaHabito>;
  reflexionesSemanales!: Table<ReflexionSemanal>;
  reiniciosMentales!: Table<ReinicioMental>;
  rescates!: Table<Rescate>;
  recuperaciones!: Table<Recuperacion>;
  wizardYo20!: Table<WizardYo20>;

  constructor() {
    super('LaUltimaVezDB');

    this.version(1).stores({
      usuario: '++id',
      diasCompletados: '++id, fecha, tipo',
      recetasHabito: '++id, activa',
      reflexionesSemanales: '++id, semana, diaDelPrograma',
      reiniciosMentales: '++id, fecha',
      rescates: '++id, fecha',
      recuperaciones: '++id, fecha',
      wizardYo20: '++id, fecha',
    });
  }
}

export const db = new AppDatabase();

// ============================================
// FUNCIONES HELPER PARA LA BASE DE DATOS
// ============================================

/** Obtener el usuario actual (siempre hay solo uno) */
export async function getUsuario(): Promise<Usuario | undefined> {
  return db.usuario.toCollection().first();
}

/** Crear o actualizar usuario */
export async function guardarUsuario(data: Partial<Usuario>): Promise<number> {
  const usuario = await getUsuario();
  if (usuario?.id) {
    await db.usuario.update(usuario.id, data);
    return usuario.id;
  }
  return db.usuario.add(data as Usuario);
}

/** Obtener el día completado por fecha */
export async function getDiaPorFecha(fecha: string): Promise<DiaCompletado | undefined> {
  return db.diasCompletados.where('fecha').equals(fecha).first();
}

/** Verificar si hoy ya se completó el ritual */
export async function ritualCompletadoHoy(): Promise<boolean> {
  const hoy = new Date().toISOString().split('T')[0];
  const dia = await getDiaPorFecha(hoy);
  return !!dia;
}

/** Marcar la lectura del día como completada */
export async function marcarLecturaLeida(): Promise<void> {
  const hoy = new Date().toISOString().split('T')[0];
  const dia = await getDiaPorFecha(hoy);
  if (dia?.id) {
    await db.diasCompletados.update(dia.id, { lecturaLeida: true });
  }
}

/** Verificar si la lectura de hoy fue completada */
export async function lecturaLeidaHoy(): Promise<boolean> {
  const hoy = new Date().toISOString().split('T')[0];
  const dia = await getDiaPorFecha(hoy);
  return !!(dia as DiaCompletado & { lecturaLeida?: boolean })?.lecturaLeida;
}

/** Marcar la lección del día como leída */
export async function marcarLeccionLeida(): Promise<void> {
  const hoy = new Date().toISOString().split('T')[0];
  const dia = await getDiaPorFecha(hoy);
  if (dia?.id) {
    await db.diasCompletados.update(dia.id, { leccionLeida: true });
  }
}

/** Verificar si la lección de hoy fue leída */
export async function leccionLeidaHoy(): Promise<boolean> {
  const hoy = new Date().toISOString().split('T')[0];
  const dia = await getDiaPorFecha(hoy);
  return !!dia?.leccionLeida;
}

/** Registrar un día completado */
export async function registrarDia(data: DiaCompletado): Promise<number> {
  const id = await db.diasCompletados.add(data);

  // Actualizar racha del usuario
  const usuario = await getUsuario();
  if (usuario?.id) {
    const nuevaRacha = await calcularRachaActual();
    const totalDias = await db.diasCompletados.count();
    await db.usuario.update(usuario.id, {
      rachaActual: nuevaRacha,
      mejorRacha: Math.max(usuario.mejorRacha, nuevaRacha),
      totalDias,
      nivelConfianza: calcularNivelConfianza(totalDias),
    });
  }

  return id;
}

/** Calcular la racha actual de días consecutivos */
export async function calcularRachaActual(): Promise<number> {
  const dias = await db.diasCompletados
    .orderBy('fecha')
    .reverse()
    .toArray();

  if (dias.length === 0) return 0;

  let racha = 0;
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  for (let i = 0; i < dias.length; i++) {
    const fechaDia = new Date(dias[i].fecha);
    fechaDia.setHours(0, 0, 0, 0);

    const fechaEsperada = new Date(hoy);
    fechaEsperada.setDate(fechaEsperada.getDate() - i);

    if (fechaDia.getTime() === fechaEsperada.getTime()) {
      racha++;
    } else {
      break;
    }
  }

  return racha;
}

/** Calcular nivel de confianza basado en total de días */
export function calcularNivelConfianza(totalDias: number): 1 | 2 | 3 | 4 | 5 | 6 | 7 {
  if (totalDias >= 30) return 7;
  if (totalDias >= 24) return 6;
  if (totalDias >= 18) return 5;
  if (totalDias >= 12) return 4;
  if (totalDias >= 7) return 3;
  if (totalDias >= 3) return 2;
  return 1;
}

/** Calcular día del programa (desde fecha de inicio) */
export async function getDiaDelPrograma(): Promise<number> {
  const usuario = await getUsuario();
  if (!usuario?.fechaInicio) return 0;

  const inicio = new Date(usuario.fechaInicio);
  const hoy = new Date();
  const diffTime = hoy.getTime() - inicio.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Día 1 es el día de inicio
}

/** Obtener horas desde última actividad */
export async function getHorasDesdeUltimaActividad(): Promise<number> {
  const ultimoDia = await db.diasCompletados
    .orderBy('fecha')
    .reverse()
    .first();

  if (!ultimoDia) return Infinity;

  const ultima = new Date(ultimoDia.horaCompletado);
  const ahora = new Date();
  return (ahora.getTime() - ultima.getTime()) / (1000 * 60 * 60);
}

/** Verificar si la reflexión semanal ya existe para un día del programa */
export async function reflexionExiste(diaDelPrograma: number): Promise<boolean> {
  const reflexion = await db.reflexionesSemanales
    .where('diaDelPrograma')
    .equals(diaDelPrograma)
    .first();
  return !!reflexion;
}

/** Obtener todas las estadísticas para el Tablero de Evidencia */
export async function getEstadisticasEvidencia() {
  const usuario = await getUsuario();
  const dias = await db.diasCompletados.toArray();
  const rescates = await db.rescates.count();
  const recuperaciones = await db.recuperaciones.count();
  const recetas = await db.recetasHabito.toArray();
  const reflexiones = await db.reflexionesSemanales.count();
  const reinicio = await db.reiniciosMentales.count();

  const totalMetas = dias.reduce((sum, d) => sum + (d.metasEscritas?.length || 0), 0);
  const totalMicroAcciones = dias.filter(d => d.microAccionElegida).length;
  const totalDeclaraciones = dias.filter(d => d.declaracionDelDia > 0).length;
  const totalMicrovictorias = dias.reduce((sum, d) => sum + d.microvictoriasCompletadas, 0);
  const totalRecetasCompletadas = recetas.reduce((sum, r) => sum + r.vecesCompletada, 0);

  return {
    totalDias: dias.length,
    totalMetas,
    totalMicroAcciones,
    totalDeclaraciones,
    totalRescates: rescates,
    totalRecuperaciones: recuperaciones,
    totalRecetasCreadas: recetas.length,
    totalRecetasCompletadas,
    totalMicrovictorias,
    nivelConfianza: usuario?.nivelConfianza || 1,
    reinicioMentalCompleto: reinicio > 0,
    totalReflexiones: reflexiones,
    rachaActual: usuario?.rachaActual || 0,
    mejorRacha: usuario?.mejorRacha || 0,
  };
}

/** Obtener recetas de hábito activas */
export async function getRecetasActivas(): Promise<RecetaHabito[]> {
  return db.recetasHabito.where('activa').equals(1).toArray();
}

/** Resetear el estado de "completada hoy" de todas las recetas (llamar a medianoche) */
export async function resetRecetasDiarias(): Promise<void> {
  const hoy = new Date().toISOString().split('T')[0];
  const recetas = await db.recetasHabito.toArray();
  for (const receta of recetas) {
    if (receta.ultimaFechaCompletada !== hoy && receta.id) {
      await db.recetasHabito.update(receta.id, { completadaHoy: false });
    }
  }
}
