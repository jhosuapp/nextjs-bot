import { PartialMotionVariants } from "../interfaces/motion.interface";

export const fadeUpMotion = (
  delayAnimate: number,
  delayExit: number,
): PartialMotionVariants => {
  return {
    initial: { translateY: 100, opacity: 0 },
    animate: {
      translateY: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
        mass: 0.5,
        delay: delayAnimate,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      translateY: -100,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
        mass: 0.5,
        delay: delayExit,
        duration: 0.5,
      },
    },
  };
};

export const fadeUpSecondaryMotion = (): PartialMotionVariants => {
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };
};

export const fadeUpTertiaryMotion = (
  delayAnimate: number,
  delayExit: number,
): PartialMotionVariants => {
  return {
    initial: { translateY: 40, opacity: 0 },
    animate: {
      opacity: 1,
      translateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 18,
        delay: delayAnimate,
      },
    },
    exit: {
      opacity: 0,
      translateY: -40,
      transition: {
        duration: 0.5,
        delay: delayExit,
      },
    },
  };
};
