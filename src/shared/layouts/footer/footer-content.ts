import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faLinkedinIn,
  faFacebook,
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
        key: "explore",
        links: [
          { key: "bot", href: "/#hero" },
          { key: "solutions", href: "/#solutions" },
          { key: "process", href: "/#process" },
          { key: "pricing", href: "/#pricing" },
          { key: "faqs", href: "/#faqs" },
        ],
      },
      {
        key: "company",
        links: [
          {
            key: "digitalTransformation",
            href: "https://150porciento.com/digital-transformation/",
            external: true,
          },
          {
            key: "services",
            href: "https://150porciento.com/digital-agency-services/",
            external: true,
          },
          {
            key: "blog",
            href: "https://150porciento.com/blog",
            external: true,
          },
          {
            key: "contact",
            href: "https://150porciento.com/contact-us/",
            external: true,
          },
        ],
      },
    ],
  },
  bottom: {
    socials: [
      {
        key: "linkedin",
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/150porciento/",
        icon: faLinkedinIn,
      },
      {
        key: "github",
        name: "GitHub",
        href: "https://github.com/150PorcientoCol/",
        icon: faGithub,
      },
    ],
    legalLinks: [
      { key: "privacy", href: "/privacy" },
      { key: "terms", href: "/terms" },
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
