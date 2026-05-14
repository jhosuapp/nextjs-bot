import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, useReducedMotion } from 'framer-motion';

import { FadeIn } from '@/src/shared/components/motion/FadeIn';
import {
  StaggerGroup,
  StaggerItem,
} from '@/src/shared/components/motion/StaggerGroup';
import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { homeStaticData } from '@/src/features/home/data/home-content';

import styles from './integrations-grid.module.css';

type Props = { t: ITranslations };

const IntegrationsGrid = ({ t }: Props) => {
  const reduce = useReducedMotion();
  const { integrations } = homeStaticData;

  return (
    <section className={styles.section} aria-labelledby="integrations-title">
      <FadeIn className={styles.head}>
        <h2 id="integrations-title" className={styles.title}>
          {t('integrations.title')}
        </h2>
        <p className={styles.description}>{t('integrations.description')}</p>
        <a className={styles.cta} href={integrations.cta.href}>
          {t('integrations.cta')}
        </a>
      </FadeIn>

      <StaggerGroup className={styles.grid} stagger={0.05} amount={0.15}>
        {integrations.logos.map((logo) => (
          <StaggerItem key={logo.name}>
            <motion.div
              className={styles.tile}
              whileHover={reduce ? undefined : { y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <FontAwesomeIcon
                icon={logo.icon}
                className={styles.icon}
                aria-hidden="true"
              />
              <span className={styles.tileLabel}>{logo.name}</span>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
};

export { IntegrationsGrid };
