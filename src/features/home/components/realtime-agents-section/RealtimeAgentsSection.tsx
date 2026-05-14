'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { FadeIn } from '@/src/shared/components/motion/FadeIn';
import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import type { RealtimeContent } from '@/src/features/home/data/home-content';

import styles from './realtime-agents-section.module.css';

type Props = { content: RealtimeContent };

const RealtimeAgentsSection = ({ content }: Props) => {
  const reduce = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="realtime-title">
      <motion.div
        className={styles.card}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: DURATION.slow, ease: EASE }}
      >
        <motion.span
          className={styles.badge}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: DURATION.fast, ease: EASE, delay: 0.15 }}
        >
          <span className={styles.badgeDot} aria-hidden="true" />
          {content.badge}
        </motion.span>

        <FadeIn as="h2" className={styles.title} delay={0.1}>
          <span id="realtime-title">{content.title}</span>
        </FadeIn>

        <FadeIn className={styles.description} delay={0.2}>
          {content.description}
        </FadeIn>

        <FadeIn delay={0.3} duration="fast">
          <a className={styles.cta} href={content.cta.href}>
            {content.cta.label}
          </a>
        </FadeIn>
      </motion.div>
    </section>
  );
};

export { RealtimeAgentsSection };
