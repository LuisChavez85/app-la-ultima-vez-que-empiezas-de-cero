'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getUsuario, ritualCompletadoHoy,
  getHorasDesdeUltimaActividad, reflexionExiste,
  lecturaLeidaHoy,
} from '@/lib/db';
import { mensajesRacha, hitos } from '@/data/constantes';
import { lecciones } from '@/data/lecciones';
import { lecturasDiarias } from '@/data/lecturas';
import { getColorsPorRacha } from '@/data/constantes';
import type { Usuario, SeccionApp } from '@/types';
import {
  Home, Link2, BarChart3, Settings, Zap, LifeBuoy,
  ArrowRight, Shield, Target, CheckCircle, ChevronRight,
  Sparkles, RotateCcw, CalendarDays, Trophy, BookOpen,
} from 'lucide-react';
import RitualDiario from '@/components/modules/RitualDiario';
import MicroLeccion from '@/components/modules/MicroLeccion';
import CadenaImparable from '@/components/modules/CadenaImparable';
import ProtocoloRescate from '@/components/modules/ProtocoloRescate';
import TableroeEvidencia from '@/components/modules/TableroeEvidencia';
import MapaConfianza from '@/components/modules/MapaConfianza';
import Microvictorias from '@/components/modules/Microvictorias';
import AntiRecaida from '@/components/modules/AntiRecaida';
import ReinicioMental from '@/components/modules/ReinicioMental';
import ReflexionSemanal from '@/components/modules/ReflexionSemanal';
import CeremoniaD30 from '@/components/modules/CeremoniaD30';
import LecturaDiariaComponent from '@/components/lecturas/LecturaDiaria';
import MilestoneToast from '@/components/ui/MilestoneToast';
import SOSButton from '@/components/ui/SOSButton';
import { IllustracionMontana, DecoradorLinea } from '@/components/ui/Illustrations';

const DIAS_REFLEXION = [7, 14, 21, 28];

