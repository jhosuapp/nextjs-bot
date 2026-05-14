import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { FooterBottom as FooterBottomContent } from '@/src/shared/layouts/footer/footer-content';

import styles from './footer-bottom.module.css';

type Props = { content: FooterBottomContent };

const FooterBottom = ({ content }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <p className={styles.copyright}>{content.copyright}</p>

        <ul className={styles.legal} aria-label="Legal links">
          {content.legalLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={styles.legalLink}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <ul className={styles.socials} aria-label="Social media">
          {content.socials.map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                className={styles.socialLink}
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={social.icon}
                  className={styles.socialIcon}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { FooterBottom };
