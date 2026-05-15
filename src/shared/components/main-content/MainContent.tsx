import type { JSX } from 'react';
import { motion } from 'framer-motion';

import styles from './mainContent.module.css';
import { fadeUpMotion } from '../../motion/fadeUp.motion';

type Props ={
  children: React.ReactNode;
  className?: string;
}

const MainContent = ({ children, className = '' }:Props):JSX.Element => {
  return (
    <motion.main 
      id='main-content' 
      className={`${styles.mainContent} ${className}`}
      {...fadeUpMotion(0.56, 0.13)}
    >
      {children}
    </motion.main>
  )
}

export { MainContent }