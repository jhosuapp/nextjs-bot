import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { useEffect } from 'react';

import type { Theme } from '@/src/shared/stores/theme.store';
import { useThemeStore } from '@/src/shared/stores/theme.store';

import styles from './theme-transition-overlay.module.css';

// Matches globals.css --background tokens exactly
const BG: Record<Theme, string> = {
  light: '#ffffff',
  dark: '#060810',
};

type InnerProps = {
  next: Theme;
  x: number;
  y: number;
  onCommit: () => void;
  onClear: () => void;
};

const Inner = ({ next, x, y, onCommit, onClear }: InnerProps) => {
  const radius = useMotionValue(0);
  const opacity = useMotionValue(1);

  // Clip-path derived from the animating radius
  const clipPath = useTransform(radius, (r) => `circle(${r}px at ${x}px ${y}px)`);

  // Radius large enough to guarantee the circle covers every corner of the screen
  const maxRadius =
    Math.sqrt(
      Math.pow(Math.max(x, window.innerWidth - x), 2) +
        Math.pow(Math.max(y, window.innerHeight - y), 2),
    ) + 60;

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      // Phase 1 — spring expansion from the toggle button
      // Slight overshoot gives it weight and feel ("resorte")
      await animate(radius, maxRadius, {
        type: 'spring',
        stiffness: 65,
        damping: 14,
        mass: 1.1,
      });
      if (cancelled) return;

      // Apply theme while the overlay fully covers the screen
      onCommit();
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (cancelled) return;

      // Phase 2 — fade out: circle stays large so the boundary is off-screen,
      // only opacity dissolves. Page underneath already shows the new theme,
      // so the fade is invisible — smooth and clean.
      await animate(opacity, 0, {
        duration: 0.38,
        ease: [0.33, 1, 0.68, 1],
      });
      if (cancelled) return;

      onClear();
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      className={styles.overlay}
      style={{ clipPath, opacity, backgroundColor: BG[next] }}
      aria-hidden="true"
    />
  );
};

const ThemeTransitionOverlay = () => {
  const transition = useThemeStore((s) => s.transition);
  const commitTheme = useThemeStore((s) => s.commitTheme);
  const clearTransition = useThemeStore((s) => s.clearTransition);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!transition?.active || !reduce) return;
    commitTheme(transition.next);
    clearTransition();
  }, [transition, reduce, commitTheme, clearTransition]);

  if (!transition?.active || reduce) return null;

  return (
    <Inner
      next={transition.next}
      x={transition.x}
      y={transition.y}
      onCommit={() => commitTheme(transition.next)}
      onClear={clearTransition}
    />
  );
};

export { ThemeTransitionOverlay };
