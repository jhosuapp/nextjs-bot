import { useCallback, useEffect, useRef } from 'react';

const normalize = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const DEBOUNCE_MS = 700;

interface UseWakeWordOptions {
  words: ReadonlyArray<string>;
  onDetect: (word: string) => void;
}

const useWakeWord = ({ words, onDetect }: UseWakeWordOptions) => {
  const lastFireRef = useRef(0);
  const wordsRef = useRef(words);
  const onDetectRef = useRef(onDetect);

  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  useEffect(() => {
    onDetectRef.current = onDetect;
  }, [onDetect]);

  const inspect = useCallback((transcript: string): boolean => {
    const normalized = normalize(transcript);
    if (!normalized) return false;
    const tokens = normalized.split(' ');
    // Coincide la palabra exacta o una variante por raíz (pregunta → preguntar,
    // pregúntame, preguntas) para que el usuario no tenga que repetirla.
    const wake = wordsRef.current
      .map((w) => normalize(w))
      .find((w) => tokens.some((t) => t === w || t.startsWith(w)));
    if (!wake) return false;
    const now = Date.now();
    if (now - lastFireRef.current < DEBOUNCE_MS) return true;
    lastFireRef.current = now;
    onDetectRef.current(wake);
    return true;
  }, []);

  return { inspect };
};

export { useWakeWord, normalize };
