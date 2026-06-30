'use client';

import { useState, useEffect } from 'react';
import { LifeBuoy, Shield, Award, Target, Zap, BookOpen, TrendingUp } from 'lucide-react';
import { getEstadisticasEvidencia, getUsuario } from '@/lib/db';
import { nivelesConfianza } from '@/data/constantes';
import type { Usuario } from '@/types';

export default function TableroeEvidencia() {
  const [stats, setStats] = useState<Awaited<ReturnType<typeof getEstadisticasEvidencia>> | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargar() {
      const [s, u] = await Promise.all([getEstadisticasEvidencia(), getUsuario()]);
      setStats(s);
      setUsuario(u || null);
      setCargando(false);
    }
    cargar();
  }, []);

  if (cargando) {
    return (
      <div className="main-container flex items-center justify-center min-h-screen">
        <div className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!stats) return null;

  const nivelConfianza = nivelesConfianza.find((n) => n.id === stats.nivelConfianza) || nivelesConfianza[0];
  const porcentajeMeta = Math.min(Math.round((stats.rachaActual / 30) * 100), 100);

  const tarjetasEvidencia = [
    { label: 'Días completados', valor: stats.totalDias, color: 'text-ivory', icon: Shield, acento: 'border-gold/15' },
    { label: 'Metas escritas', valor: stats.totalMetas, color: 'text-ivory', icon: Target, acento: 'border-smoke/30' },
    { label: 'Micro-acciones', valor: stats.totalMicroAcciones, color: 'text-ivory', icon: Zap, acento: 'border-smoke/30' },
    { label: 'Declaraciones', valor: stats.totalDeclaraciones, color: 'text-ivory', icon: BookOpen, acento: 'border-smoke/30' },
  ];

  return (
    <div className="main-container pb-28">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-[11px] tracking-[0.18em] uppercase text-gold font-body mb-1">
          Tus acciones
        </p>
        <h1 className="font-display italic text-3xl text-ivory mb-2">
          Tablero de Evidencia
        </h1>
        <p className="text-sm text-ivory/40 font-body">
          Tus acciones hablan más fuerte que tus dudas.
        </p>
      </div>

      {/* Hero — mejor racha */}
      <div
        className="relative bg-graphite rounded-2xl overflow-hidden border border-smoke/30 mb-6"
        style={{ boxShadow: '0 0 30px rgba(200, 164, 78, 0.08)' }}
      >
        <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gold" />
        <div className="p-6 text-center">
          <p className="text-[10px] tracking-[0.18em] uppercase text-gold font-body mb-3">
            Tu mayor logro hasta ahora
          </p>
          <p className="font-display italic text-3xl text-ivory mb-3">
            {stats.mejorRacha} días de racha
          </p>
          <div className="flex justify-center gap-2">
            {Array.from({ length: Math.min(stats.mejorRacha, 5) }).map((_, i) => (
              <span key={i} className="text-lg">🔗</span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats grid 2x2 */}
      <div className="grid grid-cols-2 gap-2.5 mb-2.5">
        {tarjetasEvidencia.map((t) => (
          <div
            key={t.label}
            className={`bg-graphite rounded-2xl p-4 border ${t.acento} flex flex-col justify-between h-28`}
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] tracking-[0.1em] uppercase text-ivory/30 font-body">
                {t.label}
              </p>
              <t.icon className="w-3.5 h-3.5 text-ivory/15" />
            </div>
            <p className={`text-3xl font-body font-semibold ${t.color}`}>
              {t.valor}
            </p>
          </div>
        ))}
      </div>

      {/* Rescates — col-span-2 con acento ámbar */}
      <div className="bg-graphite rounded-2xl p-4 border-l-4 border-l-amber border border-smoke/20 flex items-center justify-between mb-2.5 h-20">
        <div>
          <p className="text-[10px] tracking-[0.1em] uppercase text-ivory/30 font-body mb-1 flex items-center gap-1.5">
            <LifeBuoy className="w-3 h-3 text-amber" />
            Rescates exitosos
          </p>
          <p className="text-3xl font-body font-semibold text-amber">{stats.totalRescates}</p>
        </div>
        <p className="text-xs text-ivory/20 font-body max-w-[100px] text-right leading-tight">
          Cada rescate es evidencia de que volviste.
        </p>
      </div>

      {/* Nivel de confianza */}
      <div className="bg-graphite rounded-2xl p-4 border border-smoke/20 mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] tracking-[0.1em] uppercase text-ivory/30 font-body flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3 text-emerald" />
            Nivel de confianza
          </p>
          <p className="font-display italic text-emerald text-sm">{nivelConfianza.emoji} {nivelConfianza.nombre}</p>
        </div>
        <div className="w-full h-1.5 bg-smoke rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald rounded-full transition-all duration-700"
            style={{ width: `${porcentajeMeta}%` }}
          />
        </div>
        <p className="text-[10px] text-ivory/20 font-body mt-2">{porcentajeMeta}% hacia los 30 días</p>
      </div>

      {/* Perfil de partida vs hoy */}
      {usuario?.perfilPartida && (
        <div className="bg-graphite rounded-2xl p-5 border border-smoke/20 mb-6">
          <h2 className="text-[11px] tracking-[0.12em] uppercase text-ivory/40 font-body mb-4 border-b border-smoke/20 pb-3">
            Perfil de partida vs. Hoy
          </h2>
          <div className="flex items-stretch justify-between gap-3">
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-[0.1em] text-ivory/30 font-body mb-2">Al inicio</p>
              <p className="text-xs text-ivory/50 font-body">
                Autoeficacia: <span className="text-ivory">{usuario.perfilPartida.autoeficaciaInicial}/10</span>
              </p>
              <p className="text-xs text-ivory/50 font-body mt-1">
                Área: <span className="text-ivory">{usuario.perfilPartida.areaSufrida}</span>
              </p>
            </div>
            <div className="w-[1px] bg-smoke/30 mx-1" />
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-[0.1em] text-gold font-body mb-2">Hoy</p>
              <p className="text-xs text-ivory/50 font-body">
                Racha: <span className="text-gold">{stats.rachaActual} días</span>
              </p>
              <p className="text-xs text-ivory/50 font-body mt-1">
                Nivel: <span className="text-gold">{nivelConfianza.nombre}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Logro compartible si racha > 0 */}
      {stats.rachaActual >= 7 && (
        <div
          className="bg-graphite rounded-2xl p-5 border border-gold/20 text-center"
          style={{ boxShadow: '0 0 20px rgba(200, 164, 78, 0.06)' }}
        >
          <Award className="w-8 h-8 text-gold mx-auto mb-2" />
          <p className="font-display italic text-xl text-gold mb-1">
            {stats.rachaActual >= 30 ? '¡30 días completados!' :
             stats.rachaActual >= 21 ? '¡21 días! El hábito se cablea.' :
             stats.rachaActual >= 15 ? '¡15 días de cadena imparable!' :
             '¡7 días sin empezar de cero!'}
          </p>
          <p className="text-xs text-ivory/30 font-body">Hito desbloqueado</p>
        </div>
      )}
    </div>
  );
}
