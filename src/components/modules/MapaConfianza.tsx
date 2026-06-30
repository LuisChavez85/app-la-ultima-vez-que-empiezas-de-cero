'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, Trophy, User, ArrowRight } from 'lucide-react';
import { db, getUsuario, guardarUsuario } from '@/lib/db';
import { nivelesConfianza, preguntasWizardYo20 } from '@/data/constantes';
import { IllustracionDiamante, DecoradorLinea } from '@/components/ui/Illustrations';
import type { Usuario, NivelConfianza, WizardYo20 } from '@/types';

interface Props {
  usuario: Usuario;
  onUsuarioActualizado: () => void;
}

type Vista = 'principal' | 'wizard';

export default function MapaConfianza({ usuario, onUsuarioActualizado }: Props) {
  const [vista, setVista] = useState<Vista>('principal');
  const [wizardCompleto, setWizardCompleto] = useState(usuario.wizardYo20Completo);
  const [wizardGuardado, setWizardGuardado] = useState<WizardYo20 | null>(null);
  const [modelosEditando, setModelosEditando] = useState(false);
  const [modelosInput, setModelosInput] = useState<string[]>(
    usuario.modelosASeguir.length ? [...usuario.modelosASeguir] : ['', '', '']
  );

  useEffect(() => {
    async function cargarWizard() {
      const w = await db.wizardYo20.toCollection().first();
      if (w) setWizardGuardado(w);
    }
    cargarWizard();
  }, []);

  const nivelActual = nivelesConfianza.find((n) => n.id === usuario.nivelConfianza) || nivelesConfianza[0];

  const guardarModelos = async () => {
    const modelos = modelosInput.filter((m) => m.trim().length > 0);
    await guardarUsuario({ modelosASeguir: modelos });
    setModelosEditando(false);
    onUsuarioActualizado();
  };

  // Desafío de modelo dinámico
  const modelos = usuario.modelosASeguir.filter(Boolean);
  const modeloHoy = modelos.length > 0 ? modelos[new Date().getDay() % modelos.length] : null;
  const desafiosModelo = [
    `¿Cómo enfrentaría ${modeloHoy} el obstáculo que tienes hoy?`,
    `¿Qué haría ${modeloHoy} en los próximos 5 minutos?`,
    `¿${modeloHoy} negociaría consigo mismo o actuaría?`,
  ];
  const desafioHoy = modeloHoy ? desafiosModelo[new Date().getDate() % 3] : null;

  if (vista === 'wizard') {
    return (
      <WizardYo20
        onComplete={async (respuestas) => {
          await db.wizardYo20.add({
            fecha: new Date().toISOString().split('T')[0],
            respuestas,
          });
          await guardarUsuario({ wizardYo20Completo: true });
          setWizardCompleto(true);
          setVista('principal');
          onUsuarioActualizado();
        }}
        onVolver={() => setVista('principal')}
      />
    );
  }

  return (
    <div className="main-container pb-28">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-[11px] tracking-[0.18em] uppercase text-rose font-body mb-1">
          Estructura Mental
        </p>
        <h1 className="font-display italic text-2xl text-ivory mb-3">
          Mapa de Reconstrucción de Confianza Personal
        </h1>
        <p className="font-display italic text-sm text-ivory/40 leading-relaxed max-w-[300px] mx-auto">
          &ldquo;Para cambiar los resultados, hay que cambiar la imagen interna que tienes de ti mismo.&rdquo;
        </p>
      </div>

      {/* Mi Yo 2.0 */}
      <div
        className="relative bg-graphite rounded-2xl p-5 border border-rose/20 mb-5 overflow-hidden"
        style={{ boxShadow: 'inset 0 0 20px rgba(236, 72, 153, 0.04)' }}
      >
        <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-rose rounded-l-2xl" />
        <p className="text-[10px] tracking-[0.18em] uppercase text-rose font-body mb-1">
          Definición de Identidad
        </p>
        <h2 className="font-display italic text-lg text-ivory mb-1">Mi Yo 2.0</h2>
        <p className="text-xs text-ivory/40 font-body leading-relaxed mb-4">
          Define la visión de la persona en la que te estás convirtiendo.
        </p>

        {wizardCompleto ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-rose">
              <Check className="w-4 h-4" />
              <span className="text-xs font-body text-ivory/60">Visión definida</span>
            </div>
            {wizardGuardado && (
              <div className="bg-obsidian rounded-xl p-4 border border-smoke/20">
                <p className="text-[10px] uppercase tracking-[0.1em] text-ivory/25 font-body mb-2">
                  Tu Yo Ideal (respuesta 7)
                </p>
                <p className="text-xs text-ivory/60 font-body leading-relaxed italic line-clamp-3">
                  {wizardGuardado.respuestas[6] || '—'}
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setVista('wizard')}
            className="w-full flex items-center justify-between bg-obsidian border border-rose/30 text-ivory px-4 py-3 rounded-xl transition-all hover:border-rose/50 active:scale-[0.98]"
          >
            <div>
              <p className="text-sm font-body font-semibold text-left">Iniciar el Pacto de Visión</p>
              <p className="text-[10px] uppercase tracking-[0.1em] text-rose/70 font-body mt-0.5">
                Flujo de 7 pasos
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-rose" />
          </button>
        )}
      </div>

      {/* Modelos a Seguir */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase text-rose font-body">4.2 Modelos a Seguir</p>
            <h2 className="font-display italic text-base text-ivory">Modelos a Seguir</h2>
          </div>
          <button
            onClick={() => setModelosEditando(!modelosEditando)}
            className="text-[10px] uppercase tracking-[0.1em] text-rose/60 font-body border border-rose/20 px-2.5 py-1 rounded-lg active:scale-95"
          >
            {modelosEditando ? 'Listo' : 'Editar'}
          </button>
        </div>

        {modelosEditando ? (
          <div className="space-y-2.5">
            {[0, 1, 2].map((i) => (
              <input
                key={i}
                type="text"
                value={modelosInput[i]}
                onChange={(e) => {
                  const nuevos = [...modelosInput];
                  nuevos[i] = e.target.value;
                  setModelosInput(nuevos);
                }}
                placeholder={`Modelo ${i + 1} (persona que admiras)`}
                className="input-field text-sm"
              />
            ))}
            <button
              onClick={guardarModelos}
              className="w-full py-3 rounded-xl bg-rose/10 border border-rose/30 text-rose font-body text-sm tracking-wide active:scale-[0.97]"
            >
              Guardar modelos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => {
              const modelo = modelos[i];
              return (
                <button
                  key={i}
                  onClick={() => setModelosEditando(true)}
                  className="flex flex-col items-center gap-2.5 p-4 bg-graphite rounded-xl border border-smoke/30 hover:border-rose/30 transition-all active:scale-[0.97]"
                >
                  <div className="w-11 h-11 rounded-full bg-obsidian border border-smoke/40 flex items-center justify-center">
                    {modelo ? (
                      <span className="text-sm font-body font-semibold text-rose uppercase">
                        {modelo.charAt(0)}
                      </span>
                    ) : (
                      <User className="w-4 h-4 text-ivory/20" />
                    )}
                  </div>
                  <p className="text-[9px] font-body uppercase tracking-tight text-ivory/40 text-center leading-tight">
                    {modelo || `Modelo ${i + 1}`}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {/* Desafío del modelo */}
        {desafioHoy && !modelosEditando && (
          <div
            className="mt-3 bg-obsidian border border-rose/20 rounded-xl p-4"
            style={{ boxShadow: 'inset 0 0 15px rgba(236, 72, 153, 0.04)' }}
          >
            <p className="text-[10px] uppercase tracking-[0.12em] text-rose font-body mb-2">
              Desafío de hoy
            </p>
            <p className="font-display italic text-sm text-ivory/80 leading-relaxed">
              &ldquo;{desafioHoy}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* 7 Niveles de Confianza */}
      <div>
        <div className="flex items-center gap-4 mb-4 px-1">
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase text-ivory/30 font-body mb-0.5">
              Progreso Ritualístico
            </p>
            <h2 className="font-display italic text-base text-ivory">
              7 Niveles de Confianza
            </h2>
          </div>
          <IllustracionDiamante className="w-12 h-12 shrink-0 ml-auto opacity-70" />
        </div>
        <DecoradorLinea color="#EC4899" className="mb-5 opacity-40" />

        <div className="relative pl-4">
          {/* Línea vertical */}
          <div className="absolute left-[31px] top-4 bottom-4 w-[1px] bg-smoke/30" />
          {/* Progreso activo */}
          <div
            className="absolute left-[31px] top-4 w-[1px] bg-rose transition-all duration-700"
            style={{
              height: `${Math.min((usuario.nivelConfianza - 1) / 6, 1) * 100}%`,
              boxShadow: '0 0 8px rgba(236, 72, 153, 0.6)',
            }}
          />

          <div className="space-y-6">
            {nivelesConfianza.map((nivel: NivelConfianza) => {
              const desbloqueado = usuario.totalDias >= nivel.diasRequeridos;
              const esActual = nivel.id === usuario.nivelConfianza;

              return (
                <div key={nivel.id} className="flex items-start gap-5 relative">
                  {/* Nodo */}
                  <div
                    className={`z-10 w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                      esActual
                        ? 'bg-obsidian border-2 border-rose'
                        : desbloqueado
                        ? 'bg-obsidian border-2 border-rose/40'
                        : 'bg-obsidian border border-smoke/40'
                    }`}
                    style={esActual ? { boxShadow: '0 0 15px rgba(236, 72, 153, 0.4)' } : undefined}
                  >
                    {esActual ? (
                      <div className="w-2 h-2 rounded-full bg-rose animate-pulse" />
                    ) : desbloqueado ? (
                      <Check className="w-3.5 h-3.5 text-rose/60" />
                    ) : nivel.id === 7 ? (
                      <Trophy className="w-3.5 h-3.5 text-ivory/15" />
                    ) : (
                      <span className="text-[10px] font-body font-semibold text-ivory/25">
                        {nivel.id}
                      </span>
                    )}
                  </div>

                  {/* Contenido */}
                  {esActual ? (
                    <div
                      className="flex-1 bg-graphite rounded-xl p-4 border border-rose/25"
                      style={{ boxShadow: 'inset 0 0 15px rgba(236, 72, 153, 0.05)' }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[11px] tracking-[0.1em] uppercase text-rose font-body font-semibold">
                          Nivel {nivel.id}: {nivel.nombre}
                        </p>
                        <p className="text-[10px] text-ivory/25 font-body">Día {nivel.diasRequeridos}</p>
                      </div>
                      <p className="text-xs text-ivory/70 font-body leading-relaxed">
                        {nivel.descripcion}
                      </p>
                    </div>
                  ) : (
                    <div className={`flex-1 py-1 ${!desbloqueado ? 'opacity-30' : 'opacity-60'}`}>
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-xs font-body uppercase tracking-wider font-semibold ${
                            desbloqueado ? 'text-ivory/70' : 'text-ivory/40'
                          }`}
                        >
                          {nivel.nombre} {desbloqueado ? nivel.emoji : ''}
                        </p>
                        <p className="text-[10px] text-ivory/20 font-body">Día {nivel.diasRequeridos}</p>
                      </div>
                      {desbloqueado && (
                        <p className="text-[11px] text-ivory/30 font-body mt-0.5">{nivel.descripcion}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// WIZARD MI YO 2.0
// ============================================
interface WizardProps {
  onComplete: (respuestas: string[]) => void;
  onVolver: () => void;
}

function WizardYo20({ onComplete, onVolver }: WizardProps) {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState<string[]>(Array(7).fill(''));
  const [guardando, setGuardando] = useState(false);

  const pregunta = preguntasWizardYo20[preguntaActual];
  const respuesta = respuestas[preguntaActual];
  const esUltima = preguntaActual === 6;
  const puedeContinuar = respuesta.trim().length >= 5;

  const siguiente = () => {
    if (esUltima) {
      setGuardando(true);
      onComplete(respuestas);
    } else {
      setPreguntaActual((p) => p + 1);
    }
  };

  const anterior = () => {
    if (preguntaActual === 0) {
      onVolver();
    } else {
      setPreguntaActual((p) => p - 1);
    }
  };

  const actualizar = (valor: string) => {
    const nuevas = [...respuestas];
    nuevas[preguntaActual] = valor;
    setRespuestas(nuevas);
  };

  return (
    <div className="min-h-screen bg-obsidian flex flex-col">
      {/* Header fijo */}
      <header className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-smoke/20 shrink-0">
        <button
          onClick={anterior}
          className="w-9 h-9 rounded-xl bg-graphite/60 flex items-center justify-center active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 text-ivory/60" />
        </button>
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-[11px] tracking-[0.15em] uppercase text-rose font-body font-semibold">
            Mi Yo 2.0
          </p>
          <div className="flex gap-1.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={`h-[3px] rounded-full transition-all duration-300 ${
                  i === preguntaActual
                    ? 'w-6 bg-rose'
                    : i < preguntaActual
                    ? 'w-3 bg-rose/40'
                    : 'w-3 bg-smoke'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="w-9" />
      </header>

      {/* Área scrollable */}
      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-rose/60 font-body mb-4">
          Pregunta {preguntaActual + 1} de 7
        </p>

        <h2 className="font-display italic text-xl text-ivory leading-relaxed mb-6">
          {pregunta}
        </h2>

        {/* Textarea con altura fija — no crece infinito */}
        <textarea
          value={respuesta}
          onChange={(e) => actualizar(e.target.value)}
          placeholder={
            preguntaActual === 6
              ? 'Descríbete en detalle. Sé específico. Esta es tu visión.'
              : 'Escribe con honestidad...'
          }
          rows={preguntaActual === 6 ? 7 : 5}
          className="w-full bg-graphite border border-smoke rounded-2xl py-4 px-5 text-ivory font-body
                     placeholder:text-smoke/60 resize-none focus:outline-none focus:border-rose/40
                     transition-colors duration-200 leading-relaxed"
          style={{ fontSize: '16px' }}
        />

        {preguntaActual === 2 && (
          <p className="text-[11px] text-ivory/25 font-body mt-2 italic">
            Nombra 3 personas separadas por coma (reales o ficticias)
          </p>
        )}
      </div>

      {/* Botón pegado al fondo — siempre visible */}
      <div className="shrink-0 px-6 pt-3 pb-8 border-t border-smoke/10 bg-obsidian">
        <button
          onClick={siguiente}
          disabled={!puedeContinuar || guardando}
          className={`w-full py-4 rounded-2xl font-body font-semibold text-sm tracking-[0.1em] uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.97] ${
            puedeContinuar && !guardando
              ? esUltima
                ? 'bg-rose text-ivory'
                : 'bg-obsidian border border-rose text-rose'
              : 'bg-obsidian border border-smoke text-smoke cursor-not-allowed'
          }`}
        >
          {guardando ? (
            <span className="w-4 h-4 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />
          ) : esUltima ? (
            <>
              <Check className="w-4 h-4" />
              Completar Mi Yo 2.0
            </>
          ) : (
            <>
              Siguiente
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
