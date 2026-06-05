import type { JSX } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

import { FadeIn } from '@/src/shared/components/motion/FadeIn';

import styles from './pull-quote.module.css';

type PullQuoteProps = {
  quote: string;
  accent?: string;
};

const PullQuote = ({ quote, accent }: PullQuoteProps): JSX.Element => (
  <FadeIn as="blockquote" className={styles.quote} y={16}>
    <FontAwesomeIcon
      icon={faQuoteLeft}
      className={styles.mark}
      aria-hidden="true"
    />
    <p className={styles.text}>{quote}</p>
    {accent ? (
      <span className={`${styles.accent} gl-degradete-text`}>{accent}</span>
    ) : null}
  </FadeIn>
);

export { PullQuote };
