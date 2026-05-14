import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  hydrated: boolean;
}

interface ThemeActions {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  hydrate: () => void;
}

const STORAGE_KEY = 'lumina:theme';

const applyTheme = (theme: Theme): void => {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage may be blocked */
  }
};

const readInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* fall through */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const storeAPI: StateCreator<
  ThemeState & ThemeActions,
  [['zustand/devtools', never]]
> = (set, get) => ({
  theme: 'light',
  hydrated: false,

  setTheme: (theme) => {
    applyTheme(theme);
    set({ theme }, false, 'setTheme');
  },

  toggleTheme: () => {
    const next: Theme = get().theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
    set({ theme: next }, false, 'toggleTheme');
  },

  hydrate: () => {
    if (get().hydrated) return;
    const theme = readInitialTheme();
    applyTheme(theme);
    set({ theme, hydrated: true }, false, 'hydrate');
  },
});

const useThemeStore = create<ThemeState & ThemeActions>()(
  devtools(storeAPI, { name: 'theme-store' }),
);

export { useThemeStore };
export type { Theme };
