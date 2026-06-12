import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

type ConsentStatus = 'pending' | 'accepted' | 'declined';

interface CookieConsentState {
  status: ConsentStatus;
  hydrated: boolean;
}

interface CookieConsentActions {
  accept: () => void;
  decline: () => void;
  hydrate: () => void;
}

/**
 * Consentimiento de cookies por sesión: NO se persiste. El estado vive solo en
 * memoria, así que cada recarga vuelve a `pending` y el banner se pide de nuevo.
 */
const storeAPI: StateCreator<
  CookieConsentState & CookieConsentActions,
  [['zustand/devtools', never]]
> = (set) => ({
  status: 'pending',
  hydrated: false,

  accept: () => {
    set({ status: 'accepted' }, false, 'accept');
  },

  decline: () => {
    set({ status: 'declined' }, false, 'decline');
  },

  // Marca el montaje en cliente para evitar renderizar el banner en SSR.
  hydrate: () => {
    set({ hydrated: true }, false, 'hydrate');
  },
});

const useCookieConsentStore = create<CookieConsentState & CookieConsentActions>()(
  devtools(storeAPI, { name: 'cookie-consent-store' }),
);

export { useCookieConsentStore };
export type { ConsentStatus };
