import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophone,
  faPlay,
  faStop,
} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { JSX } from 'react';

import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import type { BotState } from '@/src/features/bot/stores/bot.store';

import { VoiceIndicator } from './VoiceIndicator';
import styles from './voice-control.module.css';

interface Props {
  t: ITranslations;
  state: BotState;
  isListening: boolean;
  onStart: () => void;
  onInterrupt: () => void;
}

const VoiceControl = ({
  t,
  state,
  isListening,
  onStart,
  onInterrupt,
}: Props): JSX.Element | null => {
  const reduce = useReducedMotion();

  if (state === 'PERMISSION_PENDING' || state === 'ERROR') return null;

  const handleClick = () => {
    if (state === 'IDLE') onStart();
    else onInterrupt();
  };

  const label =
    state === 'IDLE'
      ? (t('idle.ctaStart') as string)
      : state === 'LISTENING'
        ? (t('listening.instruction') as string)
        : (t('listening.interruptHint') as string);

  const icon =
    state === 'IDLE'
      ? faPlay
      : state === 'LISTENING' || state === 'INTRO' || state === 'RESPONDING'
        ? faMicrophone
        : faStop;
  
  const swap = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: DURATION.fast, ease: EASE },
  };

  return (
    <div className={styles.root}>
      <AnimatePresence mode="wait">
        {state === 'LISTENING' ? (
          <motion.div key="indicator" {...swap}>
            <VoiceIndicator />
          </motion.div>
        ) : (
          <motion.div
            key="control"
            className="flex flex-col items-center gap-3"
            {...swap}
          >
            <motion.button
              type="button"
              className={styles.button}
              onClick={handleClick}
              whileTap={reduce ? undefined : { scale: 0.94 }}
              whileHover={reduce ? undefined : { scale: 1.04 }}
              aria-label={label}
              data-state={state}
              data-listening={isListening}
            >
              <span className={styles.pulseRing} aria-hidden="true" />
              <span className={styles.iconWrap}>
                <FontAwesomeIcon icon={icon} className={styles.icon} aria-hidden="true" />
              </span>
            </motion.button>
            {state !== 'THINKING' && (
              <div className={'gl-dropshadow'}>
                {state !== 'IDLE' && <p className={'gl-label'}>{label}</p>}
                {state === 'IDLE' && (
                  <p className={'gl-label'}>{t('idle.wakeHint')}</p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { VoiceControl };
