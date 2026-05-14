import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import type { ReactNode, RefObject } from 'react';
import { useRef } from 'react';

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  offset?: number;
  scrollRef?: RefObject<HTMLElement | null>;
};

const Parallax = ({
  children,
  className,
  offset = 80,
  scrollRef,
}: ParallaxProps) => {
  const reduce = useReducedMotion();
  const localRef = useRef<HTMLDivElement | null>(null);
  const targetRef = scrollRef ?? localRef;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [offset, -offset],
  );

  return (
    <motion.div ref={localRef} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
};

export { Parallax };
