import type { JSX } from 'react';
import { motion } from 'framer-motion';

import styles from './wrapper-motion.module.css';
import { fadeUpMotion, fadeUpTertiaryMotion } from '../../motion/fadeUp.motion';


type WrapperProps = {
  children: React.ReactNode;
  delay: { enter: number, exit: number };
  fadeUpTertiary?: boolean;
  immediate?: boolean;
}

const WrapperMotion = ({ children, delay, fadeUpTertiary, immediate }: WrapperProps): JSX.Element => {
  const { initial, animate, exit } = fadeUpTertiary
    ? fadeUpTertiaryMotion(delay.enter, delay.exit)
    : fadeUpMotion(delay.enter, delay.exit);

  return (
    <article className={styles.wrapperMotion}>
      <motion.div
        initial={initial}
        {...(immediate
          ? { animate }
          : { whileInView: animate, viewport: { once: true, amount: 0.6 } }
        )}
        exit={exit}
      >
        {children}
      </motion.div>
    </article>
  )
}

export { WrapperMotion }