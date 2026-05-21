import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faAtlassian,
  faFigma,
  faGithub,
  faGoogle,
  faGoogleDrive,
  faHubspot,
  faMicrosoft,
  faNotion,
  faSalesforce,
  faShopify,
  faSlack,
  faStripe,
} from '@fortawesome/free-brands-svg-icons';
import {
  faBolt,
  faBrain,
  faBullhorn,
  faGear,
  faGraduationCap,
  faHandshake,
  faPalette,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';

type LogoItem = {
  name: string;
  icon: IconDefinition;
};

type AudienceTabStatic = {
  key: 'marketing' | 'creators' | 'learning' | 'sales';
  icon: IconDefinition;
};

type ProcessStepStatic = {
  id: 'design' | 'train' | 'integrate' | 'operate';
  icon: IconDefinition;
};

type FaqItemStatic = {
  id: string;
};

type HomeStaticData = {
  hero: {
    primaryCta: { href: string };
    secondaryCta: { href: string };
  };
  trustedBy: {
    logos: ReadonlyArray<LogoItem>;
  };
  agentic: {
    icon: IconDefinition;
    cta: { href: string };
  };
  realtime: {
    cta: { href: string };
  };
  audience: {
    tabs: ReadonlyArray<AudienceTabStatic>;
  };
  process: {
    steps: ReadonlyArray<ProcessStepStatic>;
  };
  integrations: {
    cta: { href: string };
    logos: ReadonlyArray<LogoItem>;
  };
  faq: {
    items: ReadonlyArray<FaqItemStatic>;
    contactCta: { href: string };
  };
};

const homeStaticData: HomeStaticData = {
  hero: {
    primaryCta: { href: '/bot' },
    secondaryCta: { href: '#demo' },
  },
  trustedBy: {
    logos: [
      { name: 'Microsoft', icon: faMicrosoft },
      { name: 'Google', icon: faGoogle },
      { name: 'Slack', icon: faSlack },
      { name: 'Salesforce', icon: faSalesforce },
      { name: 'Shopify', icon: faShopify },
      { name: 'HubSpot', icon: faHubspot },
      { name: 'Stripe', icon: faStripe },
      { name: 'Atlassian', icon: faAtlassian },
    ],
  },
  agentic: {
    icon: faVideo,
    cta: { href: '#agentic' },
  },
  realtime: {
    cta: { href: '#v4' },
  },
  audience: {
    tabs: [
      { key: 'marketing', icon: faBullhorn },
      { key: 'creators', icon: faVideo },
      { key: 'learning', icon: faGraduationCap },
      { key: 'sales', icon: faHandshake },
    ],
  },
  process: {
    steps: [
      { id: 'design', icon: faPalette },
      { id: 'train', icon: faBrain },
      { id: 'integrate', icon: faBolt },
      { id: 'operate', icon: faGear },
    ],
  },
  integrations: {
    cta: { href: '#integrations' },
    logos: [
      { name: 'Slack', icon: faSlack },
      { name: 'Salesforce', icon: faSalesforce },
      { name: 'HubSpot', icon: faHubspot },
      { name: 'Figma', icon: faFigma },
      { name: 'Notion', icon: faNotion },
      { name: 'GitHub', icon: faGithub },
      { name: 'Google Drive', icon: faGoogleDrive },
      { name: 'Atlassian', icon: faAtlassian },
    ],
  },
  faq: {
    items: [
      { id: 'what-is' },
      { id: 'how-fast' },
      { id: 'languages' },
      { id: 'security' },
      { id: 'brand' },
      { id: 'pricing' },
    ],
    contactCta: { href: '#contact' },
  },
};

export { homeStaticData };
export type {
  HomeStaticData,
  LogoItem,
  AudienceTabStatic,
  FaqItemStatic,
  ProcessStepStatic,
};
