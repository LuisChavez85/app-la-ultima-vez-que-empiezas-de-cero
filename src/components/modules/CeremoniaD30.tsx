'use client';

import { useState } from 'react';
import { ArrowRight, Check, Trophy, Mail } from 'lucide-react';
import { IllustracionSobre, IllustracionMontana, DecoradorLinea } from '@/components/ui/Illustrations';
import type { Usuario } from '@/types';

interface Props {
  usuario: Usuario;
  onComplete: () => void;
}

type Parte = 1 | 2 | 3 | 4;

export default function CeremoniaD30({ usuario, onComplete }: Props) {
  const [parte, setParte] = useState<Parte>(1);
  const [cartaActual, setCartaActual] = useState('');

  const fechaInicio = new Date(usuario.fechaInicio);
  const fechaFin = new Date();
  const formatFecha = (d: Date) =>
    d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-obsidian flex flex-col">
      {/* Glow de fondo */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(200, 164, 78, 0.06) 0%, transparent 70%)',
        }}
      />

      {/* ===== PARTE 1: Desbloqueo de la Carta ===== */}
      {parte === 1 && (
        <div className="flex-1 flex flex-col items-center px-6 pt-10 pb-6 relative z-10">
          {/* Logo */}
          <div className="mb-10 w-full flex justify-center">
            <div className="text-center">
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold/40 font-body">
                La Última Vez Que Empiezas De Cero
              </p>
            </div>
          </div>

          {/* Sobre SVG animado */}
          <div
            className="relative mb-10 cursor-pointer group"
            style={{ animation: 'float 4s ease-in-out infinite' }}
          >
            <IllustracionSobre
              className="w-40 h-auto opacity-90 transition-all duration-700 group-hover:opacity-100"
              style={{ filter: 'drop-shadow(0 0 20px rgba(200,164,78,0.25))' }}
            />
          </div>

          <h1 className="font-display italic text-3xl text-gold text-center mb-4">
            Tu promesa cumplida
          </h1>

          <div
            className="w-full bg-graphite/60 rounded-2xl border border-smoke/30 p-6 mb-8 relative"
            style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)' }}
          >
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gold/70 rounded-l-2xl" />
            <p className="font-body italic text-xs text-ivory/40 text-center mb-4 leading-relaxed">
              Escribiste esto hace 30 días, cuando dudabas si podrías llegar hasta aquí...
            </p>
            {usuario.cartaYoFuturo ? (
              <p className="text-sm text-ivory/90 font-body leading-relaxed relative">
                <span className="text-4xl text-smoke/30 absolute -top-3 -left-1 font-display">&ldquo;</span>
                {usuario.cartaYoFuturo}
              </p>
            ) : (
              <p className="text-sm text-ivory/30 font-body italic text-center">
                (No escribiste una carta durante el onboarding)
              </p>
            )}
          </div>

          <button
            onClick={() => setParte(2)}
            className="w-full py-4 rounded-2xl bg-obsidian border border-gold text-ivory font-body font-semibold text-sm tracking-[0.12em] uppercase flex items-center justify-center gap-2 active:scale-[0.97] transition-all hover:bg-gold/5"
          >
            Continuar a la Transformación
            <ArrowRight className="w-4 h-4 text-gold" />
          </button>
        </div>
      )}

      {/* ===== PARTE 2: Comparación de perfil ===== */}
      {parte === 2 && (
        <div className="flex-1 flex flex-col px-6 pt-8 pb-6 relative z-10 overflow-y-auto">
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold font-body mb-3">
            Día 30 — Comparación
          </p>
          <h2 className="font-display italic text-2xl text-ivory mb-6">
            Quién eras. Quién eres.
          </h2>

          <div className="space-y-4 flex-1">
            {/* Motivación */}
            <div className="bg-graphite rounded-2xl p-5 border border-smoke/20">
              <p className="text-[10px] uppercase tracking-[0.12em] text-ivory/30 font-body mb-3">Motivación</p>
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-[10px] text-danger/50 font-body uppercase mb-1">Antes</p>
                  <p className="text-sm text-ivory/40 font-body italic">
                    Duraba {usuario.perfilPartida?.duracionMotivacion || '—'} antes de abandonar
                  </p>
                </div>
                <div className="w-[1px] bg-smoke/30" />
                <div className="flex-1">
                  <p className="text-[10px] text-gold font-body uppercase mb-1">Ahora</p>
                  <p className="text-sm text-ivory/80 font-body font-medium">
                    30 días de cadena.
                  </p>
                </div>
              </div>
            </div>

            {/* Promesas */}
            <div className="bg-graphite rounded-2xl p-5 border border-smoke/20">
              <p className="text-[10px] uppercase tracking-[0.12em] text-ivory/30 font-body mb-3">Relación con promesas</p>
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-[10px] text-danger/50 font-body uppercase mb-1">Antes</p>
                  <p className="text-sm text-ivory/40 font-body italic">
                    {usuario.perfilPartida?.relacionPromesas || '—'}
                  </p>
                </div>
                <div className="w-[1px] bg-smoke/30" />
                <div className="flex-1">
                  <p className="text-[10px] text-gold font-body uppercase mb-1">Ahora</p>
                  <p className="text-sm text-ivory/80 font-body font-medium">
                    Las cumplí. 30 días seguidos.
                  </p>
                </div>
              </div>
            </div>

            {/* Lo que querías cambiar */}
            {usuario.perfilPartida?.queCambiaria && (
              <div className="bg-graphite rounded-2xl p-5 border border-smoke/20">
                <p className="text-[10px] uppercase tracking-[0.12em] text-ivory/30 font-body mb-3">
                  Lo que querías cambiar
                </p>
                <p className="text-sm text-ivory/50 font-body italic mb-3">
                  &ldquo;{usuario.perfilPartida.queCambiaria}&rdquo;
                </p>
                <p className="text-[10px] uppercase tracking-[0.1em] text-gold font-body">
                  Hoy, con 30 días de evidencia, ¿lo lograste?
                </p>
              </div>
            )}

            {/* Stats */}
            <div className="bg-graphite rounded-2xl p-5 border border-gold/15">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Días cumplidos', valor: usuario.totalDias },
                  { label: 'Mejor racha', valor: `${usuario.mejorRacha} días` },
                  { label: 'Nivel de confianza', valor: `${usuario.nivelConfianza}/7` },
                  { label: 'Autoeficacia inicio', valor: `${usuario.perfilPartida?.autoeficaciaInicial || '—'}/10` },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-[10px] uppercase tracking-[0.08em] text-ivory/25 font-body mb-0.5">{s.label}</p>
                    <p className="text-xl font-body font-semibold text-gold">{s.valor}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setParte(3)}
            className="mt-6 w-full py-4 rounded-2xl bg-obsidian border border-gold text-gold font-body font-semibold text-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2 active:scale-[0.97]"
          >
            Siguiente
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ===== PARTE 3: Carta al yo pasado ===== */}
      {parte === 3 && (
        <div className="flex-1 flex flex-col px-6 pt-8 pb-6 relative z-10">
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold font-body mb-3">
            Día 30 — Carta
          </p>
          <h2 className="font-display italic text-2xl text-ivory mb-2">
            Escríbele a quien eras
          </h2>
          <p className="text-sm text-ivory/40 font-body leading-relaxed mb-6">
            Escríbele a la persona que eras hace 30 días. ¿Qué le dirías?
          </p>

          <textarea
            value={cartaActual}
            onChange={(e) => setCartaActual(e.target.value)}
            placeholder="Hace 30 días, yo no creía que llegarías hasta aquí. Pero lo hiciste..."
            rows={8}
            className="textarea-field flex-1 text-sm leading-relaxed mb-6"
          />

          <button
            onClick={() => setParte(4)}
            disabled={cartaActual.trim().length < 10}
            className={`w-full py-4 rounded-2xl font-body font-semibold text-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2 active:scale-[0.97] ${
              cartaActual.trim().length >= 10
                ? 'bg-gold text-obsidian'
                : 'bg-obsidian border border-smoke text-smoke cursor-not-allowed'
            }`}
          >
            Ver mi certificado
            <Trophy className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ===== PARTE 4: Certificado ===== */}
      {parte === 4 && (
        <div className="flex-1 flex flex-col items-center px-6 pt-10 pb-8 relative z-10 text-center">
          <div
            className="w-full bg-graphite rounded-3xl border border-gold/30 p-8 mb-8 relative overflow-hidden"
            style={{ boxShadow: '0 0 60px rgba(200, 164, 78, 0.12)' }}
          >
            {/* Decoración de bordes */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold/40 rounded-tl-xl" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold/40 rounded-tr-xl" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold/40 rounded-bl-xl" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold/40 rounded-br-xl" />

            {/* Glow central */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(200, 164, 78, 0.08) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10">
              <Trophy className="w-12 h-12 text-gold mx-auto mb-4" />

              <p className="text-[10px] tracking-[0.3em] uppercase text-gold/50 font-body mb-4">
                Certificado de Transformación
              </p>

              <p className="font-display italic text-4xl text-gold mb-2">
                30 Días
              </p>
              <p className="font-display italic text-lg text-ivory/80 mb-6">
                Método Cadena Imparable
              </p>

              <div className="w-24 h-[1px] bg-gold/30 mx-auto mb-6" />

              <p className="text-base font-body font-semibold text-ivory mb-1">
                {usuario.nombre}
              </p>
              <p className="text-xs text-ivory/30 font-body">
                completó el programa del
              </p>
              <p className="text-xs text-gold/60 font-body mt-1">
                {formatFecha(fechaInicio)} al {formatFecha(fechaFin)}
              </p>

              <div className="w-24 h-[1px] bg-gold/20 mx-auto mt-6 mb-4" />

              <p className="text-[9px] tracking-[0.25em] uppercase text-ivory/20 font-body">
                La Última Vez Que Empiezas De Cero
              </p>
            </div>
          </div>

          <div className="space-y-3 w-full mb-6">
            <IllustracionMontana className="w-full opacity-25 mb-2 rounded-xl" />
            <DecoradorLinea color="#C8A44E" className="opacity-40 mb-3" />
            <p className="font-display italic text-lg text-ivory">
              Ya no empiezas de cero.
            </p>
            <p className="text-sm text-ivory/40 font-body leading-relaxed max-w-[280px] mx-auto">
              Cada día que cumpliste es evidencia permanente de quién te estás convirtiendo.
            </p>
          </div>

          <button
            onClick={onComplete}
            className="w-full py-4 rounded-2xl bg-gold text-obsidian font-body font-bold text-sm tracking-[0.12em] uppercase flex items-center justify-center gap-2 active:scale-[0.97]"
            style={{ boxShadow: '0 0 30px rgba(200, 164, 78, 0.3)' }}
          >
            <Check className="w-4 h-4" />
            ¡Lo logré!
          </button>
        </div>
      )}
    </div>
  );
}
