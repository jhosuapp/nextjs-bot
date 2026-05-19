import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { WrapperMotion } from '@/src/shared/components/wrapper-motion/WrapperMotion';
import type { JSX } from 'react';
import styles from './text.module.css';
import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
type Variant = 'title' | 'title_small' | 'subtitle' | 'subtitle_small' | 'description' | 'description_small';
type Color = 'primary' | 'secondary' | 'tertiary' | 'muted';
type Weight = 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';

type TextProps = {
  delay?: { enter: number; exit: number };
  tag: Tag;
  variant: Variant;
  color?: Color;
  weight?: Weight;
  className?: string;
  children?: React.ReactNode;
  fadeUpTertiary?: boolean;
  staggerItem?: boolean;
};

const Text = ({
  delay,
  tag: Tag,
  variant,
  color,
  weight,
  className: customClass,
  children,
  fadeUpTertiary,
  staggerItem,
}: TextProps): JSX.Element => {
  const reduce = useReducedMotion();

  const className = [
    styles[variant],
    color ? styles[`color_${color}`] : '',
    weight ? styles[`weight_${weight}`] : '',
    customClass ?? '',
  ].filter(Boolean).join(' ');

  if (staggerItem) {
    const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;
    const variants: Variants = {
      hidden: reduce ? { opacity: 0 } : { opacity: 0, y: fadeUpTertiary ? 40 : 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: fadeUpTertiary
          ? { type: 'spring', stiffness: 100, damping: 18 }
          : { duration: DURATION.base, ease: EASE },
      },
    };
    return <MotionTag className={className} variants={variants}>{children}</MotionTag>;
  }

  return (
    <WrapperMotion delay={delay!} fadeUpTertiary={fadeUpTertiary}>
      <Tag className={className}>
        {children}
      </Tag>
    </WrapperMotion>
  );
};

export { Text };
