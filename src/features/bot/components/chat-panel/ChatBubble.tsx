import { motion } from 'framer-motion';
import type { JSX } from 'react';

import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import type { ChatMessage } from '@/src/features/bot/stores/chat.store';

import styles from './chat-bubble.module.css';

interface Props {
  message: ChatMessage;
  youLabel: string;
  botLabel: string;
}

const formatTime = (ts: number): string => {
  const d = new Date(ts);
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
};

const ChatBubble = ({ message, youLabel, botLabel }: Props): JSX.Element => {
  const isUser = message.role === 'user';
  return (
    <motion.li
      className={`${styles.row} ${isUser ? styles.rowUser : styles.rowBot}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.fast, ease: EASE }}
    >
      <div className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleBot}`}>
        <span className={styles.author}>{isUser ? youLabel : botLabel}</span>
        <p className={styles.text}>{message.text}</p>
        <span className={styles.ts}>{formatTime(message.ts)}</span>
      </div>
    </motion.li>
  );
};

export { ChatBubble };
