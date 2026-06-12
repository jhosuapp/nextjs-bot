import { useCallback, useEffect, useMemo, useRef } from "react";

import {
  MIN_INPUT_WORDS,
  STATUS_KEYS,
  VIDEOS,
  WAKE_WORDS_FALLBACK,
  type StatusKey,
} from "@/src/features/bot/data/bot-content";
import { requestBotResponse } from "@/src/features/bot/actions/request-bot-response.action";
import { useBotStore } from "@/src/features/bot/stores/bot.store";
import { useChatStore } from "@/src/features/bot/stores/chat.store";
import { useInactivityTimer } from "@/src/features/bot/hooks/useInactivityTimer";
import { useSpeechRecognition } from "@/src/features/bot/hooks/useSpeechRecognition";
import {
  useVideoPlayer,
  BASE_VIDEO_VOLUME,
} from "@/src/features/bot/hooks/useVideoPlayer";
import { useVoiceActivity } from "@/src/features/bot/hooks/useVoiceActivity";
import { useWakeWord, normalize } from "@/src/features/bot/hooks/useWakeWord";

interface UseBotEngineOptions {
  locale: string;
  startWord: string;
  interruptWord: string;
}

// Al entrar a LISTENING (el bot acaba de callar), se ignora la voz captada
// durante este lapso para no tomar como pregunta la cola de audio del propio bot.
const LISTENING_GRACE_MS = 500;

// Mientras el bot habla (INTRO/RESPONDING), al detectar voz del usuario (VAD) se
// baja casi a silencio el audio del bot para que las voces no se crucen y el
// micrófono capte el "pregunta" al primer intento. Se restaura al callar.
const DUCK_VOLUME = 0.08;
const DUCK_RESTORE_MS = 1000;

// Cuántos mensajes recientes (usuario+bot) se envían como contexto al clasificador.
const HISTORY_TURNS = 6;

