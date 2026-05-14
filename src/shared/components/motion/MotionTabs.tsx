import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState, type ReactNode } from 'react';

import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import { cn } from '@/src/shared/libs/cn';

import styles from './motion-tabs.module.css';

type Tab<K extends string> = {
  key: K;
  label: string;
  content: ReactNode;
};

type MotionTabsProps<K extends string> = {
  tabs: ReadonlyArray<Tab<K>>;
  defaultTab?: K;
  className?: string;
  listClassName?: string;
  panelClassName?: string;
  layoutId?: string;
};

const MotionTabs = <K extends string>({
  tabs,
  defaultTab,
  className,
  listClassName,
  panelClassName,
  layoutId = 'motion-tabs-indicator',
}: MotionTabsProps<K>) => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<K>(defaultTab ?? tabs[0].key);
  const current = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <div className={cn(styles.root, className)}>
      <div role="tablist" className={cn(styles.list, listClassName)}>
        {tabs.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`panel-${tab.key}`}
              id={`tab-${tab.key}`}
              className={cn(styles.tab, isActive && styles.tabActive)}
              onClick={() => setActive(tab.key)}
            >
              <span className={styles.tabLabel}>{tab.label}</span>
              {isActive ? (
                <motion.span
                  layoutId={layoutId}
                  className={styles.indicator}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: DURATION.fast, ease: EASE }
                  }
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className={cn(styles.panelWrapper, panelClassName)}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.key}
            role="tabpanel"
            id={`panel-${current.key}`}
            aria-labelledby={`tab-${current.key}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: DURATION.fast, ease: EASE }}
            className={styles.panel}
          >
            {current.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export { MotionTabs };
export type { Tab };
