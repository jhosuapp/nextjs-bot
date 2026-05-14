'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { useReducedMotion } from 'framer-motion';
import { useId, useState, type FormEvent } from 'react';

import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import type { FooterNewsletter as FooterNewsletterContent } from '@/src/shared/layouts/footer/footer-content';

import styles from './footer-newsletter.module.css';
import { Button } from '@/src/shared/components/button/Button';

type Props = { content: FooterNewsletterContent };

type Status = 'idle' | 'loading' | 'success' | 'error';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FooterNewsletter = ({ content }: Props) => {
  const reduce = useReducedMotion();
  const inputId = useId();
  const errorId = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'loading' || status === 'success') return;

    if (!EMAIL_REGEX.test(email.trim())) {
      setError('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setError(null);
    setStatus('loading');
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus('success');
  };

  const isLocked = status === 'loading' || status === 'success';

  return (
    <div className={styles.root}>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>{content.eyebrow}</span>
        <h2 className={styles.title}>{content.title}</h2>
        <p className={styles.description}>{content.description}</p>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
        aria-describedby={error ? errorId : undefined}
      >
        <label htmlFor={inputId} className={styles.label}>
          Email address
        </label>

        <div className={styles.field} data-status={status}>
          <FontAwesomeIcon
            icon={faEnvelope}
            className={styles.fieldIcon}
            aria-hidden="true"
          />
          <input
            id={inputId}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            required
            disabled={isLocked}
            placeholder={content.placeholder}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') {
                setStatus('idle');
                setError(null);
              }
            }}
            className={styles.input}
            aria-invalid={status === 'error'}
            aria-describedby={error ? errorId : undefined}
          />
          <Button
            text={`${status === 'success' ? 'Subscribed' : 'Submit'}`}
            style="secondary"
            type="submit"
            isLoad={status === 'loading'}
            disabled={isLocked}
            iconRight={status === 'success' ? faCheck : undefined}
          />
        </div>

        <div className={styles.meta}>
          <p
            id={errorId}
            className={styles.error}
            role={status === 'error' ? 'alert' : undefined}
            aria-live="polite"
          >
            {status === 'error' ? error : ''}
          </p>
          <p className={styles.success} aria-live="polite">
            {status === 'success' ? content.successMessage : ''}
          </p>
          <p className={styles.privacy}>{content.privacy}</p>
        </div>
      </form>
    </div>
  );
};

export { FooterNewsletter };
