import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import type {
  FooterBrand,
  FooterNav as FooterNavContent,
} from '@/src/shared/layouts/footer/footer-content';

import styles from './footer-nav.module.css';

type Props = {
  brand: FooterBrand;
  content: FooterNavContent;
};

const FooterNav = ({ brand, content }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.brandBlock}>
        <Link
          href="/"
          className={styles.brandMark}
          aria-label={`${brand.name} home`}
        >
          <span className={styles.brandLogo} aria-hidden="true">
            <span className={styles.brandLogoInner}>L</span>
          </span>
          <span className={styles.brandName}>{brand.name}</span>
        </Link>
        <p className={styles.brandTagline}>{brand.tagline}</p>
      </div>

      <nav
        className={styles.columns}
        aria-label="Footer navigation"
      >
        {content.columns.map((column) => (
          <div key={column.title} className={styles.column}>
            <h3 className={styles.columnTitle}>{column.title}</h3>
            <ul className={styles.list}>
              {column.links.map((link) => (
                <li key={link.label} className={styles.listItem}>
                  <a
                    href={link.href}
                    className={styles.link}
                    {...(link.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <span>{link.label}</span>
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
