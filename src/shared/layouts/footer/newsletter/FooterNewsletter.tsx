'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faCircleNotch,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useId, useState, type FormEvent } from 'react';

import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import type { FooterNewsletter as FooterNewsletterContent } from '@/src/shared/layouts/footer/footer-content';

import styles from './footer-newsletter.module.css';

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
          <motion.button
            type="submit"
            className={styles.submit}
            disabled={isLocked}
            whileHover={reduce || isLocked ? undefined : { y: -1 }}
            whileTap={reduce || isLocked ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === 'success' ? (
                <motion.span
                  key="ok"
                  className={styles.submitInner}
                  initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                  transition={{ duration: DURATION.fast, ease: EASE }}
                >
                  <FontAwesomeIcon icon={faCheck} aria-hidden="true" />
                  Subscribed
                </motion.span>
              ) : status === 'loading' ? (
                <motion.span
                  key="loading"
                  className={styles.submitInner}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <FontAwesomeIcon
                    icon={faCircleNotch}
                    className={styles.spinner}
                    aria-hidden="true"
                  />
                  <span className="sr-only">Subscribing</span>
                </motion.span>
              ) : (
                <motion.span
                  key="cta"
                  className={styles.submitInner}
                  initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                  transition={{ duration: DURATION.fast, ease: EASE }}
                >
                  {content.cta}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
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
