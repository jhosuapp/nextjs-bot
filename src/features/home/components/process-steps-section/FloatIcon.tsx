import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AnimatePresence,
  motion,
  useTransform,
  type MotionValue,
} from 'framer-motion';

import styles from './process-steps-section.module.css';

type FloatIconProps = {
  icon: IconDefinition;
  side: 'left' | 'right';
  topPercent: number;
  offset: number;
  size: number;
  rotate?: number;
  accent?: boolean;
  progress: MotionValue<number>;
};

const FloatIcon = ({
  icon,
  side,
  topPercent,
  offset,
  size,
  rotate = 0,
  accent = false,
  progress,
}: FloatIconProps) => {
  const y = useTransform(progress, [0, 1], [offset, -offset]);

  const classNames = [
    styles.floatIcon,
    side === 'left' ? styles.floatIconLeft : styles.floatIconRight,
    accent ? styles.floatIconAccent : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.span
      className={classNames}
      aria-hidden="true"
      style={{
        top: `${topPercent}%`,
        ['--float-size' as string]: `${size}px`,
        rotate,
        y,
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={icon.iconName}
          className={styles.floatIconGlyph}
          initial={{ scale: 0.4, opacity: 0, rotate: -35 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.4, opacity: 0, rotate: 35 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 18,
            mass: 0.6,
          }}
        >
          <FontAwesomeIcon icon={icon} />
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
};

export { FloatIcon };
