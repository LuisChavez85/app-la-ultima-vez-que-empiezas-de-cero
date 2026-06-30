'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Trash2, Sparkles, ChevronRight } from 'lucide-react';
import { IllustracionEspiral, DecoradorLinea } from '@/components/ui/Illustrations';
import { db, getUsuario, ritualCompletadoHoy } from '@/lib/db';
import { frasesCelebracion } from '@/data/constantes';
import { confettiMicro, confettiEpico } from '@/lib/confetti';
import { haptic } from '@/lib/haptic';
import type { RecetaHabito } from '@/types';

const ANCLAS_SUGERIDAS = [
  'Servir mi café',
  'Lavarme los dientes',
  'Sentarme en mi escritorio',
  'Despertar',
  'Almorzar',
  'Acostarme',
];

const MICROHABITOS_SUGERIDOS = [
  'Escribir 1 oración de mi meta',
  'Hacer 2 sentadillas',
  'Leer 1 página',
  'Respirar profundo 3 veces',
  'Revisar mis metas del día',
  'Escribir 1 gratitud',
];

interface ChecklistItem {
  id: string;
  label: string;
  completado: boolean;
  color: string;
}

function Celebracion({ frase, onCerrar }: { frase: string; onCerrar: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/80 backdrop-blur-sm"
      onClick={onCerrar}
    >
      <div className="text-center px-8 animate-bounce-once">
        <div className="text-6xl mb-4">✨</div>
        <p className="font-display italic text-2xl text-ivory mb-2">{frase}</p>
        <p className="text-sm text-ivory/40 font-body">Toca para continuar</p>
      </div>
    </div>
  );
}

