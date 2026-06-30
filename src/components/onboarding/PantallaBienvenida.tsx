'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { IllustracionCamino } from '@/components/ui/Illustrations';

interface Props {
  onContinuar: () => void;
}

export default function PantallaBienvenida({ onContinuar }: Props) {
  const [cargando, setCargando] = useState(false);

  const handleClick = () => {
    setCargando(true);
    setTimeout(onContinuar, 600);
  };

  return (
    <main className="relative flex flex-col items-center justify-between min-h-screen w-full max-w-[600px] mx-auto px-8 py-16 text-center overflow-hidden">
      {/* Background glow — radial cyan como en Stitch */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.08) 0%, rgba(15, 15, 18, 0) 70%)',
        }}
      />

      {/* Logo — usando logo.png real del proyecto */}
      <section
        className="relative z-10 w-full mt-4 animate-fade-in"
        style={{ animationDelay: '0.1s' }}
      >
        <div className="flex justify-center w-full">
          <Image
            src="/logo.png"
            alt="La Última Vez Que Empiezas De Cero"
            width={280}
            height={120}
            className="w-full max-w-[280px] h-auto object-contain"
            priority
          />
        </div>
      </section>

      {/* Headline & subtext — matching Stitch typography */}
      <section
        className="relative z-10 w-full space-y-8 animate-fade-in"
        style={{ animationDelay: '0.3s' }}
      >
        <div className="space-y-4">
          <h1 className="font-display italic text-[26px] md:text-[32px] text-ivory tracking-tight leading-tight px-4">
            Esta es la última vez que empiezas de cero.
          </h1>
          <div className="h-[1px] w-12 bg-gold/30 mx-auto" />
          <p className="font-body text-ivory/50 text-[15px] max-w-[320px] mx-auto leading-[1.8]">
            Antes de comenzar, necesito conocerte. No para juzgarte. Para diseñar tu camino.
          </p>
          {/* Ilustración de camino — visual del viaje que comienza */}
          <IllustracionCamino className="w-full max-w-[280px] mx-auto opacity-60 mt-2 rounded-xl overflow-hidden" />
        </div>

        {/* Progress dots — Stitch style: primera posición activa */}
        <div className="flex justify-center items-center gap-3 pt-4">
          <span className="w-10 h-[2px] bg-gold rounded-full" />
          <span className="w-2 h-2 rounded-full bg-smoke" />
          <span className="w-2 h-2 rounded-full bg-smoke" />
          <span className="w-2 h-2 rounded-full bg-smoke" />
          <span className="w-2 h-2 rounded-full bg-smoke" />
        </div>
      </section>

      {/* CTA — Stitch: bg-marfil text-obsidiana rounded-full con shadow */}
      <section
        className="relative z-10 w-full space-y-10 mb-2 animate-fade-in"
        style={{ animationDelay: '0.5s' }}
      >
        <div className="w-full px-4">
          <button
            onClick={handleClick}
            disabled={cargando}
            className="w-full py-5 bg-ivory text-obsidian font-body font-semibold text-xs tracking-[0.15em] uppercase rounded-full flex items-center justify-center gap-2 shadow-lg transition-all duration-[400ms] active:scale-[0.96] disabled:opacity-80 group"
          >
            {cargando ? (
              <span className="animate-spin w-5 h-5 border-2 border-obsidian/30 border-t-obsidian rounded-full" />
            ) : (
              <>
                <span className="tracking-widest">ESTOY LISTO</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] text-ivory/30 uppercase tracking-[0.2em] font-body">
            LA ÚLTIMA VEZ QUE EMPIEZAS DE CERO
          </p>
          <p className="text-[10px] text-ivory/20 uppercase tracking-[0.25em] font-body">
            PRIVACIDAD ASEGURADA
          </p>
        </div>
      </section>
    </main>
  );
}
