'use client';

import { useState } from 'react';
import { ChevronLeft, ArrowRight, Check } from 'lucide-react';
import { db } from '@/lib/db';

interface Props {
  semana: number;
  diaDelPrograma: number;
  onComplete: () => void;
  onCerrar: () => void;
}

const PREGUNTAS = [
  '¿Qué fue lo más difícil de esta semana y cómo lo manejaste?',
  '¿Qué aprendiste de ti mismo que no sabías hace 7 días?',
  'En una palabra o frase, ¿cómo te sientes comparado con la semana pasada?',
];

const SEMANA_LABELS: Record<number, string> = {
  1: 'Consolidando la base',
  2: 'La cadena se fortalece',
  3: 'Identidad en construcción',
  4: 'La transformación casi completa',
  5: 'Reflexión final',
};

export default function ReflexionSemanal({ semana, diaDelPrograma, onComplete, onCerrar }: Props) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState(['', '', '']);
  const [guardando, setGuardando] = useState(false);
  const [completada, setCompletada] = useState(false);

  const respuesta = respuestas[preguntaActual];
  const esUltima = preguntaActual === 2;
  const puedeContinuar = respuesta.trim().length >= 3;

  const actualizar = (valor: string) => {
    const nuevas = [...respuestas];
    nuevas[preguntaActual] = valor;
    setRespuestas(nuevas);
  };

  const siguiente = async () => {
    if (esUltima) {
      setGuardando(true);
      await db.reflexionesSemanales.add({
        semana,
        diaDelPrograma,
        respuesta1: respuestas[0],
        respuesta2: respuestas[1],
        respuesta3: respuestas[2],
        fecha: new Date().toISOString().split('T')[0],
      });
      setGuardando(false);
      setCompletada(true);
    } else {
      setPreguntaActual((p) => p + 1);
    }
  };

  const anterior = () => {
    if (preguntaActual === 0) onCerrar();
    else setPreguntaActual((p) => p - 1);
  };

  const porcentaje = Math.round(((preguntaActual + 1) / 3) * 100);

  // ---- Pantalla completada ----
  if (completada) {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-6 text-center">
        <div
          className="w-24 h-24 rounded-full border-4 border-gold/30 flex items-center justify-center mb-6"
          style={{ boxShadow: '0 0 40px rgba(200, 164, 78, 0.15)' }}
        >
          <Check className="w-10 h-10 text-gold" />
        </div>
        <p className="text-[11px] tracking-[0.2em] uppercase text-gold font-body mb-3">
          Reflexión completada
        </p>
        <h2 className="font-display italic text-2xl text-ivory mb-3">
          Semana {semana} registrada.
        </h2>
        <p className="text-sm text-ivory/40 font-body max-w-[270px] leading-relaxed mb-10">
          Tu evolución queda guardada. Con el tiempo, podrás ver cómo tu conversación interna cambió semana a semana.
        </p>
        <button
          onClick={onComplete}
          className="w-full max-w-[280px] bg-gold text-obsidian font-body font-semibold text-sm tracking-[0.12em] uppercase py-4 rounded-2xl active:scale-[0.97]"
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
          onClick={anterior}
          className="w-9 h-9 rounded-xl bg-graphite/60 flex items-center justify-center active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 text-ivory/60" />
        </button>
        <div className="text-center">
          <p className="font-display italic text-base text-ivory">Reflexión Semanal</p>
          <p className="text-[11px] text-gold/70 font-body">
            Día {diaDelPrograma}: {SEMANA_LABELS[semana] || `Semana ${semana}`}
          </p>
        </div>
        <div className="w-9" />
      </header>

      {/* Barra de progreso */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex justify-between items-center mb-2">
          {['Paso 1', 'Paso 2', 'Paso 3'].map((label, i) => (
            <span
              key={i}
              className={`text-[10px] font-body uppercase tracking-[0.1em] ${
                i <= preguntaActual ? 'text-gold' : 'text-smoke'
              }`}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="w-full h-[3px] bg-smoke rounded-full overflow-hidden">
          <div
            className="h-full bg-gold rounded-full transition-all duration-500"
            style={{ width: `${porcentaje}%`, boxShadow: '0 0 8px rgba(200, 164, 78, 0.5)' }}
          />
        </div>
        <p className="text-center mt-2 text-[10px] uppercase tracking-[0.15em] text-gold/60 font-body">
          Pregunta {preguntaActual + 1} de 3
        </p>
      </div>

      {/* Contenido */}
      <div className="flex-1 flex flex-col px-6 py-8">
        <div
          className="relative flex-1 flex flex-col bg-graphite rounded-2xl border border-smoke/30 overflow-hidden mb-8"
          style={{ boxShadow: 'inset 0 0 20px rgba(200, 164, 78, 0.03)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gold/3 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full p-6">
            <label className="font-display italic text-lg text-ivory text-center leading-relaxed mb-6 block">
              {PREGUNTAS[preguntaActual]}
            </label>
            <div className="flex-1">
              <textarea
                key={preguntaActual}
                value={respuesta}
                onChange={(e) => actualizar(e.target.value)}
                placeholder="Escribe tu reflexión aquí..."
                className="w-full h-full min-h-[200px] bg-obsidian/50 text-ivory text-sm font-body leading-relaxed border border-smoke/30 rounded-xl p-5 focus:outline-none focus:border-gold/40 focus:bg-obsidian resize-none transition-colors placeholder:text-smoke/50"
                autoFocus
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={siguiente}
            disabled={!puedeContinuar || guardando}
            className={`flex items-center gap-2 py-4 px-6 rounded-xl font-body font-semibold text-sm tracking-[0.1em] uppercase transition-all active:scale-[0.97] ${
              puedeContinuar && !guardando
                ? esUltima
                  ? 'bg-gold text-obsidian'
                  : 'bg-obsidian border border-gold text-gold'
                : 'bg-obsidian border border-smoke text-smoke cursor-not-allowed'
            }`}
          >
            {guardando ? (
              <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            ) : esUltima ? (
              <>
                <Check className="w-4 h-4" />
                Guardar
              </>
            ) : (
              <>
                Siguiente
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 text-center">
        <p className="text-[10px] tracking-[0.18em] uppercase text-ivory/15 font-body">
          Privacidad asegurada
        </p>
      </div>
    </div>
  );
}
