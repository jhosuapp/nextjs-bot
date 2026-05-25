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
import { useVideoPlayer } from "@/src/features/bot/hooks/useVideoPlayer";
import { useWakeWord } from "@/src/features/bot/hooks/useWakeWord";

interface UseBotEngineOptions {
  locale: string;
  startWord: string;
  interruptWord: string;
}

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

  const videoPlayer = useVideoPlayer();
  const stateRef = useRef(state);
  const statusIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    return () => {
      if (statusIntervalRef.current) {
        clearInterval(statusIntervalRef.current);
        statusIntervalRef.current = null;
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
        const response = await requestBotResponse({ input, locale });
        if (statusIntervalRef.current) {
          clearInterval(statusIntervalRef.current);
          statusIntervalRef.current = null;
        }
        setStatusKey(null);
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
      setState,
      setStatusKey,
      transitionToError,
      videoPlayer,
    ],
  );

  const handleWake = useCallback(
    (word: string) => {
      const current = stateRef.current;
      const normalizedStart = startWord.toLowerCase();
      const normalizedInterrupt = interruptWord.toLowerCase();

      if (
        current === "IDLE" &&
        (word === normalizedStart || WAKE_WORDS_FALLBACK.start.includes(word))
      ) {
        setState("INTRO");
        return;
      }

      if (
        word === normalizedInterrupt ||
        WAKE_WORDS_FALLBACK.interrupt.includes(word)
      ) {
        if (
          current === "INTRO" ||
          current === "RESPONDING" ||
          current === "THINKING"
        ) {
          setState("LISTENING");
        }
      }
    },
    [interruptWord, setState, startWord],
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

  const handleSpeechResult = useCallback(
    (transcript: string, isFinal: boolean) => {
      const current = stateRef.current;

      // Wake-word scanning runs in any active state
      const handledByWake = wake.inspect(transcript);

      if (current === "LISTENING" && isFinal && !handledByWake) {
        const words = transcript.trim().split(/\s+/).filter(Boolean);
        if (words.length >= MIN_INPUT_WORDS) {
          sendToBackend(transcript.trim());
        }
      }
    },
    [sendToBackend, wake],
  );

  const speech = useSpeechRecognition({ locale, onResult: handleSpeechResult });

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
