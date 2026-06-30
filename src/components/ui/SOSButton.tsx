'use client';

import { motion } from 'framer-motion';
import { LifeBuoy } from 'lucide-react';
import { haptic } from '@/lib/haptic';

interface Props {
  onClick: () => void;
}

export default function SOSButton({ onClick }: Props) {
  return (
    <motion.button
      onClick={() => { haptic.medium(); onClick(); }}
      whileTap={{ scale: 0.88 }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.8 }}
      className="fixed z-40 flex items-center gap-2 rounded-full border border-amber/30 bg-obsidian/90 px-4 py-2.5 shadow-lg"
      style={{
        bottom: 'calc(5rem + env(safe-area-inset-bottom))',
        right: '1rem',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 0 20px rgba(245,158,11,0.15), 0 4px 16px rgba(0,0,0,0.5)',
      }}
      aria-label="Botón SOS Rescate"
    >
      <LifeBuoy className="w-4 h-4 text-amber" />
      <span className="text-[10px] font-body font-semibold tracking-[0.1em] uppercase text-amber">
        SOS
      </span>
      {/* Pulso de alerta */}
      <span
        className="absolute inset-0 rounded-full border border-amber/20 animate-ping"
        style={{ animationDuration: '2.5s' }}
      />
    </motion.button>
  );
}
