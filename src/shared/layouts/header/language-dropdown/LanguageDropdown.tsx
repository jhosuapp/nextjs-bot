import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faChevronDown,
  faEarthAmericas,
} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useId, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { headerStaticData } from '../header-content';

import styles from './language-dropdown.module.css';

type LanguageDropdownProps = { t: ITranslations };

const LanguageDropdown = ({ t }: LanguageDropdownProps) => {
  const reduce = useReducedMotion();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();

  const currentLocale = router.locale ?? 'es';
  const languages = headerStaticData.languages;
  const current = languages.find((l) => l.code === currentLocale) ?? languages[0];

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

  const handleSelect = (code: string) => {
    router.push(router.pathname, router.asPath, { locale: code });
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <motion.button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={t('header.changeLanguageAria', { native: current.native }) as string}
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
            aria-label={t('header.languageListAria') as string}
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
              const active = lang.code === currentLocale;
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
