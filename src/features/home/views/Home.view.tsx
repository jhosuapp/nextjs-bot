import type { JSX } from 'react';

import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { AgenticVideosSection } from '@/src/features/home/components/agentic-videos-section/AgenticVideosSection';
import { AudienceTabsSection } from '@/src/features/home/components/audience-tabs-section/AudienceTabsSection';
import { FaqSection } from '@/src/features/home/components/faq-section/FaqSection';
import { HeroSection } from '@/src/features/home/components/hero-section/HeroSection';
import { IntegrationsGrid } from '@/src/features/home/components/integrations-grid/IntegrationsGrid';
import { RealtimeAgentsSection } from '@/src/features/home/components/realtime-agents-section/RealtimeAgentsSection';
import { StatementBand } from '@/src/features/home/components/statement-band/StatementBand';
import { TrustedByStrip } from '@/src/features/home/components/trusted-by-strip/TrustedByStrip';
import { MainContent } from '@/src/shared/components/main-content/MainContent';

import styles from './home.module.css';

type HomeViewProps = { t: ITranslations };

const HomeView = ({ t }: HomeViewProps): JSX.Element => {
  return (
    <MainContent className={styles.home}>
      <HeroSection t={t} />
      <TrustedByStrip t={t} />
      <AgenticVideosSection t={t} />
      <RealtimeAgentsSection t={t} />
      <StatementBand t={t} />
      <AudienceTabsSection t={t} />
      <IntegrationsGrid t={t} />
      <FaqSection t={t} />
    </MainContent>
  );
};

export { HomeView };
