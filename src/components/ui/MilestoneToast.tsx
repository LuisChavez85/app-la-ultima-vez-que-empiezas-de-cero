'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hitos } from '@/data/constantes';
import { confettiEpico } from '@/lib/confetti';
import { haptic } from '@/lib/haptic';

interface Props {
  racha: number;
  onDismiss: () => void;
}

export default function MilestoneToast({ racha, onDismiss }: Props) {
  const hito = hitos.find((h) => h.dias === racha);

  useEffect(() => {
    if (!hito) return;
    haptic.celebrar();
    confettiEpico();
    const t = setTimeout(onDismiss, 4500);
    return () => clearTimeout(t);
  }, [hito, onDismiss]);

  return (
    <AnimatePresence>
      {hito && (
        <motion.div
          initial={{ opacity: 0, y: -80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] z-[100] flex justify-center pt-safe"
          style={{ paddingTop: 'max(env(safe-area-inset-top), 12px)' }}
          onClick={onDismiss}
        >
          <div
            className="mx-4 rounded-2xl border border-gold/30 px-5 py-4 flex items-center gap-4 max-w-[360px] w-full"
            style={{
              background: 'rgba(26, 26, 32, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,164,78,0.15)',
            }}
          >
            <span className="text-3xl shrink-0">{hito.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] tracking-[0.18em] uppercase text-gold font-body mb-0.5">
                Hito desbloqueado
              </p>
              <p className="font-display italic text-sm text-ivory leading-tight">
                {hito.titulo}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
