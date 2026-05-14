import type { JSX } from 'react';

import { AgenticVideosSection } from '@/src/features/home/components/AgenticVideosSection';
import { AudienceTabsSection } from '@/src/features/home/components/AudienceTabsSection';
import { HeroSection } from '@/src/features/home/components/HeroSection';
import { IntegrationsGrid } from '@/src/features/home/components/IntegrationsGrid';
import { RealtimeAgentsSection } from '@/src/features/home/components/RealtimeAgentsSection';
import { StatementBand } from '@/src/features/home/components/StatementBand';
import { TrustedByStrip } from '@/src/features/home/components/TrustedByStrip';
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
