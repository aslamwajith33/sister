import confetti from 'canvas-confetti';

export const triggerPinkConfetti = () => {
  // Pastel pinks, rose gold, golden sparkles, and lavender
  const colors = ['#f472b6', '#fb7185', '#fda4af', '#fcd34d', '#e879f9', '#ffffff'];

  // Left cannon
  confetti({
    particleCount: 40,
    angle: 60,
    spread: 55,
    origin: { x: 0.1, y: 0.7 },
    colors: colors,
    shapes: ['circle', 'square'],
    scalar: 1.1,
  });

  // Right cannon
  confetti({
    particleCount: 40,
    angle: 120,
    spread: 55,
    origin: { x: 0.9, y: 0.7 },
    colors: colors,
    shapes: ['circle', 'square'],
    scalar: 1.1,
  });
};

export const triggerHeartConfetti = () => {
  const end = Date.now() + 1.2 * 1000;
  const colors = ['#f43f5e', '#ec4899', '#f472b6', '#fb7185'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

