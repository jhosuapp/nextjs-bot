import type { JSX } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { Text } from '@/src/shared/components/text/Text';
import { FadeIn } from '@/src/shared/components/motion/FadeIn';

import styles from './comparison-section.module.css';

type ComparisonSectionProps = { t: ITranslations };

const ComparisonSection = ({ t }: ComparisonSectionProps): JSX.Element => {
  const corporativo = t('comparison.corporativo.items', { returnObjects: true }) as string[];
  const aiNative = t('comparison.aiNative.items', { returnObjects: true }) as string[];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <Text
          tag="p"
          variant="description_xs"
          color="primary"
          weight="semibold"
          delay={{ enter: 0, exit: 0 }}
          fadeUpTertiary
        >
          {t('comparison.eyebrow') as string}
        </Text>
        <Text
          tag="h2"
          variant="title_small"
          color="secondary"
          weight="bold"
          delay={{ enter: 0, exit: 0 }}
          fadeUpTertiary
        >
          {t('comparison.title') as string}
        </Text>
      </div>

      <div className={styles.grid}>
        <FadeIn className={`${styles.card} ${styles.cardMuted}`} y={20}>
          <p className={styles.label}>{t('comparison.corporativo.label') as string}</p>
          <ul className={styles.list}>
            {corporativo.map((item) => (
              <li key={item} className={styles.item}>
                <FontAwesomeIcon
                  icon={faXmark}
                  className={styles.iconNeg}
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn className={`${styles.card} ${styles.cardAccent}`} y={20} delay={0.08}>
          <div className={styles.cardGlow} aria-hidden="true" />
          <p className={styles.labelAccent}>{t('comparison.aiNative.label') as string}</p>
          <ul className={styles.list}>
            {aiNative.map((item) => (
              <li key={item} className={styles.item}>
                <FontAwesomeIcon
                  icon={faCheck}
                  className={styles.iconPos}
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
};

export { ComparisonSection };
