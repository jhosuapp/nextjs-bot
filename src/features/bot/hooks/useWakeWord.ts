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
  /** Recibe TODAS las palabras de activación detectadas (normalizadas) en el transcript. */
  onDetect: (words: string[]) => void;
}

const useWakeWord = ({ words, onDetect }: UseWakeWordOptions) => {
  const lastFireRef = useRef(0);
  const lastKeyRef = useRef('');
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
    // Se devuelven TODAS las coincidencias: si el transcript trae varias wake words
    // (ej. "hola pregunta"), quien las consume decide cuál priorizar según el estado.
    const matches = Array.from(
      new Set(
        wordsRef.current
          .map((w) => normalize(w))
          .filter((w) => w && tokens.some((t) => t === w || t.startsWith(w))),
      ),
    );
    if (matches.length === 0) return false;
    // El debounce solo suprime detecciones IDÉNTICAS seguidas (mismo conjunto de
    // wake words); un conjunto nuevo (ej. pasar de "hola" a "hola pregunta") se
    // procesa de inmediato para no perder la interrupción.
    const key = matches.slice().sort().join('|');
    const now = Date.now();
    if (key === lastKeyRef.current && now - lastFireRef.current < DEBOUNCE_MS) {
      return true;
    }
    lastFireRef.current = now;
    lastKeyRef.current = key;
    onDetectRef.current(matches);
    return true;
  }, []);

  return { inspect };
};

export { useWakeWord, normalize };
