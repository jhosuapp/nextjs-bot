import Link from 'next/link';
import { useRouter } from 'next/router';

import type { HeaderStaticData } from '../header-content';
import { useLenisStore } from '@/src/shared/stores/lenis.store';

import styles from './header-brand.module.css';
import Image from 'next/image';
import { useThemeStore } from '@/src/shared/stores/theme.store';

type HeaderBrandProps = { brand: HeaderStaticData['brand'] };

const HeaderBrand = ({ brand }: HeaderBrandProps) => {
  const theme = useThemeStore(state => state.theme);
  const router = useRouter();
  const lenis = useLenisStore(state => state.lenis);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (router.pathname === '/') {
      e.preventDefault();
      lenis?.scrollTo(0, { duration: 0.7 });
    }
  };

  return (
    <Link
      href="/"
      className={styles.root}
      aria-label={`${brand.name} home`}
      onClick={handleClick}
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
