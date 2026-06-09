import type { JSX, ReactNode } from 'react';

import { Text } from '@/src/shared/components/text/Text';
import { FadeIn } from '@/src/shared/components/motion/FadeIn';

import styles from './article-section.module.css';

type ArticleSectionProps = {
  title: string;
  children: ReactNode;
  id?: string;
  index?: string;
  eyebrow?: string;
};

const ArticleSection = ({
  title,
  children,
  id,
  index,
  eyebrow,
}: ArticleSectionProps): JSX.Element => (
  <section id={id} className={styles.section}>
    {index || eyebrow ? (
      <FadeIn className={styles.kicker} y={12} duration="fast">
        {index ? <span className={styles.index}>{index}</span> : null}
        {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      </FadeIn>
    ) : null}

    <Text
      className={styles.title}
      tag="h2"
      variant="title_small"
      color="secondary"
      weight="bold"
      delay={{ enter: 0, exit: 0 }}
      fadeUpTertiary
    >
      {title}
    </Text>
    {children}
  </section>
);

export { ArticleSection };
