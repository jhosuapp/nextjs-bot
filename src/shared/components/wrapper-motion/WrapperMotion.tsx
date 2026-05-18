import type { JSX } from 'react';
import { motion } from 'framer-motion';

import styles from './wrapper-motion.module.css';
import { fadeUpMotion } from '../../motion/fadeUp.motion';


type WrapperProps = {
  children: React.ReactNode;
  delay: { enter: number, exit: number };
}

const WrapperMotion = ({ children, delay }: WrapperProps): JSX.Element => {
  const { initial, animate, exit } = fadeUpMotion(delay.enter, delay.exit);
  return (
    <article className={styles.wrapperMotion}>
      <motion.div
        initial={initial}
        animate={animate}
        exit={exit}
        viewport={{ once: true, amount: 0.2 }}
      >
        {children}
      </motion.div>
    </article>
  )
}

export { WrapperMotion }