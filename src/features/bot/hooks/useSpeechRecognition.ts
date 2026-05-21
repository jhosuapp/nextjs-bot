import { useCallback, useEffect, useRef, useState } from 'react';

import { useBotStore } from '@/src/features/bot/stores/bot.store';

type SpeechResultCallback = (transcript: string, isFinal: boolean) => void;

interface UseSpeechRecognitionResult {
  start: () => Promise<void>;
  stop: () => void;
  isListening: boolean;
  error: string | null;
  engine: 'native' | 'whisper' | null;
}

interface UseSpeechRecognitionOptions {
  locale?: string;
  onResult?: SpeechResultCallback;
}

type SpeechRecognitionResultLike = {
  isFinal: boolean;
  0: { transcript: string };
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type WindowWithSpeech = Window &
  typeof globalThis & {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };

const getNativeRecognitionCtor = (): (new () => SpeechRecognitionLike) | null => {
  if (typeof window === 'undefined') return null;
  const w = window as WindowWithSpeech;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
};

const WHISPER_CHUNK_MS = 4000;

const useSpeechRecognition = ({
  locale = 'es',
  onResult,
}: UseSpeechRecognitionOptions): UseSpeechRecognitionResult => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [engine, setEngine] = useState<'native' | 'whisper' | null>(null);
  const setSpeechEngine = useBotStore((s) => s.setSpeechEngine);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const onResultRef = useRef<SpeechResultCallback | undefined>(onResult);
  const localeRef = useRef(locale);

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  useEffect(() => {
    localeRef.current = locale;
  }, [locale]);

  const cleanupStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const stop = useCallback(() => {
    const rec = recognitionRef.current;
    if (rec) {
      // Detach handlers BEFORE abort() so the onend auto-restart doesn't fire
      rec.onresult = null;
      rec.onerror = null;
      rec.onend = null;
      rec.abort();
    }
    recognitionRef.current = null;
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    mediaRecorderRef.current = null;
    cleanupStream();
    setIsListening(false);
  }, [cleanupStream]);

  const startWhisper = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setError('speech_not_supported');
      return;
    }
    setEngine('whisper');
    setSpeechEngine('whisper');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
        chunks.length = 0;
        if (blob.size === 0) return;
        try {
          const form = new FormData();
          form.append('audio', blob, 'speech.webm');
          form.append('locale', localeRef.current);
          const res = await fetch('/api/transcribe', { method: 'POST', body: form });
          if (!res.ok) throw new Error(`transcribe_${res.status}`);
          const data = (await res.json()) as { text?: string };
          if (data.text) onResultRef.current?.(data.text, true);
        } catch (e) {
          setError(e instanceof Error ? e.message : 'transcribe_failed');
        }
        if (mediaRecorderRef.current && streamRef.current) {
          // schedule next chunk
          try {
            mediaRecorderRef.current.start();
            setTimeout(() => {
              if (mediaRecorderRef.current?.state === 'recording') {
                mediaRecorderRef.current.stop();
              }
            }, WHISPER_CHUNK_MS);
          } catch {
            /* recorder may have been stopped externally */
          }
        }
      };
      recorder.start();
      setTimeout(() => {
        if (recorder.state === 'recording') recorder.stop();
      }, WHISPER_CHUNK_MS);
      setIsListening(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'mic_failed');
      cleanupStream();
    }
  }, [cleanupStream, setSpeechEngine]);

  const startNative = useCallback((Ctor: new () => SpeechRecognitionLike) => {
    setEngine('native');
    setSpeechEngine('native');
    const recognition = new Ctor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = localeRef.current;
    recognition.onresult = (event) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        if (result.isFinal) final += transcript;
        else interim += transcript;
      }
      if (final) onResultRef.current?.(final, true);
      else if (interim) onResultRef.current?.(interim, false);
    };
    recognition.onerror = (e) => {
      setError(e.error);
      if (e.error === 'no-speech' || e.error === 'audio-capture') {
        // try restart silently
        return;
      }
      setIsListening(false);
    };
    recognition.onend = () => {
      // Native recognition stops on its own; restart if we're still meant to listen
      if (recognitionRef.current === recognition) {
        try {
          recognition.start();
        } catch {
          setIsListening(false);
        }
      }
    };
    recognitionRef.current = recognition;
    try {
      recognition.start();
      setIsListening(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'recognition_failed');
    }
  }, [setSpeechEngine]);

  const start = useCallback(async () => {
    setError(null);
    const Ctor = getNativeRecognitionCtor();
    if (Ctor) {
      startNative(Ctor);
    } else {
      await startWhisper();
    }
  }, [startNative, startWhisper]);

  useEffect(() => stop, [stop]);

  return { start, stop, isListening, error, engine };
};

export { useSpeechRecognition };
