import type { CSSProperties } from 'react';

// Ilustraciones SVG premium temáticas para la app
// Paleta: obsidiana + dorado + colores de módulo
// Todas son inline SVG — sin dependencias externas

/** Montaña con amanecer — Dashboard hero, transformación */
export function IllustracionMontana({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <defs>
        <radialGradient id="sol" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#C8A44E" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C8A44E" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="montGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A2A32" />
          <stop offset="100%" stopColor="#1A1A20" />
        </linearGradient>
      </defs>
      {/* Glow solar */}
      <ellipse cx="160" cy="65" rx="90" ry="55" fill="url(#sol)" />
      {/* Horizonte lejano */}
      <path d="M0 110 Q80 95 160 98 Q240 101 320 110 L320 160 L0 160Z" fill="#1A1A20" opacity="0.5" />
      {/* Montaña izquierda */}
      <path d="M0 160 L75 72 L145 130 L0 160Z" fill="url(#montGrad)" />
      {/* Montaña central — cima dorada */}
      <path d="M80 160 L160 38 L240 160Z" fill="#1A1A20" />
      <path d="M145 85 L160 38 L175 85Z" fill="#C8A44E" opacity="0.25" />
      {/* Montaña derecha */}
      <path d="M180 160 L255 80 L320 160Z" fill="url(#montGrad)" opacity="0.8" />
      {/* Línea de horizonte dorada */}
      <line x1="30" y1="110" x2="290" y2="110" stroke="#C8A44E" strokeWidth="0.5" strokeOpacity="0.2" />
      {/* Estrellas */}
      {[[40, 20], [90, 12], [200, 8], [260, 18], [130, 15], [300, 25]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1" fill="#C8A44E" opacity="0.5" />
      ))}
    </svg>
  );
}

/** Cadena eslabones — Módulo 2 Cadena Imparable */
export function IllustracionCadena({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <defs>
        <linearGradient id="chainGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${10 + i * 38}, 24)`}>
          <rect x="-14" y="-10" width="28" height="20" rx="10" stroke="url(#chainGrad)" strokeWidth="2.5" fill="none" />
          {i < 4 && <line x1="14" y1="0" x2="24" y2="0" stroke="#8B5CF6" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="2 2" />}
        </g>
      ))}
      <circle cx="200" cy="24" r="4" fill="#8B5CF6" opacity="0.3" />
    </svg>
  );
}

/** Árbol creciendo — transformación personal, racha */
export function IllustracionArbol({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <defs>
        <radialGradient id="treeglow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="45" rx="42" ry="38" fill="url(#treeglow)" />
      {/* Tronco */}
      <path d="M55 140 L55 88 Q60 80 65 88 L65 140Z" fill="#2A2A32" />
      {/* Copa principal */}
      <path d="M60 12 L30 55 L42 55 L22 80 L38 80 L18 105 L102 105 L82 80 L98 80 L78 55 L90 55Z"
        fill="#1A1A20" stroke="#00D4AA" strokeWidth="1" strokeOpacity="0.3" />
      {/* Brillo en la copa */}
      <path d="M60 12 L45 40 L75 40Z" fill="#00D4AA" opacity="0.12" />
      {/* Tierra */}
      <ellipse cx="60" cy="135" rx="28" ry="5" fill="#2A2A32" />
    </svg>
  );
}

/** Diamante / cristal — niveles de confianza */
export function IllustracionDiamante({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <defs>
        <linearGradient id="diamGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Base */}
      <path d="M50 88 L10 38 L26 20 L74 20 L90 38Z" fill="url(#diamGrad)" opacity="0.2" />
      <path d="M50 88 L10 38 L26 20 L74 20 L90 38Z" stroke="#EC4899" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
      {/* Facetas */}
      <line x1="50" y1="88" x2="10" y2="38" stroke="#EC4899" strokeWidth="0.7" strokeOpacity="0.3" />
      <line x1="50" y1="88" x2="90" y2="38" stroke="#8B5CF6" strokeWidth="0.7" strokeOpacity="0.3" />
      <line x1="10" y1="38" x2="50" y2="20" stroke="#EC4899" strokeWidth="0.7" strokeOpacity="0.4" />
      <line x1="90" y1="38" x2="50" y2="20" stroke="#8B5CF6" strokeWidth="0.7" strokeOpacity="0.4" />
      <line x1="10" y1="38" x2="90" y2="38" stroke="#F7F5F0" strokeWidth="0.5" strokeOpacity="0.2" />
      {/* Destellos */}
      <circle cx="35" cy="32" r="1.5" fill="#F7F5F0" opacity="0.7" />
      <circle cx="65" cy="28" r="1" fill="#F7F5F0" opacity="0.5" />
      <line x1="50" y1="12" x2="50" y2="18" stroke="#F7F5F0" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />
      <line x1="44" y1="15" x2="56" y2="15" stroke="#F7F5F0" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />
    </svg>
  );
}

/** Camino al horizonte — onboarding, viaje */
export function IllustracionCamino({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <defs>
        <linearGradient id="caminoGrad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#C8A44E" stopOpacity="0" />
          <stop offset="100%" stopColor="#C8A44E" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="horizonte" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C8A44E" stopOpacity="0" />
          <stop offset="50%" stopColor="#C8A44E" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C8A44E" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Cielo oscuro */}
      <rect width="280" height="120" fill="#0F0F12" />
      {/* Estrellas */}
      {[[20,10],[60,20],[100,8],[180,15],[220,6],[260,20],[140,25],[40,30]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="0.8" fill="#C8A44E" opacity={0.3 + (i%3)*0.15} />
      ))}
      {/* Horizonte dorado */}
      <line x1="0" y1="70" x2="280" y2="70" stroke="url(#horizonte)" strokeWidth="1" />
      {/* Suelo */}
      <rect x="0" y="70" width="280" height="50" fill="#1A1A20" />
      {/* Camino en perspectiva */}
      <path d="M140 70 L100 120 L180 120Z" fill="url(#caminoGrad)" />
      <path d="M140 70 L100 120 L180 120Z" stroke="#C8A44E" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
      {/* Líneas de carretera */}
      <line x1="140" y1="75" x2="140" y2="85" stroke="#C8A44E" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
      <line x1="140" y1="90" x2="140" y2="100" stroke="#C8A44E" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />
      <line x1="140" y1="106" x2="140" y2="116" stroke="#C8A44E" strokeWidth="1" strokeOpacity="0.2" strokeLinecap="round" />
      {/* Glow en el horizonte */}
      <ellipse cx="140" cy="70" rx="60" ry="8" fill="#C8A44E" opacity="0.06" />
    </svg>
  );
}

