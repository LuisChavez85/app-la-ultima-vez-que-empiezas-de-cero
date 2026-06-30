'use client';

import { useState, useEffect } from 'react';
import { Link2, User } from 'lucide-react';
import { db } from '@/lib/db';
import { nivelesConfianza } from '@/data/constantes';
import { IllustracionCadena } from '@/components/ui/Illustrations';
import type { Usuario, DiaCompletado, NivelConfianzaId } from '@/types';

interface Props {
  usuario: Usuario;
}

export default function CadenaImparable({ usuario }: Props) {
  const [diasCompletados, setDiasCompletados] = useState<Set<string>>(new Set());
  const [cargando, setCargando] = useState(true);
  const [detalleVisible, setDetalleVisible] = useState<number | null>(null);
  const [detalleDia, setDetalleDia] = useState<DiaCompletado | null>(null);

  const racha = usuario.rachaActual;
  const fechaInicio = new Date(usuario.fechaInicio);

  useEffect(() => {
    async function cargarDias() {
      // Obtener TODOS los días completados del programa
      const dias: DiaCompletado[] = await db.diasCompletados.toArray();
      setDiasCompletados(new Set(dias.map((d) => d.fecha)));
      setCargando(false);
    }
    cargarDias();
  }, []);

  const nivelActual = nivelesConfianza.find((n) => n.id === usuario.nivelConfianza) || nivelesConfianza[0];
  const nivelSiguiente = nivelesConfianza.find((n) => n.id === (usuario.nivelConfianza + 1) as NivelConfianzaId);
  const porcentajeMeta = Math.min(Math.round((racha / 30) * 100), 100);

  // Avatar: borroso al inicio → nítido al día 30
  const avatarBlur = Math.max(0, 16 - Math.round((racha / 30) * 16));
  const avatarOpacity = 0.3 + (racha / 30) * 0.7;

  // Generar array de 30 días del programa (fechas reales desde fechaInicio)
  const diasPrograma = Array.from({ length: 30 }, (_, i) => {
    const fecha = new Date(fechaInicio);
    fecha.setDate(fecha.getDate() + i);
    return fecha.toISOString().split('T')[0];
  });

  const hoy = new Date().toISOString().split('T')[0];

  const handleDiaClick = async (numeroDia: number, fecha: string) => {
    if (!diasCompletados.has(fecha)) return;
    if (detalleVisible === numeroDia) {
      setDetalleVisible(null);
      setDetalleDia(null);
      return;
    }
    const dia = await db.diasCompletados.where('fecha').equals(fecha).first();
    setDetalleDia(dia || null);
    setDetalleVisible(numeroDia);
  };

  return (
    <div className="main-container pb-28">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-[11px] tracking-[0.18em] uppercase text-gold font-body mb-1">
          Visualización Activa
        </p>
        <h1 className="font-display italic text-2xl text-ivory mb-2">
          Método Cadena Imparable
        </h1>
        <p className="text-sm text-ivory/40 font-body leading-relaxed max-w-[300px] mx-auto">
          Tu identidad se construye con evidencia, no con deseos.
        </p>
      </div>

      {/* Avatar evolutivo */}
      <div className="relative bg-graphite/30 rounded-3xl border border-smoke/10 py-10 flex flex-col items-center mb-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(200, 164, 78, 0.12) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 w-28 h-40 flex items-center justify-center mb-4">
          <div
            className="w-24 h-36 rounded-full flex items-center justify-center transition-all duration-1000"
            style={{
              background: `linear-gradient(to top, rgba(200, 164, 78, ${avatarOpacity * 0.6}), transparent)`,
              filter: `blur(${avatarBlur}px)`,
              opacity: avatarOpacity,
            }}
          >
            <User className="w-16 h-16" style={{ color: `rgba(200, 164, 78, ${avatarOpacity})` }} />
          </div>
        </div>
        <div className="relative z-10 text-center">
          <p className="text-[10px] tracking-[0.15em] uppercase text-ivory/30 font-body mb-1">
            Identidad actual
          </p>
          <h3 className="font-display italic text-xl text-gold">
            {nivelActual.emoji} {nivelActual.nombre}
          </h3>
          {nivelSiguiente && (
            <div className="mt-2 px-6">
              <div className="w-32 h-[2px] bg-smoke rounded-full overflow-hidden mx-auto">
                <div
                  className="h-full bg-gold rounded-full transition-all duration-700"
                  style={{ width: `${porcentajeMeta}%` }}
                />
              </div>
              <p className="text-[10px] text-ivory/20 font-body mt-1">
                {nivelSiguiente.diasRequeridos - racha > 0
                  ? `${nivelSiguiente.diasRequeridos - racha} días para "${nivelSiguiente.nombre}"`
                  : `${nivelSiguiente.nombre} desbloqueado`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[
          { label: 'Racha', valor: racha, color: 'text-gold' },
          { label: 'Mejor', valor: usuario.mejorRacha, color: 'text-ivory' },
          { label: 'Total', valor: usuario.totalDias, color: 'text-ivory' },
          { label: 'Meta', valor: `${porcentajeMeta}%`, color: 'text-purple' },
        ].map((stat) => (
          <div key={stat.label} className="bg-graphite rounded-xl p-3 border border-smoke/20 text-center">
            <p className="text-[10px] text-ivory/30 uppercase tracking-[0.08em] font-body mb-1">{stat.label}</p>
            <p className={`text-lg font-body font-semibold ${stat.color}`}>{stat.valor}</p>
          </div>
        ))}
      </div>

      {/* Cadena de 30 días — grid del programa */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3 px-1">
          <div>
            <h2 className="text-[11px] tracking-[0.12em] uppercase text-ivory/40 font-body font-semibold">
              Calendario de Identidad
            </h2>
            <p className="text-[10px] text-ivory/20 font-body mt-0.5">
              Inicio: {usuario.fechaInicio}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-purple/60" />
            <span className="text-[9px] text-ivory/30 font-body">Completado</span>
          </div>
        </div>

        <div
          className="bg-graphite rounded-2xl p-5 border border-smoke/20"
          style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.05)' }}
        >
          {cargando ? (
            <div className="h-48 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-purple/30 border-t-purple rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Cabecera Lun → Dom */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'].map((d) => (
                  <div key={d} className="text-center text-[9px] text-ivory/25 font-body font-medium">
                    {d}
                  </div>
                ))}
              </div>

              {/* Grid 7 columnas — offset desde el día de la semana correcto */}
              {(() => {
                // Offset: día de semana de fechaInicio (Lun=0 … Dom=6)
                const diaSemanaInicio = fechaInicio.getDay();
                const offset = diaSemanaInicio === 0 ? 6 : diaSemanaInicio - 1;
                // Total de celdas: offset + 30, redondeado al múltiplo de 7
                const totalCeldas = Math.ceil((offset + 30) / 7) * 7;

                return (
                  <div className="grid grid-cols-7 gap-1.5">
                    {Array.from({ length: totalCeldas }).map((_, i) => {
                      const diaIndex = i - offset; // 0-based (0 = día 1 del programa)
                      if (diaIndex < 0 || diaIndex >= 30) {
                        return <div key={i} className="aspect-square" />;
                      }
                      const numeroDia = diaIndex + 1;
                      const fecha = diasPrograma[diaIndex];
                      const completado = diasCompletados.has(fecha);
                      const esHoy = fecha === hoy;
                      const esFuturo = fecha > hoy;

                      return (
                        <button
                          key={i}
                          onClick={() => handleDiaClick(numeroDia, fecha)}
                          disabled={!completado}
                          className={`aspect-square flex flex-col items-center justify-center rounded-lg relative transition-all duration-200 ${
                            completado
                              ? 'bg-purple/15 border border-purple/40 active:scale-95'
                              : esHoy
                              ? 'border-2 border-gold/60 bg-smoke/30'
                              : esFuturo
                              ? 'border border-smoke/10'
                              : 'border border-smoke/20'
                          }`}
                          style={completado ? {
                            boxShadow: detalleVisible === numeroDia
                              ? '0 0 10px rgba(139, 92, 246, 0.45)'
                              : '0 0 5px rgba(139, 92, 246, 0.18)',
                          } : undefined}
                        >
                          {completado ? (
                            <>
                              <Link2 className="w-2.5 h-2.5 text-purple mb-0.5" />
                              <span className="text-[7px] text-purple/60 font-body">{numeroDia}</span>
                            </>
                          ) : (
                            <span className={
                              esHoy
                                ? 'text-[10px] text-gold font-body font-semibold'
                                : esFuturo
                                ? 'text-[10px] text-ivory/10 font-body'
                                : 'text-[10px] text-ivory/20 font-body'
                            }>
                              {numeroDia}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })()}

              {/* Detalle del día seleccionado */}
              {detalleVisible && detalleDia && (
                <div className="mt-4 bg-obsidian rounded-xl p-4 border border-purple/20 animate-fade-in">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-purple font-body mb-2">
                    Día {detalleVisible}
                  </p>
                  {detalleDia.metasEscritas?.length > 0 && (
                    <div className="mb-2">
                      <p className="text-[10px] text-ivory/30 font-body mb-1">Metas</p>
                      {detalleDia.metasEscritas.map((m, i) => (
                        <p key={i} className="text-xs text-ivory/60 font-body">· {m}</p>
                      ))}
                    </div>
                  )}
                  {detalleDia.microAccionElegida && (
                    <p className="text-xs text-ivory/50 font-body">
                      Micro-acción: {detalleDia.microAccionElegida}
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Ilustración cadena + frase */}
      <div className="bg-graphite/50 rounded-2xl p-5 border border-purple/10 text-center">
        <IllustracionCadena className="w-full max-w-[200px] mx-auto mb-3 opacity-70" />
        <p className="font-display italic text-sm text-purple/80 leading-relaxed">
          &ldquo;Cada eslabón es evidencia irrefutable de la persona en la que te estás convirtiendo.&rdquo;
        </p>
      </div>
    </div>
  );
}
