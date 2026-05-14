import type { JSX } from 'react';

import { AgenticVideosSection } from '@/src/features/home/components/agentic-videos-section/AgenticVideosSection';
import { AudienceTabsSection } from '@/src/features/home/components/audience-tabs-section/AudienceTabsSection';
import { HeroSection } from '@/src/features/home/components/hero-section/HeroSection';
import { IntegrationsGrid } from '@/src/features/home/components/integrations-grid/IntegrationsGrid';
import { RealtimeAgentsSection } from '@/src/features/home/components/realtime-agents-section/RealtimeAgentsSection';
import { StatementBand } from '@/src/features/home/components/statement-band/StatementBand';
import { TrustedByStrip } from '@/src/features/home/components/trusted-by-strip/TrustedByStrip';
import { homeContent } from '@/src/features/home/data/home-content';

import styles from './home.module.css';

const HomeView = (): JSX.Element => {
  return (
    <main className={styles.home}>
      <HeroSection content={homeContent.hero} />
      <TrustedByStrip content={homeContent.trustedBy} />
      <AgenticVideosSection content={homeContent.agentic} />
      <RealtimeAgentsSection content={homeContent.realtime} />
      <StatementBand content={homeContent.statement} />
      <AudienceTabsSection content={homeContent.audience} />
      <IntegrationsGrid content={homeContent.integrations} />
    </main>
  );
};

export { HomeView };
