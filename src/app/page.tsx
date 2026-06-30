'use client';

import { useEffect, useState } from 'react';
import { getUsuario } from '@/lib/db';

// Lazy imports para cada sección
import dynamic from 'next/dynamic';

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

export default function Home() {
  const [estado, setEstado] = useState<'loading' | 'onboarding' | 'dashboard'>('loading');

  useEffect(() => {
    async function verificarUsuario() {
      try {
        const usuario = await getUsuario();
        if (usuario?.onboardingCompleto) {
          setEstado('dashboard');
        } else {
          setEstado('onboarding');
        }
      } catch {
        // Si IndexedDB no está disponible, iniciar onboarding
        setEstado('onboarding');
      }
    }
    verificarUsuario();
  }, []);

  if (estado === 'loading') return <SplashScreen />;
  if (estado === 'onboarding') return <Onboarding onComplete={() => setEstado('dashboard')} />;
  return <Dashboard />;
}
