const VIDEOS = {
  defaultWait: '/videos/default-wait-answer.mp4',
  intro: '/videos/INTRONEW.mp4',
} as const;

type BotResponse = { videoUrl: string; text: string; scriptId?: string };
type BotApiPayload = {
  input: string;
  locale: string;
  previousScriptId?: string | null;
};

const STATUS_KEYS = ['thinking', 'analyzing', 'preparing'] as const;

const INACTIVITY_MS = 5 * 60 * 1000;
const INACTIVITY_WARNING_MS = 4 * 60 * 1000 + 30 * 1000;

const MIN_INPUT_WORDS = 2;

const WAKE_WORDS_FALLBACK = {
  start: ['hola', 'hello', 'olá', 'ola', 'bonjour', 'hallo'],
  interrupt: ['pregunta', 'question', 'pergunta', 'frage'],
};

type StatusKey = (typeof STATUS_KEYS)[number];

export {
  VIDEOS,
  STATUS_KEYS,
  INACTIVITY_MS,
  INACTIVITY_WARNING_MS,
  MIN_INPUT_WORDS,
  WAKE_WORDS_FALLBACK,
};
export type { BotResponse, BotApiPayload, StatusKey };
