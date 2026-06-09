import type { JSX } from 'react';
import { useMemo } from 'react';

import { useActiveSection } from '@/src/shared/hooks/useActiveSection';
import { useLenisStore } from '@/src/shared/stores/lenis.store';

import styles from './article-toc.module.css';

type TocItem = { id: string; label: string };
type ArticleTocProps = { title: string; items: ReadonlyArray<TocItem> };

const ArticleToc = ({ title, items }: ArticleTocProps): JSX.Element => {
  const lenis = useLenisStore((state) => state.lenis);
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useActiveSection(ids);

  const handleClick = (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { duration: 0.9, offset: -100 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.toc} aria-label={title}>
      <p className={styles.title}>{title}</p>
      <ul className={styles.list}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => handleClick(item.id)}
              >
                <span className={styles.marker} aria-hidden="true" />
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export { ArticleToc };
