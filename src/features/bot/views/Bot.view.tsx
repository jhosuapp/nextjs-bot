import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import type { JSX } from 'react';

import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { ChatPanel } from '@/src/features/bot/components/chat-panel/ChatPanel';
import { ErrorScreen } from '@/src/features/bot/components/error-screen/ErrorScreen';
import { InactivityWarning } from '@/src/features/bot/components/inactivity-warning/InactivityWarning';
import { PermissionGate } from '@/src/features/bot/components/permission-gate/PermissionGate';
import { StatusIndicator } from '@/src/features/bot/components/status-indicator/StatusIndicator';
import { VideoStage } from '@/src/features/bot/components/video-stage/VideoStage';
import { VoiceControl } from '@/src/features/bot/components/voice-control/VoiceControl';
import { useBotEngine } from '@/src/features/bot/hooks/useBotEngine';
import { useMicPermission } from '@/src/features/bot/hooks/useMicPermission';
import { useBotStore } from '@/src/features/bot/stores/bot.store';
import { MainContent } from '@/src/shared/components/main-content/MainContent';

import styles from './bot.module.css';

interface Props {
  t: ITranslations;
}

const BotView = ({ t }: Props): JSX.Element => {
  const router = useRouter();
  const locale = router.locale ?? 'es';

  const startWord = (t('wakeWords.start') as string) ?? 'hola';
  const interruptWord = (t('wakeWords.interrupt') as string) ?? 'pregunta';

  const { permission, request } = useMicPermission();
  const engine = useBotEngine({ locale, startWord, interruptWord });

  const statusKey = useBotStore((s) => s.statusKey);
  const errorMessage = useBotStore((s) => s.errorMessage);
  const inactivityWarning = useBotStore((s) => s.inactivityWarning);

  const handleInterrupt = () => {
    if (engine.state === 'INTRO' || engine.state === 'RESPONDING' || engine.state === 'THINKING') {
      useBotStore.getState().setState('LISTENING');
    }
  };

  return (
    <MainContent className={styles.shell}>
      <div className={styles.stageContainer}>
        <VideoStage
          refA={engine.videoPlayer.refA}
          refB={engine.videoPlayer.refB}
          active={engine.videoPlayer.active}
        />

        <div className={styles.toastSlot}>
          <InactivityWarning
            t={t}
            visible={inactivityWarning}
            onDismiss={() => engine.inactivity.reset()}
          />
        </div>

        <div className={styles.controls}>
          {engine.state === 'THINKING' ? (
            <StatusIndicator t={t} statusKey={statusKey} />
          ) : null}
          <VoiceControl
            t={t}
            state={engine.state}
            isListening={engine.speech.isListening}
            onStart={engine.start}
            onInterrupt={handleInterrupt}
          />
        </div>

        <AnimatePresence>
          {engine.state === 'PERMISSION_PENDING' ? (
            <PermissionGate
              key="permission"
              t={t}
              permission={permission}
              onRequest={request}
            />
          ) : null}

          {engine.state === 'ERROR' ? (
            <ErrorScreen
              key="error"
              t={t}
              message={errorMessage}
              onReset={engine.reset}
            />
          ) : null}
        </AnimatePresence>
      </div>

      <ChatPanel t={t} />
    </MainContent>
  );
};

export { BotView };
