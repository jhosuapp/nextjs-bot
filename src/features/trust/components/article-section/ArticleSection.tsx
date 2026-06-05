import type { JSX, ReactNode } from 'react';

import { Text } from '@/src/shared/components/text/Text';

import styles from './article-section.module.css';

type ArticleSectionProps = {
  title: string;
  children: ReactNode;
};

const ArticleSection = ({ title, children }: ArticleSectionProps): JSX.Element => (
  <section className={styles.section}>
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
