'use client';

import { useState, useCallback } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { PerfilPartida } from '@/types';

interface Props {
  diagnostico: Partial<PerfilPartida>;
  onUpdate: (diag: Partial<PerfilPartida>) => void;
  onContinuar: () => void;
  onVolver: () => void;
}

interface Pregunta {
  id: keyof Omit<PerfilPartida, 'autoeficaciaInicial'>;
  titulo: string;
  subtitulo: string;
  opciones: string[];
  tipo: 'seleccion' | 'texto';
}

const PREGUNTAS: Pregunta[] = [
  {
    id: 'intentosCambio',
    titulo: '¿Cuántas veces has intentado cambiar un hábito importante en el último año?',
    subtitulo: 'La honestidad es el primer paso hacia la transformación.',
    opciones: ['Ninguna', '1-2 veces', '3-5 veces', 'Más de 5', 'Perdí la cuenta'],
    tipo: 'seleccion',
  },
  {
    id: 'duracionMotivacion',
    titulo: '¿Cuando empiezas algo nuevo, cuánto suele durar tu motivación?',
    subtitulo: 'Sé honesto. Este es el punto de partida para tu transformación.',
    opciones: ['1-3 días', 'Una semana', '2-3 semanas', 'Un mes', 'Depende'],
    tipo: 'seleccion',
  },
  {
    id: 'relacionPromesas',
    titulo: '¿Cómo describirías tu relación con tus propias promesas?',
    subtitulo: 'No hay respuesta incorrecta. Solo verdadera.',
    opciones: [
      'Las cumplo casi siempre',
      'Las cumplo a veces',
      'Me cuesta mucho',
      'Ya ni me las hago',
      'Prefiero no responder',
    ],
    tipo: 'seleccion',
  },
  {
    id: 'areaSufrida',
    titulo: '¿Qué área de tu vida sientes que más ha sufrido por falta de consistencia?',
    subtitulo: 'Identifica el punto de mayor impacto.',
    opciones: [
      'Salud / cuerpo',
      'Finanzas',
      'Relaciones',
      'Proyectos / trabajo',
      'Todo en general',
    ],
    tipo: 'seleccion',
  },
  {
    id: 'queCambiaria',
    titulo: 'Si pudieras cambiar UNA cosa de ti mismo en los próximos 30 días, ¿qué sería?',
    subtitulo: 'El último paso. Sé brutalmente honesto. Este es el inicio de tu transformación.',
    opciones: [],
    tipo: 'texto',
  },
];

