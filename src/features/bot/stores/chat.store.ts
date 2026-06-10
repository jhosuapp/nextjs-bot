import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

type ChatRole = 'user' | 'bot';

interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  ts: number;
}

interface ChatStoreState {
  messages: ChatMessage[];
  pendingUserInput: string | null;
  /** Último guion respondido por el bot — se pasa como contexto al clasificador. */
  lastScriptId: string | null;
}

interface ChatStoreActions {
  push: (message: { role: ChatRole; text: string }) => void;
  clear: () => void;
  submitUserText: (text: string) => void;
  consumeUserInput: () => string | null;
  setLastScriptId: (id: string | null) => void;
}

const generateId = (): string =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const storeAPI: StateCreator<
  ChatStoreState & ChatStoreActions,
  [['zustand/devtools', never]]
> = (set, get) => ({
  messages: [],
  pendingUserInput: null,
  lastScriptId: null,

  push: ({ role, text }) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const message: ChatMessage = {
      id: generateId(),
      role,
      text: trimmed,
      ts: Date.now(),
    };
    set(
      { messages: [...get().messages, message] },
      false,
      `push:${role}`,
    );
  },

  clear: () =>
    set(
      { messages: [], pendingUserInput: null, lastScriptId: null },
      false,
      'clear',
    ),

  submitUserText: (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    set({ pendingUserInput: trimmed }, false, 'submitUserText');
  },

  consumeUserInput: () => {
    const value = get().pendingUserInput;
    if (value !== null) {
      set({ pendingUserInput: null }, false, 'consumeUserInput');
    }
    return value;
  },

  setLastScriptId: (id) => set({ lastScriptId: id }, false, 'setLastScriptId'),
});

const useChatStore = create<ChatStoreState & ChatStoreActions>()(
  devtools(storeAPI, { name: 'chat-store' }),
);

export { useChatStore };
export type { ChatMessage, ChatRole };
