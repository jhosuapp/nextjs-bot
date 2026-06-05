import type { JSX } from 'react';

import { FadeIn } from '@/src/shared/components/motion/FadeIn';

import styles from './pull-quote.module.css';

type PullQuoteProps = {
  quote: string;
  accent?: string;
};

const PullQuote = ({ quote, accent }: PullQuoteProps): JSX.Element => (
  <FadeIn as="blockquote" className={styles.quote} y={16}>
    <p className={styles.text}>{quote}</p>
    {accent ? (
      <span className={`${styles.accent} gl-degradete-text`}>{accent}</span>
    ) : null}
  </FadeIn>
);

export { PullQuote };
