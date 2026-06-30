'use client';

import { useState, useCallback } from 'react';
import { guardarUsuario } from '@/lib/db';
import type { PerfilPartida, Usuario } from '@/types';
import PantallaBienvenida from './PantallaBienvenida';
import PantallaDatosBasicos from './PantallaDatosBasicos';
import PantallaDiagnostico from './PantallaDiagnostico';
import PantallaCarta from './PantallaCarta';
import PantallaPacto from './PantallaPacto';

interface OnboardingProps {
  onComplete: () => void;
}

// 8 pantallas: bienvenida, datos, 5 diagnóstico, carta, pacto
type Pantalla = 'bienvenida' | 'datos' | 'diagnostico' | 'carta' | 'pacto';

interface DatosOnboarding {
  nombre: string;
  horaDespertar: string;
  diagnostico: Partial<PerfilPartida>;
  carta: string;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [pantalla, setPantalla] = useState<Pantalla>('bienvenida');
  const [datos, setDatos] = useState<DatosOnboarding>({
    nombre: '',
    horaDespertar: '07:00',
    diagnostico: {},
    carta: '',
  });
  const [transicion, setTransicion] = useState(false);

  const cambiarPantalla = useCallback((siguiente: Pantalla) => {
    setTransicion(true);
    setTimeout(() => {
      setPantalla(siguiente);
      setTransicion(false);
    }, 400);
  }, []);

  const completarOnboarding = async () => {
    // Calcular autoeficacia inicial basada en las respuestas
    const autoeficacia = calcularAutoeficacia(datos.diagnostico);

    const usuario: Partial<Usuario> = {
      nombre: datos.nombre,
      horaDespertar: datos.horaDespertar,
      fechaInicio: new Date().toISOString().split('T')[0],
      rachaActual: 0,
      mejorRacha: 0,
      totalDias: 0,
      nivelConfianza: 1,
      perfilPartida: {
        ...datos.diagnostico,
        autoeficaciaInicial: autoeficacia,
      } as PerfilPartida,
      cartaYoFuturo: datos.carta,
      modelosASeguir: [],
      etiquetasNuevas: [],
      onboardingCompleto: true,
      wizardYo20Completo: false,
      reinicioMentalCompleto: false,
      configuracion: {
        sonidosActivos: true,
        vibracionActiva: true,
        temaOscuro: true,
      },
    };

    await guardarUsuario(usuario);
    onComplete();
  };

  return (
    <div className={`min-h-screen bg-obsidian transition-opacity duration-[400ms] ${transicion ? 'opacity-0' : 'opacity-100'}`}>
      {pantalla === 'bienvenida' && (
        <PantallaBienvenida
          onContinuar={() => cambiarPantalla('datos')}
        />
      )}

      {pantalla === 'datos' && (
        <PantallaDatosBasicos
          nombre={datos.nombre}
          horaDespertar={datos.horaDespertar}
          onChangeNombre={(nombre) => setDatos((d) => ({ ...d, nombre }))}
          onChangeHora={(hora) => setDatos((d) => ({ ...d, horaDespertar: hora }))}
          onContinuar={() => cambiarPantalla('diagnostico')}
          onVolver={() => cambiarPantalla('bienvenida')}
        />
      )}

      {pantalla === 'diagnostico' && (
        <PantallaDiagnostico
          diagnostico={datos.diagnostico}
          onUpdate={(diag) => setDatos((d) => ({ ...d, diagnostico: diag }))}
          onContinuar={() => cambiarPantalla('carta')}
          onVolver={() => cambiarPantalla('datos')}
        />
      )}

      {pantalla === 'carta' && (
        <PantallaCarta
          carta={datos.carta}
          onChange={(carta) => setDatos((d) => ({ ...d, carta }))}
          onContinuar={() => cambiarPantalla('pacto')}
          onVolver={() => cambiarPantalla('diagnostico')}
        />
      )}

      {pantalla === 'pacto' && (
        <PantallaPacto
          nombre={datos.nombre}
          onCompletar={completarOnboarding}
        />
      )}
    </div>
  );
}

/** Calcula un puntaje de autoeficacia 1-10 basado en las respuestas del diagnóstico */
function calcularAutoeficacia(diag: Partial<PerfilPartida>): number {
  let score = 5; // Base

  // Intentos de cambio — más intentos = más baja la autoeficacia percibida
  const intentos: Record<string, number> = {
    'Ninguna': 1,
    '1-2 veces': 0,
    '3-5 veces': -1,
    'Más de 5': -2,
    'Perdí la cuenta': -2,
  };
  score += intentos[diag.intentosCambio || ''] || 0;

  // Duración de motivación
  const duracion: Record<string, number> = {
    '1-3 días': -2,
    'Una semana': -1,
    '2-3 semanas': 0,
    'Un mes': 1,
    'Depende': 0,
  };
  score += duracion[diag.duracionMotivacion || ''] || 0;

  // Relación con promesas
  const promesas: Record<string, number> = {
    'Las cumplo casi siempre': 2,
    'Las cumplo a veces': 0,
    'Me cuesta mucho': -1,
    'Ya ni me las hago': -2,
    'Prefiero no responder': -1,
  };
  score += promesas[diag.relacionPromesas || ''] || 0;

  return Math.max(1, Math.min(10, score));
}