// Variantes de animación reutilizables
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const tabVariants = {
  hidden: { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
  exit:   { opacity: 0, x: -12, transition: { duration: 0.2 } },
};

export default function Dashboard() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [ritualHecho, setRitualHecho] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState<SeccionApp>('inicio');
  const [racha, setRacha] = useState(0);
  const [horasDesdeUltima, setHorasDesdeUltima] = useState(0);
  const [mostrarRitual, setMostrarRitual] = useState(false);
  const [mostrarLeccion, setMostrarLeccion] = useState(false);
  const [mostrarRescate, setMostrarRescate] = useState(false);
  const [mostrarConfianza, setMostrarConfianza] = useState(false);
  const [mostrarMicrovictorias, setMostrarMicrovictorias] = useState(false);
  const [mostrarAntiRecaida, setMostrarAntiRecaida] = useState(false);
  const [mostrarReinicio, setMostrarReinicio] = useState(false);
  const [mostrarReflexion, setMostrarReflexion] = useState(false);
  const [mostrarCeremonia, setMostrarCeremonia] = useState(false);
  const [mostrarLectura, setMostrarLectura] = useState(false);
  const [leccionLeida, setLeccionLeida] = useState(false);
  const [lecturaLeidaState, setLecturaLeidaState] = useState(false);
  const [reflexionPendiente, setReflexionPendiente] = useState(false);
  const [ceremoniaPendiente, setCeremoniaPendiente] = useState(false);
  const [milestoneRacha, setMilestoneRacha] = useState<number | null>(null);
  const rachaAnterior = useRef<number>(0);

  const cargarDatos = useCallback(async () => {
    const [u, hecho, horas, lecturaLeida_] = await Promise.all([
      getUsuario(),
      ritualCompletadoHoy(),
      getHorasDesdeUltimaActividad(),
      lecturaLeidaHoy(),
    ]);

    if (u) {
      setUsuario(u);
      const nuevaRacha = u.rachaActual;
      setRacha(nuevaRacha);

      // Detectar hito recién alcanzado
      const esMilestone = hitos.some((h) => h.dias === nuevaRacha);
      if (esMilestone && rachaAnterior.current !== nuevaRacha && nuevaRacha > 0) {
        setMilestoneRacha(nuevaRacha);
      }
      rachaAnterior.current = nuevaRacha;

      // Reflexión semanal pendiente
      const dia = Math.min(u.rachaActual + 1, 30);
      if (DIAS_REFLEXION.includes(dia)) {
        const existe = await reflexionExiste(dia);
        setReflexionPendiente(!existe);
      } else {
        setReflexionPendiente(false);
      }

      setCeremoniaPendiente(u.rachaActual >= 30 || u.totalDias >= 30);
    }

    setRitualHecho(hecho);
    setHorasDesdeUltima(horas);
    setLecturaLeidaState(!!lecturaLeida_);
  }, []);

  useEffect(() => { cargarDatos(); }, [cargarDatos]);

  const mensajeRacha = mensajesRacha.find((m) => racha >= m.rangoMin && racha <= m.rangoMax);
  const diaDelPrograma = Math.min(racha + 1, 30);
  const semanaActual = Math.ceil(diaDelPrograma / 7);
  const leccionHoy = lecciones.find((l) => l.dia === diaDelPrograma);
  const lecturaHoy = lecturasDiarias.find((l) => l.dia === diaDelPrograma);
  const colors = getColorsPorRacha(racha);

  const horaActual = new Date().getHours();
  const saludo = horaActual < 12 ? 'Buenos días' : horaActual < 18 ? 'Buenas tardes' : 'Buenas noches';

  if (!usuario) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-gold/20 border-t-gold animate-spin" />
          <p className="text-[11px] text-ivory/25 font-body uppercase tracking-[0.15em]">Cargando</p>
        </div>
      </div>
    );
  }

  // ---- Nav bar compartida ----
  const NavBar = ({ onTabChange }: { onTabChange?: () => void }) => (
    <nav className="nav-bottom">
      {[
        { id: 'inicio' as SeccionApp, label: 'Inicio', icon: Home },
        { id: 'cadena' as SeccionApp, label: 'Cadena', icon: Link2 },
        { id: 'evidencia' as SeccionApp, label: 'Evidencia', icon: BarChart3 },
        { id: 'ajustes' as SeccionApp, label: 'Ajustes', icon: Settings },
      ].map((item) => {
        const isActive = seccionActiva === item.id && !onTabChange;
        return (
          <motion.button
            key={item.id}
            onClick={() => { onTabChange?.(); setSeccionActiva(item.id); }}
            className={`nav-item ${isActive ? 'active' : 'inactive'}`}
            whileTap={{ scale: 0.88 }}
          >
            <motion.div
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-smoke' : ''}`}
              animate={isActive ? { scale: 1.05 } : { scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <item.icon className="w-4 h-4" />
            </motion.div>
            <span className="text-[9px] font-body font-medium">{item.label}</span>
          </motion.button>
        );
      })}
    </nav>
  );

  // ---- Flujos fullscreen ----
  if (mostrarRitual) return (
    <RitualDiario diaDelPrograma={diaDelPrograma}
      onComplete={() => { setMostrarRitual(false); setRitualHecho(true); cargarDatos(); }}
      onBack={() => setMostrarRitual(false)} />
  );
  if (mostrarLeccion && leccionHoy) return (
    <MicroLeccion leccion={leccionHoy} diaDelPrograma={diaDelPrograma}
      onComplete={() => { setMostrarLeccion(false); setLeccionLeida(true); }} />
  );
  if (mostrarRescate) return (
    <ProtocoloRescate
      onComplete={() => { setMostrarRescate(false); cargarDatos(); }}
      onCerrar={() => setMostrarRescate(false)} />
  );
  if (mostrarAntiRecaida) return (
    <AntiRecaida horasDesdeUltima={horasDesdeUltima}
      onComplete={() => { setMostrarAntiRecaida(false); cargarDatos(); }}
      onCerrar={() => setMostrarAntiRecaida(false)} />
  );
  if (mostrarReinicio) return (
    <ReinicioMental
      onComplete={() => { setMostrarReinicio(false); cargarDatos(); }}
      onCerrar={() => setMostrarReinicio(false)} />
  );
  if (mostrarReflexion) return (
    <ReflexionSemanal semana={semanaActual} diaDelPrograma={diaDelPrograma}
      onComplete={() => { setMostrarReflexion(false); setReflexionPendiente(false); cargarDatos(); }}
      onCerrar={() => setMostrarReflexion(false)} />
  );
  if (mostrarCeremonia) return (
    <CeremoniaD30 usuario={usuario} onComplete={() => { setMostrarCeremonia(false); cargarDatos(); }} />
  );
  if (mostrarLectura && lecturaHoy) return (
    <LecturaDiariaComponent lectura={lecturaHoy} diaDelPrograma={diaDelPrograma}
      onComplete={() => { setMostrarLectura(false); setLecturaLeidaState(true); cargarDatos(); }} />
  );

  // Módulos con nav preservada
  const ModuleWrapper = ({ titulo, children, onVolver }: { titulo: string; children: React.ReactNode; onVolver: () => void }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-obsidian">
      <div className="flex items-center gap-3 px-5 pt-6 pb-4 border-b border-smoke/20">
        <motion.button onClick={onVolver} whileTap={{ scale: 0.9 }}
          className="w-9 h-9 rounded-xl bg-graphite/60 flex items-center justify-center">
          <ChevronRight className="w-4 h-4 text-ivory/60 rotate-180" />
        </motion.button>
        <p className="text-sm font-body text-ivory/60">{titulo}</p>
      </div>
      {children}
      <NavBar onTabChange={onVolver} />
    </motion.div>
  );

  if (mostrarConfianza) return (
    <ModuleWrapper titulo="Mapa de Reconstrucción de Confianza Personal" onVolver={() => setMostrarConfianza(false)}>
      <MapaConfianza usuario={usuario} onUsuarioActualizado={cargarDatos} />
    </ModuleWrapper>
  );
  if (mostrarMicrovictorias) return (
    <ModuleWrapper titulo="Sistema de Microvictorias Diarias" onVolver={() => setMostrarMicrovictorias(false)}>
      <Microvictorias />
    </ModuleWrapper>
  );

  // ---- Renderizado de secciones ----
  const renderSeccion = () => {
    if (seccionActiva === 'cadena') return (
      <motion.div key="cadena" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
        <CadenaImparable usuario={usuario} />
      </motion.div>
    );

    if (seccionActiva === 'evidencia') return (
      <motion.div key="evidencia" variants={tabVariants} initial="hidden" animate="visible" exit="exit">
        <TableroeEvidencia />
      </motion.div>
    );

    if (seccionActiva === 'ajustes') return (
      <motion.div key="ajustes" variants={tabVariants} initial="hidden" animate="visible" exit="exit"
        className="main-container pb-28">
        <h1 className="font-display italic text-2xl text-ivory mb-6">Ajustes</h1>
        <div className="space-y-3">
          <div className="card-premium">
            <p className="text-[10px] uppercase tracking-[0.12em] text-ivory/30 font-body mb-2">Perfil</p>
            <p className="text-base font-body font-medium text-ivory">{usuario.nombre}</p>
            <p className="text-xs text-ivory/30 font-body mt-0.5">Inicio: {usuario.fechaInicio}</p>
          </div>

          <p className="text-label mt-5 mb-2 px-1">Módulos</p>
          {[
            { nombre: 'Sistema Antiabandono de 5 Minutos', color: 'text-emerald', desc: 'Control Absoluto', accion: () => setMostrarRitual(true) },
            { nombre: 'Método Cadena Imparable', color: 'text-purple', desc: 'Visualización Activa', accion: () => setSeccionActiva('cadena') },
            { nombre: 'Protocolo de Rescate Inmediato', color: 'text-amber', desc: 'Seguro Psicológico', accion: () => setMostrarRescate(true) },
            { nombre: 'Mapa de Reconstrucción de Confianza Personal', color: 'text-rose', desc: 'Estructura Mental', accion: () => setMostrarConfianza(true) },
            { nombre: 'Sistema de Microvictorias Diarias', color: 'text-cyan', desc: 'Identidad Reforzada', accion: () => setMostrarMicrovictorias(true) },
          ].map((mod) => (
            <motion.button key={mod.nombre} onClick={mod.accion} whileTap={{ scale: 0.97 }}
              className="w-full bg-graphite rounded-xl p-4 border border-smoke/20 flex items-center justify-between">
              <div>
                <p className={`text-sm font-body font-medium ${mod.color}`}>{mod.nombre}</p>
                <p className="text-xs text-ivory/30 font-body mt-0.5">{mod.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-ivory/20" />
            </motion.button>
          ))}

          <p className="text-label mt-5 mb-2 px-1">Bonos</p>
          {[
            { nombre: 'Anti-Recaída 24h', color: 'text-danger', accion: () => setMostrarAntiRecaida(true) },
            { nombre: 'Reinicio Mental', color: 'text-emerald-dark', accion: () => setMostrarReinicio(true) },
          ].map((b) => (
            <motion.button key={b.nombre} onClick={b.accion} whileTap={{ scale: 0.97 }}
              className="w-full bg-graphite rounded-xl p-4 border border-smoke/20 flex items-center justify-between">
              <p className={`text-sm font-body font-medium ${b.color}`}>{b.nombre}</p>
              <ChevronRight className="w-4 h-4 text-ivory/20" />
            </motion.button>
          ))}

          <div className="mt-8 text-center">
            <p className="text-[10px] uppercase tracking-[0.18em] text-ivory/15 font-body">
              La Última Vez Que Empiezas De Cero
            </p>
            <p className="text-[10px] uppercase tracking-[0.12em] text-ivory/10 font-body mt-1">
              Día {diaDelPrograma} de 30
            </p>
          </div>
        </div>
      </motion.div>
    );

    // ---- INICIO ----
    return (
      <motion.div key="inicio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <div className="main-container">
          {/* Header */}
          <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible"
            className="flex items-center justify-between mb-8">
            <div>
              <p className="text-label">{saludo}</p>
              <h1 className="text-ivory text-lg font-body font-medium mt-0.5">{usuario.nombre}</h1>
            </div>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setSeccionActiva('ajustes')}
              className="w-10 h-10 rounded-xl bg-graphite border border-smoke/30 flex items-center justify-center">
              <Settings className="w-4 h-4 text-ivory/40" />
            </motion.button>
          </motion.div>

          {/* Anillo de racha — hero premium */}
          <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible"
            className="text-center mb-8 relative">
            {/* Ilustración de fondo — montaña */}
            <IllustracionMontana className="absolute inset-x-0 bottom-0 w-full opacity-30 pointer-events-none" />
            <div className="relative inline-block">
              {/* Glow exterior pulsante */}
              <div
                className="absolute inset-0 rounded-full animate-glow"
                style={{
                  background: `radial-gradient(circle, ${colors.accent}20 0%, transparent 70%)`,
                  filter: 'blur(12px)',
                  transform: 'scale(1.15)',
                }}
              />
              <svg width="160" height="160" viewBox="0 0 160 160" className="relative z-10">
                {/* Track */}
                <circle cx="80" cy="80" r="66" fill="none" stroke="#1A1A20" strokeWidth="3" />
                {/* Progress */}
                <motion.circle
                  cx="80" cy="80" r="66" fill="none"
                  stroke={colors.accent} strokeWidth="3.5"
                  strokeLinecap="round" transform="rotate(-90 80 80)"
                  strokeDasharray={`${2 * Math.PI * 66}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 66 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 66 * (1 - racha / 30) }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                />
                {/* Glow en la punta del progreso */}
                {racha > 0 && (
                  <circle
                    cx="80" cy="80" r="66" fill="none"
                    stroke={colors.accent} strokeWidth="1.5"
                    strokeLinecap="round" transform="rotate(-90 80 80)"
                    strokeDasharray={`${2 * Math.PI * 66}`}
                    strokeDashoffset={`${2 * Math.PI * 66 * (1 - racha / 30)}`}
                    opacity="0.4" filter="url(#ringGlow)"
                  />
                )}
                <defs>
                  <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
              </svg>

              {/* Número central */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <motion.span
                  className="text-5xl font-medium font-body"
                  style={{ color: colors.accent }}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, type: 'spring', stiffness: 400, damping: 20 }}
                >
                  {racha}
                </motion.span>
                <span className="text-xs text-ivory/30 mt-1 font-body">días de racha</span>
              </div>
            </div>

            {/* Mensaje motivacional */}
            <AnimatePresence mode="wait">
              {mensajeRacha && (
                <motion.p
                  key={mensajeRacha.mensaje}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="font-display italic text-sm mt-3"
                  style={{ color: colors.accent }}
                >
                  {mensajeRacha.emoji} {mensajeRacha.mensaje}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Stats */}
          <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible"
            className="grid grid-cols-3 gap-2 mb-6">
            {[
              { label: 'Racha', valor: racha },
              { label: 'Mejor', valor: usuario.mejorRacha },
              { label: 'Total', valor: usuario.totalDias },
            ].map((s) => (
              <div key={s.label} className="bg-graphite rounded-xl p-3.5 text-center border border-smoke/20">
                <p className="text-lg font-medium text-ivory">{s.valor}</p>
                <p className="text-[10px] text-ivory/30 font-body">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Ceremonia Día 30 */}
          {ceremoniaPendiente && (
            <motion.button custom={3} variants={cardVariants} initial="hidden" animate="visible"
              onClick={() => setMostrarCeremonia(true)}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-graphite rounded-2xl p-5 border border-gold/40 mb-5 text-left"
              style={{ boxShadow: '0 0 30px rgba(200, 164, 78, 0.1)' }}>
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gold">¡Ceremonia Día 30!</p>
                  <p className="text-xs text-ivory/40 mt-0.5">Desbloquea tu carta y certificado</p>
                </div>
              </div>
              <div className="w-full bg-obsidian rounded-xl py-3 text-center">
                <span className="text-[11px] font-body font-semibold tracking-[0.12em] uppercase text-gold">
                  Iniciar ceremonia
                </span>
              </div>
            </motion.button>
          )}

          {/* Reflexión semanal */}
          {reflexionPendiente && !ceremoniaPendiente && (
            <motion.button custom={3} variants={cardVariants} initial="hidden" animate="visible"
              onClick={() => setMostrarReflexion(true)}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-graphite rounded-2xl p-5 border border-gold/30 mb-5 text-left">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-gold" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-ivory">Reflexión Semanal disponible</p>
                  <p className="text-xs text-ivory/40 mt-0.5">Día {diaDelPrograma} — 3 minutos</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gold/60" />
              </div>
            </motion.button>
          )}

          {/* Puerta de entrada */}
          <motion.div custom={4} variants={cardVariants} initial="hidden" animate="visible">
            {!ritualHecho ? (
              <motion.button
                onClick={() => setMostrarRitual(true)}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-graphite rounded-2xl p-5 border border-emerald/30 mb-5 text-left group"
                style={{ boxShadow: '0 0 20px rgba(0, 212, 170, 0.04)' }}
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-emerald" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ivory">Tu ritual de hoy te espera</p>
                    <p className="text-xs text-ivory/30 mt-0.5">5 minutos para programar tu día</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald opacity-60" />
                </div>
                <div className="w-full bg-obsidian rounded-xl py-3 text-center">
                  <span className="text-[11px] font-body font-semibold tracking-[0.12em] uppercase text-emerald">
                    Comenzar ritual
                  </span>
                </div>
              </motion.button>
            ) : (
              <div className="w-full bg-graphite rounded-2xl p-5 border border-emerald/20 mb-5 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald" />
                </div>
                <div>
                  <p className="text-sm text-ivory font-medium">Día completado</p>
                  <p className="text-xs text-ivory/30 mt-0.5">Tu cadena sigue viva. ¡{racha} días!</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Micro-lección */}
          {leccionHoy && (
            <motion.button custom={5} variants={cardVariants} initial="hidden" animate="visible"
              onClick={() => setMostrarLeccion(true)}
              whileTap={{ scale: 0.97 }}
              className="w-full card mb-5 text-left group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-label">Lección del día {leccionHoy.dia}</p>
                {leccionLeida
                  ? <span className="text-[10px] text-emerald font-body">✓ Leída</span>
                  : <ArrowRight className="w-3.5 h-3.5 text-gold/50" />}
              </div>
              <h3 className="font-display italic text-base text-ivory mb-1.5">{leccionHoy.titulo}</h3>
              <p className="text-sm text-ivory/40 leading-relaxed line-clamp-2">{leccionHoy.contenido}</p>
            </motion.button>
          )}

          {/* Lectura del Día */}
          {lecturaHoy && (
            <motion.button custom={5.5} variants={cardVariants} initial="hidden" animate="visible"
              onClick={() => setMostrarLectura(true)}
              whileTap={{ scale: 0.97 }}
              className="w-full card mb-5 text-left group"
              style={{ boxShadow: '0 0 16px rgba(200, 164, 78, 0.03)' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-gold/10 flex items-center justify-center">
                    <BookOpen className="w-3.5 h-3.5 text-gold/70" />
                  </div>
                  <p className="text-label">Lectura del Día {lecturaHoy.dia}</p>
                </div>
                {lecturaLeidaState
                  ? <span className="text-[10px] text-emerald font-body">✓ Leída</span>
                  : <ArrowRight className="w-3.5 h-3.5 text-gold/50" />}
              </div>
              <h3 className="font-display italic text-base text-ivory mb-1.5">{lecturaHoy.titulo}</h3>
              <p className="text-xs text-ivory/30 font-body">
                {lecturaHoy.categoria} · 5 min · {lecturaHoy.tematica}
              </p>
            </motion.button>
          )}

          {/* Grid módulos */}
          <motion.p custom={6} variants={cardVariants} initial="hidden" animate="visible"
            className="text-label mb-3">Módulos</motion.p>
          <div className="grid grid-cols-2 gap-2 mb-5">
            {[
              { nombre: 'Sistema Antiabandono de 5 Minutos', icon: Shield, color: 'text-emerald', bg: 'bg-emerald/10', border: 'border-emerald/20', accion: () => setMostrarRitual(true) },
              { nombre: 'Método Cadena Imparable', icon: Link2, color: 'text-purple', bg: 'bg-purple/10', border: 'border-purple/20', accion: () => setSeccionActiva('cadena') },
              { nombre: 'Mapa de Reconstrucción de Confianza Personal', icon: Target, color: 'text-rose', bg: 'bg-rose/10', border: 'border-rose/20', accion: () => setMostrarConfianza(true) },
              { nombre: 'Sistema de Microvictorias Diarias', icon: Sparkles, color: 'text-cyan', bg: 'bg-cyan/10', border: 'border-cyan/20', accion: () => setMostrarMicrovictorias(true) },
            ].map((mod, i) => (
              <motion.button
                key={mod.nombre}
                custom={7 + i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileTap={{ scale: 0.94 }}
                onClick={mod.accion}
                className={`bg-graphite rounded-xl p-4 flex flex-col items-center gap-2.5 text-center border ${mod.border} border-opacity-20 transition-colors hover:brightness-110 min-h-[100px] justify-center`}
              >
                <div className={`w-10 h-10 rounded-xl ${mod.bg} flex items-center justify-center shrink-0`}>
                  <mod.icon className={`w-5 h-5 ${mod.color}`} />
                </div>
                <span className={`text-[10px] font-body font-semibold leading-tight ${mod.color} tracking-wide`}>
                  {mod.nombre}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Bonos */}
          <motion.p custom={11} variants={cardVariants} initial="hidden" animate="visible"
            className="text-label mb-3">Bonos</motion.p>
          <DecoradorLinea className="mb-3 opacity-50" />
          <div className="space-y-2.5 mb-5">
            {[
              { icon: LifeBuoy, color: 'text-amber', bg: 'bg-amber/10', nombre: 'SOS Rescate', desc: 'Protocolo de emergencia', borderColor: 'border-amber/15', accion: () => setMostrarRescate(true) },
              { icon: RotateCcw, color: 'text-danger', bg: 'bg-danger/10', nombre: 'Anti-Recaída 24h', desc: 'Red de seguridad extrema', borderColor: 'border-danger/15', accion: () => setMostrarAntiRecaida(true) },
            ].map((b, i) => (
              <motion.button
                key={b.nombre}
                custom={12 + i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileTap={{ scale: 0.97 }}
                onClick={b.accion}
                className={`w-full bg-graphite border ${b.borderColor} rounded-2xl p-4 flex items-center gap-3 transition-colors hover:brightness-110`}
              >
                <div className={`w-9 h-9 rounded-lg ${b.bg} flex items-center justify-center`}>
                  <b.icon className={`w-4 h-4 ${b.color}`} />
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-medium ${b.color} font-body`}>{b.nombre}</p>
                  <p className="text-[11px] text-ivory/25 font-body mt-0.5">{b.desc}</p>
                </div>
                <ArrowRight className={`w-4 h-4 ${b.color} opacity-40`} />
              </motion.button>
            ))}

            {/* Reinicio Mental */}
            <motion.button custom={14} variants={cardVariants} initial="hidden" animate="visible"
              whileTap={{ scale: 0.97 }}
              onClick={() => setMostrarReinicio(true)}
              className="w-full bg-graphite border border-emerald-dark/15 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-dark/10 flex items-center justify-center">
                <span className="text-base">🌱</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-emerald-dark font-body">Reinicio Mental</p>
                <p className="text-[11px] text-ivory/25 font-body mt-0.5">Quema de culpa · Una sola sesión</p>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-dark/40" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-obsidian">
      {/* Milestone toast */}
      {milestoneRacha && (
        <MilestoneToast racha={milestoneRacha} onDismiss={() => setMilestoneRacha(null)} />
      )}

      {/* Contenido de la sección activa */}
      <AnimatePresence mode="wait">
        {renderSeccion()}
      </AnimatePresence>

      {/* SOS flotante — siempre visible en todas las secciones */}
      <SOSButton onClick={() => setMostrarRescate(true)} />

      <NavBar />
    </div>
  );
}
