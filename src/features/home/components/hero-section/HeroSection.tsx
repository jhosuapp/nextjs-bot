'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { FadeIn } from '@/src/shared/components/motion/FadeIn';
import {
  StaggerGroup,
  StaggerItem,
} from '@/src/shared/components/motion/StaggerGroup';
import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import type { HeroContent } from '@/src/features/home/data/home-content';

import styles from './hero-section.module.css';

type Props = { content: HeroContent };

const HeroSection = ({ content }: Props) => {
  const reduce = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="hero-title">
      <div className={styles.orbs} aria-hidden="true">
        <motion.span
          className={`${styles.orb} ${styles.orbCyan}`}
          animate={reduce ? undefined : { x: [0, 24, 0], y: [0, -16, 0] }}
          transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.span
          className={`${styles.orb} ${styles.orbTeal}`}
          animate={reduce ? undefined : { x: [0, -28, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.span
          className={`${styles.orb} ${styles.orbWhite}`}
          animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
        />
      </div>

      <div className={styles.inner}>
        <motion.a
          href={content.secondaryCta.href}
          className={styles.eyebrow}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE }}
        >
          <span className={styles.eyebrowBadge}>{content.eyebrowBadge}</span>
          <span className={styles.eyebrowText}>{content.eyebrowText}</span>
          <span className={styles.eyebrowArrow} aria-hidden="true">
            →
          </span>
        </motion.a>

        <h1 id="hero-title" className={styles.title}>
          <FadeIn as="span" className={styles.titleLine} y={20}>
            {content.titleLead}
          </FadeIn>{' '}
          <FadeIn
            as="span"
            className={styles.titleAccent}
            y={20}
            delay={0.1}
          >
            {content.titleAccent}
          </FadeIn>{' '}
          <FadeIn as="span" className={styles.titleLine} y={20} delay={0.2}>
            {content.titleTrail}
          </FadeIn>
        </h1>

        <FadeIn className={styles.subtitle} delay={0.35} y={16}>
          {content.subtitle}
        </FadeIn>

        <StaggerGroup className={styles.ctas} stagger={0.1} amount={0.5}>
          <StaggerItem>
            <motion.a
              href={content.primaryCta.href}
              className={`${styles.cta} ${styles.ctaPrimary}`}
              whileHover={reduce ? undefined : { y: -1 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {content.primaryCta.label}
              <span aria-hidden="true" className={styles.ctaArrow}>
                →
              </span>
            </motion.a>
          </StaggerItem>
          <StaggerItem>
            <motion.a
              href={content.secondaryCta.href}
              className={`${styles.cta} ${styles.ctaSecondary}`}
              whileHover={reduce ? undefined : { y: -1 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <span className={styles.playIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              {content.secondaryCta.label}
            </motion.a>
          </StaggerItem>
        </StaggerGroup>

        <FadeIn className={styles.trustNote} delay={0.6} y={8} duration="fast">
          {content.trustNote}
        </FadeIn>

        <motion.div
          className={styles.mockup}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: DURATION.slow,
            ease: EASE,
            delay: 0.5,
          }}
        >
          <div className={styles.mockupGlow} aria-hidden="true" />
          <div className={styles.mockupCard}>
            <div className={styles.mockupChrome}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.mockupUrl}>lumina.ai / studio</span>
            </div>
            <div className={styles.mockupBody}>
              <div className={styles.avatarTile} aria-hidden="true">
                <div className={styles.avatarRing}>
                  <motion.span
                    className={styles.avatarPulse}
                    animate={
                      reduce
                        ? undefined
                        : { scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }
                    }
                    transition={{ duration: 2.4, ease: 'easeOut', repeat: Infinity }}
                  />
                </div>
                <div className={styles.avatarBars}>
                  {[28, 44, 18, 36, 22, 40, 30, 50, 24].map((h, i) => (
                    <motion.span
                      key={i}
                      className={styles.bar}
                      style={{ height: `${h}%` }}
                      animate={
                        reduce
                          ? undefined
                          : { scaleY: [1, h > 30 ? 1.4 : 0.6, 1] }
                      }
                      transition={{
                        duration: 1.2,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        delay: i * 0.08,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.mockupCopy}>
                <span className={styles.mockupLabel}>LIVE · Avatar Studio</span>
                <p className={styles.mockupLine}>
                  &ldquo;Hi Marina — your weekly insights are ready, let&rsquo;s walk through them.&rdquo;
                </p>
                <div className={styles.mockupMeta}>
                  <span className={styles.metaDot} />
                  <span>Streaming · 24 fps</span>
                  <span className={styles.metaSep}>·</span>
                  <span>Spanish (ES) → English (US)</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.kpis} aria-label="Platform highlights">
            {content.highlights.map((h) => (
              <div key={h.label} className={styles.kpi}>
                <span className={styles.kpiValue}>{h.value}</span>
                <span className={styles.kpiLabel}>{h.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { HeroSection };
