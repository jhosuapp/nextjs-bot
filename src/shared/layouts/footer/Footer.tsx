import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';

import { FooterBottom } from '@/src/shared/layouts/footer/bottom/FooterBottom';
import { FooterNav } from '@/src/shared/layouts/footer/nav/FooterNav';
import { FooterNewsletter } from '@/src/shared/layouts/footer/newsletter/FooterNewsletter';

import styles from './footer.module.css';

type Props = { t: ITranslations };

const Footer = ({ t }: Props) => {
  return (
    <footer className={styles.footer} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        {t('footer.heading')}
      </h2>
      <div className={styles.glow} aria-hidden="true" />

      <FooterNewsletter t={t} />

      <div className={styles.divider} aria-hidden="true" />

      <FooterNav t={t} />

      <FooterBottom t={t} />
    </footer>
  );
};

export { Footer };
