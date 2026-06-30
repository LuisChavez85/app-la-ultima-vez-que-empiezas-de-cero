// Haptic feedback via navigator.vibrate (solo móvil)
// Silencioso en desktop — no lanza error

export const haptic = {
  light:   () => navigator.vibrate?.(10),
  medium:  () => navigator.vibrate?.(30),
  heavy:   () => navigator.vibrate?.(60),
  success: () => navigator.vibrate?.([20, 50, 20]),
  error:   () => navigator.vibrate?.([80, 30, 80]),
  celebrar:() => navigator.vibrate?.([20, 40, 20, 40, 80]),
};
