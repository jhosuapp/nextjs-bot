import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
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
  scrollBoost?: boolean;
  scrollBoostFactor?: number;
};

const Marquee = ({
  children,
  className,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
  scrollBoost = false,
  scrollBoostFactor = 0.35,
}: MarqueeProps) => {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const hoveredRef = useRef(false);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 400,
    damping: 50,
  });

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
    const baseMove = (speed * dir * delta) / 1000;
    const boost = scrollBoost
      ? (smoothVelocity.get() * dir * scrollBoostFactor * delta) / 1000
      : 0;
    baseX.set(baseX.get() + baseMove + boost);
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
