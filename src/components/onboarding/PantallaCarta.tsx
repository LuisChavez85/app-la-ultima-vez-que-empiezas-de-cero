'use client';

import { useState } from 'react';
import { ArrowLeft, Lock, Mail, Check, PenTool } from 'lucide-react';

interface Props {
  carta: string;
  onChange: (carta: string) => void;
  onContinuar: () => void;
  onVolver: () => void;
}

export default function PantallaCarta({
  carta,
  onChange,
  onContinuar,
  onVolver,
}: Props) {
  const [sellando, setSellando] = useState(false);
  const [sellada, setSellada] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSellar = () => {
    if (carta.trim().length === 0) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setSellando(true);
    setTimeout(() => {
      setSellando(false);
      setSellada(true);
      setTimeout(onContinuar, 800);
    }, 1500);
  };

  return (
    <main className="relative flex flex-col items-center min-h-screen w-full max-w-[600px] mx-auto px-6 py-10 pb-12">
      {/* Ambient background glow — Stitch oro-antiguo glow */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      {/* Header with icon — matching Stitch carta design */}
      <header className="relative z-10 text-center flex flex-col gap-4 items-center mb-10">
        <div className="w-16 h-16 rounded-full bg-graphite border border-smoke/30 flex items-center justify-center shadow-[0_0_15px_rgba(200,164,78,0.1)]">
          <Mail className="w-7 h-7 text-gold" />
        </div>
        <h1 className="font-display italic text-[24px] text-ivory tracking-wide">
          Carta a Mi Yo Futuro
        </h1>
        <p className="font-body text-[13px] text-ivory/50 max-w-md mx-auto leading-relaxed">
          Escríbele unas líneas al tú de dentro de 30 días. ¿Qué quieres decirle? ¿Qué esperas que haya logrado?
        </p>
      </header>

      {/* Text area card — Stitch grafito card with texture */}
      <div className="relative z-10 w-full bg-graphite rounded-xl p-6 border border-smoke/20 shadow-lg overflow-hidden flex flex-col gap-6">
        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Top gold line accent — Stitch signature */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="relative z-10 flex flex-col gap-2 flex-grow">
          <label className="text-[11px] tracking-[0.12em] uppercase font-body font-semibold text-gold/80 pl-2">
            Yo, en 30 días...
          </label>
          <textarea
            value={carta}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Reflexiona sobre tu compromiso hoy. ¿Qué esperas haber logrado? ¿Cómo quieres sentirte al leer esto?"
            className={`w-full min-h-[250px] bg-transparent border-b border-smoke p-2 text-ivory font-body text-sm leading-relaxed resize-none focus:outline-none focus:border-gold focus:ring-0 placeholder:text-ivory/20 transition-colors duration-300 ${
              shake ? 'animate-shake' : ''
            }`}
          />
        </div>

        {/* Lock info */}
        <div className="flex items-start gap-3 mt-4 bg-obsidian/50 p-4 rounded-lg border border-smoke/10">
          <Lock className="w-4 h-4 text-ivory/30 mt-0.5 flex-shrink-0" />
          <p className="text-[11px] text-ivory/40 font-body leading-relaxed">
            Esta carta estará sellada y solo se desbloqueará cuando completes tu racha de 30 días.
          </p>
        </div>
      </div>

      {/* Action Area — Stitch: inline centered button, NOT fixed bottom */}
      <div className="relative z-10 w-full mt-8 flex flex-col items-center gap-4">
        {/* Back button — subtle, aligned left */}
        <div className="w-full flex gap-3 max-w-sm mx-auto">
          <button
            onClick={onVolver}
            className="py-3.5 px-5 rounded-lg border border-smoke text-ivory/50 font-body text-xs transition-all active:scale-[0.97]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Seal button — Stitch style with hover glow */}
          <button
            onClick={handleSellar}
            disabled={sellando || sellada}
            className={`flex-1 rounded-lg border p-3.5 flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.95] shadow-[0_4px_14px_0_rgba(200,164,78,0.1)] group ${
              sellada
                ? 'bg-graphite border-emerald text-emerald'
                : 'bg-obsidian border-gold text-ivory hover:bg-[#2a2930]'
            } disabled:opacity-80`}
          >
            {sellando ? (
              <>
                <span className="animate-spin w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full" />
                <span className="font-body font-semibold text-[11px] tracking-[0.12em] uppercase">
                  SELLANDO...
                </span>
              </>
            ) : sellada ? (
              <>
                <Check className="w-4 h-4" />
                <span className="font-body font-semibold text-[11px] tracking-[0.12em] uppercase">
                  CARTA SELLADA
                </span>
              </>
            ) : (
              <>
                <PenTool className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                <span className="font-body font-semibold text-[11px] tracking-[0.12em] uppercase">
                  SELLAR CARTA
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
