import type { JSX } from 'react';

import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { Text } from '@/src/shared/components/text/Text';
import { FadeIn } from '@/src/shared/components/motion/FadeIn';
import { StaggerGroup, StaggerItem } from '@/src/shared/components/motion/StaggerGroup';

import styles from './key-takeaways.module.css';

type KeyTakeawaysProps = { t: ITranslations };

const KeyTakeaways = ({ t }: KeyTakeawaysProps): JSX.Element => {
  const items = t('takeaways.items', { returnObjects: true }) as string[];

  return (
    <FadeIn as="aside" className={styles.card} y={24}>
      <div className={styles.glow} aria-hidden="true" />
      <Text
        className={styles.title}
        tag="h2"
        variant="subtitle_small"
        color="secondary"
        weight="bold"
        delay={{ enter: 0, exit: 0 }}
        immediate
      >
        {t('takeaways.title') as string}
      </Text>

      <StaggerGroup className={styles.list} as="ul" stagger={0.08} amount={0.2}>
        {items.map((item, index) => (
          <StaggerItem key={index} as="li" className={styles.item}>
            <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
            <span className={styles.text}>{item}</span>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </FadeIn>
  );
};

export { KeyTakeaways };
