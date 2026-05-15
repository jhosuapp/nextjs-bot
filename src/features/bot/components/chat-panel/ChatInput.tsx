import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useState, type FormEvent, type JSX } from 'react';

import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';

import styles from './chat-input.module.css';

interface Props {
  t: ITranslations;
  disabled?: boolean;
  onSubmit: (text: string) => void;
}

const ChatInput = ({ t, disabled = false, onSubmit }: Props): JSX.Element => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setValue('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder={t('chat.placeholder') as string}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        aria-label={t('chat.placeholder') as string}
      />
      <button
        type="submit"
        className={styles.button}
        disabled={disabled || !value.trim()}
        aria-label={t('chat.send') as string}
      >
        <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
      </button>
    </form>
  );
};

export { ChatInput };
