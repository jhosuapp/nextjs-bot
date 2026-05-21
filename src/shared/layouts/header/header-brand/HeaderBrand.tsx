import Link from 'next/link';

import type { HeaderStaticData } from '../header-content';

import styles from './header-brand.module.css';
import Image from 'next/image';
import { useThemeStore } from '@/src/shared/stores/theme.store';

type HeaderBrandProps = { brand: HeaderStaticData['brand'] };

const HeaderBrand = ({ brand }: HeaderBrandProps) => {
  const theme = useThemeStore(state => state.theme);

  return (
    <Link
      href="/"
      className={styles.root}
      aria-label={`${brand.name} home`}
    >
      {theme === 'light' ? (
        <Image src="/svg/logo.svg" alt={brand.name} width={96} height={33} />
      ) : (
        <Image src="/svg/logo-white.svg" alt={brand.name} width={96} height={33} />
      )}
    </Link>
  );
};

export { HeaderBrand };
