'use client';

import { ChevronLeft, Check, Calendar } from 'lucide-react';
import { marcarLeccionLeida } from '@/lib/db';
import type { MicroLeccion as MicroLeccionType } from '@/types';

interface Props {
  leccion: MicroLeccionType;
  diaDelPrograma: number;
  onComplete: () => void;
}

const SEMANA_LABELS: Record<number, string> = {
  1: 'Semana 1: Por qué abandonas',
  2: 'Semana 2: Construyendo la cadena',
  3: 'Semana 3: Identidad en acción',
  4: 'Semana 4: El nuevo tú',
};

export default function MicroLeccion({ leccion, diaDelPrograma, onComplete }: Props) {
  const semanaLabel = SEMANA_LABELS[leccion.semana] || `Semana ${leccion.semana}`;

  return (
    <div className="min-h-screen bg-obsidian flex flex-col">
      {/* Header */}
      <header className="flex items-center px-5 pt-6 pb-4 border-b border-smoke/20">
        <button
          onClick={onComplete}
          className="w-9 h-9 rounded-xl bg-graphite/60 flex items-center justify-center active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 text-ivory/60" />
        </button>
        <p className="flex-1 text-center text-[11px] tracking-[0.15em] uppercase text-gold font-body font-semibold">
          Lección del Día
        </p>
        <div className="w-9" />
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col px-6 pt-8 pb-8 overflow-y-auto">
        <h1 className="font-display italic text-3xl text-gold text-center mb-10 tracking-wide">
          Lección del Día
        </h1>

        {/* Tarjeta principal */}
        <div
          className="relative bg-graphite rounded-2xl border border-smoke/30 overflow-hidden mb-8"
          style={{ boxShadow: '0 0 20px rgba(200, 164, 78, 0.08)' }}
        >
          {/* Borde izquierdo acento */}
          <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-emerald/60" />

          <div className="p-6 flex flex-col gap-5">
            {/* Meta-info */}
            <div className="flex flex-col gap-1.5 border-b border-smoke/30 pb-4">
              <p className="text-[10px] tracking-[0.18em] uppercase text-ivory/30 font-body">
                {semanaLabel}
              </p>
              <div className="flex items-center gap-2 text-gold">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-xs font-body font-semibold">
                  Día {diaDelPrograma} / 30
                </span>
              </div>
            </div>

            {/* Título */}
            <h2 className="font-display italic text-xl text-ivory">
              {leccion.titulo}
            </h2>

            {/* Contenido */}
            <p className="text-sm text-ivory/60 font-body leading-relaxed text-justify">
              <span className="font-display italic text-2xl text-gold mr-1">
                {leccion.contenido.charAt(0)}
              </span>
              {leccion.contenido.slice(1)}
            </p>

            {/* Temática */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-[10px] tracking-[0.12em] uppercase text-ivory/20 font-body">
                Temática:
              </span>
              <span className="text-[10px] tracking-[0.08em] uppercase text-gold/50 font-body">
                {leccion.tematica}
              </span>
            </div>
          </div>
        </div>

        {/* Nota de privacidad */}
        <p className="text-[10px] text-ivory/20 uppercase tracking-[0.18em] font-body text-center mb-8">
          Privacidad asegurada
        </p>

        {/* CTA */}
        <button
          onClick={async () => {
            await marcarLeccionLeida();
            onComplete();
          }}
          className="w-full bg-obsidian border border-gold/40 text-ivory font-body font-semibold text-sm tracking-[0.12em] uppercase py-4 rounded-2xl flex items-center justify-center gap-2 transition-all hover:border-gold/70 active:scale-[0.97]"
        >
          <Check className="w-4 h-4 text-gold" />
          Entendido
        </button>
      </main>
    </div>
  );
}
