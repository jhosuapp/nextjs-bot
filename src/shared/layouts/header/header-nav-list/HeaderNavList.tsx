import { motion, useReducedMotion, type Variants } from 'framer-motion';

import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import { useLenisStore } from '@/src/shared/stores/lenis.store';
import { useRouter } from 'next/router';

import styles from './header-nav-list.module.css';

type NavLink = { label: string; href: string };

type HeaderNavListProps = {
  items: ReadonlyArray<NavLink>;
  variant?: 'desktop' | 'mobile';
  onItemClick?: () => void;
  animated?: boolean;
  activeSection?: string | null;
};

const buildItemVariants = (reduce: boolean): Variants => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.fast, ease: EASE },
  },
});

const HeaderNavList = ({
  items,
  variant = 'desktop',
  onItemClick,
  animated = false,
  activeSection = null,
}: HeaderNavListProps) => {
  const lenis = useLenisStore(state => state.lenis);
  const reduce = useReducedMotion();
  const itemVariants = buildItemVariants(!!reduce);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href') || '/';
    const hashMatch = href.match(/^(?:\/)?#(.+)$/);

    if (hashMatch) {
      const isHome = router.pathname === '/';
      if (isHome) {
        lenis?.scrollTo(`#${hashMatch[1]}`, { duration: 0.9, offset: -80 });
        onItemClick?.();
      } else {
        router.push(href).then(() => onItemClick?.());
      }
      return;
    }

    lenis?.scrollTo(0, { duration: 0.7 });
    setTimeout(() => {
      router.push(href);
      onItemClick?.();
    }, 700);
  }

  return (
    <ul
      className={`${styles.list} ${variant === 'mobile' ? styles.mobile : ''}`}
    >
      {items.map((item) => (
        <motion.li
          key={item.label}
          className={styles.item}
          variants={animated ? itemVariants : undefined}
        >
          <a
            href={item.href}
            className={`${styles.link} ${item.href.match(/^(?:\/)?#(.+)$/)?.[1] === activeSection ? styles.linkActive : ''}`}
            aria-current={item.href.match(/^(?:\/)?#(.+)$/)?.[1] === activeSection ? 'true' : undefined}
            onClick={(e)=> handleClick(e)}
          >
            {item.label}
          </a>
        </motion.li>
      ))}
    </ul>
  );
};

export { HeaderNavList };
