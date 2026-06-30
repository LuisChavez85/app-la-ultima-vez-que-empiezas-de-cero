'use client';

import { useEffect, useState } from 'react';
import { getUsuario } from '@/lib/db';
import { GUIA_INSTALACION_KEY } from '@/components/instalacion/GuiaInstalacion';

import dynamic from 'next/dynamic';

const GuiaInstalacion = dynamic(() => import('@/components/instalacion/GuiaInstalacion'), {
  loading: () => <SplashScreen />,
});

const Onboarding = dynamic(() => import('@/components/onboarding/Onboarding'), {
  loading: () => <SplashScreen />,
});

const Dashboard = dynamic(() => import('@/components/dashboard/Dashboard'), {
  loading: () => <SplashScreen />,
});

function SplashScreen() {
  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-8">
      <div className="animate-pulse-slow">
        <svg width="48" height="48" viewBox="0 0 48 48" className="mx-auto mb-6">
          <rect x="4" y="4" width="40" height="40" rx="12" fill="none" stroke="#C8A44E" strokeWidth="1" />
          <circle cx="24" cy="20" r="6" fill="#C8A44E" opacity="0.8" />
          <path d="M14,32 C14,26 18,22 24,22 C30,22 34,26 34,32" fill="#C8A44E" opacity="0.5" />
        </svg>
      </div>
      <p className="text-ivory/30 text-sm font-body">Cargando...</p>
    </div>
  );
}

type Estado = 'loading' | 'instalacion' | 'onboarding' | 'dashboard';

async function resolverDestino(): Promise<'onboarding' | 'dashboard'> {
  try {
    const usuario = await getUsuario();
    return usuario?.onboardingCompleto ? 'dashboard' : 'onboarding';
  } catch {
    return 'onboarding';
  }
}

function esPWAInstalada(): boolean {
  if (typeof window === 'undefined') return true; // SSR: skip guide
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari standalone property
    (window.navigator as unknown as Record<string, unknown>)['standalone'] === true
  );
}

function guiaYaVista(): boolean {
  try {
    return !!localStorage.getItem(GUIA_INSTALACION_KEY);
  } catch {
    return true; // Si localStorage no está disponible, no mostramos la guía
  }
}

export default function Home() {
  const [estado, setEstado] = useState<Estado>('loading');

  useEffect(() => {
    async function inicializar() {
      // Si ya está instalada como PWA o el usuario ya vio la guía, saltar
      if (esPWAInstalada() || guiaYaVista()) {
        const destino = await resolverDestino();
        setEstado(destino);
      } else {
        setEstado('instalacion');
      }
    }
    inicializar();
  }, []);

  const procederDesdeInstalacion = async () => {
    const destino = await resolverDestino();
    setEstado(destino);
  };

  if (estado === 'loading') return <SplashScreen />;
  if (estado === 'instalacion') return <GuiaInstalacion onContinuar={procederDesdeInstalacion} />;
  if (estado === 'onboarding') return <Onboarding onComplete={() => setEstado('dashboard')} />;
  return <Dashboard />;
}
