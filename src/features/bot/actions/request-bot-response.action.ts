import {
  MOCK_RESPONSES,
  type BotApiPayload,
  type BotResponse,
} from "@/src/features/bot/data/bot-content";

const FAILURE_PROBABILITY = 0.05;
const LATENCY_MS_MIN = 150000;
const LATENCY_MS_MAX = 250000;

const rotateIndex = (() => {
  let i = 0;
  return () => {
    const value = i;
    i = (i + 1) % MOCK_RESPONSES.length;
    return value;
  };
})();

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const requestBotResponse = async ({
  input,
}: BotApiPayload): Promise<BotResponse> => {
  const latency =
    LATENCY_MS_MIN + Math.random() * (LATENCY_MS_MAX - LATENCY_MS_MIN);
  await wait(latency);

  if (Math.random() < FAILURE_PROBABILITY) {
    throw new Error("mock_endpoint_failure");
  }

  const base = MOCK_RESPONSES[rotateIndex()];
  return {
    videoUrl: base.videoUrl,
    text: `${base.text} (pregunta: "${input.slice(0, 80)}")`,
  };
};

export { requestBotResponse };