export default function PantallaDiagnostico({
  diagnostico,
  onUpdate,
  onContinuar,
  onVolver,
}: Props) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [textoLibre, setTextoLibre] = useState(diagnostico.queCambiaria || '');
  const [transicion, setTransicion] = useState(false);
  const [errorTexto, setErrorTexto] = useState(false);

  const pregunta = PREGUNTAS[preguntaActual];
  const respuestaActual = diagnostico[pregunta.id] || '';
  const total = PREGUNTAS.length;

  const animarCambio = useCallback((callback: () => void) => {
    setTransicion(true);
    setTimeout(() => {
      callback();
      setTransicion(false);
    }, 250);
  }, []);

  const seleccionarOpcion = (opcion: string) => {
    onUpdate({ ...diagnostico, [pregunta.id]: opcion });

    // Auto-avanzar después de seleccionar
    if (preguntaActual < total - 1) {
      setTimeout(() => {
        animarCambio(() => setPreguntaActual((p) => p + 1));
      }, 300);
    }
  };

  const avanzar = () => {
    if (pregunta.tipo === 'texto') {
      if (textoLibre.trim().length === 0) {
        setErrorTexto(true);
        return;
      }
      onUpdate({ ...diagnostico, queCambiaria: textoLibre.trim() });
      onContinuar();
    } else if (respuestaActual) {
      if (preguntaActual < total - 1) {
        animarCambio(() => setPreguntaActual((p) => p + 1));
      } else {
        onContinuar();
      }
    }
  };

  const retroceder = () => {
    if (preguntaActual > 0) {
      animarCambio(() => setPreguntaActual((p) => p - 1));
    } else {
      onVolver();
    }
  };

  return (
    <main className="relative flex flex-col min-h-screen w-full max-w-[600px] mx-auto px-6 pt-12 pb-32">
      {/* Progress header — matches Stitch exactly */}
      <header className="w-full flex flex-col gap-4 mb-10">
        <div className="flex justify-between items-end">
          <span className="text-[11px] tracking-[0.12em] uppercase font-body font-semibold text-gold">
            Diagnóstico
          </span>
          <span className="text-[11px] text-ivory/50 font-body">
            {String(preguntaActual + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
        <div className="flex gap-2 w-full h-[3px]">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 rounded-full transition-colors duration-500 ${
                i <= preguntaActual ? 'bg-gold' : 'bg-smoke'
              }`}
            />
          ))}
        </div>
      </header>

      {/* Question content — with transition */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          transicion ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        {pregunta.tipo === 'seleccion' ? (
          /* ====== SELECTION QUESTIONS: Stitch glassmorphism card + bento options ====== */
          <div className="w-full bg-graphite/50 backdrop-blur-md rounded-xl border border-smoke/20 p-6 md:p-8 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
            {/* Subtle gold line at top — Stitch signature */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            {/* Question text — centered as in Stitch */}
            <div className="flex flex-col gap-3 text-center">
              <h1 className="font-display italic text-[22px] md:text-[28px] text-ivory leading-tight">
                {pregunta.titulo}
              </h1>
              <p className="font-display italic text-[13px] text-ivory/50 leading-relaxed">
                {pregunta.subtitulo}
              </p>
            </div>

            {/* Options — Stitch bento-style cards with arrow */}
            <div className="grid grid-cols-1 gap-2 mt-4">
              {pregunta.opciones.map((opcion) => {
                const selected = respuestaActual === opcion;
                return (
                  <button
                    key={opcion}
                    onClick={() => seleccionarOpcion(opcion)}
                    className={`w-full text-left p-5 rounded-lg border-[0.5px] transition-all duration-300 group flex items-center justify-between ${
                      selected
                        ? 'border-gold bg-[#2a2930]'
                        : 'border-smoke/30 bg-[#1b1b21] hover:border-gold/50 hover:bg-[#2a2930]'
                    }`}
                  >
                    <span
                      className={`font-body text-sm transition-colors ${
                        selected ? 'text-gold' : 'text-ivory/80 group-hover:text-ivory'
                      }`}
                    >
                      {opcion}
                    </span>
                    {/* Arrow icon — appears on hover/selection, Stitch pattern */}
                    <ArrowRight
                      className={`w-4 h-4 transition-all duration-300 ${
                        selected
                          ? 'text-gold opacity-100 translate-x-0'
                          : 'text-ivory/30 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gold'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* ====== TEXT QUESTION (Pregunta 5): Stitch style with ritual-input ====== */
          <div className="flex flex-col gap-6">
            {/* Question text — centered */}
            <div className="mb-4 text-center">
              <h1 className="font-display italic text-[22px] md:text-[28px] text-ivory leading-tight mb-3">
                {pregunta.titulo}
              </h1>
              <p className="font-body text-[13px] text-ivory/50 leading-relaxed">
                {pregunta.subtitulo}
              </p>
            </div>

            {/* Textarea with "Yo..." prefix */}
            <div className="relative w-full">
              <div className="absolute top-4 left-4 text-gold/50 font-display italic text-sm pointer-events-none">
                Yo...
              </div>
              <textarea
                value={textoLibre}
                onChange={(e) => {
                  setTextoLibre(e.target.value);
                  setErrorTexto(false);
                }}
                maxLength={200}
                rows={4}
                placeholder=" "
                className={`w-full bg-graphite border rounded-lg p-6 pt-12 font-body text-sm text-ivory resize-none transition-all duration-300 placeholder:text-ivory/15 focus:outline-none focus:bg-[#2a2930] ${
                  errorTexto
                    ? 'border-danger'
                    : 'border-smoke focus:border-gold focus:shadow-[0_0_0_1px_#C8A44E]'
                }`}
              />
              <div className="absolute bottom-4 right-4 flex items-center justify-between w-[calc(100%-2rem)] pointer-events-none">
                {errorTexto && (
                  <span className="text-danger text-[11px] font-body">
                    Debes escribir algo.
                  </span>
                )}
                <span className="text-ivory/30 text-[11px] font-body ml-auto">
                  {textoLibre.length}/200
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom buttons — Stitch style */}
      {(pregunta.tipo === 'texto' || preguntaActual === total - 1) && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian via-obsidian to-transparent px-6 pb-8 pt-12">
          <div className="max-w-[600px] mx-auto flex justify-center">
            <button
              onClick={avanzar}
              className="w-full sm:w-auto overflow-hidden rounded-full border border-gold bg-obsidian px-8 py-3.5 flex items-center justify-center gap-3 transition-all duration-300 hover:bg-graphite active:scale-[0.95] group"
            >
              <span className="font-body font-semibold text-xs tracking-[0.12em] uppercase text-ivory">
                {preguntaActual === total - 1 ? 'Completar Diagnóstico' : 'Continuar'}
              </span>
              <ArrowRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      )}

      {/* Back button for selection questions (not last) */}
      {pregunta.tipo === 'seleccion' && preguntaActual < total - 1 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian via-obsidian to-transparent px-6 pb-8 pt-12">
          <div className="max-w-[600px] mx-auto">
            <button
              onClick={retroceder}
              className="py-4 px-5 rounded-xl border border-smoke text-ivory/50 font-body text-xs tracking-wide transition-all active:scale-[0.97]"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
