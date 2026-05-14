import { FooterBottom } from '@/src/shared/layouts/footer/bottom/FooterBottom';
import { footerContent } from '@/src/shared/layouts/footer/footer-content';
import { FooterNav } from '@/src/shared/layouts/footer/nav/FooterNav';
import { FooterNewsletter } from '@/src/shared/layouts/footer/newsletter/FooterNewsletter';

import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <div className={styles.glow} aria-hidden="true" />

      <FooterNewsletter content={footerContent.newsletter} />

      <div className={styles.divider} aria-hidden="true" />

      <FooterNav brand={footerContent.brand} content={footerContent.nav} />

      <FooterBottom content={footerContent.bottom} />
    </footer>
  );
};

export { Footer };
