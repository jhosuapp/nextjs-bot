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

const STORAGE_KEY = 'lumina:cookies';

const persist = (status: ConsentStatus): void => {
  try {
    localStorage.setItem(STORAGE_KEY, status);
  } catch {
    /* storage may be blocked */
  }
};

const readStored = (): ConsentStatus => {
  if (typeof window === 'undefined') return 'pending';
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === 'accepted' || v === 'declined') return v;
  } catch {
    /* fall through */
  }
  return 'pending';
};

const storeAPI: StateCreator<
  CookieConsentState & CookieConsentActions,
  [['zustand/devtools', never]]
> = (set) => ({
  status: 'pending',
  hydrated: false,

  accept: () => {
    persist('accepted');
    set({ status: 'accepted' }, false, 'accept');
  },

  decline: () => {
    persist('declined');
    set({ status: 'declined' }, false, 'decline');
  },

  hydrate: () => {
    const status = readStored();
    set({ status, hydrated: true }, false, 'hydrate');
  },
});

const useCookieConsentStore = create<CookieConsentState & CookieConsentActions>()(
  devtools(storeAPI, { name: 'cookie-consent-store' }),
);

export { useCookieConsentStore };
export type { ConsentStatus };
