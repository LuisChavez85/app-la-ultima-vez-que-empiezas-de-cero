'use client';

import { useState, useEffect } from 'react';
import { Share2, MoreVertical, PlusSquare, Download, Check, Smartphone } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Navegador = 'safari-ios' | 'chrome-android' | 'otro';

interface Props {
  onContinuar: () => void;
}

export const GUIA_INSTALACION_KEY = 'pwa-guia-vista';

function detectarNavegador(): Navegador {
  if (typeof window === 'undefined') return 'otro';
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua) && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua)) {
    return 'safari-ios';
  }
  if (/Android/.test(ua) && /Chrome/.test(ua) && !/EdgA/.test(ua)) {
    return 'chrome-android';
  }
  return 'otro';
}

interface Paso {
  numero: number;
  icono: React.ReactNode;
  titulo: string;
  descripcion: string;
}

const pasosSafari: Paso[] = [
  {
    numero: 1,
    icono: <Share2 className="w-4 h-4" />,
    titulo: 'Toca el botón de compartir',
    descripcion: 'El ícono de cuadrado con flecha hacia arriba, en la barra inferior de Safari.',
  },
  {
    numero: 2,
    icono: <PlusSquare className="w-4 h-4" />,
    titulo: 'Agregar a pantalla de inicio',
    descripcion: 'Desplázate en el menú y toca "Agregar a pantalla de inicio".',
  },
  {
    numero: 3,
    icono: <Check className="w-4 h-4" />,
    titulo: 'Toca "Agregar"',
    descripcion: 'Confirma en la esquina superior derecha. La app ya es tuya.',
  },
];

const pasosChrome: Paso[] = [
  {
    numero: 1,
    icono: <MoreVertical className="w-4 h-4" />,
    titulo: 'Toca los tres puntos del menú',
    descripcion: 'El ícono de tres puntos verticales en la esquina superior derecha de Chrome.',
  },
  {
    numero: 2,
    icono: <Download className="w-4 h-4" />,
    titulo: '"Instalar app" o "Agregar a inicio"',
    descripcion: 'Busca esta opción en el menú desplegable y tócala.',
  },
  {
    numero: 3,
    icono: <Check className="w-4 h-4" />,
    titulo: 'Confirma tocando "Instalar"',
    descripcion: 'La app aparecerá en tu pantalla de inicio al instante.',
  },
];

function PasoCard({ paso, delay }: { paso: Paso; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-start gap-4 bg-graphite border border-smoke/50 rounded-2xl px-4 py-4"
    >
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center mt-0.5">
        <span className="font-display italic text-gold text-[16px] leading-none">{paso.numero}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-gold/50">{paso.icono}</span>
          <p className="text-ivory text-[14px] font-body font-semibold leading-snug">{paso.titulo}</p>
        </div>
        <p className="text-ivory/40 text-[12px] font-body leading-relaxed">{paso.descripcion}</p>
      </div>
    </motion.div>
  );
}

export default function GuiaInstalacion({ onContinuar }: Props) {
  const [navegador, setNavegador] = useState<Navegador>('otro');

  useEffect(() => {
    setNavegador(detectarNavegador());
  }, []);

  const marcarVista = () => {
    try {
      localStorage.setItem(GUIA_INSTALACION_KEY, '1');
    } catch { /* localStorage no disponible */ }
  };

  const handleInstalada = () => {
    marcarVista();
    onContinuar();
  };

  const handleSinInstalar = () => {
    marcarVista();
    onContinuar();
  };

  const pasos = navegador === 'safari-ios' ? pasosSafari : pasosChrome;
  const esNavegadorCompatible = navegador !== 'otro';

  return (
    <main className="relative flex flex-col min-h-screen w-full max-w-[600px] mx-auto bg-obsidian overflow-hidden">
      {/* Glow background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(200, 164, 78, 0.07) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 flex flex-col flex-1 px-6 pt-12 pb-8">

        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-5">
            <Image
              src="/logo.png"
              alt="La Última Vez Que Empiezas De Cero"
              width={180}
              height={75}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>

          {esNavegadorCompatible ? (
            <>
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                <span className="text-[10px] text-gold font-body uppercase tracking-[0.18em]">
                  {navegador === 'safari-ios' ? 'Safari · iOS' : 'Chrome · Android'}
                </span>
              </div>
              <h1 className="font-display italic text-[23px] text-ivory leading-tight mb-3 px-2">
                Instala la app en tu pantalla de inicio
              </h1>
              <p className="text-ivory/45 text-[14px] font-body leading-relaxed max-w-[300px] mx-auto">
                Abre sin internet, sin contraseñas, y al instante — como una app nativa.
              </p>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-smoke/50 border border-gold/15 flex items-center justify-center mx-auto mb-5">
                <Smartphone className="w-7 h-7 text-gold/60" />
              </div>
              <h1 className="font-display italic text-[23px] text-ivory leading-tight mb-3 px-2">
                Mejor experiencia disponible
              </h1>
              <p className="text-ivory/45 text-[14px] font-body leading-relaxed max-w-[290px] mx-auto">
                Para instalar la app, ábrela en{' '}
                <span className="text-gold/80 font-semibold">Safari</span> si tienes iPhone, o en{' '}
                <span className="text-gold/80 font-semibold">Chrome</span> si tienes Android.
              </p>
            </>
          )}
        </motion.section>

        {/* Steps — solo si el navegador es compatible */}
        {esNavegadorCompatible && (
          <div className="flex flex-col gap-3 mb-8">
            {pasos.map((paso, i) => (
              <PasoCard key={paso.numero} paso={paso} delay={0.25 + i * 0.1} />
            ))}
          </div>
        )}

        {/* Separador decorativo si es navegador genérico */}
        {!esNavegadorCompatible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="flex-1 h-px bg-smoke" />
            <span className="text-smoke text-xs font-body uppercase tracking-widest">o</span>
            <div className="flex-1 h-px bg-smoke" />
          </motion.div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: esNavegadorCompatible ? 0.6 : 0.5 }}
          className="flex flex-col gap-3"
        >
          {esNavegadorCompatible && (
            <button
              onClick={handleInstalada}
              className="w-full py-4 bg-gold text-obsidian font-body font-semibold text-[11px] tracking-[0.18em] uppercase rounded-full flex items-center justify-center gap-2 shadow-lg transition-all duration-300 active:scale-[0.97]"
            >
              <Check className="w-4 h-4" />
              Ya la instalé
            </button>
          )}

          <button
            onClick={handleSinInstalar}
            className="w-full py-3 text-ivory/30 font-body text-[12px] tracking-wide hover:text-ivory/50 transition-colors duration-200"
          >
            Continuar sin instalar
          </button>
        </motion.div>

      </div>
    </main>
  );
}
