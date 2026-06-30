'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ArrowRight, Check, Flame } from 'lucide-react';
import { db, guardarUsuario } from '@/lib/db';

interface Props {
  onComplete: () => void;
  onCerrar: () => void;
}

type Parte = 'intro' | 1 | 2 | 3 | 4 | 5;

export default function ReinicioMental({ onComplete, onCerrar }: Props) {
  const [parte, setParte] = useState<Parte>('intro');
  const [escritura, setEscritura] = useState('');
  const [etiquetas, setEtiquetas] = useState(['', '', '', '', '']);
  const [nuevasEtiquetas, setNuevasEtiquetas] = useState(['', '', '', '', '']);
  const [quemando, setQuemando] = useState(false);
  const [quemadoCompleto, setQuemadoCompleto] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const wordCount = escritura.trim().split(/\s+/).filter(Boolean).length;
  const etiquetasActivas = etiquetas.filter((e) => e.trim().length > 0);

  const iniciarQuema = () => {
    setQuemando(true);
    setTimeout(() => setQuemadoCompleto(true), 3500);
  };

  const guardar = async () => {
    setGuardando(true);
    const etiquetasViejas = etiquetasActivas;
    const etiquetasNuevasLimpias = nuevasEtiquetas.filter((_, i) => etiquetasActivas[i]);

    await db.reiniciosMentales.add({
      fecha: new Date().toISOString().split('T')[0],
      escrituraCatartica: escritura,
      etiquetasViejas,
      etiquetasNuevas: etiquetasNuevasLimpias,
    });

    // Guardar etiquetas nuevas en el perfil del usuario
    await guardarUsuario({
      etiquetasNuevas: etiquetasNuevasLimpias.filter(Boolean),
      reinicioMentalCompleto: true,
    });

    setGuardando(false);
    setParte(5);
  };

  const irAtras = () => {
    if (parte === 'intro') onCerrar();
    else if (parte === 1) setParte('intro');
    else if (typeof parte === 'number') setParte((parte - 1) as Parte);
  };

  const parteNumero = typeof parte === 'number' ? parte : 0;

  return (
    <div className="min-h-screen bg-obsidian flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-smoke/20">
        <button
          onClick={irAtras}
          className="w-9 h-9 rounded-xl bg-graphite/60 flex items-center justify-center active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 text-ivory/60" />
        </button>
        <div className="text-center">
          <p className="text-[11px] tracking-[0.15em] uppercase text-emerald-dark font-body font-semibold">
            Reinicio Mental
          </p>
          {parteNumero > 0 && parteNumero < 5 && (
            <div className="flex gap-1.5 mt-1.5 justify-center">
              {[1, 2, 3, 4].map((p) => (
                <div
                  key={p}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    parteNumero === p
                      ? 'w-6 bg-emerald-dark'
                      : parteNumero > p
                      ? 'w-3 bg-emerald-dark/40'
                      : 'w-3 bg-smoke'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        <div className="w-9" />
      </header>

      {/* ===== INTRO ===== */}
      {parte === 'intro' && (
        <div className="flex-1 flex flex-col px-6 pt-8 pb-6">
          <p className="text-[11px] tracking-[0.2em] uppercase text-emerald-dark font-body mb-4">
            Bono 3: Reinicio Mental
          </p>
          <h1 className="font-display italic text-3xl text-ivory mb-4">
            Quema de Culpa
          </h1>
          <div className="w-10 h-[1px] bg-emerald-dark/40 mb-6" />

          <div className="relative bg-graphite/40 rounded-r-2xl p-5 border-l-2 border-emerald-dark mb-8">
            <p className="text-sm text-ivory/60 font-body leading-relaxed">
              Antes de poder construir una nueva identidad, necesitas soltar la vieja.
              No la persona que eras — sino la{' '}
              <em className="text-ivory">CULPA</em> por haber sido esa persona.
              <br /><br />
              Los fracasos pasados no son sentencias. Son borradores.
              <br /><br />
              <strong className="text-ivory">Y hoy los vas a soltar.</strong>
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              'Escritura catártica',
              'Identificar etiquetas negativas',
              'La Quema',
              'Reescritura de identidad',
            ].map((label, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[11px] text-emerald-dark/50 font-body font-semibold w-4 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-ivory/50 font-body">{label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setParte(1)}
            className="mt-auto w-full py-4 rounded-2xl bg-obsidian border border-emerald-dark text-emerald-dark font-body font-semibold text-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2 active:scale-[0.97]"
          >
            Comenzar
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ===== PARTE 1: Escritura catártica ===== */}
      {parte === 1 && (
        <div className="flex-1 flex flex-col px-6 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-6 rounded-full border border-emerald-dark flex items-center justify-center text-[10px] text-emerald-dark font-body font-bold shrink-0">
              1
            </span>
            <p className="text-[10px] uppercase tracking-[0.12em] text-ivory/40 font-body">
              El Vaciado de Cargas
            </p>
          </div>

          <p className="text-sm text-ivory/50 font-body leading-relaxed mb-5">
            Escribe todo lo que te pesa. Los intentos fallidos. Las promesas rotas. Las metas abandonadas.
            Sin filtro, sin censura.{' '}
            <em className="text-emerald-dark/70">Nadie más va a leer esto.</em>
          </p>

          <div className="relative flex-1 mb-4">
            <textarea
              value={escritura}
              onChange={(e) => setEscritura(e.target.value)}
              placeholder="Yo me perdono por..."
              className="w-full h-full min-h-[280px] bg-obsidian border border-smoke/40 rounded-xl p-5 text-sm text-ivory font-body leading-relaxed focus:outline-none focus:border-emerald-dark/40 resize-none transition-colors placeholder:text-smoke/50 placeholder:italic"
              spellCheck={false}
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-emerald-dark/30">
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
                <rect x="1" y="1" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <line x1="4" y1="4" x2="8" y2="4" stroke="currentColor" strokeWidth="1" />
                <line x1="4" y1="6" x2="8" y2="6" stroke="currentColor" strokeWidth="1" />
                <line x1="4" y1="8" x2="6" y2="8" stroke="currentColor" strokeWidth="1" />
              </svg>
              <span className="text-[9px] font-body uppercase tracking-wider">Cifrado local</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-5">
            <p className="text-[10px] text-ivory/20 font-body">
              Tiempo sugerido: 5–10 minutos
            </p>
            <p className="text-[10px] text-ivory/20 font-body">{wordCount} palabras</p>
          </div>

          <button
            onClick={() => setParte(2)}
            disabled={wordCount < 5}
            className={`w-full py-4 rounded-full font-body font-semibold text-sm tracking-[0.12em] uppercase flex items-center justify-center gap-2 active:scale-[0.97] transition-all ${
              wordCount >= 5
                ? 'bg-obsidian border border-gold text-gold'
                : 'bg-obsidian border border-smoke text-smoke cursor-not-allowed'
            }`}
          >
            Siguiente paso
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ===== PARTE 2: Etiquetas negativas ===== */}
      {parte === 2 && (
        <div className="flex-1 flex flex-col px-6 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-6 rounded-full border border-emerald-dark flex items-center justify-center text-[10px] text-emerald-dark font-body font-bold shrink-0">
              2
            </span>
            <p className="text-[10px] uppercase tracking-[0.12em] text-ivory/40 font-body">
              Etiquetas Negativas
            </p>
          </div>

          <p className="text-sm text-ivory/50 font-body leading-relaxed mb-6">
            De todo lo que escribiste, ¿qué etiquetas te has puesto a ti mismo?
          </p>

          <div className="space-y-3 flex-1">
            {etiquetas.map((etiqueta, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm text-ivory/30 font-body font-medium shrink-0">Yo soy...</span>
                <input
                  type="text"
                  value={etiqueta}
                  onChange={(e) => {
                    const nuevas = [...etiquetas];
                    nuevas[i] = e.target.value;
                    setEtiquetas(nuevas);
                  }}
                  placeholder={i === 0 ? 'inconsistente' : i === 1 ? 'flojo' : 'alguien que nunca termina...'}
                  className="flex-1 bg-transparent border-b border-smoke/40 pb-2 text-sm text-ivory font-body focus:outline-none focus:border-danger/50 placeholder:text-smoke/40 placeholder:italic transition-colors"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => setParte(3)}
            disabled={etiquetasActivas.length === 0}
            className={`mt-8 w-full py-4 rounded-full font-body font-semibold text-sm tracking-[0.12em] uppercase flex items-center justify-center gap-2 active:scale-[0.97] ${
              etiquetasActivas.length > 0
                ? 'bg-obsidian border border-gold text-gold'
                : 'bg-obsidian border border-smoke text-smoke cursor-not-allowed'
            }`}
          >
            Siguiente paso
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ===== PARTE 3: La Quema ===== */}
      {parte === 3 && (
        <div className="flex-1 flex flex-col px-6 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-5 shrink-0">
            <span className="w-6 h-6 rounded-full border border-emerald-dark flex items-center justify-center text-[10px] text-emerald-dark font-body font-bold shrink-0">
              3
            </span>
            <p className="text-[10px] uppercase tracking-[0.12em] text-ivory/40 font-body">
              La Quema
            </p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            {!quemando && !quemadoCompleto ? (
              <>
                {/* Preview del texto con máscara */}
                <div
                  className="w-full bg-graphite rounded-2xl border border-smoke/20 p-5 mb-8 relative overflow-hidden max-h-40"
                  style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
                >
                  <p className="text-sm text-ivory/50 font-body leading-relaxed">
                    {escritura}
                  </p>
                </div>

                <p className="text-sm text-ivory/40 font-body text-center leading-relaxed mb-8 max-w-[240px]">
                  Pulsa y mantén para quemar lo que escribiste.
                </p>

                {/* Botón de quema premium */}
                <button
                  onClick={iniciarQuema}
                  className="relative flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  {/* Glow base */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full"
                    style={{
                      background: 'radial-gradient(ellipse, rgba(255,154,0,0.5) 0%, transparent 70%)',
                      filter: 'blur(6px)',
                    }}
                  />
                  {/* Ícono de llama */}
                  <div
                    className="w-20 h-20 rounded-full border border-amber/20 bg-obsidian flex items-center justify-center relative z-10"
                    style={{ boxShadow: '0 0 40px rgba(255,120,0,0.2), inset 0 0 20px rgba(255,120,0,0.05)' }}
                  >
                    <Flame className="w-9 h-9 text-amber" />
                  </div>
                  <span className="text-[10px] text-amber/60 font-body uppercase tracking-[0.15em] relative z-10">
                    Quemar
                  </span>
                </button>
              </>
            ) : quemando && !quemadoCompleto ? (
              <div className="flex flex-col items-center gap-4 w-full">
                {/* Tarjeta con texto que se quema */}
                <div className="relative w-full max-w-[280px]">
                  {/* Texto quemándose */}
                  <div className="bg-graphite rounded-2xl border border-smoke/20 p-5 relative overflow-hidden">
                    <p className="text-sm font-body leading-relaxed animate-text-burn text-ivory/70">
                      {escritura.slice(0, 120)}{escritura.length > 120 ? '...' : ''}
                    </p>
                  </div>

                  {/* FUEGO PREMIUM multicapa */}
                  <div className="fire-container w-full h-40 mt-1 pointer-events-none overflow-visible">
                    {/* Capa exterior */}
                    <div className="fire-flame fire-flame--outer" />
                    {/* Capa media */}
                    <div className="fire-flame fire-flame--mid" />
                    {/* Núcleo brillante */}
                    <div className="fire-flame fire-flame--core" />
                    {/* Glow base caliente */}
                    <div className="fire-glow-base" />

                    {/* Partículas de brasa */}
                    {[
                      { left: '35%', delay: '0s',   dur: '1.8s', size: '3px', color: '#ff9a00' },
                      { left: '55%', delay: '0.4s',  dur: '2.1s', size: '2px', color: '#ffd97d' },
                      { left: '45%', delay: '0.8s',  dur: '1.6s', size: '4px', color: '#ff4500' },
                      { left: '40%', delay: '1.1s',  dur: '2.3s', size: '2px', color: '#ff9a00' },
                      { left: '60%', delay: '1.5s',  dur: '1.9s', size: '3px', color: '#ffd97d' },
                      { left: '50%', delay: '0.2s',  dur: '2.5s', size: '2px', color: '#ff4500' },
                    ].map((p, i) => (
                      <div
                        key={i}
                        className="fire-ember"
                        style={{
                          left: p.left,
                          bottom: '8px',
                          width: p.size,
                          height: p.size,
                          background: p.color,
                          boxShadow: `0 0 4px ${p.color}`,
                          animationDelay: p.delay,
                          animationDuration: p.dur,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <p className="font-display italic text-base text-amber/70 text-center mt-2">
                  Ardiendo...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6 text-center">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center border-2 border-emerald-dark/30 animate-scaleIn"
                  style={{ boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)' }}
                >
                  <span className="text-4xl">✨</span>
                </div>
                <div>
                  <p className="font-display italic text-xl text-ivory mb-3">
                    Lo que fue, ya no es.
                  </p>
                  <p className="text-sm text-ivory/40 font-body leading-relaxed max-w-[240px]">
                    Lo que escribiste ya no te define.
                    <br />Ahora viene la parte más poderosa.
                  </p>
                </div>
                <button
                  onClick={() => setParte(4)}
                  className="w-full max-w-[280px] py-4 rounded-2xl bg-obsidian border border-emerald-dark text-emerald-dark font-body font-semibold text-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2 active:scale-[0.97]"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== PARTE 4: Reescritura ===== */}
      {parte === 4 && (
        <div className="flex-1 flex flex-col px-6 pt-8 pb-6 overflow-y-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-6 rounded-full border border-emerald-dark flex items-center justify-center text-[10px] text-emerald-dark font-body font-bold shrink-0">
              4
            </span>
            <p className="text-[10px] uppercase tracking-[0.12em] text-ivory/40 font-body">
              Reescritura de Identidad
            </p>
          </div>

          <p className="text-sm text-ivory/50 font-body leading-relaxed mb-6">
            Para cada etiqueta vieja, escribe quién eres AHORA.
          </p>

          <div className="space-y-5 flex-1 mb-6">
            {etiquetasActivas.map((etiqueta, i) => (
              <div key={i} className="bg-graphite rounded-2xl p-4 border border-smoke/20">
                {/* Etiqueta vieja */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-danger/40 font-body line-through">
                    Yo soy {etiqueta}
                  </span>
                </div>
                {/* Nueva */}
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-emerald-dark/70 font-body shrink-0">Ahora soy...</span>
                  <input
                    type="text"
                    value={nuevasEtiquetas[i]}
                    onChange={(e) => {
                      const nuevas = [...nuevasEtiquetas];
                      nuevas[i] = e.target.value;
                      setNuevasEtiquetas(nuevas);
                    }}
                    placeholder="alguien que está aprendiendo a cumplir"
                    className="flex-1 bg-transparent border-b border-emerald-dark/20 pb-1 text-sm text-ivory font-body focus:outline-none focus:border-emerald-dark/60 placeholder:text-smoke/40 placeholder:italic transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={guardar}
            disabled={nuevasEtiquetas.filter((_, i) => etiquetasActivas[i]).some((e) => !e.trim()) || guardando}
            className={`w-full py-4 rounded-2xl font-body font-semibold text-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2 active:scale-[0.97] ${
              !nuevasEtiquetas.filter((_, i) => etiquetasActivas[i]).some((e) => !e.trim()) && !guardando
                ? 'bg-emerald-dark text-ivory'
                : 'bg-obsidian border border-smoke text-smoke cursor-not-allowed'
            }`}
          >
            {guardando ? (
              <span className="w-4 h-4 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />
            ) : (
              <>
                <Check className="w-4 h-4" />
                Completar reinicio
              </>
            )}
          </button>
        </div>
      )}

      {/* ===== PARTE 5: Cierre ===== */}
      {parte === 5 && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-6 text-center">
          <div
            className="w-28 h-28 rounded-full border-4 border-emerald-dark/30 flex items-center justify-center mb-8"
            style={{ boxShadow: '0 0 50px rgba(16, 185, 129, 0.15)' }}
          >
            <span className="text-5xl">🌱</span>
          </div>

          <p className="text-[11px] tracking-[0.2em] uppercase text-emerald-dark font-body mb-4">
            Reinicio completado
          </p>
          <h2 className="font-display italic text-2xl text-ivory mb-4">
            Acabas de perdonarte.
          </h2>
          <p className="text-sm text-ivory/40 font-body max-w-[280px] leading-relaxed mb-10">
            No para justificar el pasado. Para liberar el futuro.
            <br /><br />
            Eso es algo que la mayoría nunca se atreve a hacer.
          </p>

          <button
            onClick={onComplete}
            className="w-full max-w-[280px] py-4 rounded-2xl bg-emerald-dark text-ivory font-body font-semibold text-sm tracking-[0.12em] uppercase active:scale-[0.97]"
          >
            Volver al inicio
          </button>
        </div>
      )}
    </div>
  );
}
