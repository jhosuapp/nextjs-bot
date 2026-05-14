type CTA = {
  label: string;
  href: string;
};

type LogoItem = {
  name: string;
  src: string;
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
  mediaSrc: string;
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
  iconSrc: string;
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
  mediaSrc: string;
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
};

const placeholderSvgs = [
  '/svg/globe.svg',
  '/svg/window.svg',
  '/svg/file.svg',
  '/svg/next.svg',
  '/svg/vercel.svg',
] as const;

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
      { name: 'Brand One', src: placeholderSvgs[0] },
      { name: 'Brand Two', src: placeholderSvgs[1] },
      { name: 'Brand Three', src: placeholderSvgs[2] },
      { name: 'Brand Four', src: placeholderSvgs[3] },
      { name: 'Brand Five', src: placeholderSvgs[4] },
      { name: 'Brand Six', src: placeholderSvgs[0] },
      { name: 'Brand Seven', src: placeholderSvgs[1] },
      { name: 'Brand Eight', src: placeholderSvgs[2] },
    ],
  },
  agentic: {
    eyebrow: 'Agentic videos',
    title: 'Transform passive content into interactive AI experiences.',
    description:
      'Turn static videos into responsive agents that adapt to each viewer in real time, answer follow-up questions, and keep your audience engaged.',
    cta: { label: 'Learn more', href: '#agentic' },
    mediaSrc: placeholderSvgs[1],
    mediaAlt: 'Interactive avatar preview',
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
        iconSrc: placeholderSvgs[0],
        title: 'Studio-grade quality',
        description:
          'Cinematic avatars rendered with realistic lighting, lip-sync and micro-expressions.',
      },
      {
        iconSrc: placeholderSvgs[1],
        title: 'Real-time everywhere',
        description:
          'Sub-second response, ready for web, mobile, kiosks, and embedded experiences.',
      },
      {
        iconSrc: placeholderSvgs[2],
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
        mediaSrc: placeholderSvgs[3],
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
        mediaSrc: placeholderSvgs[4],
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
        mediaSrc: placeholderSvgs[0],
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
        mediaSrc: placeholderSvgs[1],
      },
    ],
  },
  integrations: {
    title: 'Combine our platform with your favorite tools.',
    description:
      'First-class integrations with the stack you already trust. Bring avatars where your work already happens.',
    cta: { label: 'Discover integrations', href: '#integrations' },
    logos: [
      { name: 'Tool One', src: placeholderSvgs[0] },
      { name: 'Tool Two', src: placeholderSvgs[1] },
      { name: 'Tool Three', src: placeholderSvgs[2] },
      { name: 'Tool Four', src: placeholderSvgs[3] },
      { name: 'Tool Five', src: placeholderSvgs[4] },
      { name: 'Tool Six', src: placeholderSvgs[0] },
      { name: 'Tool Seven', src: placeholderSvgs[1] },
      { name: 'Tool Eight', src: placeholderSvgs[2] },
    ],
  },
  awards: {
    title: 'Leading the industry.',
    awards: [
      { name: 'Award One', src: placeholderSvgs[0] },
      { name: 'Award Two', src: placeholderSvgs[1] },
      { name: 'Award Three', src: placeholderSvgs[2] },
      { name: 'Award Four', src: placeholderSvgs[3] },
      { name: 'Award Five', src: placeholderSvgs[4] },
    ],
  },
  enterprise: {
    title: 'Enterprise-ready use of AI.',
    description:
      'Security, privacy and compliance designed for the most demanding organizations.',
    pillars: [
      {
        iconSrc: placeholderSvgs[0],
        title: 'Privacy',
        description:
          'Customer data is never used to train shared models. Your content stays yours.',
      },
      {
        iconSrc: placeholderSvgs[1],
        title: 'Security',
        description:
          'SOC 2 Type II, end-to-end encryption at rest and in transit, scoped API keys.',
      },
      {
        iconSrc: placeholderSvgs[2],
        title: 'Compliance',
        description:
          'GDPR, HIPAA-ready data handling and configurable regional residency.',
      },
      {
        iconSrc: placeholderSvgs[3],
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
  CTA,
  LogoItem,
  PillarItem,
};
