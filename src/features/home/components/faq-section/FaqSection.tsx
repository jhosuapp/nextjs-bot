'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

import { FadeIn } from '@/src/shared/components/motion/FadeIn';
import {
  StaggerGroup,
  StaggerItem,
} from '@/src/shared/components/motion/StaggerGroup';
import { DURATION, EASE } from '@/src/shared/helpers/motion-variants';
import type { FaqContent, FaqItem } from '@/src/features/home/data/home-content';

import styles from './faq-section.module.css';
import { Button } from '@/src/shared/components/button/Button';

type Props = { content: FaqContent };

type AccordionItemProps = {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
};

const AccordionItem = ({ item, isOpen, onToggle }: AccordionItemProps) => {
  const reduce = useReducedMotion();
  const panelId = `faq-panel-${item.id}`;
  const buttonId = `faq-trigger-${item.id}`;

  return (
    <div className={styles.item} data-open={isOpen}>
      <h3 className={styles.itemHeading}>
        <button
          id={buttonId}
          type="button"
          className={styles.trigger}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className={styles.question}>{item.question}</span>
          <motion.span
            className={styles.chevron}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={
              reduce ? { duration: 0 } : { duration: 0.25, ease: EASE }
            }
            aria-hidden="true"
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className={styles.panel}
            initial={
              reduce ? { opacity: 0 } : { height: 0, opacity: 0 }
            }
            animate={
              reduce
                ? { opacity: 1 }
                : { height: 'auto', opacity: 1 }
            }
            exit={
              reduce ? { opacity: 0 } : { height: 0, opacity: 0 }
            }
            transition={{
              height: { duration: DURATION.fast, ease: EASE },
              opacity: { duration: 0.2, ease: EASE },
            }}
          >
            <p className={styles.answer}>{item.answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const FaqSection = ({ content }: Props) => {
  const [openIds, setOpenIds] = useState<ReadonlyArray<string>>([
    content.items[0]?.id ?? '',
  ]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <FadeIn className={styles.header} y={16}>
        <span className={styles.eyebrow}>{content.eyebrow}</span>
        <h2 id="faq-title" className={styles.title}>
          {content.title}
        </h2>
        <p className={styles.description}>{content.description}</p>
      </FadeIn>

      <StaggerGroup className={styles.list} stagger={0.06} amount={0.1}>
        {content.items.map((item) => (
          <StaggerItem key={item.id}>
            <AccordionItem
              item={item}
              isOpen={openIds.includes(item.id)}
              onToggle={() => toggle(item.id)}
            />
          </StaggerItem>
        ))}
      </StaggerGroup>

      <FadeIn className={styles.footer} delay={0.1} y={8} duration="fast">
        <span className={styles.footerLabel}>Still have a question?</span>
        <Button 
          text={content.contactCta.label}
          style="secondary"
          type="button"
        />
      </FadeIn>
    </section>
  );
};

export { FaqSection };
