type NavLinkStatic = {
  key: string;
  href: string;
};

type LanguageOption = {
  code: string;
  label: string;
  native: string;
};

type HeaderStaticData = {
  brand: { name: string; mark: string };
  nav: ReadonlyArray<NavLinkStatic>;
  primaryCta: { href: string };
  secondaryCta: { href: string };
  languages: ReadonlyArray<LanguageOption>;
};

const headerStaticData: HeaderStaticData = {
  brand: { name: 'Lumina', mark: 'L' },
  nav: [
    { key: 'product', href: '/login' },
    { key: 'solutions', href: '/login' },
    { key: 'customers', href: '/login' },
    { key: 'pricing', href: '/login' },
    { key: 'docs', href: '/login' },
  ],
  primaryCta: { href: '#get-started' },
  secondaryCta: { href: '#signin' },
  languages: [
    { code: 'en', label: 'EN', native: 'English' },
    { code: 'es', label: 'ES', native: 'Español' },
    { code: 'fr', label: 'FR', native: 'Français' },
    { code: 'de', label: 'DE', native: 'Deutsch' },
    { code: 'pt', label: 'PT', native: 'Português' },
  ],
};

export { headerStaticData };
export type { HeaderStaticData, NavLinkStatic, LanguageOption };
