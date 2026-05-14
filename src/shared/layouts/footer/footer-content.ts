import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faGithub,
  faLinkedinIn,
  faXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterLinkColumn = {
  title: string;
  links: ReadonlyArray<FooterLink>;
};

type FooterSocial = {
  name: string;
  href: string;
  icon: IconDefinition;
};

type FooterBrand = {
  name: string;
  tagline: string;
};

type FooterNewsletter = {
  eyebrow: string;
  title: string;
  description: string;
  placeholder: string;
  cta: string;
  successMessage: string;
  privacy: string;
};

type FooterNav = {
  columns: ReadonlyArray<FooterLinkColumn>;
};

type FooterBottom = {
  copyright: string;
  socials: ReadonlyArray<FooterSocial>;
  legalLinks: ReadonlyArray<FooterLink>;
};

type FooterContent = {
  brand: FooterBrand;
  newsletter: FooterNewsletter;
  nav: FooterNav;
  bottom: FooterBottom;
};

const currentYear = new Date().getFullYear();

const footerContent: FooterContent = {
  brand: {
    name: 'Lumina',
    tagline: 'AI avatars built for humanlike communication.',
  },
  newsletter: {
    eyebrow: 'Newsletter',
    title: 'New releases, straight to your inbox.',
    description:
      'A monthly roundup of avatar releases, use cases and platform updates. No spam, unsubscribe anytime.',
    placeholder: 'you@company.com',
    cta: 'Subscribe',
    successMessage: 'Thanks for joining — check your inbox to confirm.',
    privacy: 'By subscribing you agree to our privacy policy.',
  },
  nav: {
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'Avatars', href: '#avatars' },
          { label: 'Real-time agents', href: '#realtime' },
          { label: 'Integrations', href: '#integrations' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Changelog', href: '#changelog' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '#about' },
          { label: 'Customers', href: '#customers' },
          { label: 'Careers', href: '#careers' },
          { label: 'Press', href: '#press' },
          { label: 'Contact', href: '#contact' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Documentation', href: '#docs' },
          { label: 'API reference', href: '#api' },
          { label: 'Help center', href: '#help' },
          { label: 'Status', href: '#status', external: true },
          { label: 'Security', href: '#security' },
        ],
      },
    ],
  },
  bottom: {
    copyright: `© ${currentYear} Lumina, Inc. All rights reserved.`,
    socials: [
      { name: 'X (Twitter)', href: '#', icon: faXTwitter },
      { name: 'LinkedIn', href: '#', icon: faLinkedinIn },
      { name: 'GitHub', href: '#', icon: faGithub },
      { name: 'YouTube', href: '#', icon: faYoutube },
    ],
    legalLinks: [
      { label: 'Privacy', href: '#privacy' },
      { label: 'Terms', href: '#terms' },
      { label: 'Cookies', href: '#cookies' },
    ],
  },
};

export { footerContent };
export type {
  FooterContent,
  FooterBrand,
  FooterNewsletter,
  FooterNav,
  FooterBottom,
  FooterLink,
  FooterLinkColumn,
  FooterSocial,
};
