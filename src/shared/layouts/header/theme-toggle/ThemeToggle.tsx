import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';

import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { useThemeStore } from '@/src/shared/stores/theme.store';

import styles from './theme-toggle.module.css';

type Props = { t: ITranslations };

const ThemeToggle = ({ t }: Props) => {
  const reduce = useReducedMotion();
  const btnRef = useRef<HTMLButtonElement>(null);
  const { theme, hydrated, toggleTheme, hydrate, triggerTransition } = useThemeStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const handleClick = useCallback(() => {
    if (reduce) {
      toggleTheme();
      return;
    }
    const rect = btnRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : 40;
    triggerTransition(x, y);
  }, [reduce, toggleTheme, triggerTransition]);

  const isDark = theme === 'dark';
  const nextLabel = isDark
    ? (t('header.themeToggle.toLightAria') as string)
    : (t('header.themeToggle.toDarkAria') as string);

  return (
    <motion.button
      ref={btnRef}
      type="button"
      className={styles.root}
      onClick={handleClick}
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
