'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FadeIn } from '@/src/shared/components/motion/FadeIn';
import {
  MotionTabs,
  type Tab,
} from '@/src/shared/components/motion/MotionTabs';
import type {
  AudienceTabContent,
  AudienceTabsContent,
} from '@/src/features/home/data/home-content';

import styles from './audience-tabs-section.module.css';

type Props = { content: AudienceTabsContent };

type TabKey = AudienceTabContent['key'];

const renderPanel = (tab: AudienceTabContent) => (
  <article className={styles.panel}>
    <div className={styles.panelText}>
      <span className={styles.panelLabel}>{tab.label}</span>
      <h3 className={styles.panelTitle}>{tab.title}</h3>
      <p className={styles.panelDesc}>{tab.description}</p>
      <ul className={styles.bullets}>
        {tab.bullets.map((b) => (
          <li key={b} className={styles.bullet}>
            {b}
          </li>
        ))}
      </ul>
    </div>
    <div className={styles.panelMedia} aria-hidden="true">
      <FontAwesomeIcon icon={tab.icon} className={styles.panelMediaIcon} />
    </div>
  </article>
);

const AudienceTabsSection = ({ content }: Props) => {
  const tabs: ReadonlyArray<Tab<TabKey>> = content.tabs.map((t) => ({
    key: t.key,
    label: t.label,
    content: renderPanel(t),
  }));

  return (
    <section className={styles.section} aria-labelledby="audience-title">
      <FadeIn className={styles.header} y={16}>
        <span className={styles.eyebrow}>{content.eyebrow}</span>
        <h2 id="audience-title" className={styles.title}>
          {content.title}
        </h2>
      </FadeIn>

      <MotionTabs<TabKey>
        tabs={tabs}
        layoutId="audience-tab-indicator"
        className={styles.tabsHost}
      />
    </section>
  );
};

export { AudienceTabsSection };
