import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { footerStaticData } from '@/src/shared/layouts/footer/footer-content';

import styles from './footer-nav.module.css';

type Props = { t: ITranslations };

const FooterNav = ({ t }: Props) => {
  const { brand, nav } = footerStaticData;

  return (
    <div className={styles.root}>
      <div className={styles.brandBlock}>
        <Link
          href="/"
          className={styles.brandMark}
          aria-label={t('footer.brand.homeAria', { name: brand.name }) as string}
        >
          <span className={styles.brandLogo} aria-hidden="true">
            <span className={styles.brandLogoInner}>L</span>
          </span>
          <span className={styles.brandName}>{brand.name}</span>
        </Link>
        <p className={styles.brandTagline}>{t('footer.brand.tagline')}</p>
      </div>

      <nav
        className={styles.columns}
        aria-label={t('footer.nav.ariaLabel') as string}
      >
        {nav.columns.map((column) => (
          <div key={column.key} className={styles.column}>
            <h3 className={styles.columnTitle}>
              {t(`footer.nav.${column.key}.title`)}
            </h3>
            <ul className={styles.list}>
              {column.links.map((link) => (
                <li key={link.key} className={styles.listItem}>
                  <a
                    href={link.href}
                    className={styles.link}
                    {...(link.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <span>{t(`footer.nav.${column.key}.${link.key}`)}</span>
                    {link.external ? (
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className={styles.linkIcon}
                        aria-hidden="true"
                      />
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export { FooterNav };
