import { motion, useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';

import { Container } from '@/src/features/home/components/container/Container';
import { fadeUp } from '@/src/shared/helpers/motion-variants';
import { RichText } from '@/src/shared/components/rich-text/RichText';
import type { RichTextBlock } from '@/src/shared/components/rich-text/RichText';

import styles from './legal-document.module.css';

type LegalDocumentProps = {
  title: string;
  lastUpdated: string;
  blocks: RichTextBlock[];
};

const LegalDocument = ({ title, lastUpdated, blocks }: LegalDocumentProps): JSX.Element => {
  const reduce = useReducedMotion();

  const heroVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : fadeUp;

  return (
    <main className={styles.root}>
      <div className={styles.hero}>
        <Container>
          <motion.div
            className={styles.heroInner}
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroMeta}>{lastUpdated}</p>
          </motion.div>
        </Container>
      </div>

      <div className={styles.content}>
        <Container>
          <div className={styles.contentInner}>
            <RichText blocks={blocks} />
          </div>
        </Container>
      </div>
    </main>
  );
};

export { LegalDocument };
