import type { JSX } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

import styles from './reading-progress.module.css';

const ReadingProgress = (): JSX.Element => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      className={styles.bar}
      style={{ scaleX }}
      role="progressbar"
      aria-hidden="true"
    />
  );
};

export { ReadingProgress };
