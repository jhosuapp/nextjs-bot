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
import { Container } from '../container/Container';
import { Text } from '@/src/shared/components/text/Text';
import { WrapperMotion } from '@/src/shared/components/wrapper-motion/WrapperMotion';

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
            <Text 
              tag="p" 
              variant="description_xs" 
              color="secondary"
              delay={{ enter: 0.1, exit: 0.4 }}
              fadeUpTertiary
              immediate
            >
              <strong className='gl-degradete-text font-semibold'>{t(`audience.${tabItem.key}.label`)}</strong>
            </Text>
            <Text 
              tag="h3" 
              variant="subtitle_small" 
              color="secondary"
              delay={{ enter: 0.2, exit: 0.3 }}
              fadeUpTertiary
              immediate
            >
              {t(`audience.${tabItem.key}.title`)}
            </Text>
            <Text 
              tag="p" 
              variant="description" 
              color="muted"
              delay={{ enter: 0.3, exit: 0.2 }}
              fadeUpTertiary
              immediate
            >
              {t(`audience.${tabItem.key}.description`)}
            </Text>
            <ul className={styles.bullets}>
              {bullets.map((bullet, index) => (
                <WrapperMotion 
                  delay={{ enter: `0.${4 + index}` as any, exit: 0.1 }}
                  fadeUpTertiary
                  immediate
                >
                  <li key={bullet} className={styles.bullet}>
                    {bullet}
                  </li>
                </WrapperMotion>
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
    <Container id="solutions" className={styles.section} aria-labelledby="audience-title" padding='xl'>
      <FadeIn className={styles.header} y={16}>
        <Text 
          tag="h2" 
          variant="title_small" 
          color="secondary"
          weight="bold"
          delay={{ enter: 0, exit: 0 }}
          fadeUpTertiary
        >
          <strong className='gl-degradete-text font-bold'>{t('audience.title_strong')}</strong> {t('audience.title')}
        </Text>
      </FadeIn>

      <MotionTabs<TabKey>
        tabs={tabs}
        layoutId="audience-tab-indicator"
        className={styles.tabsHost}
      />
    </Container>
  );
};

export { AudienceTabsSection };