/** Espiral de crecimiento — microvictorias */
export function IllustracionEspiral({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <defs>
        <linearGradient id="spiralGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <path
        d="M50 50 Q62 38 70 50 Q78 62 66 70 Q54 78 42 66 Q30 54 38 38 Q46 22 66 26 Q86 30 88 54 Q90 78 70 86 Q50 94 32 82"
        stroke="url(#spiralGrad)" strokeWidth="2" fill="none" strokeLinecap="round"
      />
      {/* Punto central */}
      <circle cx="50" cy="50" r="3" fill="#06B6D4" opacity="0.6" />
      {/* Hitos en la espiral */}
      {[[70,50],[66,70],[38,38],[88,54]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#06B6D4" opacity={0.3 + i*0.15} />
      ))}
    </svg>
  );
}

/** Sobre sellado — Carta al yo futuro (Ceremonia Día 30) */
export function IllustracionSobre({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 88" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id="sobreGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A1A20" />
          <stop offset="100%" stopColor="#2A2A32" />
        </linearGradient>
      </defs>
      {/* Cuerpo del sobre */}
      <rect x="8" y="20" width="104" height="62" rx="6" fill="url(#sobreGrad)" stroke="#C8A44E" strokeWidth="1" strokeOpacity="0.4" />
      {/* Triángulo inferior */}
      <path d="M8 82 L60 52 L112 82" fill="#1A1A20" stroke="#C8A44E" strokeWidth="0.8" strokeOpacity="0.3" />
      {/* Solapa superior */}
      <path d="M8 20 L60 50 L112 20" fill="#2A2A32" stroke="#C8A44E" strokeWidth="1" strokeOpacity="0.4" />
      {/* Sello dorado */}
      <circle cx="60" cy="55" r="9" fill="#C8A44E" opacity="0.15" stroke="#C8A44E" strokeWidth="1" strokeOpacity="0.5" />
      <text x="60" y="59" textAnchor="middle" fill="#C8A44E" fontSize="8" opacity="0.7" fontFamily="serif">✦</text>
      {/* Línea de pliegue */}
      <line x1="20" y1="36" x2="100" y2="36" stroke="#C8A44E" strokeWidth="0.5" strokeOpacity="0.2" />
    </svg>
  );
}

/** Cita motivacional decorativa — guiones horizontales */
export function DecoradorLinea({ color = '#C8A44E', className = '' }: { color?: string; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${color}40)` }} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: color, opacity: 0.5 }} />
      <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(to left, transparent, ${color}40)` }} />
    </div>
  );
}
