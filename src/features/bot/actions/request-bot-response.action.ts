import { api } from "@/src/shared/api/index.api";
import type {
  BotApiPayload,
  BotResponse,
} from "@/src/features/bot/data/bot-content";

type BotApiResponse = {
  scriptId: string;
  videoUrl: string;
  text: string;
  confidence: number;
  reasonCode: string;
};

/**
 * Clasifica el mensaje del usuario contra el catálogo de guiones Humanika
 * (vía /api/bot) y devuelve el guion + video correspondiente.
 */
const requestBotResponse = async ({
  input,
  locale,
  previousScriptId = null,
}: BotApiPayload): Promise<BotResponse> => {
  const { data } = await api.post<BotApiResponse>("/bot", {
    input,
    locale,
    previousScriptId,
  });

  return {
    videoUrl: data.videoUrl,
    text: data.text,
    scriptId: data.scriptId,
  };
};

export { requestBotResponse };
