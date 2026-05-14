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

type Props = { t: ITranslations };

const AgenticVideosSection = ({ t }: Props) => {
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
          <StaggerItem as="span" className={styles.eyebrow}>
            {t('agentic.eyebrow')}
          </StaggerItem>
          <StaggerItem as="h2" className={styles.title}>
            <span id="agentic-title">{t('agentic.title')}</span>
          </StaggerItem>
          <StaggerItem as="p" className={styles.description}>
            {t('agentic.description')}
          </StaggerItem>
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
