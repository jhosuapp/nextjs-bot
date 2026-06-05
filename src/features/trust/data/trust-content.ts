import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
  faGlobe,
  faMobileScreenButton,
  faDisplay,
  faStore,
  faCube,
} from '@fortawesome/free-solid-svg-icons';

type ChannelStatic = {
  key: string;
  icon: IconDefinition;
};

type TocItemStatic = {
  id: string;
  key: string;
};

// Channels where a digital agent can live. Labels live in the i18n files
// (channels.items.<key>); only the structural icon stays here.
const channelsStaticData: ReadonlyArray<ChannelStatic> = [
  { key: 'whatsapp', icon: faWhatsapp },
  { key: 'web', icon: faGlobe },
  { key: 'apps', icon: faMobileScreenButton },
  { key: 'screens', icon: faDisplay },
  { key: 'kiosks', icon: faStore },
  { key: 'immersive', icon: faCube },
];

// Section ids used by the sticky table of contents and useActiveSection.
// Labels live in the i18n files (toc.<key>).
const tocStaticData: ReadonlyArray<TocItemStatic> = [
  { id: 'hiperrealismo', key: 'hiperrealismo' },
  { id: 'ai-native', key: 'aiNative' },
  { id: 'comportamiento', key: 'comportamiento' },
  { id: 'futuro', key: 'futuro' },
  { id: 'canales', key: 'canales' },
];

export { channelsStaticData, tocStaticData };
export type { ChannelStatic, TocItemStatic };
