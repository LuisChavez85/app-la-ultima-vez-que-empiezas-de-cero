'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight, Check, Timer, Zap, Plus } from 'lucide-react';
import { registrarDia, getDiaPorFecha } from '@/lib/db';
import { declaraciones } from '@/data/declaraciones';
import { confettiRitual } from '@/lib/confetti';
import { haptic } from '@/lib/haptic';
import type { DiaCompletado } from '@/types';

interface Props {
  diaDelPrograma: number;
  onComplete: () => void;
  onBack: () => void;
}

const MICRO_ACCIONES = [
  'Escribir 1 párrafo sobre mi meta',
  'Hacer 10 sentadillas',
  'Organizar 1 espacio',
  'Leer 2 páginas',
  'Respirar 2 minutos',
  'Escribir 3 gratitudes',
];

type Paso = 1 | 2 | 3 | 'celebracion';

export default function RitualDiario({ diaDelPrograma, onComplete, onBack }: Props) {
  const [paso, setPaso] = useState<Paso>(1);
  const [metas, setMetas] = useState(['', '', '']);
  const [declaracionLeida, setDeclaracionLeida] = useState(false);
  const [progresoCirculo, setProgresoCirculo] = useState(0);
  const [microAccion, setMicroAccion] = useState('');
  const [accionPersonalizada, setAccionPersonalizada] = useState('');
  const [mostrarInputPersonal, setMostrarInputPersonal] = useState(false);
  const [timerActivo, setTimerActivo] = useState(false);
  const [segundosRestantes, setSegundosRestantes] = useState(120);
  const [guardando, setGuardando] = useState(false);

  const holdIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const declaracionHoy = declaraciones.find((d) => d.dia === diaDelPrograma) || declaraciones[0];

  // Precargar metas del día anterior si existen
  useEffect(() => {
    async function precargarMetas() {
      const ayer = new Date();
      ayer.setDate(ayer.getDate() - 1);
      const fechaAyer = ayer.toISOString().split('T')[0];
      const diaAyer = await getDiaPorFecha(fechaAyer);
      if (diaAyer?.metasEscritas?.length) {
        setMetas(diaAyer.metasEscritas.map((m) => m || ''));
      }
    }
    precargarMetas();
  }, []);

  // Countdown timer paso 3
  useEffect(() => {
    if (timerActivo && segundosRestantes > 0) {
      timerRef.current = setInterval(() => {
        setSegundosRestantes((s) => {
          if (s <= 1) {
            clearInterval(timerRef.current!);
            setTimerActivo(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerActivo, segundosRestantes]);

  const iniciarTimer = () => {
    setTimerActivo(true);
  };

  const formatTimer = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // Hold to confirm — paso 2
  const iniciarHold = useCallback(() => {
    let progreso = 0;
    holdIntervalRef.current = setInterval(() => {
      progreso += 1.5;
      setProgresoCirculo(progreso);
      if (progreso >= 100) {
        clearInterval(holdIntervalRef.current!);
        setDeclaracionLeida(true);
      }
    }, 30);
  }, []);

  const soltarHold = useCallback(() => {
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    if (!declaracionLeida) setProgresoCirculo(0);
  }, [declaracionLeida]);

  const completarRitual = async () => {
    setGuardando(true);
    const accionFinal = mostrarInputPersonal ? accionPersonalizada : microAccion;
    const hoy = new Date().toISOString().split('T')[0];

    const dia: DiaCompletado = {
      fecha: hoy,
      tipo: 'normal',
      metasEscritas: metas.filter(Boolean),
      declaracionDelDia: declaracionHoy.dia,
      microAccionElegida: accionFinal,
      microvictoriasCompletadas: 0,
      horaCompletado: new Date().toISOString(),
      leccionLeida: false,
    };

    await registrarDia(dia);
    setGuardando(false);
    haptic.celebrar();
    confettiRitual();
    setPaso('celebracion');
  };

  const circunferencia = 2 * Math.PI * 44;
  const accionSeleccionada = mostrarInputPersonal ? accionPersonalizada : microAccion;
  const puedeContinuarP1 = metas.filter((m) => m.trim().length > 2).length >= 1;
  const puedeContinuarP3 = accionSeleccionada.trim().length > 0;

  // ---- Pantalla de celebración ----
  if (paso === 'celebracion') {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
          className="relative mb-8"
        >
          <div
            className="w-28 h-28 rounded-full border-4 border-emerald/30 flex items-center justify-center"
            style={{ boxShadow: '0 0 50px rgba(0, 212, 170, 0.35)' }}
          >
            <Check className="w-12 h-12 text-emerald" strokeWidth={2.5} />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-emerald/20 animate-pingOnce" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-[11px] tracking-[0.2em] uppercase text-emerald font-body mb-3"
        >
          Día registrado
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="font-display italic text-3xl text-ivory mb-3"
        >
          Tu cadena crece.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="text-sm text-ivory/40 font-body max-w-[260px] leading-relaxed mb-12"
        >
          Cada vez que completas esto, depositas confianza en ti mismo.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.96 }}
          onClick={onComplete}
          className="w-full max-w-[280px] bg-emerald text-obsidian font-body font-semibold text-sm tracking-[0.12em] uppercase py-4 rounded-2xl"
          style={{ boxShadow: '0 0 30px rgba(0, 212, 170, 0.3)' }}
        >
          Ver mi progreso
        </motion.button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-smoke/20">
        <button onClick={onBack} className="w-9 h-9 rounded-xl bg-graphite/60 flex items-center justify-center active:scale-95">
          <ChevronLeft className="w-4 h-4 text-ivory/60" />
        </button>
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-[11px] tracking-[0.15em] uppercase text-emerald font-body font-semibold">
            Sistema Antiabandono de 5 Minutos
          </p>
          <div className="flex gap-2">
            {[1, 2, 3].map((p) => (
              <div
                key={p}
                className={`h-[3px] rounded-full transition-all duration-300 ${
                  paso === p ? 'w-10 bg-emerald' : paso > p ? 'w-6 bg-emerald/40' : 'w-6 bg-smoke'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="w-9 h-9" />
      </header>

      {/* ===== PASO 1: Metas ===== */}
      {paso === 1 && (
        <div className="flex-1 flex flex-col px-6 pt-8 pb-6 overflow-y-auto">
          <div className="mb-8 text-center">
            <h2 className="font-display italic text-2xl text-ivory mb-2">
              Paso 1: Escribe tus metas
            </h2>
            <p className="text-sm text-ivory/40 font-body leading-relaxed max-w-[300px] mx-auto">
              En primera persona, tiempo presente, positivo.
            </p>
          </div>

          {/* Semana 1 — ejemplos guía */}
          {diaDelPrograma <= 7 && (
            <div className="bg-graphite/50 rounded-xl p-4 border border-smoke/30 mb-6">
              <p className="text-[10px] text-ivory/30 uppercase tracking-[0.15em] font-body mb-2">
                Ejemplos
              </p>
              <p className="text-xs text-emerald/70 font-body">✓ &ldquo;Yo soy una persona que cumple&rdquo;</p>
              <p className="text-xs text-emerald/70 font-body mt-1">✓ &ldquo;Yo me siento fuerte y con energía&rdquo;</p>
              <p className="text-xs text-danger/50 font-body mt-1">✗ &ldquo;Quiero dejar de ser flojo&rdquo;</p>
            </div>
          )}

          <div className="space-y-8 flex-1">
            {metas.map((meta, i) => (
              <div
                key={i}
                className="flex items-baseline gap-3 border-b border-smoke/40 pb-2 transition-colors focus-within:border-gold/50"
              >
                <span className="font-display italic text-2xl text-gold/70 select-none shrink-0">
                  Yo...
                </span>
                <input
                  type="text"
                  value={meta}
                  onChange={(e) => {
                    const nuevas = [...metas];
                    nuevas[i] = e.target.value;
                    setMetas(nuevas);
                  }}
                  placeholder={
                    i === 0 ? 'soy mi propia prioridad' :
                    i === 1 ? 'construyo mi libertad diaria' :
                    'honro mi compromiso'
                  }
                  className="flex-1 bg-transparent border-none outline-none text-ivory text-sm font-body placeholder:text-smoke/60 placeholder:italic"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => setPaso(2)}
            disabled={!puedeContinuarP1}
            className={`mt-10 w-full py-4 rounded-2xl font-body font-semibold text-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.97] ${
              puedeContinuarP1
                ? 'bg-obsidian border border-emerald text-emerald'
                : 'bg-obsidian border border-smoke text-smoke cursor-not-allowed'
            }`}
          >
            Continuar
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ===== PASO 2: Declaración ===== */}
      {paso === 2 && (
        <div className="flex-1 flex flex-col px-6 pt-8 pb-6">
          <div className="mb-8 text-center">
            <h2 className="font-display italic text-2xl text-ivory mb-2">
              Paso 2: Declara en voz alta
            </h2>
            <p className="text-sm text-ivory/40 font-body">
              Lee con intención durante 1 minuto.
            </p>
          </div>

          {/* Tarjeta declaración */}
          <div
            className="relative bg-graphite rounded-2xl p-6 border border-emerald/20 mb-8 text-center"
            style={{ boxShadow: '0 0 20px rgba(0, 212, 170, 0.05)' }}
          >
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-emerald/50 rounded-l-2xl" />
            <p className="font-display italic text-lg text-emerald leading-relaxed">
              &ldquo;{declaracionHoy.texto}&rdquo;
            </p>
            <p className="text-[10px] text-ivory/20 uppercase tracking-[0.15em] font-body mt-4">
              Declaración {declaracionHoy.dia} de 30
            </p>
          </div>

          {/* Botón circular — mantener pulsado */}
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            {declaracionLeida ? (
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-32 h-32 rounded-full border-4 border-emerald/40 flex items-center justify-center"
                  style={{ boxShadow: '0 0 30px rgba(0, 212, 170, 0.2)' }}
                >
                  <Check className="w-10 h-10 text-emerald" />
                </div>
                <p className="text-sm text-emerald font-body">¡Declaración completada!</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <svg width="128" height="128" viewBox="0 0 128 128">
                    <circle cx="64" cy="64" r="44" fill="none" stroke="#2A2A32" strokeWidth="4" />
                    <circle
                      cx="64" cy="64" r="44"
                      fill="none"
                      stroke="#00D4AA"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={circunferencia}
                      strokeDashoffset={circunferencia * (1 - progresoCirculo / 100)}
                      transform="rotate(-90 64 64)"
                      className="transition-all duration-100"
                    />
                  </svg>
                  <button
                    onMouseDown={iniciarHold}
                    onMouseUp={soltarHold}
                    onMouseLeave={soltarHold}
                    onTouchStart={iniciarHold}
                    onTouchEnd={soltarHold}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-1 select-none active:scale-95 transition-transform"
                  >
                    <Zap className="w-6 h-6 text-emerald" />
                    <span className="text-[9px] tracking-[0.12em] uppercase text-ivory/50 font-body text-center leading-tight">
                      Mantén<br />para leer
                    </span>
                  </button>
                </div>
                <p className="text-xs text-ivory/30 font-body text-center max-w-[200px]">
                  Mantén presionado mientras lees en voz alta
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setPaso(3)}
            disabled={!declaracionLeida}
            className={`w-full py-4 rounded-2xl font-body font-semibold text-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.97] ${
              declaracionLeida
                ? 'bg-obsidian border border-emerald text-emerald'
                : 'bg-obsidian border border-smoke text-smoke cursor-not-allowed'
            }`}
          >
            Continuar
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ===== PASO 3: Micro-acción ===== */}
      {paso === 3 && (
        <div className="flex-1 flex flex-col px-6 pt-8 pb-6 overflow-y-auto">
          <div className="mb-6 text-center">
            <h2 className="font-display italic text-2xl text-ivory mb-2">
              Paso 3: Micro-acción
            </h2>
            <p className="text-sm text-ivory/40 font-body">
              Elige tu compromiso físico de hoy.
            </p>
          </div>

          {/* Grid de opciones */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {MICRO_ACCIONES.map((accion) => (
              <button
                key={accion}
                onClick={() => {
                  setMicroAccion(accion);
                  setMostrarInputPersonal(false);
                }}
                className={`p-3.5 rounded-xl border text-xs font-body text-left transition-all active:scale-[0.97] ${
                  microAccion === accion && !mostrarInputPersonal
                    ? 'border-emerald/60 bg-emerald/5 text-ivory'
                    : 'border-smoke/40 text-ivory/50 hover:border-smoke'
                }`}
              >
                {accion}
              </button>
            ))}
            <button
              onClick={() => {
                setMostrarInputPersonal(true);
                setMicroAccion('');
              }}
              className={`p-3.5 rounded-xl border text-xs font-body text-left italic transition-all active:scale-[0.97] flex items-center gap-1.5 ${
                mostrarInputPersonal
                  ? 'border-gold/50 bg-gold/5 text-gold'
                  : 'border-smoke/40 text-ivory/40 hover:border-smoke'
              }`}
            >
              <Plus className="w-3 h-3 shrink-0" />
              Mi propia acción
            </button>
          </div>

          {mostrarInputPersonal && (
            <input
              type="text"
              value={accionPersonalizada}
              onChange={(e) => setAccionPersonalizada(e.target.value)}
              placeholder="Describe tu acción..."
              className="input-field mb-4 text-sm"
              autoFocus
            />
          )}

          {/* Timer */}
          {puedeContinuarP3 && (
            <div className="bg-graphite rounded-2xl border border-smoke/30 p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald/10 flex items-center justify-center">
                  <Timer className="w-4 h-4 text-emerald" />
                </div>
                <div>
                  <p className="text-xs text-ivory/40 font-body">Temporizador</p>
                  <p
                    className={`text-xl font-body font-medium transition-colors ${
                      segundosRestantes === 0 ? 'text-emerald' : 'text-ivory'
                    }`}
                  >
                    {formatTimer(segundosRestantes)}
                  </p>
                </div>
              </div>
              {!timerActivo && segundosRestantes === 120 && (
                <button
                  onClick={iniciarTimer}
                  className="text-[11px] uppercase tracking-[0.1em] text-emerald font-body border border-emerald/40 px-3 py-1.5 rounded-lg active:scale-95"
                >
                  Iniciar
                </button>
              )}
              {timerActivo && (
                <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              )}
              {!timerActivo && segundosRestantes === 0 && (
                <Check className="w-5 h-5 text-emerald" />
              )}
            </div>
          )}

          <button
            onClick={completarRitual}
            disabled={!puedeContinuarP3 || guardando}
            className={`w-full py-4 rounded-2xl font-body font-semibold text-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.97] mt-auto ${
              puedeContinuarP3 && !guardando
                ? 'bg-emerald text-obsidian'
                : 'bg-smoke/30 text-smoke cursor-not-allowed'
            }`}
          >
            {guardando ? (
              <span className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
            ) : (
              <>
                <Check className="w-4 h-4" />
                Día completado
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
