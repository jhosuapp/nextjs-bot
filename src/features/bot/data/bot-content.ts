const VIDEOS = {
  defaultWait: "/videos/default-wait-answer.mp4",
  intro: "/videos/INTRONEW.mp4",
} as const;

type BotResponse = { videoUrl: string; text: string; scriptId?: string };
type ConversationTurn = { role: "user" | "bot"; text: string };
type BotApiPayload = {
  input: string;
  locale: string;
  previousScriptId?: string | null;
  /** Últimos turnos de la conversación (más antiguo → más reciente) para dar contexto al clasificador. */
  history?: ConversationTurn[];
};

const STATUS_KEYS = ["thinking", "analyzing", "preparing"] as const;

const INACTIVITY_MS = 5 * 60 * 1000;
const INACTIVITY_WARNING_MS = 4 * 60 * 1000 + 30 * 1000;

const MIN_INPUT_WORDS = 1;

const WAKE_WORDS_FALLBACK = {
  start: ["hola", "hello", "olá", "ola", "bonjour", "hallo"],
  // Tokens de una sola palabra (la detección compara token a token con match por
  // prefijo). "pregunta" ya cubre frases como "tengo una pregunta".
  interrupt: [
    // es
    "pregunta",
    "pregunto",
    "preguntar",
    "espera",
    "disculpa",
    // en
    "question",
    "wait",
    "sorry",
    // pt
    "pergunta",
    // fr / de
    "frage",
    "attends",
    "warte",
  ],
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
export type { BotResponse, BotApiPayload, ConversationTurn, StatusKey };
