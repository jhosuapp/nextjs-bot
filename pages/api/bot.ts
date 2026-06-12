import { readdirSync } from "fs";
import { join } from "path";

import type { NextApiRequest, NextApiResponse } from "next";

import { classifyScript } from "@/src/features/bot/server/classify-script";
import { getScriptById } from "@/src/features/bot/data/humanika-scripts.type";
import type { ConversationTurn } from "@/src/features/bot/data/bot-content";

// Límites del historial recibido para acotar tokens enviados al clasificador.
const MAX_HISTORY_TURNS = 6;
const MAX_TURN_CHARS = 300;

const parseHistory = (raw: unknown): ConversationTurn[] => {
  if (!Array.isArray(raw)) return [];
  const turns: ConversationTurn[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const { role, text } = item as { role?: unknown; text?: unknown };
    if (role !== "user" && role !== "bot") continue;
    if (typeof text !== "string" || !text.trim()) continue;
    turns.push({ role, text: text.trim().slice(0, MAX_TURN_CHARS) });
  }
  return turns.slice(-MAX_HISTORY_TURNS);
};

type BotResponseBody = {
  scriptId: string;
  videoUrl: string;
  text: string;
  confidence: number;
  reasonCode: string;
};

type ErrorBody = { error: string };

// Video de espera: se usa como fallback mientras un guion no tenga su .mp4 propio,
// para que el reproductor no intente cargar un archivo inexistente.
const FALLBACK_VIDEO = "/videos/default-wait-answer.mp4";

// Set de videos existentes en /public/videos (se lee una vez al cargar el módulo).
const existingVideos: ReadonlySet<string> = (() => {
  try {
    const dir = join(process.cwd(), "public", "videos");
    return new Set(readdirSync(dir));
  } catch {
    return new Set<string>();
  }
})();

const resolveVideoUrl = (scriptId: string): string => {
  const file = `${scriptId}.mp4`;
  return existingVideos.has(file) ? `/videos/${file}` : FALLBACK_VIDEO;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BotResponseBody | ErrorBody>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const { input, previousScriptId, history } = (req.body ?? {}) as {
    input?: unknown;
    locale?: unknown;
    previousScriptId?: unknown;
    history?: unknown;
  };

  if (typeof input !== "string" || !input.trim()) {
    res.status(400).json({ error: "invalid_input" });
    return;
  }

  const previous =
    typeof previousScriptId === "string" && previousScriptId
      ? previousScriptId
      : null;

  const conversation = parseHistory(history);

  try {
    const result = await classifyScript(input.trim(), previous, conversation);
    const script = getScriptById(result.scriptId);

    if (!script) {
      // No debería ocurrir: el clasificador solo devuelve ids del catálogo.
      res.status(500).json({ error: "script_not_found" });
      return;
    }

    res.status(200).json({
      scriptId: script.id,
      videoUrl: resolveVideoUrl(script.id),
      text: script.text,
      confidence: result.confidence,
      reasonCode: result.reasonCode,
    });
  } catch (e) {
    res.status(500).json({
      error: e instanceof Error ? e.message : "classification_failed",
    });
  }
}
