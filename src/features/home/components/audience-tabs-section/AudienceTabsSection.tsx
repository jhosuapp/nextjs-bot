import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FadeIn } from '@/src/shared/components/motion/FadeIn';
import {
  MotionTabs,
  type Tab,
} from '@/src/shared/components/motion/MotionTabs';
import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { homeStaticData } from '@/src/features/home/data/home-content';
import type { AudienceTabStatic } from '@/src/features/home/data/home-content';

import styles from './audience-tabs-section.module.css';

type Props = { t: ITranslations };
type TabKey = AudienceTabStatic['key'];

const AudienceTabsSection = ({ t }: Props) => {
  const { audience } = homeStaticData;

  const tabs: ReadonlyArray<Tab<TabKey>> = audience.tabs.map((tabItem) => {
    const bullets = t(`audience.${tabItem.key}.bullets`, { returnObjects: true }) as string[];

    return {
      key: tabItem.key,
      label: t(`audience.${tabItem.key}.label`) as string,
      content: (
        <article className={styles.panel}>
          <div className={styles.panelText}>
            <span className={styles.panelLabel}>{t(`audience.${tabItem.key}.label`)}</span>
            <h3 className={styles.panelTitle}>{t(`audience.${tabItem.key}.title`)}</h3>
            <p className={styles.panelDesc}>{t(`audience.${tabItem.key}.description`)}</p>
            <ul className={styles.bullets}>
              {bullets.map((bullet) => (
                <li key={bullet} className={styles.bullet}>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.panelMedia} aria-hidden="true">
            <FontAwesomeIcon icon={tabItem.icon} className={styles.panelMediaIcon} />
          </div>
        </article>
      ),
    };
  });

  return (
    <section className={styles.section} aria-labelledby="audience-title">
      <FadeIn className={styles.header} y={16}>
        <span className={styles.eyebrow}>{t('audience.eyebrow')}</span>
        <h2 id="audience-title" className={styles.title}>
          {t('audience.title')}
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
