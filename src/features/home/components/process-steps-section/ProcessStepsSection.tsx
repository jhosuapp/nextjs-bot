import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

import { Text } from '@/src/shared/components/text/Text';
import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { homeStaticData } from '@/src/features/home/data/home-content';

import { ProcessStep } from './ProcessStep';
import styles from './process-steps-section.module.css';
import { FadeIn } from '@/src/shared/components/motion/FadeIn';

type Props = { t: ITranslations };

const STEP_THRESHOLDS = [0.18, 0.38, 0.58, 0.78] as const;

const ProcessStepsSection = ({ t }: Props) => {
  const reduce = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const lineProgressRaw = useTransform(scrollYProgress, [0.12, 0.85], [0, 1]);
  const lineProgress = useSpring(lineProgressRaw, {
    stiffness: 90,
    damping: 22,
    mass: 0.5,
  });

  const cometRaw = useTransform(scrollYProgress, [0.08, 0.9], [0, 100]);
  const cometX = useSpring(cometRaw, {
    stiffness: 110,
    damping: 20,
    mass: 0.5,
  });
  const cometLeft = useMotionTemplate`${cometX}%`;
  const cometOpacity = useTransform(
    scrollYProgress,
    [0.06, 0.12, 0.88, 0.94],
    [0, 1, 1, 0],
  );

  return (
    <section
      ref={wrapperRef}
      className={styles.wrapper}
      aria-label={`${t('process.titleLead')}${t('process.titleAccent')}`}
    >
      <FadeIn className={styles.sticky} amount={0.5}>
        <div className={styles.card}>
          <Text
            tag="h2"
            variant="title_small"
            color="secondary"
            weight="semibold"
            delay={{ enter: 0.1, exit: 0.1 }}
            className="text-center"
            fadeUpTertiary
          >
            {t('process.titleLead') as string}
            <strong className="gl-degradete-text font-semibold">
              {t('process.titleAccent') as string}
            </strong>
          </Text>

          <div className={styles.track}>
            <div className={styles.lineRail} aria-hidden="true" />
            <motion.div
              className={styles.lineFill}
              aria-hidden="true"
              style={{ '--p': reduce ? 1 : lineProgress } as React.CSSProperties}
            />
            {!reduce && (
              <motion.span
                className={styles.comet}
                aria-hidden="true"
                style={{ left: cometLeft, opacity: cometOpacity }}
              />
            )}
            {homeStaticData.process.steps.map((step, i) => (
              <ProcessStep
                key={step.id}
                index={i}
                progress={scrollYProgress}
                threshold={STEP_THRESHOLDS[i]}
                icon={step.icon}
                label={t(`process.steps.${step.id}.label`) as string}
              />
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export { ProcessStepsSection };
