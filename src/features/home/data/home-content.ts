import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faGoogle,
  faGoogleDrive,
  faHubspot,
  faMicrosoft,
  faOpenai,
  faShopify,
  faWhatsapp,
  faSalesforce,
  faMeta,
  faAmazon,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBolt,
  faBrain,
  faChartLine,
  faCommentDots,
  faGear,
  faHeadset,
  faMicrophone,
  faPalette,
  faPowerOff,
  faRobot,
  faVideo,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

type LogoItem = {
  name: string;
  icon: IconDefinition;
};

type TrustedByLogoItem = {
  name: string;
  src: string;
};

type AudienceTabStatic = {
  key: "digitalHumans" | "aiContent" | "aiAgents";
  icon: IconDefinition;
};

type ProcessStepStatic = {
  id: "design" | "train" | "integrate" | "operate";
  icon: IconDefinition;
};

type FloatIconStatic = {
  id: string;
  icon: IconDefinition;
  side: "left" | "right";
  topPercent: number;
  offset: number;
  size: number;
  rotate?: number;
  accent?: boolean;
};

type FaqItemStatic = {
  id: string;
};

type PricingFeatureStatic = {
  id: "hosting" | "ai" | "support";
};

type HomeStaticData = {
  hero: {
    primaryCta: { href: string };
    secondaryCta: { href: string };
  };
  trustedBy: {
    rows: ReadonlyArray<ReadonlyArray<TrustedByLogoItem>>;
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
    floatIcons: ReadonlyArray<FloatIconStatic>;
  };
  integrations: {
    cta: { href: string };
    logos: ReadonlyArray<LogoItem>;
  };
  pricing: {
    features: ReadonlyArray<PricingFeatureStatic>;
    cta: { href: string };
  };
  faq: {
    items: ReadonlyArray<FaqItemStatic>;
    contactCta: { href: string };
  };
};

const homeStaticData: HomeStaticData = {
  hero: {
    primaryCta: { href: "/bot" },
    secondaryCta: { href: "#demo" },
  },
  trustedBy: {
    rows: [
      [
        { name: "Corona", src: "/logos/corona.png" },
        { name: "Budweiser", src: "/logos/budweiser.png" },
        { name: "Michelob", src: "/logos/michelob.png" },
        { name: "Poker", src: "/logos/poker.png" },
        { name: "Pepsi", src: "/logos/pepsi.png" },
        { name: "Doritos", src: "/logos/doritos.png" },
        { name: "Detodito", src: "/logos/detodito.png" },
        { name: "Bon Yurt", src: "/logos/bon-yurt.png" },
        { name: "Alpina", src: "/logos/alpina.png" },
        { name: "Intel", src: "/logos/intel.png" },
        { name: "Monster", src: "/logos/monster.png" },
        { name: "Airtm", src: "/logos/airtm.png" },
        { name: "Primax", src: "/logos/primax.png" },
        { name: "Mass", src: "/logos/mass.png" },
        { name: "Listo", src: "/logos/listo.png" },
        { name: "Ogilvy", src: "/logos/ogilfy.png" },
      ],
      [
        { name: "Doyle", src: "/logos/doyle.png" },
        { name: "JBalvin", src: "/logos/jbalvin.png" },
        { name: "2 Night", src: "/logos/2-night.png" },
        { name: "Trece", src: "/logos/trece.png" },
        { name: "TIC", src: "/logos/tic.png" },
        { name: "Misiedo", src: "/logos/misiedo.png" },
        { name: "Ideam", src: "/logos/ideam.png" },
        { name: "Accion", src: "/logos/accion.png" },
        { name: "Fundacion", src: "/logos/fundacion.png" },
        { name: "Noewich", src: "/logos/noewich.png" },
        { name: "Earlham", src: "/logos/earlham.png" },
      ],
    ],
  },
  agentic: {
    icon: faVideo,
    cta: { href: "#agentic" },
  },
  realtime: {
    cta: { href: "#v4" },
  },
  audience: {
    tabs: [
      { key: "digitalHumans", icon: faMicrophone },
      { key: "aiContent", icon: faVideo },
      { key: "aiAgents", icon: faRobot },
    ],
  },
  process: {
    steps: [
      { id: "design", icon: faPalette },
      { id: "train", icon: faBrain },
      { id: "integrate", icon: faBolt },
      { id: "operate", icon: faGear },
    ],
    floatIcons: [
      {
        id: "robot",
        icon: faRobot,
        side: "left",
        topPercent: 12,
        offset: 140,
        size: 44,
        rotate: -8,
      },
      {
        id: "commentDots",
        icon: faCommentDots,
        side: "left",
        topPercent: 46,
        offset: 95,
        size: 32,
        rotate: 6,
        accent: true,
      },
      {
        id: "microphone",
        icon: faMicrophone,
        side: "left",
        topPercent: 82,
        offset: 120,
        size: 36,
        rotate: -4,
      },
      {
        id: "wand",
        icon: faWandMagicSparkles,
        side: "right",
        topPercent: 16,
        offset: 110,
        size: 36,
        rotate: 9,
        accent: true,
      },
      {
        id: "chart",
        icon: faChartLine,
        side: "right",
        topPercent: 50,
        offset: 130,
        size: 40,
        rotate: -6,
      },
      {
        id: "headset",
        icon: faHeadset,
        side: "right",
        topPercent: 84,
        offset: 85,
        size: 34,
        rotate: 4,
      },
    ],
  },
  integrations: {
    cta: { href: "#integrations" },
    logos: [
      { name: "WhatsApp Business API", icon: faWhatsapp },
      { name: "OpenAI", icon: faOpenai },
      { name: "Meta AI", icon: faMeta },
      { name: "HubSpot", icon: faHubspot },
      { name: "Salesforce", icon: faSalesforce },
      { name: "Google Gemini", icon: faGoogle },
      { name: "Google Workspace", icon: faGoogleDrive },
      { name: "Microsoft Teams", icon: faMicrosoft },
      { name: "Microsoft Azure", icon: faMicrosoft },
      { name: "Amazon web Service", icon: faAmazon },
      { name: "Shopify", icon: faShopify },
      { name: "Github", icon: faGithub },
    ],
  },
  pricing: {
    features: [{ id: "hosting" }, { id: "ai" }, { id: "support" }],
    cta: { href: "#contact" },
  },
  faq: {
    items: [
      { id: "what-is" },
      { id: "how-fast" },
      { id: "languages" },
      { id: "security" },
      { id: "brand" },
      { id: "pricing" },
    ],
    contactCta: { href: "#contact" },
  },
};

export { homeStaticData };
export type {
  HomeStaticData,
  LogoItem,
  AudienceTabStatic,
  FaqItemStatic,
  PricingFeatureStatic,
  ProcessStepStatic,
  FloatIconStatic,
};
