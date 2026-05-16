import type { JSX } from 'react';
import { motion } from 'framer-motion';

import styles from './wrapper-motion.module.css';
import { fadeUpMotion } from '../../motion/fadeUp.motion';


type WrapperProps = {
  children: React.ReactNode;
  delay: { enter: number, exit: number };
}

const WrapperMotion = ({ children, delay }: WrapperProps): JSX.Element => {
  return (
    <article className={styles.wrapperMotion}>
      <motion.div {...fadeUpMotion(delay.enter, delay.exit)}>
        {children}
      </motion.div>
    </article>
  )
}

export { WrapperMotion }