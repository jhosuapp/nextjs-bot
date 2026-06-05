import type { JSX } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { Text } from '@/src/shared/components/text/Text';
import { StaggerGroup, StaggerItem } from '@/src/shared/components/motion/StaggerGroup';
import { channelsStaticData } from '@/src/features/trust/data/trust-content';

import styles from './channels-grid.module.css';

type ChannelsGridProps = { t: ITranslations };

const ChannelsGrid = ({ t }: ChannelsGridProps): JSX.Element => {
  const reduce = useReducedMotion();

  return (
    <section id="canales" className={styles.section}>
      <div className={styles.header}>
        <Text
          tag="p"
          variant="description_xs"
          color="primary"
          weight="semibold"
          delay={{ enter: 0, exit: 0 }}
          fadeUpTertiary
        >
          {t('channels.eyebrow') as string}
        </Text>
        <Text
          tag="h2"
          variant="title_small"
          color="secondary"
          weight="bold"
          delay={{ enter: 0, exit: 0 }}
          fadeUpTertiary
        >
          {t('channels.title') as string}
        </Text>
        <Text
          tag="p"
          variant="description"
          color="muted"
          delay={{ enter: 0, exit: 0 }}
          fadeUpTertiary
        >
          {t('channels.description') as string}
        </Text>
      </div>

      <StaggerGroup className={styles.grid} stagger={0.05} amount={0.15}>
        {channelsStaticData.map((channel) => (
          <StaggerItem key={channel.key}>
            <motion.div
              className={styles.tile}
              whileHover={reduce ? undefined : { y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <FontAwesomeIcon
                icon={channel.icon}
                className={styles.icon}
                aria-hidden="true"
              />
              <span className={styles.label}>
                {t(`channels.items.${channel.key}`) as string}
              </span>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
};

export { ChannelsGrid };
