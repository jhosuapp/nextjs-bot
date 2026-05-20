import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeTransition {
  active: boolean;
  x: number;
  y: number;
  next: Theme;
}

interface ThemeState {
  theme: Theme;
  hydrated: boolean;
  transition: ThemeTransition | null;
}

interface ThemeActions {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  hydrate: () => void;
  triggerTransition: (x: number, y: number) => void;
  commitTheme: (theme: Theme) => void;
  clearTransition: () => void;
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
  return 'light';
};

const storeAPI: StateCreator<
  ThemeState & ThemeActions,
  [['zustand/devtools', never]]
> = (set, get) => ({
  theme: 'light',
  hydrated: false,
  transition: null,

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

  triggerTransition: (x, y) => {
    const next: Theme = get().theme === 'light' ? 'dark' : 'light';
    set({ transition: { active: true, x, y, next } }, false, 'triggerTransition');
  },

  commitTheme: (theme) => {
    applyTheme(theme);
    set({ theme }, false, 'commitTheme');
  },

  clearTransition: () => {
    set({ transition: null }, false, 'clearTransition');
  },
});

const useThemeStore = create<ThemeState & ThemeActions>()(
  devtools(storeAPI, { name: 'theme-store' }),
);

export { useThemeStore };
export type { Theme };
