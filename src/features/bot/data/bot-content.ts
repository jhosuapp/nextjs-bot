const VIDEOS = {
  defaultWait: '/videos/default-wait-answer.mp4',
  intro: '/videos/INTRONEW.mp4',
} as const;

type BotResponse = { videoUrl: string; text: string };
type BotApiPayload = { input: string; locale: string };

const MOCK_RESPONSES: ReadonlyArray<BotResponse> = [
  {
    videoUrl: '/videos/E1_VPH_CUERPO.mp4',
    text: 'Claro, te cuento. Lo que pediste tiene varias capas, pero en esencia se trata de un avatar de IA respondiéndote en video, en tiempo real.',
  },
  {
    videoUrl: '/videos/E1_VPH_CUERPO.mp4',
    text: 'Buena pregunta. Déjame mostrarte cómo funciona el flujo — observa cómo cambia el video según la intención detectada.',
  },
  {
    videoUrl: '/videos/E1_VPH_CUERPO.mp4',
    text: 'Perfecto. Cada respuesta es un video pre-renderizado, servido según tu intención por el endpoint del bot.',
  },
];

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
  MOCK_RESPONSES,
  STATUS_KEYS,
  INACTIVITY_MS,
  INACTIVITY_WARNING_MS,
  MIN_INPUT_WORDS,
  WAKE_WORDS_FALLBACK,
};
export type { BotResponse, BotApiPayload, StatusKey };
