'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, User, Clock } from 'lucide-react';

interface Props {
  nombre: string;
  horaDespertar: string;
  onChangeNombre: (nombre: string) => void;
  onChangeHora: (hora: string) => void;
  onContinuar: () => void;
  onVolver: () => void;
}

const HORAS = [
  '05:00', '05:30', '06:00', '06:30', '07:00', '07:30',
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00',
];

export default function PantallaDatosBasicos({
  nombre,
  horaDespertar,
  onChangeNombre,
  onChangeHora,
  onContinuar,
  onVolver,
}: Props) {
  const [touched, setTouched] = useState(false);
  const nombreValido = nombre.trim().length >= 2;

  const handleContinuar = () => {
    setTouched(true);
    if (nombreValido) onContinuar();
  };

  return (
    <main className="relative flex flex-col min-h-screen w-full max-w-[600px] mx-auto px-6 pt-12 pb-32">
      {/* Header */}
      <header className="w-full flex flex-col gap-4 mb-10">
        <div className="flex justify-between items-end">
          <span className="text-[11px] tracking-[0.12em] uppercase font-body font-semibold text-gold">
            Preparación
          </span>
          <span className="text-[11px] text-ivory/40 font-body">
            Paso 1
          </span>
        </div>
        {/* Progress bar */}
        <div className="flex gap-2 w-full h-[3px]">
          <div className="flex-1 rounded-full bg-gold" />
          <div className="flex-1 rounded-full bg-gold/30" />
          <div className="flex-1 rounded-full bg-smoke" />
          <div className="flex-1 rounded-full bg-smoke" />
        </div>
      </header>

      {/* Title */}
      <section className="flex flex-col gap-2 mb-10">
        <h1 className="font-display italic text-[24px] text-ivory leading-tight">
          Antes de empezar, cuéntame sobre ti.
        </h1>
        <p className="font-body text-[13px] text-ivory/50 leading-relaxed">
          Solo necesito dos cosas. Nada más.
        </p>
      </section>

      {/* Form fields */}
      <div className="flex flex-col gap-8">
        {/* Nombre */}
        <div className="flex flex-col gap-3">
          <label className="text-[11px] tracking-[0.12em] uppercase font-body font-semibold text-gold/80">
            ¿Cómo te llamas?
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ivory/30" />
            <input
              type="text"
              value={nombre}
              onChange={(e) => onChangeNombre(e.target.value)}
              placeholder="Tu nombre"
              maxLength={30}
              className={`w-full bg-graphite border rounded-xl py-4 pl-11 pr-4 text-ivory text-sm font-body placeholder:text-ivory/20 focus:outline-none transition-colors duration-300 ${
                touched && !nombreValido
                  ? 'border-danger'
                  : 'border-smoke focus:border-gold/40'
              }`}
            />
          </div>
          {touched && !nombreValido && (
            <p className="text-danger text-[11px] font-body">
              Escribe tu nombre para personalizar tu experiencia.
            </p>
          )}
        </div>

        {/* Hora de despertar */}
        <div className="flex flex-col gap-3">
          <label className="text-[11px] tracking-[0.12em] uppercase font-body font-semibold text-gold/80">
            ¿A qué hora sueles despertar?
          </label>
          <p className="text-[12px] text-ivory/30 font-body -mt-1">
            Para calibrar tu ritual matutino.
          </p>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ivory/30" />
            <select
              value={horaDespertar}
              onChange={(e) => onChangeHora(e.target.value)}
              className="w-full bg-graphite border border-smoke rounded-xl py-4 pl-11 pr-4 text-ivory text-sm font-body focus:outline-none focus:border-gold/40 transition-colors duration-300 appearance-none cursor-pointer"
            >
              {HORAS.map((h) => (
                <option key={h} value={h} className="bg-graphite text-ivory">
                  {h}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-ivory/30" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian via-obsidian to-transparent px-6 pb-8 pt-12">
        <div className="max-w-[600px] mx-auto flex gap-3">
          <button
            onClick={onVolver}
            className="py-4 px-5 rounded-xl border border-smoke text-ivory/50 font-body text-xs tracking-wide transition-all active:scale-[0.97]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleContinuar}
            className="flex-1 py-4 bg-obsidian border border-gold rounded-xl font-body font-semibold text-xs tracking-[0.12em] uppercase text-ivory flex items-center justify-center gap-2 transition-all active:scale-[0.97] hover:bg-graphite"
          >
            Continuar
            <ArrowRight className="w-4 h-4 text-gold" />
          </button>
        </div>
      </div>
    </main>
  );
}
