import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faLinkedinIn,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

type FooterLinkStatic = {
  key: string;
  href: string;
  external?: boolean;
};

type FooterColumnStatic = {
  key: string;
  links: ReadonlyArray<FooterLinkStatic>;
};

type FooterSocialStatic = {
  key: string;
  name: string;
  href: string;
  icon: IconDefinition;
};

type FooterLegalStatic = {
  key: string;
  href: string;
};

type FooterStaticData = {
  brand: { name: string; mark: string };
  nav: { columns: ReadonlyArray<FooterColumnStatic> };
  bottom: {
    socials: ReadonlyArray<FooterSocialStatic>;
    legalLinks: ReadonlyArray<FooterLegalStatic>;
  };
};

const footerStaticData: FooterStaticData = {
  brand: { name: "150%", mark: "L" },
  nav: {
    columns: [
      {
        key: "product",
        links: [
          { key: "avatars", href: "#avatars" },
          { key: "realtime", href: "#realtime" },
          { key: "integrations", href: "#integrations" },
          { key: "pricing", href: "#pricing" },
          { key: "changelog", href: "#changelog" },
        ],
      },
      {
        key: "company",
        links: [
          { key: "about", href: "#about" },
          { key: "customers", href: "#customers" },
          { key: "careers", href: "#careers" },
          { key: "press", href: "#press" },
          { key: "contact", href: "#contact" },
        ],
      },
      {
        key: "resources",
        links: [
          { key: "docs", href: "#docs" },
          { key: "api", href: "#api" },
          { key: "help", href: "#help" },
          { key: "status", href: "#status", external: true },
          { key: "security", href: "#security" },
        ],
      },
    ],
  },
  bottom: {
    socials: [
      { key: "twitter", name: "X (Twitter)", href: "#", icon: faXTwitter },
      { key: "linkedin", name: "LinkedIn", href: "#", icon: faLinkedinIn },
      { key: "github", name: "GitHub", href: "#", icon: faGithub },
      { key: "youtube", name: "YouTube", href: "#", icon: faYoutube },
    ],
    legalLinks: [
      { key: "privacy", href: "#privacy" },
      { key: "terms", href: "#terms" },
      { key: "cookies", href: "#cookies" },
    ],
  },
};

export { footerStaticData };
export type {
  FooterStaticData,
  FooterLinkStatic,
  FooterColumnStatic,
  FooterSocialStatic,
  FooterLegalStatic,
};
