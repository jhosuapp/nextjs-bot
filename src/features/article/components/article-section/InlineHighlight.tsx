import type { JSX } from 'react';

import { Text } from '@/src/shared/components/text/Text';

import styles from './article-section.module.css';

type InlineHighlightProps = {
  lead: string;
  term: string;
  trail: string;
};

const InlineHighlight = ({ lead, term, trail }: InlineHighlightProps): JSX.Element => (
  <Text
    tag="p"
    variant="description"
    color="muted"
    delay={{ enter: 0, exit: 0 }}
    fadeUpTertiary
  >
    {lead}
    <strong className={styles.highlight}>{term}</strong>
    {trail}
  </Text>
);

export { InlineHighlight };
