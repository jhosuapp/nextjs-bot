'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faChevronDown,
  faEarthAmericas,
} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useId, useRef, useState } from 'react';

import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import {
  useLanguageStore,
  type Locale,
} from '@/src/shared/stores/language.store';

import type { LanguageOption } from './header-content';
import styles from './language-dropdown.module.css';

type Props = { languages: ReadonlyArray<LanguageOption> };

const LanguageDropdown = ({ languages }: Props) => {
  const reduce = useReducedMotion();
  const { locale, setLocale, hydrate } = useLanguageStore();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (
        menuRef.current?.contains(e.target as Node) ||
        triggerRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const handleSelect = (next: Locale) => {
    setLocale(next);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const current = languages.find((l) => l.code === locale) ?? languages[0];

  return (
    <div className={styles.root}>
      <motion.button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Current language: ${current.native}. Change language`}
        onClick={() => setOpen((v) => !v)}
        whileHover={reduce ? undefined : { y: -1 }}
        whileTap={reduce ? undefined : { scale: 0.96 }}
        transition={{ duration: 0.15 }}
      >
        <FontAwesomeIcon
          icon={faEarthAmericas}
          className={styles.globe}
          aria-hidden="true"
        />
        <span className={styles.code}>{current.label}</span>
        <motion.span
          className={styles.chevron}
          animate={{ rotate: open ? 180 : 0 }}
          transition={
            reduce ? { duration: 0 } : { duration: 0.2, ease: EASE }
          }
          aria-hidden="true"
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={menuRef}
            id={menuId}
            role="listbox"
            aria-label="Language"
            className={styles.menu}
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: -6, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: -6, scale: 0.96 }
            }
            transition={{ duration: DURATION.fast, ease: EASE }}
          >
            {languages.map((lang) => {
              const active = lang.code === locale;
              return (
                <button
                  key={lang.code}
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={styles.option}
                  data-active={active}
                  onClick={() => handleSelect(lang.code)}
                >
                  <span className={styles.optionCode}>{lang.label}</span>
                  <span className={styles.optionNative}>{lang.native}</span>
                  {active ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={styles.optionCheck}
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export { LanguageDropdown };
