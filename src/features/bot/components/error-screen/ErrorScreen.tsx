import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import type { JSX } from 'react';

import { Button } from '@/src/shared/components/button/Button';
import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';

import styles from './error-screen.module.css';

interface Props {
  t: ITranslations;
  message: string | null;
  onReset: () => void;
}

const ErrorScreen = ({ t, message, onReset }: Props): JSX.Element => (
  <motion.div
    className={styles.root}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: DURATION.fast, ease: EASE }}
    role="alert"
  >
    <div className={styles.card}>
      <span className={styles.iconWrap}>
        <FontAwesomeIcon icon={faTriangleExclamation} aria-hidden="true" />
      </span>
      <h2 className={styles.title}>{t('error.title')}</h2>
      <p className={styles.description}>{t('error.description')}</p>
      {message ? <code className={styles.code}>{message}</code> : null}
      <Button
        text={t('error.resetButton') as string}
        style="primary"
        type="button"
        onClick={onReset}
      />
    </div>
  </motion.div>
);

export { ErrorScreen };
