'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';

import { headerContent } from './header-content';
import { HeaderBrand } from './HeaderBrand';
import { HeaderNavList } from './HeaderNavList';
import { LanguageDropdown } from './LanguageDropdown';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';
import styles from './header.module.css';

const Header = () => {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  return (
    <motion.header
      className={styles.header}
      data-scrolled={scrolled}
      data-menu-open={menuOpen}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.base, ease: EASE }}
    >
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      <div className={styles.inner}>
        <HeaderBrand brand={headerContent.brand} />

        <nav className={styles.navDesktop} aria-label="Primary">
          <HeaderNavList items={headerContent.nav} variant="desktop" />
        </nav>

        <div className={styles.actions}>
          <div className={styles.controls}>
            <ThemeToggle />
            <LanguageDropdown languages={headerContent.languages} />
          </div>

          <div className={styles.ctas}>
            <a href={headerContent.secondaryCta.href} className={styles.signIn}>
              {headerContent.secondaryCta.label}
            </a>
            <a href={headerContent.primaryCta.href} className={styles.primaryCta}>
              {headerContent.primaryCta.label}
              <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
            </a>
          </div>

          <MobileMenu
            open={menuOpen}
            onClose={closeMenu}
            onToggle={toggleMenu}
            content={headerContent}
          />
        </div>
      </div>
    </motion.header>
  );
};

export { Header };
