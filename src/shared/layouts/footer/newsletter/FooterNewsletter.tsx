import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { useId, useState, type FormEvent } from 'react';

import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { Button } from '@/src/shared/components/button/Button';

import styles from './footer-newsletter.module.css';

type FooterNewsletterProps = { t: ITranslations };
type Status = 'idle' | 'loading' | 'success' | 'error';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FooterNewsletter = ({ t }: FooterNewsletterProps) => {
  const inputId = useId();
  const errorId = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'loading' || status === 'success') return;

    if (!EMAIL_REGEX.test(email.trim())) {
      setError(t('footer.newsletter.emailError') as string);
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
        <span className={styles.eyebrow}>{t('footer.newsletter.eyebrow')}</span>
        <h2 className={styles.title}>{t('footer.newsletter.title')}</h2>
        <p className={styles.description}>{t('footer.newsletter.description')}</p>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
        aria-describedby={error ? errorId : undefined}
      >
        <label htmlFor={inputId} className={styles.label}>
          {t('footer.newsletter.emailLabel')}
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
            placeholder={t('footer.newsletter.placeholder') as string}
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
            text={status === 'success'
              ? (t('footer.newsletter.subscribedLabel') as string)
              : (t('footer.newsletter.cta') as string)
            }
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
            {status === 'success' ? t('footer.newsletter.successMessage') : ''}
          </p>
          <p className={styles.privacy}>{t('footer.newsletter.privacy')}</p>
        </div>
      </form>
    </div>
  );
};

export { FooterNewsletter };
