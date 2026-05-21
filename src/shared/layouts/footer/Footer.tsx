import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';

import { FooterBottom } from '@/src/shared/layouts/footer/bottom/FooterBottom';
import { FooterNav } from '@/src/shared/layouts/footer/nav/FooterNav';

import styles from './footer.module.css';

type FooterProps = { t: ITranslations };

const Footer = ({ t }: FooterProps) => {
  return (
    <footer className={styles.footer} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        {t('footer.heading')}
      </h2>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.divider} aria-hidden="true" />

      <FooterNav t={t} />

      <FooterBottom t={t} />
    </footer>
  );
};

export { Footer };
