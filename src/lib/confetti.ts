import confettiLib from 'canvas-confetti';

// Confetti dorado — para completar el ritual diario
export function confettiRitual() {
  const count = 120;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confettiLib.Options) {
    confettiLib({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55, colors: ['#C8A44E', '#E8D5A0', '#F7F5F0'] });
  fire(0.2, { spread: 60, colors: ['#C8A44E', '#8B7335'] });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#E8D5A0', '#C8A44E', '#F7F5F0'] });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#C8A44E'] });
  fire(0.1, { spread: 120, startVelocity: 45, colors: ['#F7F5F0', '#E8D5A0'] });
}

// Confetti de microvictoria — rápido y pequeño
export function confettiMicro(color: string = '#06B6D4') {
  confettiLib({
    particleCount: 60,
    spread: 70,
    origin: { y: 0.65 },
    colors: [color, '#F7F5F0', '#C8A44E'],
    zIndex: 9999,
    startVelocity: 30,
    scalar: 0.9,
  });
}

// Confetti épico — para el día 30, 5/5 microvictorias
export function confettiEpico() {
  const duration = 2000;
  const end = Date.now() + duration;

  const COLORES = ['#C8A44E', '#E8D5A0', '#F7F5F0', '#00D4AA', '#8B5CF6'];

  const frame = () => {
    confettiLib({
      particleCount: 6,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: COLORES,
      zIndex: 9999,
    });
    confettiLib({
      particleCount: 6,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: COLORES,
      zIndex: 9999,
    });

    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
