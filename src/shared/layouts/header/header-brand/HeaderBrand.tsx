import Link from 'next/link';

import type { HeaderContent } from '../header-content';

import styles from './header-brand.module.css';

type Props = { brand: HeaderContent['brand'] };

const HeaderBrand = ({ brand }: Props) => {
  return (
    <Link
      href="/"
      className={styles.root}
      aria-label={`${brand.name} home`}
    >
      <span className={styles.logo} aria-hidden="true">
        <span className={styles.logoInner}>{brand.mark}</span>
      </span>
      <span className={styles.name}>{brand.name}</span>
    </Link>
  );
};

export { HeaderBrand };
