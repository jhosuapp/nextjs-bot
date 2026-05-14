import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, useReducedMotion } from 'framer-motion';

import { FadeIn } from '@/src/shared/components/motion/FadeIn';
import {
  StaggerGroup,
  StaggerItem,
} from '@/src/shared/components/motion/StaggerGroup';
import type { IntegrationsContent } from '@/src/features/home/data/home-content';

import styles from './integrations-grid.module.css';

type Props = { content: IntegrationsContent };

const IntegrationsGrid = ({ content }: Props) => {
  const reduce = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="integrations-title">
      <FadeIn className={styles.head}>
        <h2 id="integrations-title" className={styles.title}>
          {content.title}
        </h2>
        <p className={styles.description}>{content.description}</p>
        <a className={styles.cta} href={content.cta.href}>
          {content.cta.label}
        </a>
      </FadeIn>

      <StaggerGroup className={styles.grid} stagger={0.05} amount={0.15}>
        {content.logos.map((logo) => (
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
