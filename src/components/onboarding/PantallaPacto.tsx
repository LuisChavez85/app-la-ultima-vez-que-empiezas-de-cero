'use client';

import { useState } from 'react';
import { KeyRound } from 'lucide-react';

interface Props {
  nombre: string;
  onCompletar: () => void;
}

export default function PantallaPacto({ nombre, onCompletar }: Props) {
  const [cargando, setCargando] = useState(false);
  const [completado, setCompletado] = useState(false);

  const handleClick = () => {
    if (cargando || completado) return;
    setCargando(true);

    setTimeout(() => {
      setCargando(false);
      setCompletado(true);
      setTimeout(onCompletar, 1200);
    }, 2000);
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen w-full max-w-[600px] mx-auto px-6 text-center overflow-hidden">
      {/* Ambient Background Glow — Stitch radial oro-antiguo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,164,78,0.05),rgba(15,15,18,0),rgba(15,15,18,0))] z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Icon — Stitch: vpn_key → Lucide: KeyRound */}
        <div className="w-24 h-24 rounded-full border border-smoke/30 flex items-center justify-center bg-graphite relative">
          <KeyRound className="w-10 h-10 text-gold/80" />
          <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(200,164,78,0.15)] pointer-events-none" />
        </div>

        {/* Emotional message — Stitch typography */}
        <div className="space-y-3">
          <h1 className="font-display italic text-[24px] text-ivory tracking-wide">
            El Pacto
          </h1>
          <p className="font-display italic text-[20px] text-ivory/70 max-w-md mx-auto leading-relaxed">
            <span className="text-gold italic">
              &ldquo;{nombre || 'Tú'}
            </span>
            , al pulsar este botón estás haciendo algo que no has hecho en mucho tiempo: una promesa a ti mismo que vas a cumplir.&rdquo;
          </p>
        </div>

        {/* Commitment Button — Stitch: bg-oro-antiguo text-obsidiana, full width max-w-xs */}
        <div className="pt-8 w-full max-w-xs mx-auto">
          <button
            onClick={handleClick}
            disabled={cargando || completado}
            className={`w-full flex items-center justify-center py-3.5 px-6 font-body font-semibold text-[11px] tracking-[0.15em] uppercase rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/50 active:scale-[0.95] ${
              completado
                ? 'bg-graphite border border-gold text-gold'
                : 'bg-gold text-obsidian hover:bg-gold-light'
            }`}
          >
            {cargando ? (
              <span className="animate-spin w-5 h-5 border-2 border-obsidian/30 border-t-obsidian rounded-full" />
            ) : completado ? (
              'PACTO SELLADO'
            ) : (
              'EMPIEZO HOY. ESTA ES LA ÚLTIMA VEZ.'
            )}
          </button>
          <p className="text-[11px] text-ivory/25 font-body mt-4">
            Esta acción es irreversible. Prepara tu entorno.
          </p>
        </div>
      </div>

      {/* Glow effect on completion */}
      {completado && (
        <div className="fixed inset-0 z-0 pointer-events-none animate-pulse-slow">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,164,78,0.08),transparent)]" />
        </div>
      )}
    </main>
  );
}
