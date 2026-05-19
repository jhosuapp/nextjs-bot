import type { JSX } from 'react';
import { motion } from 'framer-motion';

import styles from './wrapper-motion.module.css';
import { fadeUpMotion, fadeUpTertiaryMotion } from '../../motion/fadeUp.motion';


type WrapperProps = {
  children: React.ReactNode;
  delay: { enter: number, exit: number };
  fadeUpTertiary?: boolean;
}

const WrapperMotion = ({ children, delay, fadeUpTertiary }: WrapperProps): JSX.Element => {
  const { initial, animate, exit } = fadeUpTertiary
    ? fadeUpTertiaryMotion(delay.enter, delay.exit)
    : fadeUpMotion(delay.enter, delay.exit);

  return (
    <article className={styles.wrapperMotion}>
      <motion.div
        initial={initial}
        whileInView={animate}
        exit={exit}
        viewport={{ once: true, amount: 0.3 }}
      >
        {children}
      </motion.div>
    </article>
  )
}

export { WrapperMotion }