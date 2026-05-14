import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import type { ElementType, ReactNode, Ref } from 'react';
import { useRef } from 'react';

import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  once?: boolean;
  amount?: number;
};

const directionToClipStart: Record<
  NonNullable<RevealProps['direction']>,
  string
> = {
  left: 'inset(0 100% 0 0)',
  right: 'inset(0 0 0 100%)',
  top: 'inset(100% 0 0 0)',
  bottom: 'inset(0 0 100% 0)',
};

const Reveal = ({
  children,
  className,
  as = 'span',
  delay = 0,
  direction = 'left',
  once = true,
  amount = 0.15,
}: RevealProps) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once, amount });
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const variants: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { clipPath: directionToClipStart[direction], opacity: 0 },
    visible: {
      clipPath: 'inset(0 0 0 0)',
      opacity: 1,
      transition: { duration: DURATION.slow, ease: EASE, delay },
    },
  };

  return (
    <MotionTag
      ref={ref as Ref<HTMLDivElement>}
      className={className}
      style={{ display: 'inline-block', willChange: 'clip-path, opacity' }}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </MotionTag>
  );
};

export { Reveal };
