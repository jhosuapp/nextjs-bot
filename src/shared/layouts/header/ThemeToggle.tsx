'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';

import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import { useThemeStore } from '@/src/shared/stores/theme.store';

import styles from './theme-toggle.module.css';

const ThemeToggle = () => {
  const reduce = useReducedMotion();
  const { theme, hydrated, toggleTheme, hydrate } = useThemeStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const isDark = theme === 'dark';
  const nextLabel = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <motion.button
      type="button"
      className={styles.root}
      onClick={toggleTheme}
      aria-label={nextLabel}
      title={nextLabel}
      aria-pressed={isDark}
      whileHover={reduce ? undefined : { y: -1 }}
      whileTap={reduce ? undefined : { scale: 0.94 }}
      transition={{ duration: 0.15 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {hydrated ? (
          <motion.span
            key={isDark ? 'sun' : 'moon'}
            className={styles.iconWrap}
            initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 45, scale: 0.6 }}
            transition={{ duration: DURATION.fast, ease: EASE }}
          >
            <FontAwesomeIcon
              icon={isDark ? faSun : faMoon}
              className={styles.icon}
              aria-hidden="true"
            />
          </motion.span>
        ) : (
          <span className={styles.iconWrap} aria-hidden="true" />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export { ThemeToggle };
