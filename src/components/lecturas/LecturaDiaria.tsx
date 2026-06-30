'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, BookOpen, Calendar, HelpCircle, Lightbulb, Check, ChevronDown } from 'lucide-react';
import { marcarLecturaLeida } from '@/lib/db';
import type { LecturaDiaria as LecturaDiariaType } from '@/types';

interface Props {
  lectura: LecturaDiariaType;
  diaDelPrograma: number;
  onComplete: () => void;
}

const SEMANA_LABELS: Record<number, string> = {
  1: 'Por qué abandonabas',
  2: 'Cómo funciona tu mente',
  3: 'Verdades Incómodas',
  4: 'Historias de Espejo + Consolidación',
};

export default function LecturaDiaria({ lectura, diaDelPrograma, onComplete }: Props) {
  const [completada, setCompletada] = useState(false);
  const [mostrarPregunta, setMostrarPregunta] = useState(false);
  const [mostrarEjercicio, setMostrarEjercicio] = useState(false);

  const semanaLabel = SEMANA_LABELS[lectura.semana] || `Semana ${lectura.semana}`;

  // Split content into paragraphs for better rendering
  const parrafos = lectura.contenido
    .split('\n\n')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const handleCompletar = async () => {
    setCompletada(true);
    await marcarLecturaLeida();
    // Small delay for animation before closing
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-obsidian flex flex-col">
      {/* Header */}
      <header className="flex items-center px-5 pt-6 pb-4 border-b border-smoke/20 shrink-0">
        <motion.button
          onClick={onComplete}
          whileTap={{ scale: 0.9 }}
          className="w-9 h-9 rounded-xl bg-graphite/60 flex items-center justify-center"
        >
          <ChevronLeft className="w-4 h-4 text-ivory/60" />
        </motion.button>
        <p className="flex-1 text-center text-[11px] tracking-[0.15em] uppercase text-gold font-body font-semibold">
          Lectura del Día
        </p>
        <div className="w-9" />
      </header>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto pb-8">
        <div className="px-6 pt-6">
          {/* Category tag */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="text-[10px] tracking-[0.18em] uppercase text-gold/70 font-body font-semibold
                           bg-gold/8 border border-gold/15 rounded-lg px-3 py-1.5">
              {lectura.categoria === 'Historia de Espejo' ? '📖 Historia de Espejo' : '📚 Lectura'}
              {' · '}5 min
            </span>
          </motion.div>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <div className="flex items-center gap-1.5 text-ivory/30">
              <Calendar className="w-3 h-3" />
              <span className="text-[10px] font-body tracking-wide">Día {diaDelPrograma} / 30</span>
            </div>
            <span className="text-ivory/15">·</span>
            <span className="text-[10px] text-ivory/25 font-body tracking-wide">{semanaLabel}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display italic text-2xl text-ivory text-center mb-8 leading-tight"
          >
            {lectura.titulo}
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-[1px] bg-gold/30 mx-auto mb-8"
          />

          {/* Content body */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-10"
          >
            {parrafos.map((parrafo, idx) => (
              <p
                key={idx}
                className={`text-[15px] text-ivory/70 font-body leading-[1.8] mb-5 ${
                  idx === 0 ? 'first-letter:text-2xl first-letter:font-display first-letter:italic first-letter:text-gold first-letter:mr-0.5' : ''
                }`}
              >
                {parrafo}
              </p>
            ))}
          </motion.article>

          {/* Pregunta Incómoda — expandable section */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-4"
          >
            <button
              onClick={() => setMostrarPregunta(!mostrarPregunta)}
              className="w-full bg-graphite border border-amber-500/20 rounded-2xl p-5 text-left transition-all duration-300 active:scale-[0.98]"
              style={{ boxShadow: '0 0 20px rgba(245, 158, 11, 0.04)' }}
            >
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-amber-400/80 font-body font-semibold">
                    Pregunta incómoda
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: mostrarPregunta ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 text-amber-400/40" />
                </motion.div>
              </div>
              <AnimatePresence>
                {mostrarPregunta && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-ivory/60 font-body leading-relaxed mt-3 pl-11 overflow-hidden"
                  >
                    {lectura.preguntaIncomoda}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          </motion.div>

          {/* Micro-ejercicio — expandable section */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-10"
          >
            <button
              onClick={() => setMostrarEjercicio(!mostrarEjercicio)}
              className="w-full bg-graphite border border-emerald/20 rounded-2xl p-5 text-left transition-all duration-300 active:scale-[0.98]"
              style={{ boxShadow: '0 0 20px rgba(0, 212, 170, 0.04)' }}
            >
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-lg bg-emerald/10 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4 h-4 text-emerald" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-emerald/80 font-body font-semibold">
                    Micro-ejercicio
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: mostrarEjercicio ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 text-emerald/40" />
                </motion.div>
              </div>
              <AnimatePresence>
                {mostrarEjercicio && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-ivory/60 font-body leading-relaxed mt-3 pl-11 overflow-hidden"
                  >
                    {lectura.microEjercicio}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          </motion.div>

          {/* Privacy note */}
          <p className="text-[10px] text-ivory/15 uppercase tracking-[0.18em] font-body text-center mb-6">
            Contenido exclusivo · Día {diaDelPrograma}
          </p>

          {/* CTA Button */}
          <motion.button
            onClick={handleCompletar}
            disabled={completada}
            whileTap={{ scale: completada ? 1 : 0.97 }}
            className={`w-full font-body font-semibold text-sm tracking-[0.12em] uppercase py-4 rounded-2xl
                       flex items-center justify-center gap-2.5 transition-all duration-300 mb-6
                       ${completada
                         ? 'bg-emerald/15 border border-emerald/30 text-emerald'
                         : 'bg-obsidian border border-gold/40 text-ivory hover:border-gold/70'
                       }`}
          >
            {completada ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                >
                  <Check className="w-4 h-4 text-emerald" />
                </motion.div>
                Lectura completada
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4 text-gold" />
                Lectura completada
              </>
            )}
          </motion.button>
        </div>
      </main>
    </div>
  );
}
