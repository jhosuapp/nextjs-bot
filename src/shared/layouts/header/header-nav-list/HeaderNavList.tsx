'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';

import type { NavLink } from '../header-content';
import styles from './header-nav-list.module.css';
import Link from 'next/link';

type Props = {
  items: ReadonlyArray<NavLink>;
  variant?: 'desktop' | 'mobile';
  onItemClick?: () => void;
  animated?: boolean;
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
}: Props) => {
  const reduce = useReducedMotion();
  const itemVariants = buildItemVariants(!!reduce);

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
          <Link
            href={item.href}
            className={styles.link}
            onClick={onItemClick}
          >
            {item.label}
          </Link>
        </motion.li>
      ))}
    </ul>
  );
};

export { HeaderNavList };
