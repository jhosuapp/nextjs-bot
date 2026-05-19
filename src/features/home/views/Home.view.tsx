import type { JSX } from 'react';

import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { AgenticVideosSection } from '@/src/features/home/components/agentic-videos-section/AgenticVideosSection';
import { AudienceTabsSection } from '@/src/features/home/components/audience-tabs-section/AudienceTabsSection';
import { FaqSection } from '@/src/features/home/components/faq-section/FaqSection';
import { TrustedByStrip } from '@/src/features/home/components/trusted-by-strip/TrustedByStrip';
import { MainContent } from '@/src/shared/components/main-content/MainContent';

import styles from './home.module.css';

type HomeViewProps = { t: ITranslations };

const HomeView = ({ t }: HomeViewProps): JSX.Element => {
  return (
    <MainContent className={styles.home}>
      <TrustedByStrip t={t} />
      <AgenticVideosSection t={t} />
      <AudienceTabsSection t={t} />
      <FaqSection t={t} />
    </MainContent>
  );
};

export { HomeView };
