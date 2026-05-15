import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, type JSX } from 'react';

import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { useChatStore } from '@/src/features/bot/stores/chat.store';
import { useBotStore } from '@/src/features/bot/stores/bot.store';

import { ChatBubble } from './ChatBubble';
import { ChatInput } from './ChatInput';
import styles from './chat-panel.module.css';

interface Props {
  t: ITranslations;
}

const ChatPanel = ({ t }: Props): JSX.Element => {
  const messages = useChatStore((s) => s.messages);
  const submitUserText = useChatStore((s) => s.submitUserText);
  const isOpen = useBotStore((s) => s.isChatOpen);
  const toggle = useBotStore((s) => s.toggleChat);
  const state = useBotStore((s) => s.state);

  const listRef = useRef<HTMLUListElement | null>(null);
  const unread = messages.length;

  useEffect(() => {
    if (!isOpen) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [isOpen, messages.length]);

  const disabledInput = state === 'PERMISSION_PENDING' || state === 'ERROR';

  return (
    <>
      <motion.button
        type="button"
        className={styles.fab}
        onClick={toggle}
        aria-label={
          isOpen
            ? (t('chat.closeAria') as string)
            : (t('chat.openAria') as string)
        }
        aria-expanded={isOpen}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
      >
        <FontAwesomeIcon icon={isOpen ? faXmark : faComments} aria-hidden="true" />
        {!isOpen && unread > 0 ? (
          <span className={styles.badge} aria-hidden="true">{unread}</span>
        ) : null}
      </motion.button>

      <AnimatePresence>
        {isOpen ? (
          <motion.aside
            className={styles.panel}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: DURATION.fast, ease: EASE }}
            aria-label={t('chat.title') as string}
          >
            <header className={styles.header}>
              <h3 className={styles.title}>{t('chat.title')}</h3>
              <button
                type="button"
                className={styles.close}
                onClick={toggle}
                aria-label={t('chat.closeAria') as string}
              >
                <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
              </button>
            </header>

            <ul className={styles.list} ref={listRef}>
              {messages.length === 0 ? (
                <li className={styles.empty}>{t('chat.empty')}</li>
              ) : (
                messages.map((m) => (
                  <ChatBubble
                    key={m.id}
                    message={m}
                    youLabel={t('chat.you') as string}
                    botLabel={t('chat.bot') as string}
                  />
                ))
              )}
            </ul>

            <ChatInput t={t} disabled={disabledInput} onSubmit={submitUserText} />
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export { ChatPanel };
