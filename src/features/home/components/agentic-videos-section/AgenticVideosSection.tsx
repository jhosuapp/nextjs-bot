import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { motion, useReducedMotion } from 'framer-motion';

import {
  StaggerGroup,
  StaggerItem,
} from '@/src/shared/components/motion/StaggerGroup';
import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { homeStaticData } from '@/src/features/home/data/home-content';

import styles from './agentic-videos-section.module.css';
import { Text } from '../text/Text';

type AgenticVideosSectionProps = { t: ITranslations };

const AgenticVideosSection = ({ t }: AgenticVideosSectionProps) => {
  const reduce = useReducedMotion();
  const { agentic } = homeStaticData;

  return (
    <section className={styles.section} aria-labelledby="agentic-title">
      <div className={styles.inner}>
        <motion.div
          className={styles.media}
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: DURATION.slow, ease: EASE }}
          aria-label={t('agentic.mediaAlt') as string}
        >
          <div className={styles.mediaInner} aria-hidden="true">
            <FontAwesomeIcon icon={agentic.icon} className={styles.mediaIcon} />
            <button
              type="button"
              className={styles.playButton}
              aria-label={t('agentic.playAria') as string}
            >
              <FontAwesomeIcon icon={faPlay} />
            </button>
          </div>
        </motion.div>

        <StaggerGroup className={styles.copy} stagger={0.1} amount={0.3}>
          <Text
            className={styles.eyebrow}
            tag='p'
            variant='description_small'
            color='primary'
            weight='semibold'
            fadeUpTertiary
            staggerItem
          >
            {t('agentic.eyebrow')}
          </Text>
          <Text
            className={styles.title}
            tag='h2'
            variant='title_small'
            color='secondary'
            weight='bold'
            fadeUpTertiary
            staggerItem
          >
            {t('agentic.title')}
          </Text>
          <Text
            className={styles.description}
            tag='p'
            variant='description'
            color='muted'
            fadeUpTertiary
            staggerItem
          >
            {t('agentic.description')}
          </Text>
          <StaggerItem>
            <a className={styles.cta} href={agentic.cta.href}>
              <span>{t('agentic.cta')}</span>
              <span aria-hidden="true">→</span>
            </a>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
};

export { AgenticVideosSection };
