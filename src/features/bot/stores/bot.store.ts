import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { StatusKey } from '@/src/features/bot/data/bot-content';

type BotState =
  | 'PERMISSION_PENDING'
  | 'IDLE'
  | 'INTRO'
  | 'LISTENING'
  | 'THINKING'
  | 'RESPONDING'
  | 'ERROR';

type MicPermission = 'unknown' | 'granted' | 'denied';

interface BotStoreState {
  state: BotState;
  micPermission: MicPermission;
  statusKey: StatusKey | null;
  currentVideo: string | null;
  isVideoMuted: boolean;
  isVideoLoop: boolean;
  lastInput: string | null;
  errorMessage: string | null;
  inactivityWarning: boolean;
  isChatOpen: boolean;
  speechEngine: 'native' | 'whisper' | null;
}

interface BotStoreActions {
  setState: (state: BotState) => void;
  setMicPermission: (perm: MicPermission) => void;
  setVideo: (src: string, opts?: { muted?: boolean; loop?: boolean }) => void;
  setStatusKey: (key: StatusKey | null) => void;
  setLastInput: (input: string | null) => void;
  setError: (message: string | null) => void;
  setInactivityWarning: (active: boolean) => void;
  setChatOpen: (open: boolean) => void;
  toggleChat: () => void;
  setSpeechEngine: (engine: 'native' | 'whisper' | null) => void;
  reset: () => void;
}

const initialState: BotStoreState = {
  state: 'PERMISSION_PENDING',
  micPermission: 'unknown',
  statusKey: null,
  currentVideo: null,
  isVideoMuted: true,
  isVideoLoop: true,
  lastInput: null,
  errorMessage: null,
  inactivityWarning: false,
  isChatOpen: false,
  speechEngine: null,
};

const storeAPI: StateCreator<
  BotStoreState & BotStoreActions,
  [['zustand/devtools', never]]
> = (set, get) => ({
  ...initialState,

  setState: (state) => set({ state }, false, `setState:${state}`),

  setMicPermission: (micPermission) =>
    set({ micPermission }, false, `setMicPermission:${micPermission}`),

  setVideo: (src, opts) =>
    set(
      {
        currentVideo: src,
        isVideoMuted: opts?.muted ?? get().isVideoMuted,
        isVideoLoop: opts?.loop ?? false,
      },
      false,
      'setVideo',
    ),

  setStatusKey: (statusKey) => set({ statusKey }, false, 'setStatusKey'),

  setLastInput: (lastInput) => set({ lastInput }, false, 'setLastInput'),

  setError: (errorMessage) => set({ errorMessage }, false, 'setError'),

  setInactivityWarning: (inactivityWarning) =>
    set({ inactivityWarning }, false, 'setInactivityWarning'),

  setChatOpen: (isChatOpen) => set({ isChatOpen }, false, 'setChatOpen'),

  toggleChat: () =>
    set({ isChatOpen: !get().isChatOpen }, false, 'toggleChat'),

  setSpeechEngine: (speechEngine) =>
    set({ speechEngine }, false, 'setSpeechEngine'),

  reset: () => set({ ...initialState }, false, 'reset'),
});

const useBotStore = create<BotStoreState & BotStoreActions>()(
  devtools(storeAPI, { name: 'bot-store' }),
);

export { useBotStore };
export type { BotState, MicPermission };