const useBotEngine = ({
  locale,
  startWord,
  interruptWord,
}: UseBotEngineOptions) => {
  const state = useBotStore((s) => s.state);
  const setState = useBotStore((s) => s.setState);
  const setStatusKey = useBotStore((s) => s.setStatusKey);
  const setLastInput = useBotStore((s) => s.setLastInput);
  const setError = useBotStore((s) => s.setError);
  const setBotVideo = useBotStore((s) => s.setVideo);
  const resetStore = useBotStore((s) => s.reset);
  const micPermission = useBotStore((s) => s.micPermission);

  const pushMessage = useChatStore((s) => s.push);
  const clearChat = useChatStore((s) => s.clear);
  const consumeUserInput = useChatStore((s) => s.consumeUserInput);
  const pendingUserInput = useChatStore((s) => s.pendingUserInput);
  const setLastScriptId = useChatStore((s) => s.setLastScriptId);

  const videoPlayer = useVideoPlayer();
  const stateRef = useRef(state);
  const statusIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const listeningSinceRef = useRef(0);
  const duckTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    return () => {
      if (statusIntervalRef.current) {
        clearInterval(statusIntervalRef.current);
        statusIntervalRef.current = null;
      }
      if (duckTimeoutRef.current) {
        clearTimeout(duckTimeoutRef.current);
        duckTimeoutRef.current = null;
      }
      // On unmount during THINKING, the in-flight request becomes orphaned — recover to a stable state.
      const store = useBotStore.getState();
      if (store.state === "THINKING") {
        store.setStatusKey(null);
        store.setState(
          store.micPermission === "granted" ? "IDLE" : "PERMISSION_PENDING",
        );
      }
    };
  }, []);

  const transitionToError = useCallback(
    (message: string) => {
      setError(message);
      setState("ERROR");
    },
    [setError, setState],
  );

  const sendToBackend = useCallback(
    async (input: string) => {
      pushMessage({ role: "user", text: input });
      setLastInput(input);
      setState("THINKING");

      let idx = 0;
      setStatusKey(STATUS_KEYS[0]);
      if (statusIntervalRef.current) clearInterval(statusIntervalRef.current);
      statusIntervalRef.current = setInterval(() => {
        idx = (idx + 1) % STATUS_KEYS.length;
        setStatusKey(STATUS_KEYS[idx] as StatusKey);
      }, 2000);

      try {
        const chat = useChatStore.getState();
        const previousScriptId = chat.lastScriptId;
        // Historial reciente para dar contexto al clasificador. El último mensaje
        // es el input actual (ya recién empujado), así que se excluye.
        const history = chat.messages
          .slice(0, -1)
          .slice(-HISTORY_TURNS)
          .map((m) => ({ role: m.role, text: m.text }));
        const response = await requestBotResponse({
          input,
          locale,
          previousScriptId,
          history,
        });
        if (statusIntervalRef.current) {
          clearInterval(statusIntervalRef.current);
          statusIntervalRef.current = null;
        }
        setStatusKey(null);
        setLastScriptId(response.scriptId ?? null);
        pushMessage({ role: "bot", text: response.text });
        setBotVideo(response.videoUrl, { loop: false, muted: false });
        setState("RESPONDING");
        await videoPlayer.play(response.videoUrl, {
          loop: false,
          muted: false,
          onEnded: () => {
            if (stateRef.current === "RESPONDING") {
              setState("LISTENING");
            }
          },
        });
      } catch (e) {
        if (statusIntervalRef.current) {
          clearInterval(statusIntervalRef.current);
          statusIntervalRef.current = null;
        }
        transitionToError(e instanceof Error ? e.message : "request_failed");
      }
    },
    [
      locale,
      pushMessage,
      setBotVideo,
      setLastInput,
      setLastScriptId,
      setState,
      setStatusKey,
      transitionToError,
      videoPlayer,
    ],
  );

  // Sets normalizados para clasificar cada wake word detectada por categoría.
  const startWordSet = useMemo(
    () => new Set([startWord, ...WAKE_WORDS_FALLBACK.start].map(normalize)),
    [startWord],
  );
  const interruptWordSet = useMemo(
    () =>
      new Set([interruptWord, ...WAKE_WORDS_FALLBACK.interrupt].map(normalize)),
    [interruptWord],
  );

  const handleWake = useCallback(
    (words: string[]) => {
      const current = stateRef.current;
      const hasInterrupt = words.some((w) => interruptWordSet.has(w));
      const hasStart = words.some((w) => startWordSet.has(w));

      // La interrupción tiene prioridad mientras el bot habla o piensa, aunque el
      // transcript también traiga la palabra de inicio (ej. "hola pregunta").
      if (
        hasInterrupt &&
        (current === "INTRO" ||
          current === "RESPONDING" ||
          current === "THINKING")
      ) {
        setState("LISTENING");
        return;
      }

      if (hasStart && current === "IDLE") {
        setState("INTRO");
      }
    },
    [interruptWordSet, setState, startWordSet],
  );

  const allWakeWords = useMemo(
    () => [
      startWord,
      interruptWord,
      ...WAKE_WORDS_FALLBACK.start,
      ...WAKE_WORDS_FALLBACK.interrupt,
    ],
    [interruptWord, startWord],
  );

  const wake = useWakeWord({ words: allWakeWords, onDetect: handleWake });

  // Coincidencia por prefijo (consistente con la detección): "pregunta" cubre
  // "preguntas"/"pregúntame". Se usa para recortar el preámbulo antes de la instrucción.
  const tokenMatches = useCallback(
    (token: string, set: Set<string>): boolean => {
      const t = normalize(token);
      if (!t) return false;
      for (const w of set) {
        if (t === w || t.startsWith(w)) return true;
      }
      return false;
    },
    [],
  );

  // Devuelve solo la instrucción: descarta el preámbulo (saludo/nombre) anterior a
  // la primera palabra de interrupción y la corrida inicial de wake words.
  // Ej.: "hola mi nombre es jhosua penagos pregunta por que soy asi" → "por que soy asi".
  const extractInstruction = useCallback(
    (tokens: string[]): string[] => {
      let toks = tokens;
      const firstInterrupt = toks.findIndex((t) =>
        tokenMatches(t, interruptWordSet),
      );
      if (firstInterrupt >= 0) toks = toks.slice(firstInterrupt);
      let i = 0;
      while (
        i < toks.length &&
        (tokenMatches(toks[i], interruptWordSet) ||
          tokenMatches(toks[i], startWordSet))
      ) {
        i += 1;
      }
      return toks.slice(i);
    },
    [interruptWordSet, startWordSet, tokenMatches],
  );

  const handleSpeechResult = useCallback(
    (transcript: string, isFinal: boolean) => {
      const current = stateRef.current;
      console.log(
        `[mic] estado=${current} final=${isFinal} →`,
        JSON.stringify(transcript),
      );

      const tokens = transcript.trim().split(/\s+/).filter(Boolean);
      const hasInterrupt = tokens.some((t) => tokenMatches(t, interruptWordSet));

      // EL DISCRIMINADOR ES EL VIDEO ACTIVO (no el estado, que puede cambiar en un
      // interim antes de que llegue el final y arruinar la decisión).
      const activeSrc = videoPlayer.getActiveSrc() ?? "";
      const onWaitVideo = !activeSrc || activeSrc.includes("default-wait-answer");

      // (1) Reproduciendo cualquier video que NO sea el de espera (respuesta/intro):
      // el bot está "hablando". Para tomar algo hay que decir "pregunta"; se descarta
      // TODO lo anterior a "pregunta" y se toma lo que viene después.
      // Se decide solo en el FINAL para no cortar la frase a mitad ni reaccionar a un
      // interim incompleto.
      if (!onWaitVideo) {
        if (!isFinal || !hasInterrupt) return;
        const instruction = extractInstruction(tokens);
        if (instruction.length >= MIN_INPUT_WORDS) {
          sendToBackend(instruction.join(" "));
        } else {
          // Dijo solo "pregunta": interrumpe y queda escuchando.
          setState("LISTENING");
        }
        return;
      }

      // (2) Reproduciendo default-wait-answer.
      if (current === "LISTENING") {
        if (!isFinal) return;
        // La gracia ignora la cola de audio del bot; si dijo una palabra de
        // interrupción es intencional y no se descarta.
        if (
          !hasInterrupt &&
          Date.now() - listeningSinceRef.current < LISTENING_GRACE_MS
        ) {
          return;
        }
        // Escucha pura → frase COMPLETA verbatim, aunque diga "pregunta". Solo se
        // ignora si es SOLO palabra(s) de activación (residuo de la interrupción).
        const onlyWake =
          tokens.length > 0 &&
          tokens.every(
            (t) =>
              tokenMatches(t, interruptWordSet) ||
              tokenMatches(t, startWordSet),
          );
        if (onlyWake) return;
        const text = transcript.trim();
        if (text) sendToBackend(text);
        return;
      }

      // (2b) Video de espera pero IDLE/THINKING: detectar "hola" (IDLE→INTRO) o una
      // interrupción durante THINKING.
      wake.inspect(transcript);
    },
    [
      extractInstruction,
      interruptWordSet,
      sendToBackend,
      setState,
      startWordSet,
      tokenMatches,
      videoPlayer,
      wake,
    ],
  );

  const speech = useSpeechRecognition({ locale, onResult: handleSpeechResult });

  // Ducking proactivo por energía de voz: en cuanto el usuario empieza a hablar
  // mientras el bot responde, se baja casi a silencio el audio del bot (las voces
  // dejan de cruzarse) para reconocer la interrupción al primer intento. Se
  // restaura al callar. Funciona aunque el usuario use parlantes (sin audífonos).
  const handleVoiceActive = useCallback(() => {
    const s = stateRef.current;
    if (s !== "INTRO" && s !== "RESPONDING") return;
    videoPlayer.setActiveVolume(DUCK_VOLUME);
    if (duckTimeoutRef.current) clearTimeout(duckTimeoutRef.current);
    duckTimeoutRef.current = setTimeout(() => {
      duckTimeoutRef.current = null;
      const now = stateRef.current;
      if (now === "INTRO" || now === "RESPONDING") {
        videoPlayer.setActiveVolume(BASE_VIDEO_VOLUME);
      }
    }, DUCK_RESTORE_MS);
  }, [videoPlayer]);

  useVoiceActivity({
    enabled:
      state === "THINKING" || state === "INTRO" || state === "RESPONDING",
    onActive: handleVoiceActive,
  });

  const start = useCallback(() => {
    if (stateRef.current === "IDLE") {
      setState("INTRO");
    }
  }, [setState]);

  const submitText = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      sendToBackend(trimmed);
    },
    [sendToBackend],
  );

  const reset = useCallback(() => {
    if (statusIntervalRef.current) {
      clearInterval(statusIntervalRef.current);
      statusIntervalRef.current = null;
    }
    speech.stop();
    clearChat();
    setError(null);
    resetStore();
    setState(micPermission === "granted" ? "IDLE" : "PERMISSION_PENDING");
  }, [clearChat, micPermission, resetStore, setError, setState, speech]);

  const inactivity = useInactivityTimer({
    enabled: state !== "PERMISSION_PENDING" && state !== "ERROR",
    onTimeout: () => {
      reset();
    },
  });

  useEffect(() => {
    if (pendingUserInput === null) return;
    if (state === "THINKING") return;
    const text = consumeUserInput();
    if (text) submitText(text);
  }, [consumeUserInput, pendingUserInput, state, submitText]);

  useEffect(() => {
    if (state === "PERMISSION_PENDING" && micPermission === "granted") {
      setState("IDLE");
    }
  }, [micPermission, setState, state]);

  useEffect(() => {
    inactivity.reset();
    if (state !== "THINKING" && statusIntervalRef.current) {
      clearInterval(statusIntervalRef.current);
      statusIntervalRef.current = null;
      setStatusKey(null);
    }
    // Al dejar los estados en que el bot habla, cancelar cualquier atenuación pendiente.
    if (state !== "INTRO" && state !== "RESPONDING" && duckTimeoutRef.current) {
      clearTimeout(duckTimeoutRef.current);
      duckTimeoutRef.current = null;
    }
    switch (state) {
      case "IDLE": {
        setBotVideo(VIDEOS.defaultWait, { loop: true, muted: true });
        videoPlayer.play(VIDEOS.defaultWait, { loop: true, muted: true });
        if (!speech.isListening) speech.start().catch(() => undefined);
        break;
      }
      case "INTRO": {
        setBotVideo(VIDEOS.intro, { loop: false, muted: false });
        videoPlayer.play(VIDEOS.intro, {
          loop: false,
          muted: false,
          onEnded: () => {
            if (stateRef.current === "INTRO") setState("LISTENING");
          },
        });
        if (!speech.isListening) speech.start().catch(() => undefined);
        break;
      }
      case "LISTENING": {
        listeningSinceRef.current = Date.now();
        setBotVideo(VIDEOS.defaultWait, { loop: true, muted: true });
        videoPlayer.play(VIDEOS.defaultWait, { loop: true, muted: true });
        if (!speech.isListening) speech.start().catch(() => undefined);
        break;
      }
      case "THINKING": {
        setBotVideo(VIDEOS.defaultWait, { loop: true, muted: true });
        videoPlayer.play(VIDEOS.defaultWait, { loop: true, muted: true });
        break;
      }
      case "RESPONDING": {
        break;
      }
      case "ERROR": {
        speech.stop();
        break;
      }
      case "PERMISSION_PENDING": {
        speech.stop();
        break;
      }
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return {
    state,
    micPermission,
    videoPlayer,
    speech,
    start,
    submitText,
    reset,
    inactivity,
  };
};

export { useBotEngine };
