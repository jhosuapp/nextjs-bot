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
  faBullhorn,
  faCircleNodes,
  faGraduationCap,
  faHandshake,
  faLock,
  faShieldHalved,
  faVideo,
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons';

type CTA = {
  label: string;
  href: string;
};

type LogoItem = {
  name: string;
  icon: IconDefinition;
};

type HeroContent = {
  eyebrowBadge: string;
  eyebrowText: string;
  titleLead: string;
  titleAccent: string;
  titleTrail: string;
  subtitle: string;
  primaryCta: CTA;
  secondaryCta: CTA;
  trustNote: string;
  highlights: ReadonlyArray<{
    label: string;
    value: string;
  }>;
};

type TrustedByContent = {
  label: string;
  logos: ReadonlyArray<LogoItem>;
};

type SplitFeatureContent = {
  eyebrow: string;
  title: string;
  description: string;
  cta: CTA;
  icon: IconDefinition;
  mediaAlt: string;
};

type RealtimeContent = {
  badge: string;
  title: string;
  description: string;
  cta: CTA;
};

type StatementContent = {
  text: string;
};

type PillarItem = {
  icon: IconDefinition;
  title: string;
  description: string;
};

type PillarsTrioContent = {
  eyebrow: string;
  pillars: ReadonlyArray<PillarItem>;
};

type AudienceTabContent = {
  key: 'marketing' | 'creators' | 'learning' | 'sales';
  label: string;
  title: string;
  description: string;
  bullets: ReadonlyArray<string>;
  icon: IconDefinition;
};

type AudienceTabsContent = {
  eyebrow: string;
  title: string;
  tabs: ReadonlyArray<AudienceTabContent>;
};

type IntegrationsContent = {
  title: string;
  description: string;
  cta: CTA;
  logos: ReadonlyArray<LogoItem>;
};

type AwardsContent = {
  title: string;
  awards: ReadonlyArray<LogoItem>;
};

type EnterprisePillarsContent = {
  title: string;
  description: string;
  pillars: ReadonlyArray<PillarItem>;
};

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type FaqContent = {
  eyebrow: string;
  title: string;
  description: string;
  contactCta: CTA;
  items: ReadonlyArray<FaqItem>;
};

type HomeContent = {
  hero: HeroContent;
  trustedBy: TrustedByContent;
  agentic: SplitFeatureContent;
  realtime: RealtimeContent;
  statement: StatementContent;
  pillarsTrio: PillarsTrioContent;
  audience: AudienceTabsContent;
  integrations: IntegrationsContent;
  awards: AwardsContent;
  enterprise: EnterprisePillarsContent;
  faq: FaqContent;
};

