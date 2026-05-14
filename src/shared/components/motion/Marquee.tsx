import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import type { ReactNode } from 'react';
import { Children, useRef } from 'react';

import { cn } from '@/src/shared/libs/cn';

import styles from './marquee.module.css';

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
};

const Marquee = ({
  children,
  className,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
}: MarqueeProps) => {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const hoveredRef = useRef(false);

  const wrap = useTransform(baseX, (latest) => {
    const node = trackRef.current;
    if (!node) return `translate3d(0px, 0, 0)`;
    const halfWidth = node.scrollWidth / 2;
    if (halfWidth === 0) return `translate3d(0px, 0, 0)`;
    const wrapped = ((latest % halfWidth) + halfWidth) % halfWidth;
    return `translate3d(${-wrapped}px, 0, 0)`;
  });

  useAnimationFrame((_t, delta) => {
    if (reduce) return;
    if (pauseOnHover && hoveredRef.current) return;
    const dir = direction === 'left' ? 1 : -1;
    baseX.set(baseX.get() + (speed * dir * delta) / 1000);
  });

  const items = Children.toArray(children);

  return (
    <div
      className={cn(styles.viewport, className)}
      onMouseEnter={() => {
        hoveredRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
    >
      <motion.div
        ref={trackRef}
        className={styles.track}
        style={{ transform: wrap }}
      >
        {items}
        {items.map((child, i) => (
          <div key={`dup-${i}`} aria-hidden="true" className={styles.dup}>
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export { Marquee };
