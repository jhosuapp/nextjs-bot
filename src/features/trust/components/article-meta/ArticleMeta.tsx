import type { JSX } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCalendar, faPenNib } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';

import styles from './article-meta.module.css';

type ArticleMetaProps = { t: ITranslations };

const items: ReadonlyArray<{ key: string; icon: IconDefinition }> = [
  { key: 'author', icon: faPenNib },
  { key: 'readingTime', icon: faClock },
  { key: 'date', icon: faCalendar },
];

const ArticleMeta = ({ t }: ArticleMetaProps): JSX.Element => (
  <ul className={styles.meta}>
    {items.map((item) => (
      <li key={item.key} className={styles.item}>
        <FontAwesomeIcon
          icon={item.icon}
          className={styles.icon}
          aria-hidden="true"
        />
        <span>{t(`hero.meta.${item.key}`) as string}</span>
      </li>
    ))}
  </ul>
);

export { ArticleMeta };
