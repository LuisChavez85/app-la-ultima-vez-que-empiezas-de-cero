'use client';

import { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, Check, Clock } from 'lucide-react';
import { db } from '@/lib/db';

interface Props {
  horasDesdeUltima: number;
  onComplete: () => void;
  onCerrar: () => void;
}

type Paso = 'intro' | 1 | 2 | 3 | 'exito' | 'tiempo-agotado';

const QUE_PASO_OPCIONES = [
  'Me sentí abrumado',
  'Tuve un día malo emocionalmente',
  'Se me olvidó',
  'No tenía ganas',
  'Circunstancia externa (viaje, emergencia)',
];

export default function AntiRecaida({ horasDesdeUltima, onComplete, onCerrar }: Props) {
  const [paso, setPaso] = useState<Paso>('intro');
  const [situacion, setSituacion] = useState('');
  const [accion, setAccion] = useState('');
  const [quePaso, setQuePaso] = useState<string[]>([]);
  const [otraCausa, setOtraCausa] = useState('');
  const [queHubiera, setQueHubiera] = useState('');
  const [guardando, setGuardando] = useState(false);

  // Cronómetro 24h
  const horasRestantes = Math.max(0, 24 - horasDesdeUltima);
  const minutosRestantes = Math.round((horasRestantes % 1) * 60);
  const horasEnteras = Math.floor(horasRestantes);

  const tiempoAgotado = horasDesdeUltima >= 24;

  useEffect(() => {
    if (tiempoAgotado && paso === 'intro') {
      setPaso('tiempo-agotado');
    }
  }, [tiempoAgotado, paso]);

  const toggleOpcion = (opcion: string) => {
    setQuePaso((prev) =>
      prev.includes(opcion) ? prev.filter((o) => o !== opcion) : [...prev, opcion]
    );
  };

  const guardar = async () => {
    setGuardando(true);
    const causas = otraCausa.trim() ? [...quePaso, otraCausa] : quePaso;
    await db.recuperaciones.add({
      fecha: new Date().toISOString().split('T')[0],
      situacionCaida: situacion,
      intencionImplementacion: `SI ${situacion}, ENTONCES ${accion}`,
      quePaso: causas,
      queHubieraFuncionado: queHubiera,
      completadaEnTiempo: horasDesdeUltima < 24,
    });
    setGuardando(false);
    setPaso('exito');
  };

  // ---- Tiempo agotado ----
  if (paso === 'tiempo-agotado') {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full border-2 border-smoke/30 flex items-center justify-center mb-6">
          <Clock className="w-8 h-8 text-ivory/20" />
        </div>
        <h2 className="font-display italic text-2xl text-ivory mb-3">
          Sin juicio.
        </h2>
        <p className="text-sm text-ivory/40 font-body leading-relaxed max-w-[280px] mb-10">
          Cuando estés listo, aquí estaremos. Cada momento en que decides volver es el momento correcto.
        </p>
        <button
          onClick={() => setPaso('intro')}
          className="w-full max-w-[280px] bg-obsidian border border-smoke text-ivory/60 font-body font-semibold text-sm tracking-[0.1em] uppercase py-4 rounded-2xl active:scale-[0.97]"
        >
          Quiero intentarlo igual
        </button>
        <button
          onClick={onCerrar}
          className="mt-3 text-ivory/25 font-body text-sm"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  // ---- Éxito ----
  if (paso === 'exito') {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-6 text-center">
        <div
          className="w-24 h-24 rounded-full border-4 border-danger/30 flex items-center justify-center mb-6"
          style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.15)' }}
        >
          <Check className="w-10 h-10 text-danger" />
        </div>
        <p className="text-[11px] tracking-[0.2em] uppercase text-danger font-body mb-3">
          Recuperación exitosa
        </p>
        <h2 className="font-display italic text-2xl text-ivory mb-3">
          Caíste. Pero volviste.
        </h2>
        <p className="text-sm text-ivory/40 font-body max-w-[280px] leading-relaxed mb-4">
          Eso es más de lo que el 90% de las personas hacen.
        </p>
        <p className="font-display italic text-sm text-danger/60 max-w-[260px] leading-relaxed mb-10">
          &ldquo;La velocidad con la que te levantas es lo que define tu identidad, no la caída.&rdquo;
        </p>
        <button
          onClick={onComplete}
          className="w-full max-w-[280px] bg-danger text-ivory font-body font-semibold text-sm tracking-[0.12em] uppercase py-4 rounded-2xl active:scale-[0.97]"
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
        <div className="text-center">
          <p className="text-[11px] tracking-[0.15em] uppercase text-danger font-body font-semibold">
            Anti-Recaída 24h
          </p>
          {paso !== 'intro' && (
            <div className="flex gap-2 mt-1.5 justify-center">
              {[1, 2, 3].map((p) => (
                <div
                  key={p}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    paso === p ? 'w-8 bg-danger' : typeof paso === 'number' && paso > p ? 'w-4 bg-danger/40' : 'w-4 bg-smoke'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        <div className="w-9" />
      </header>

      {/* ===== INTRO ===== */}
      {paso === 'intro' && (
        <div className="flex-1 flex flex-col px-6 pt-8 pb-6">
          {/* Cronómetro */}
          <div
            className="bg-graphite rounded-2xl p-5 border border-danger/20 mb-8 text-center"
            style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.05)' }}
          >
            <p className="text-[10px] tracking-[0.15em] uppercase text-danger/70 font-body mb-2">
              Tiempo disponible
            </p>
            <p className="font-display italic text-4xl text-ivory mb-1">
              {String(horasEnteras).padStart(2, '0')}:{String(minutosRestantes).padStart(2, '0')}h
            </p>
            <p className="text-xs text-ivory/30 font-body">para completar el entrenamiento</p>
          </div>

          <div className="relative bg-graphite/40 rounded-2xl p-5 border border-smoke/20 mb-8">
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-danger/50 rounded-l-2xl" />
            <p className="text-sm text-ivory/60 font-body leading-relaxed">
              Fallaste un día completo. Y eso está bien — porque estás aquí AHORA.
              <br /><br />
              La diferencia entre alguien que transforma su vida y alguien que no, no es que nunca caiga.
              <br /><br />
              <span className="text-ivory font-medium">Es la velocidad con la que se levanta.</span>
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              { num: '01', texto: 'Intención de implementación' },
              { num: '02', texto: 'Análisis de la caída' },
              { num: '03', texto: 'Micro-acción de re-entrada' },
            ].map((item) => (
              <div key={item.num} className="flex items-center gap-3">
                <span className="text-[11px] font-body font-semibold text-danger/50">{item.num}</span>
                <span className="text-sm text-ivory/50 font-body">{item.texto}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPaso(1)}
            className="mt-auto w-full py-4 rounded-2xl bg-obsidian border border-danger text-danger font-body font-semibold text-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2 active:scale-[0.97]"
          >
            Empezar entrenamiento
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ===== PASO 1: Intención ===== */}
      {paso === 1 && (
        <div className="flex-1 flex flex-col px-6 pt-8 pb-6">
          <p className="text-[10px] uppercase tracking-[0.18em] text-danger/60 font-body mb-3">
            Paso 1 de 3
          </p>
          <h2 className="font-display italic text-xl text-ivory mb-2">
            Intención de implementación
          </h2>
          <p className="text-sm text-ivory/40 font-body leading-relaxed mb-6">
            Completa esta frase para prepararte contra la próxima caída.
          </p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-[10px] uppercase tracking-[0.12em] text-danger/60 font-body block mb-2">
                SI... (la situación que causó la caída)
              </label>
              <textarea
                value={situacion}
                onChange={(e) => setSituacion(e.target.value)}
                placeholder="me siento demasiado cansado después del trabajo..."
                rows={3}
                className="textarea-field text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.12em] text-danger/60 font-body block mb-2">
                ENTONCES... (lo que haré diferente)
              </label>
              <textarea
                value={accion}
                onChange={(e) => setAccion(e.target.value)}
                placeholder="haré mi ritual de solo 2 minutos en vez de 5..."
                rows={3}
                className="textarea-field text-sm"
              />
            </div>
          </div>

          {situacion.trim().length > 5 && accion.trim().length > 5 && (
            <div className="bg-obsidian rounded-xl p-4 border border-danger/20 mb-6">
              <p className="text-[10px] uppercase tracking-[0.1em] text-ivory/30 font-body mb-2">Tu intención:</p>
              <p className="font-display italic text-sm text-ivory/80 leading-relaxed">
                &ldquo;SI <span className="text-danger/80">{situacion}</span>, ENTONCES <span className="text-danger/80">{accion}</span>&rdquo;
              </p>
            </div>
          )}

          <button
            onClick={() => setPaso(2)}
            disabled={situacion.trim().length < 5 || accion.trim().length < 5}
            className={`mt-auto w-full py-4 rounded-2xl font-body font-semibold text-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2 active:scale-[0.97] ${
              situacion.trim().length >= 5 && accion.trim().length >= 5
                ? 'bg-obsidian border border-danger text-danger'
                : 'bg-obsidian border border-smoke text-smoke cursor-not-allowed'
            }`}
          >
            Siguiente
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ===== PASO 2: Análisis ===== */}
      {paso === 2 && (
        <div className="flex-1 flex flex-col px-6 pt-8 pb-6 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-[0.18em] text-danger/60 font-body mb-3">
            Paso 2 de 3
          </p>
          <h2 className="font-display italic text-xl text-ivory mb-2">
            Análisis breve
          </h2>
          <p className="text-sm text-ivory/40 font-body mb-5">
            ¿Qué pasó? (puedes marcar varias)
          </p>

          <div className="space-y-2.5 mb-5">
            {QUE_PASO_OPCIONES.map((opcion) => (
              <button
                key={opcion}
                onClick={() => toggleOpcion(opcion)}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-sm font-body text-left transition-all active:scale-[0.98] ${
                  quePaso.includes(opcion)
                    ? 'border-danger/40 bg-danger/5 text-ivory'
                    : 'border-smoke/30 text-ivory/40'
                }`}
              >
                <div className={`w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center ${
                  quePaso.includes(opcion) ? 'border-danger bg-danger' : 'border-smoke'
                }`}>
                  {quePaso.includes(opcion) && <Check className="w-2.5 h-2.5 text-ivory" strokeWidth={3} />}
                </div>
                {opcion}
              </button>
            ))}
            <input
              type="text"
              value={otraCausa}
              onChange={(e) => setOtraCausa(e.target.value)}
              placeholder="Otro (escribe aquí)..."
              className="input-field text-sm"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.12em] text-ivory/30 font-body block mb-2">
              ¿Qué hubiera funcionado para evitarlo? (máx. 200 chars)
            </label>
            <textarea
              value={queHubiera}
              onChange={(e) => setQueHubiera(e.target.value.slice(0, 200))}
              placeholder="Si hubiera..."
              rows={3}
              className="textarea-field text-sm"
            />
            <p className="text-[10px] text-ivory/20 font-body text-right mt-1">{queHubiera.length}/200</p>
          </div>

          <button
            onClick={() => setPaso(3)}
            disabled={quePaso.length === 0 && !otraCausa.trim()}
            className={`mt-6 w-full py-4 rounded-2xl font-body font-semibold text-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2 active:scale-[0.97] ${
              quePaso.length > 0 || otraCausa.trim()
                ? 'bg-obsidian border border-danger text-danger'
                : 'bg-obsidian border border-smoke text-smoke cursor-not-allowed'
            }`}
          >
            Siguiente
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ===== PASO 3: Micro-acción de re-entrada ===== */}
      {paso === 3 && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.18em] text-danger/60 font-body mb-8">
            Paso 3 de 3
          </p>

          <div
            className="w-28 h-28 rounded-full border-4 border-danger/20 flex items-center justify-center mb-8"
            style={{ boxShadow: '0 0 40px rgba(239, 68, 68, 0.1)' }}
          >
            <span className="text-4xl">🔄</span>
          </div>

          <h2 className="font-display italic text-2xl text-ivory mb-3">
            Re-entrada
          </h2>
          <p className="text-sm text-ivory/40 font-body leading-relaxed max-w-[280px] mb-8">
            Haz una sola cosa ahora mismo. Cualquier cosa. Pero hazla.
            <br /><br />
            Esa acción es la que rompe la inercia del abandono.
          </p>

          <div className="bg-graphite rounded-2xl p-5 border border-danger/15 w-full mb-8">
            <p className="text-[10px] uppercase tracking-[0.12em] text-ivory/30 font-body mb-2">Sugerencia</p>
            <p className="font-display italic text-base text-ivory/70">
              Haz tu ritual de hoy — versión de 2 minutos.
              Solo las metas y la declaración.
            </p>
          </div>

          <button
            onClick={guardar}
            disabled={guardando}
            className="w-full py-4 rounded-2xl bg-danger text-ivory font-body font-semibold text-sm tracking-[0.12em] uppercase flex items-center justify-center gap-2 active:scale-[0.97]"
          >
            {guardando ? (
              <span className="w-4 h-4 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />
            ) : (
              <>
                <Check className="w-4 h-4" />
                Lo hice — Recuperación completada
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
