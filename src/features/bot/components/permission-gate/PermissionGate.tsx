import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import type { JSX } from 'react';

import { Button } from '@/src/shared/components/button/Button';
import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import type { MicPermission } from '@/src/features/bot/stores/bot.store';

import styles from './permission-gate.module.css';

interface Props {
  t: ITranslations;
  permission: MicPermission;
  onRequest: () => void;
}

const PermissionGate = ({ t, permission, onRequest }: Props): JSX.Element => {
  const isDenied = permission === 'denied';

  return (
    <motion.div
      className={styles.root}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION.base, ease: EASE }}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.card}>
        <span className={styles.iconWrap} data-denied={isDenied}>
          <FontAwesomeIcon
            icon={isDenied ? faMicrophoneSlash : faMicrophone}
            aria-hidden="true"
          />
        </span>
        <h2 className={styles.title}>
          {isDenied ? t('permission.deniedTitle') : t('permission.title')}
        </h2>
        <p className={styles.description}>
          {isDenied ? t('permission.deniedDescription') : t('permission.description')}
        </p>
        <Button
          text={
            isDenied
              ? (t('permission.retryButton') as string)
              : (t('permission.allowButton') as string)
          }
          style="primary"
          type="button"
          onClick={onRequest}
        />
      </div>
    </motion.div>
  );
};

export { PermissionGate };
