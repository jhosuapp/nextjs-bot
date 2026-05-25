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
    <>
    {statusKey ? (
      <div
        className={`${styles.root} gl-dropshadow`}
        role="status"
        aria-live="polite"
      >
        <span className={'gl-dot'} aria-hidden="true" />
          <AnimatePresence mode="wait">
            <motion.span 
              transition={{ duration: DURATION.base, ease: EASE }}
              key={statusKey}
              initial={{ opacity: 0, y: 9.9 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -9.9 }}
              className={'gl-label'}
            >{t(`status.${statusKey}`)}</motion.span>
          </AnimatePresence>
      </div>
      ) : null}
    </>
  );
};

export { StatusIndicator };
