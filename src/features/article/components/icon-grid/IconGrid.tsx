import type { JSX } from 'react';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { motion, useReducedMotion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { Text } from '@/src/shared/components/text/Text';
import { StaggerGroup, StaggerItem } from '@/src/shared/components/motion/StaggerGroup';

import styles from './icon-grid.module.css';

type IconGridItem = { key: string; icon: IconDefinition };

type IconGridProps = {
  t: ITranslations;
  tKey: string;
  items: ReadonlyArray<IconGridItem>;
  id?: string;
};

const IconGrid = ({ t, tKey, items, id }: IconGridProps): JSX.Element => {
  const reduce = useReducedMotion();

  return (
    <section id={id} className={styles.section}>
      <div className={styles.header}>
        <Text
          tag="p"
          variant="description_xs"
          color="primary"
          weight="semibold"
          delay={{ enter: 0, exit: 0 }}
          fadeUpTertiary
        >
          {t(`${tKey}.eyebrow`) as string}
        </Text>
        <Text
          tag="h2"
          variant="title_small"
          color="secondary"
          weight="bold"
          delay={{ enter: 0, exit: 0 }}
          fadeUpTertiary
        >
          {t(`${tKey}.title`) as string}
        </Text>
        <Text
          tag="p"
          variant="description"
          color="muted"
          delay={{ enter: 0, exit: 0 }}
          fadeUpTertiary
        >
          {t(`${tKey}.description`) as string}
        </Text>
      </div>

      <StaggerGroup className={styles.grid} stagger={0.05} amount={0.15}>
        {items.map((item) => (
          <StaggerItem key={item.key}>
            <motion.div
              className={styles.tile}
              whileHover={reduce ? undefined : { y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={styles.icon}
                aria-hidden="true"
              />
              <span className={styles.label}>
                {t(`${tKey}.items.${item.key}`) as string}
              </span>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
};

export { IconGrid };
export type { IconGridItem };
