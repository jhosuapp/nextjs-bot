import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

type Locale = 'en' | 'es' | 'fr' | 'de' | 'pt';

interface LanguageState {
  locale: Locale;
  hydrated: boolean;
}

interface LanguageActions {
  setLocale: (locale: Locale) => void;
  hydrate: () => void;
}

const STORAGE_KEY = 'lumina:locale';
const SUPPORTED: ReadonlyArray<Locale> = ['en', 'es', 'fr', 'de', 'pt'];

const isLocale = (value: string | null): value is Locale =>
  value !== null && (SUPPORTED as ReadonlyArray<string>).includes(value);

const readInitialLocale = (): Locale => {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    /* fall through */
  }
  const navigatorLocale = window.navigator.language.slice(0, 2).toLowerCase();
  return isLocale(navigatorLocale) ? navigatorLocale : 'en';
};

const persistLocale = (locale: Locale): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* storage may be blocked */
  }
};

const storeAPI: StateCreator<
  LanguageState & LanguageActions,
  [['zustand/devtools', never]]
> = (set, get) => ({
  locale: 'en',
  hydrated: false,

  setLocale: (locale) => {
    persistLocale(locale);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', locale);
    }
    set({ locale }, false, 'setLocale');
  },

  hydrate: () => {
    if (get().hydrated) return;
    const locale = readInitialLocale();
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', locale);
    }
    set({ locale, hydrated: true }, false, 'hydrate');
  },
});

const useLanguageStore = create<LanguageState & LanguageActions>()(
  devtools(storeAPI, { name: 'language-store' }),
);

export { useLanguageStore, SUPPORTED };
export type { Locale };
