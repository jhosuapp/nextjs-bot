import { AnimatePresence, motion } from 'framer-motion';
import type { JSX } from 'react';

import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import type { StatusKey } from '@/src/features/bot/data/bot-content';

import styles from './status-indicator.module.css';

interface Props {
  t: ITranslations;
  statusKey: StatusKey | null;
}

const StatusIndicator = ({ t, statusKey }: Props): JSX.Element => {
  return (
    <AnimatePresence mode="wait">
      {statusKey ? (
        <motion.div
          key={statusKey}
          className={styles.root}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: DURATION.fast, ease: EASE }}
          role="status"
          aria-live="polite"
        >
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.text}>{t(`status.${statusKey}`)}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export { StatusIndicator };
