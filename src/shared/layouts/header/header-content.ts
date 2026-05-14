import type { Locale } from '@/src/shared/stores/language.store';

type NavLink = {
  label: string;
  href: string;
};

type CTA = {
  label: string;
  href: string;
};

type LanguageOption = {
  code: Locale;
  label: string;
  native: string;
};

type HeaderContent = {
  brand: { name: string; mark: string };
  nav: ReadonlyArray<NavLink>;
  primaryCta: CTA;
  secondaryCta: CTA;
  languages: ReadonlyArray<LanguageOption>;
};

const headerContent: HeaderContent = {
  brand: { name: 'Lumina', mark: 'L' },
  nav: [
    { label: 'Product', href: '#product' },
    { label: 'Solutions', href: '#audience-title' },
    { label: 'Customers', href: '#customers' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#docs' },
  ],
  primaryCta: { label: 'Start free', href: '#get-started' },
  secondaryCta: { label: 'Sign in', href: '#signin' },
  languages: [
    { code: 'en', label: 'EN', native: 'English' },
    { code: 'es', label: 'ES', native: 'Español' },
    { code: 'fr', label: 'FR', native: 'Français' },
    { code: 'de', label: 'DE', native: 'Deutsch' },
    { code: 'pt', label: 'PT', native: 'Português' },
  ],
};

export { headerContent };
export type { HeaderContent, NavLink, CTA, LanguageOption };
