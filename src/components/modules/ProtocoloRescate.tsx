'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import { db } from '@/lib/db';
import { microAccionesRescate } from '@/data/constantes';

interface Props {
  onComplete: () => void;
  onCerrar: () => void;
}

type Paso = 1 | 2 | 3 | 4 | 5 | 'completado';

// Breathing cycle state
type FaseRespiracion = 'inhala' | 'sostiene' | 'exhala' | 'pausa';

const FLASHCARDS = [
  'En el pasado, abandoné. Eso es verdad.',
  'Pero AHORA estoy aquí. Eso también es verdad.',
  'Una caída no es un reinicio. Mi progreso sigue existiendo.',
  'Lo que define mi identidad no es si caigo. Es si vuelvo.',
];

export default function ProtocoloRescate({ onComplete, onCerrar }: Props) {
  const [paso, setPaso] = useState<Paso>(1);
  const [cuenta, setCuenta] = useState(10);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [accionElegida, setAccionElegida] = useState('');
  const [timerAccion, setTimerAccion] = useState(120);
  const [timerActivo, setTimerActivo] = useState(false);
  const [reflexion, setReflexion] = useState('');
  const [guardando, setGuardando] = useState(false);

  // Respiración
  const [fase, setFase] = useState<FaseRespiracion>('inhala');
  const [circleScale, setCircleScale] = useState(0.6);
  const [repeticion, setRepeticion] = useState(0);
  const [respiracionCompleta, setRespiracionCompleta] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // PASO 1: Countdown 10 segundos
  useEffect(() => {
    if (paso === 1 && cuenta > 0) {
      timerRef.current = setInterval(() => {
        setCuenta((c) => {
          if (c <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paso]);

  // PASO 2: Ciclo de respiración
  const iniciarCicloRespiracion = useCallback(() => {
    if (repeticion >= 3) return;
    let tiempoTranscurrido = 0;
    const INHALA = 4000;
    const SOSTIENE = 4000;
    const EXHALA = 6000;
    const CICLO = INHALA + SOSTIENE + EXHALA;

    setFase('inhala');
    setCircleScale(0.6);

    const animInterval = setInterval(() => {
      tiempoTranscurrido += 100;
      const posEnCiclo = tiempoTranscurrido % CICLO;

      if (posEnCiclo < INHALA) {
        setFase('inhala');
        setCircleScale(0.6 + (posEnCiclo / INHALA) * 0.4);
      } else if (posEnCiclo < INHALA + SOSTIENE) {
        setFase('sostiene');
        setCircleScale(1);
      } else {
        setFase('exhala');
        const progExhala = (posEnCiclo - INHALA - SOSTIENE) / EXHALA;
        setCircleScale(1 - progExhala * 0.4);
      }

      if (tiempoTranscurrido >= CICLO * 3) {
        clearInterval(animInterval);
        setRespiracionCompleta(true);
        setRepeticion(3);
      } else if (tiempoTranscurrido % CICLO === 0) {
        setRepeticion((r) => r + 1);
      }
    }, 100);

    return () => clearInterval(animInterval);
  }, [repeticion]);

  useEffect(() => {
    if (paso === 2 && repeticion === 0) {
      const cleanup = iniciarCicloRespiracion();
      return cleanup;
    }
  }, [paso]);

  // PASO 4: Timer de acción
  useEffect(() => {
    if (timerActivo && timerAccion > 0) {
      timerRef.current = setInterval(() => {
        setTimerAccion((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setTimerActivo(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerActivo]);

  const formatTimer = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const guardarRescate = async () => {
    setGuardando(true);
    await db.rescates.add({
      fecha: new Date().toISOString().split('T')[0],
      reflexion: reflexion.slice(0, 280),
      microAccionRealizada: accionElegida,
    });
    setGuardando(false);
    setPaso('completado');
  };

  const faseFrase: Record<FaseRespiracion, string> = {
    inhala: 'Inhala...',
    sostiene: 'Sostiene...',
    exhala: 'Exhala despacio...',
    pausa: 'Prepárate...',
  };

  // ---- Completado ----
  if (paso === 'completado') {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-6 text-center">
        <div
          className="w-24 h-24 rounded-full border-4 border-amber/40 flex items-center justify-center mb-6"
          style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.2)' }}
        >
          <Check className="w-10 h-10 text-amber" />
        </div>
        <p className="text-[11px] tracking-[0.2em] uppercase text-amber font-body mb-3">
          Rescate completado
        </p>
        <h2 className="font-display italic text-2xl text-ivory mb-3">
          Tu cadena sigue viva.
        </h2>
        <p className="text-sm text-ivory/40 font-body max-w-[260px] leading-relaxed mb-10">
          Volver es lo que te define. No la caída.
        </p>
        <button
          onClick={onComplete}
          className="w-full max-w-[280px] bg-amber text-obsidian font-body font-semibold text-sm tracking-[0.12em] uppercase py-4 rounded-2xl transition-all active:scale-[0.97]"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-smoke/20">
        <button
          onClick={onCerrar}
          className="w-9 h-9 rounded-xl bg-graphite/60 flex items-center justify-center active:scale-95"
        >
          <X className="w-4 h-4 text-ivory/60" />
        </button>
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-[11px] tracking-[0.15em] uppercase text-amber font-body font-semibold">
            Protocolo de Rescate
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((p) => (
              <div
                key={p}
                className={`h-[3px] rounded-full transition-all duration-300 ${
                  paso === p ? 'w-8 bg-amber' : typeof paso === 'number' && paso > p ? 'w-4 bg-amber/40' : 'w-4 bg-smoke'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="w-9" />
      </header>

      {/* ===== PASO 1: ALTO ===== */}
      {paso === 1 && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center pb-20">
          <div
            className="w-36 h-36 rounded-full border-4 border-danger/30 flex items-center justify-center mb-8"
            style={{ boxShadow: '0 0 50px rgba(239, 68, 68, 0.15)' }}
          >
            <span className="text-5xl font-body font-black text-danger" style={{ letterSpacing: '-0.02em' }}>
              ALTO
            </span>
          </div>

          <p className="text-base text-ivory/70 font-body leading-relaxed max-w-[280px] mb-8">
            Detén lo que estás pensando.<br />
            <strong className="text-ivory">Ahora mismo.</strong><br />
            Solo por 10 segundos.
          </p>

          <div
            className="w-20 h-20 rounded-full border-2 border-danger/20 flex items-center justify-center mb-10"
          >
            <span
              className="text-4xl font-body font-semibold transition-all duration-1000"
              style={{ color: cuenta > 5 ? '#EF4444' : cuenta > 0 ? '#F59E0B' : '#00D4AA' }}
            >
              {cuenta}
            </span>
          </div>

          <button
            onClick={() => setPaso(2)}
            disabled={cuenta > 0}
            className={`w-full py-4 rounded-2xl font-body font-semibold text-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.97] ${
              cuenta === 0
                ? 'bg-amber text-obsidian'
                : 'bg-obsidian border border-smoke text-smoke cursor-not-allowed'
            }`}
          >
            {cuenta > 0 ? `Espera ${cuenta}s...` : 'Continuar'}
            {cuenta === 0 && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* ===== PASO 2: RESPIRA ===== */}
      {paso === 2 && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center pb-20">
          <h2 className="font-display italic text-2xl text-ivory mb-2">Respira</h2>
          <p className="text-sm text-ivory/40 font-body mb-10">
            3 ciclos de respiración consciente
          </p>

          <div className="relative flex items-center justify-center mb-8">
            <div
              className="w-48 h-48 rounded-full border-2 border-amber/20 flex items-center justify-center transition-all duration-300"
              style={{
                transform: `scale(${circleScale})`,
                boxShadow: `0 0 ${40 * circleScale}px rgba(245, 158, 11, ${0.1 * circleScale})`,
                background: `rgba(245, 158, 11, ${0.03 * circleScale})`,
              }}
            >
              <p className="font-display italic text-xl text-amber">{faseFrase[fase]}</p>
            </div>
          </div>

          <div className="flex gap-2 mb-10">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  repeticion > i ? 'bg-amber' : 'bg-smoke'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setPaso(3)}
            disabled={!respiracionCompleta}
            className={`w-full py-4 rounded-2xl font-body font-semibold text-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.97] ${
              respiracionCompleta
                ? 'bg-amber text-obsidian'
                : 'bg-obsidian border border-smoke text-smoke cursor-not-allowed'
            }`}
          >
            {respiracionCompleta ? 'Continuar' : 'Completando ciclos...'}
            {respiracionCompleta && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* ===== PASO 3: REENCUADRA ===== */}
      {paso === 3 && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          <h2 className="font-display italic text-2xl text-ivory text-center mb-2">Reencuadra</h2>
          <p className="text-sm text-ivory/40 font-body text-center mb-8">
            Lee cada pensamiento con atención
          </p>

          <div className="w-full space-y-3 mb-10">
            {FLASHCARDS.map((texto, i) => (
              <div
                key={i}
                className={`bg-graphite rounded-2xl p-5 border transition-all duration-300 ${
                  i === flashcardIndex
                    ? 'border-amber/40 opacity-100'
                    : i < flashcardIndex
                    ? 'border-smoke/20 opacity-50'
                    : 'border-smoke/10 opacity-20'
                }`}
                style={i === flashcardIndex ? { boxShadow: '0 0 20px rgba(245, 158, 11, 0.05)' } : undefined}
              >
                <div className="flex items-start gap-3">
                  {i < flashcardIndex && (
                    <Check className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                  )}
                  {i === flashcardIndex && (
                    <div className="w-2 h-2 rounded-full bg-amber mt-1.5 shrink-0 animate-pulse" />
                  )}
                  {i > flashcardIndex && (
                    <div className="w-2 h-2 rounded-full bg-smoke/30 mt-1.5 shrink-0" />
                  )}
                  <p
                    className={`text-sm font-body leading-relaxed ${
                      i === flashcardIndex ? 'text-ivory' : i < flashcardIndex ? 'text-ivory/40' : 'text-ivory/15'
                    }`}
                  >
                    {texto}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {flashcardIndex < FLASHCARDS.length - 1 ? (
            <button
              onClick={() => setFlashcardIndex((i) => i + 1)}
              className="w-full py-4 rounded-2xl font-body font-semibold text-sm tracking-[0.1em] uppercase bg-obsidian border border-amber/40 text-amber flex items-center justify-center gap-2 active:scale-[0.97]"
            >
              Lo entiendo
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setPaso(4)}
              className="w-full py-4 rounded-2xl font-body font-semibold text-sm tracking-[0.1em] uppercase bg-amber text-obsidian flex items-center justify-center gap-2 active:scale-[0.97]"
            >
              Continuar
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* ===== PASO 4: ACTÚA ===== */}
      {paso === 4 && (
        <div className="flex-1 flex flex-col px-6 pt-8 pb-6 overflow-y-auto">
          <h2 className="font-display italic text-2xl text-ivory text-center mb-2">Actúa</h2>
          <p className="text-sm text-ivory/40 font-body text-center mb-6">
            Haz UNA cosa ahora mismo.
          </p>

          <div className="grid grid-cols-1 gap-2.5 mb-6">
            {microAccionesRescate.map((accion) => (
              <button
                key={accion}
                onClick={() => setAccionElegida(accion)}
                className={`p-4 rounded-xl border text-sm font-body text-left transition-all active:scale-[0.97] ${
                  accionElegida === accion
                    ? 'border-amber/60 bg-amber/5 text-ivory'
                    : 'border-smoke/40 text-ivory/50'
                }`}
              >
                {accion}
              </button>
            ))}
          </div>

          {accionElegida && (
            <div className="bg-graphite rounded-2xl border border-smoke/30 p-4 mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-ivory/30 font-body">Tiempo disponible</p>
                <p className={`text-2xl font-body font-semibold ${timerAccion === 0 ? 'text-amber' : 'text-ivory'}`}>
                  {formatTimer(timerAccion)}
                </p>
              </div>
              {!timerActivo && timerAccion === 120 && (
                <button
                  onClick={() => setTimerActivo(true)}
                  className="text-[11px] uppercase tracking-[0.1em] text-amber font-body border border-amber/40 px-3 py-1.5 rounded-lg active:scale-95"
                >
                  Iniciar
                </button>
              )}
              {timerActivo && <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />}
              {!timerActivo && timerAccion === 0 && <Check className="w-5 h-5 text-amber" />}
            </div>
          )}

          <button
            onClick={() => setPaso(5)}
            disabled={!accionElegida}
            className={`mt-auto w-full py-4 rounded-2xl font-body font-semibold text-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.97] ${
              accionElegida
                ? 'bg-amber text-obsidian'
                : 'bg-obsidian border border-smoke text-smoke cursor-not-allowed'
            }`}
          >
            Completé la acción
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ===== PASO 5: REGISTRA ===== */}
      {paso === 5 && (
        <div className="flex-1 flex flex-col px-6 pt-8 pb-6">
          <h2 className="font-display italic text-2xl text-ivory text-center mb-2">Registra</h2>
          <p className="text-sm text-ivory/40 font-body text-center mb-8">
            Una línea. ¿Qué pasó y qué harás diferente?
          </p>

          <textarea
            value={reflexion}
            onChange={(e) => setReflexion(e.target.value.slice(0, 280))}
            placeholder="Escribe tu reflexión aquí..."
            rows={5}
            className="textarea-field flex-1 mb-3"
          />
          <p className="text-[11px] text-ivory/25 font-body text-right mb-8">
            {reflexion.length}/280
          </p>

          <button
            onClick={guardarRescate}
            disabled={reflexion.trim().length < 5 || guardando}
            className={`w-full py-4 rounded-2xl font-body font-semibold text-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.97] ${
              reflexion.trim().length >= 5 && !guardando
                ? 'bg-amber text-obsidian'
                : 'bg-obsidian border border-smoke text-smoke cursor-not-allowed'
            }`}
          >
            {guardando ? (
              <span className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
            ) : (
              <>
                <Check className="w-4 h-4" />
                Rescate completado
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
