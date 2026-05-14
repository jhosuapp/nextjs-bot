import { motion, useReducedMotion, type Variants } from 'framer-motion';

import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';

import styles from './statement-band.module.css';

type Props = { t: ITranslations };

const parentVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: '60%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

const StatementBand = ({ t }: Props) => {
  const reduce = useReducedMotion();
  const text = t('statement.text') as string;
  const words = text.split(' ');

  if (reduce) {
    return (
      <section className={styles.section} aria-label={t('statement.ariaLabel') as string}>
        <p className={styles.text}>{text}</p>
      </section>
    );
  }

  return (
    <section className={styles.section} aria-label={t('statement.ariaLabel') as string}>
      <motion.p
        className={styles.text}
        variants={parentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className={styles.wordWrapper}>
            <motion.span variants={wordVariants} className={styles.word}>
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.p>
    </section>
  );
};

export { StatementBand };
