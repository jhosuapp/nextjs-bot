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
import { Button } from '@/src/shared/components/button/Button';
import { Container } from '../container/Container';
import { Text } from '@/src/shared/components/text/Text';

type IntegrationsGridProps = { t: ITranslations };

const IntegrationsGrid = ({ t }: IntegrationsGridProps) => {
  const reduce = useReducedMotion();
  const { integrations } = homeStaticData;

  return (
    <section className={styles.section} aria-labelledby="integrations-title">
      <Container padding='xl'>
        <FadeIn className={styles.head}>
          <Text
            className={styles.title}
            tag="h2" 
            variant="title_small" 
            color="secondary"
            weight="semibold"
            delay={{ enter: 0.1, exit: 0 }}
            fadeUpTertiary
          >
            {t('integrations.title')}
          </Text>
          <Text
            className={styles.description}
            tag="p" 
            variant="description" 
            color="muted"
            delay={{ enter: 0.15, exit: 0 }}
            fadeUpTertiary
          >
            {t('integrations.description')}
          </Text>
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
      </Container>
    </section>
  );
};

export { IntegrationsGrid };