export default function Microvictorias() {
  const [recetas, setRecetas] = useState<RecetaHabito[]>([]);
  const [creandoReceta, setCreandoReceta] = useState(false);
  const [ancla, setAncla] = useState('');
  const [anclaPersonalizada, setAnclaPersonalizada] = useState('');
  const [microhabito, setMicrohabito] = useState('');
  const [microhabitoPersonalizado, setMicrohabitoPersonalizado] = useState('');
  const [celebracion, setCelebracion] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [cargando, setCargando] = useState(true);
  const [totalCompletadas, setTotalCompletadas] = useState(0);
  const [mostrando5de5, setMostrando5de5] = useState(false);

  const cargarDatos = useCallback(async () => {
    const [rs, ritualHecho, usuario] = await Promise.all([
      db.recetasHabito.toArray(),
      ritualCompletadoHoy(),
      getUsuario(),
    ]);

    // Resetear recetas cuya fecha de completado no sea hoy
    const hoy = new Date().toISOString().split('T')[0];
    const recetasActualizadas = rs.map((r) => ({
      ...r,
      completadaHoy: r.ultimaFechaCompletada === hoy ? r.completadaHoy : false,
    }));

    setRecetas(recetasActualizadas);

    // Checklist diario
    const diaDelPrograma = Math.min((usuario?.rachaActual || 0) + 1, 30);
    const leccionLeida = false; // simplificado — no tenemos estado global todavía

    const items: ChecklistItem[] = [
      { id: 'ritual', label: 'Completar el ritual del día', completado: ritualHecho, color: 'text-emerald' },
      {
        id: 'receta',
        label: 'Completar 1 receta de hábito',
        completado: recetasActualizadas.some((r) => r.completadaHoy),
        color: 'text-cyan',
      },
      {
        id: 'leccion',
        label: 'Leer la micro-lección del día',
        completado: leccionLeida,
        color: 'text-gold',
      },
      {
        id: 'gratitud',
        label: 'Registrar 1 gratitud',
        completado: false,
        color: 'text-rose',
      },
      {
        id: 'microaccion',
        label: 'Mi micro-acción personalizada',
        completado: false,
        color: 'text-purple',
      },
    ];

    setChecklist(items);
    setTotalCompletadas(items.filter((i) => i.completado).length);
    setCargando(false);
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const completarReceta = async (receta: RecetaHabito) => {
    if (!receta.id || receta.completadaHoy) return;
    const hoy = new Date().toISOString().split('T')[0];
    await db.recetasHabito.update(receta.id, {
      completadaHoy: true,
      ultimaFechaCompletada: hoy,
      vecesCompletada: (receta.vecesCompletada || 0) + 1,
    });

    const frase = frasesCelebracion[Math.floor(Math.random() * frasesCelebracion.length)];
    haptic.success();
    confettiMicro('#06B6D4');
    setCelebracion(frase);
    await cargarDatos();
  };

  const eliminarReceta = async (id: number) => {
    await db.recetasHabito.delete(id);
    await cargarDatos();
  };

  const toggleChecklist = (id: string) => {
    setChecklist((prev) => {
      const nuevos = prev.map((item) =>
        item.id === id ? { ...item, completado: !item.completado } : item
      );
      const total = nuevos.filter((i) => i.completado).length;
      setTotalCompletadas(total);
      if (total === 5) {
        setMostrando5de5(true);
        haptic.celebrar();
        confettiEpico();
      }
      return nuevos;
    });
  };

  const guardarReceta = async () => {
    const anclaFinal = ancla || anclaPersonalizada;
    const microhabitoFinal = microhabito || microhabitoPersonalizado;
    if (!anclaFinal.trim() || !microhabitoFinal.trim()) return;

    await db.recetasHabito.add({
      ancla: anclaFinal,
      microHabito: microhabitoFinal,
      activa: true,
      vecesCompletada: 0,
      completadaHoy: false,
    });

    setAncla('');
    setAnclaPersonalizada('');
    setMicrohabito('');
    setMicrohabitoPersonalizado('');
    setCreandoReceta(false);
    await cargarDatos();
  };

  const porcentajeChecklist = Math.round((totalCompletadas / 5) * 100);

  if (cargando) {
    return (
      <div className="main-container flex items-center justify-center min-h-screen">
        <div className="w-5 h-5 border-2 border-cyan/30 border-t-cyan rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="main-container pb-28">
      {/* Celebración overlay */}
      {celebracion && (
        <Celebracion frase={celebracion} onCerrar={() => setCelebracion(null)} />
      )}

      {/* 5/5 especial */}
      {mostrando5de5 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/90 backdrop-blur-sm"
          onClick={() => setMostrando5de5(false)}
        >
          <div className="text-center px-8">
            <div className="text-5xl mb-4">🏆</div>
            <p className="font-display italic text-3xl text-cyan mb-2">¡5/5 Microvictorias!</p>
            <p className="text-base text-ivory/60 font-body max-w-[260px] mx-auto leading-relaxed">
              Tu cerebro acaba de recibir la señal más poderosa posible. Día perfecto.
            </p>
            <p className="text-sm text-ivory/30 font-body mt-6">Toca para continuar</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-[11px] tracking-[0.18em] uppercase text-cyan font-body mb-1">
          Identidad Reforzada
        </p>
        <h1 className="font-display italic text-2xl text-ivory mb-2">
          Sistema de Microvictorias Diarias
        </h1>
        <p className="text-sm text-ivory/40 font-body leading-relaxed max-w-[280px] mx-auto">
          Tu cerebro no distingue entre una victoria grande y una pequeña. Lo que registra es: cumplí.
        </p>
      </div>

      {/* Checklist diario */}
      <div className="bg-graphite rounded-2xl border border-smoke/20 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-ivory/30 font-body mb-0.5">
              Progreso diario
            </p>
            <p className="text-sm font-body font-semibold text-ivory">
              {totalCompletadas}/5 Microvictorias
            </p>
          </div>
          <div className="flex items-center gap-2">
            {totalCompletadas === 5 && <span className="text-xl">🏆</span>}
            <p className="font-display italic text-2xl" style={{ color: totalCompletadas === 5 ? '#06B6D4' : undefined }}>
              {porcentajeChecklist}%
            </p>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="w-full h-1.5 bg-smoke rounded-full overflow-hidden mb-4">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${porcentajeChecklist}%`,
              background: totalCompletadas === 5 ? '#06B6D4' : 'rgba(6,182,212,0.6)',
            }}
          />
        </div>

        {/* Items */}
        <div className="space-y-2.5">
          {checklist.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleChecklist(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all active:scale-[0.98] text-left ${
                item.completado
                  ? 'border-smoke/20 bg-obsidian/50'
                  : 'border-smoke/20 hover:border-smoke/40'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  item.completado ? 'border-current bg-current' : 'border-smoke/50'
                } ${item.color}`}
              >
                {item.completado && <Check className="w-2.5 h-2.5 text-obsidian" strokeWidth={3} />}
              </div>
              <span
                className={`text-sm font-body transition-all ${
                  item.completado ? 'text-ivory/30 line-through' : 'text-ivory/70'
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recetas de hábitos */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-ivory/30 font-body mb-0.5">
              Tiny Recipe Builder
            </p>
            <h2 className="font-display italic text-base text-ivory">Mis Recetas</h2>
          </div>
          {recetas.length < 5 && (
            <button
              onClick={() => setCreandoReceta(!creandoReceta)}
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-cyan font-body border border-cyan/25 px-2.5 py-1.5 rounded-lg active:scale-95"
            >
              <Plus className="w-3 h-3" />
              Nueva
            </button>
          )}
        </div>

        {/* Constructor de receta */}
        {creandoReceta && (
          <div className="bg-graphite rounded-2xl border border-cyan/20 p-5 mb-4">
            <p className="font-display italic text-base text-cyan mb-5">
              Después de... haré...
            </p>

            {/* Ancla */}
            <div className="mb-4">
              <p className="text-[10px] uppercase tracking-[0.12em] text-ivory/30 font-body mb-2">
                Ancla (hábito que ya tienes)
              </p>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {ANCLAS_SUGERIDAS.map((a) => (
                  <button
                    key={a}
                    onClick={() => { setAncla(a); setAnclaPersonalizada(''); }}
                    className={`px-3 py-2 rounded-lg border text-xs font-body text-left transition-all active:scale-95 ${
                      ancla === a
                        ? 'border-cyan/50 bg-cyan/5 text-ivory'
                        : 'border-smoke/30 text-ivory/40'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={anclaPersonalizada}
                onChange={(e) => { setAnclaPersonalizada(e.target.value); setAncla(''); }}
                placeholder="O escribe tu propia ancla..."
                className="input-field text-sm"
              />
            </div>

            {/* Micro-hábito */}
            <div className="mb-5">
              <p className="text-[10px] uppercase tracking-[0.12em] text-ivory/30 font-body mb-2">
                Micro-hábito (acción mínima)
              </p>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {MICROHABITOS_SUGERIDOS.map((m) => (
                  <button
                    key={m}
                    onClick={() => { setMicrohabito(m); setMicrohabitoPersonalizado(''); }}
                    className={`px-3 py-2 rounded-lg border text-xs font-body text-left transition-all active:scale-95 ${
                      microhabito === m
                        ? 'border-cyan/50 bg-cyan/5 text-ivory'
                        : 'border-smoke/30 text-ivory/40'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={microhabitoPersonalizado}
                onChange={(e) => { setMicrohabitoPersonalizado(e.target.value); setMicrohabito(''); }}
                placeholder="O escribe tu micro-hábito..."
                className="input-field text-sm"
              />
            </div>

            {/* Preview */}
            {(ancla || anclaPersonalizada) && (microhabito || microhabitoPersonalizado) && (
              <div className="bg-obsidian rounded-xl p-4 border border-cyan/15 mb-4">
                <p className="text-xs text-ivory/40 font-body mb-1">Tu receta:</p>
                <p className="font-display italic text-sm text-ivory leading-relaxed">
                  &ldquo;Después de <span className="text-cyan">{ancla || anclaPersonalizada}</span>,
                  haré <span className="text-cyan">{microhabito || microhabitoPersonalizado}</span>&rdquo;
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setCreandoReceta(false)}
                className="flex-1 py-3 rounded-xl border border-smoke/30 text-ivory/40 text-sm font-body active:scale-95"
              >
                Cancelar
              </button>
              <button
                onClick={guardarReceta}
                disabled={!(ancla || anclaPersonalizada) || !(microhabito || microhabitoPersonalizado)}
                className={`flex-1 py-3 rounded-xl text-sm font-body font-semibold active:scale-95 transition-all ${
                  (ancla || anclaPersonalizada) && (microhabito || microhabitoPersonalizado)
                    ? 'bg-cyan text-obsidian'
                    : 'bg-smoke/20 text-smoke cursor-not-allowed'
                }`}
              >
                Guardar
              </button>
            </div>
          </div>
        )}

        {/* Lista de recetas */}
        {recetas.length === 0 && !creandoReceta ? (
          <div className="bg-graphite/50 rounded-2xl border border-dashed border-smoke/30 p-8 text-center">
            <Sparkles className="w-8 h-8 text-cyan/30 mx-auto mb-3" />
            <p className="text-sm text-ivory/30 font-body leading-relaxed">
              Crea tu primera receta de hábito.<br />Máximo 5 recetas activas.
            </p>
            <button
              onClick={() => setCreandoReceta(true)}
              className="mt-4 flex items-center gap-2 mx-auto text-cyan font-body text-sm border border-cyan/25 px-4 py-2 rounded-xl active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              Crear primera receta
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {recetas.map((receta) => (
              <div
                key={receta.id}
                className={`bg-graphite rounded-2xl border transition-all ${
                  receta.completadaHoy ? 'border-cyan/20 opacity-60' : 'border-smoke/20'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <p className="text-xs text-ivory/30 font-body mb-1">Después de</p>
                      <p className="text-sm font-body font-medium text-ivory">{receta.ancla}</p>
                      <p className="text-xs text-ivory/30 font-body mt-1.5">haré</p>
                      <p className="text-sm font-body text-ivory/80">{receta.microHabito}</p>
                    </div>
                    <button
                      onClick={() => receta.id && eliminarReceta(receta.id)}
                      className="w-7 h-7 rounded-lg bg-obsidian flex items-center justify-center shrink-0 active:scale-95 opacity-30 hover:opacity-70"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-ivory/60" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-ivory/25 font-body">
                      Completada {receta.vecesCompletada}x
                    </p>
                    <button
                      onClick={() => completarReceta(receta)}
                      disabled={receta.completadaHoy}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-body uppercase tracking-[0.1em] transition-all active:scale-95 ${
                        receta.completadaHoy
                          ? 'bg-cyan/10 text-cyan/50 cursor-not-allowed'
                          : 'bg-cyan/10 border border-cyan/30 text-cyan'
                      }`}
                    >
                      {receta.completadaHoy ? (
                        <><Check className="w-3 h-3" /> Hecha</>
                      ) : (
                        <><ChevronRight className="w-3 h-3" /> Completar</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Nota inspiracional con espiral */}
      <div className="bg-graphite/40 rounded-2xl p-5 border border-cyan/10 flex items-center gap-4">
        <IllustracionEspiral className="w-14 h-14 shrink-0 opacity-80" />
        <div>
          <DecoradorLinea color="#06B6D4" className="mb-2 opacity-50" />
          <p className="font-display italic text-sm text-cyan/70 leading-relaxed">
            &ldquo;La celebración inmediata es el fertilizante del hábito.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