const homeContent: HomeContent = {
  hero: {
    eyebrowBadge: 'New',
    eyebrowText: 'V4 Expressive Visual Agents is here',
    titleLead: 'AI avatars that feel',
    titleAccent: 'genuinely',
    titleTrail: 'human.',
    subtitle:
      'A digital human platform that helps teams explain clearly, engage personally, and scale messaging across every audience — in seconds.',
    primaryCta: { label: 'Get started — free', href: '#get-started' },
    secondaryCta: { label: 'Watch a 60s demo', href: '#demo' },
    trustNote: 'Trusted by 10,000+ teams · No credit card required',
    highlights: [
      { label: 'Avg. setup', value: '< 2 min' },
      { label: 'Languages', value: '80+' },
      { label: 'Uptime SLA', value: '99.9%' },
    ],
  },
  trustedBy: {
    label: 'Trusted by',
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
    eyebrow: 'Agentic videos',
    title: 'Transform passive content into interactive AI experiences.',
    description:
      'Turn static videos into responsive agents that adapt to each viewer in real time, answer follow-up questions, and keep your audience engaged.',
    cta: { label: 'Learn more', href: '#agentic' },
    icon: faVideo,
    mediaAlt: 'Interactive avatar video preview',
  },
  realtime: {
    badge: 'New · V4 Expressive Visual Agents',
    title: 'Real-time, emotionally intelligent conversations.',
    description:
      'Built for product-grade scale: low-latency speech, nuanced facial expressions, and natural turn-taking that feels human at every step.',
    cta: { label: 'Explore V4', href: '#v4' },
  },
  statement: {
    text: 'One platform to design, deploy, and scale your digital humans across every channel.',
  },
  pillarsTrio: {
    eyebrow: 'Why teams pick us',
    pillars: [
      {
        icon: faWandMagicSparkles,
        title: 'Studio-grade quality',
        description:
          'Cinematic avatars rendered with realistic lighting, lip-sync and micro-expressions.',
      },
      {
        icon: faCircleNodes,
        title: 'Real-time everywhere',
        description:
          'Sub-second response, ready for web, mobile, kiosks, and embedded experiences.',
      },
      {
        icon: faShieldHalved,
        title: 'Built to scale',
        description:
          'From a single demo to millions of personalized renders without rewriting your stack.',
      },
    ],
  },
  audience: {
    eyebrow: 'For every team',
    title: 'Engaging AI avatars for any team.',
    tabs: [
      {
        key: 'marketing',
        label: 'Marketing',
        title: 'Personalize every campaign at scale.',
        description:
          'Spin up branded avatar videos for any audience segment in minutes, not weeks.',
        bullets: [
          'Localized creatives in 80+ languages',
          'A/B test scripts without re-shoots',
          'Sync with your CRM and CDP',
        ],
        icon: faBullhorn,
      },
      {
        key: 'creators',
        label: 'Content creators',
        title: 'Publish more, shoot less.',
        description:
          'Generate full-length explainers and shorts from a single script, on brand and on schedule.',
        bullets: [
          'Multiple avatar styles and voices',
          'One-click vertical and horizontal exports',
          'Native captioning in any language',
        ],
        icon: faVideo,
      },
      {
        key: 'learning',
        label: 'Learning & Development',
        title: 'Roll out training that actually retains.',
        description:
          'Turn dense documents into interactive courses with avatars that answer questions on demand.',
        bullets: [
          'Quiz-aware adaptive avatars',
          'SCORM / xAPI ready',
          'Audit logs for compliance teams',
        ],
        icon: faGraduationCap,
      },
      {
        key: 'sales',
        label: 'Sales',
        title: 'Show up personalized, every time.',
        description:
          'Send 1:1 video pitches at scale and let prospects ask follow-ups to an always-available agent.',
        bullets: [
          'Auto-generate prospect videos from CRM data',
          'Trackable engagement analytics',
          'Calendar handoff when intent spikes',
        ],
        icon: faHandshake,
      },
    ],
  },
  integrations: {
    title: 'Combine our platform with your favorite tools.',
    description:
      'First-class integrations with the stack you already trust. Bring avatars where your work already happens.',
    cta: { label: 'Discover integrations', href: '#integrations' },
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
  awards: {
    title: 'Leading the industry.',
    awards: [
      { name: 'Microsoft', icon: faMicrosoft },
      { name: 'Google', icon: faGoogle },
      { name: 'Stripe', icon: faStripe },
      { name: 'Salesforce', icon: faSalesforce },
      { name: 'HubSpot', icon: faHubspot },
    ],
  },
  faq: {
    eyebrow: 'Frequently asked',
    title: 'Everything you need to know.',
    description:
      'Common questions about Lumina — and if something is missing, our team replies in under a business day.',
    contactCta: { label: 'Talk to our team', href: '#contact' },
    items: [
      {
        id: 'what-is',
        question: 'What does the platform actually do?',
        answer:
          'Lumina turns scripts, documents and prompts into lifelike avatar videos and real-time agents you can drop into your product, marketing site, training portal or sales workflow.',
      },
      {
        id: 'how-fast',
        question: 'How quickly can I publish my first avatar?',
        answer:
          'Most teams ship their first avatar in under two minutes from sign-up: pick a presenter, paste a script, choose a voice and language, then export or embed.',
      },
      {
        id: 'languages',
        question: 'Which languages and voices are supported?',
        answer:
          'We support 80+ languages and locales with native-sounding voices, including regional accents. You can also clone a brand voice with consent for premium plans.',
      },
      {
        id: 'security',
        question: 'Is my data safe to use with enterprise content?',
        answer:
          'Yes. We are SOC 2 Type II, encrypt data at rest and in transit, never train shared models on customer content, and offer regional residency and SSO on enterprise plans.',
      },
      {
        id: 'brand',
        question: 'Can I bring my own brand likeness or presenters?',
        answer:
          'Absolutely. Upload your brand kit, customize avatar wardrobes and backdrops, or onboard a custom presenter from a short consented recording.',
      },
      {
        id: 'pricing',
        question: 'How does pricing work?',
        answer:
          'There is a free tier for individuals and small teams, usage-based plans for growing companies, and custom enterprise pricing with dedicated infrastructure and SLAs.',
      },
    ],
  },
  enterprise: {
    title: 'Enterprise-ready use of AI.',
    description:
      'Security, privacy and compliance designed for the most demanding organizations.',
    pillars: [
      {
        icon: faLock,
        title: 'Privacy',
        description:
          'Customer data is never used to train shared models. Your content stays yours.',
      },
      {
        icon: faShieldHalved,
        title: 'Security',
        description:
          'SOC 2 Type II, end-to-end encryption at rest and in transit, scoped API keys.',
      },
      {
        icon: faCircleNodes,
        title: 'Compliance',
        description:
          'GDPR, HIPAA-ready data handling and configurable regional residency.',
      },
      {
        icon: faWandMagicSparkles,
        title: 'Scale',
        description:
          'High-availability infrastructure that grows with your traffic, with SLAs to back it.',
      },
    ],
  },
};

export { homeContent };
export type {
  HomeContent,
  HeroContent,
  TrustedByContent,
  SplitFeatureContent,
  RealtimeContent,
  StatementContent,
  PillarsTrioContent,
  AudienceTabsContent,
  AudienceTabContent,
  IntegrationsContent,
  AwardsContent,
  EnterprisePillarsContent,
  FaqContent,
  FaqItem,
  CTA,
  LogoItem,
  PillarItem,
};
