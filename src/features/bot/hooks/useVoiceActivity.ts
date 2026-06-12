import { useEffect, useRef } from 'react';

interface UseVoiceActivityOptions {
  /** Solo mide cuando está activo (ej. mientras el bot habla). */
  enabled: boolean;
  /** Se invoca (por frame) mientras se detecta voz por encima del umbral. */
  onActive: () => void;
  /** Umbral RMS para considerar que hay voz. */
  threshold?: number;
}

type WindowWithWebkitAudio = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

const DEFAULT_THRESHOLD = 0.05;

/**
 * Detección de actividad de voz (VAD) por energía del micrófono. Usa un stream
 * propio con cancelación de eco para no captar el audio del bot, de modo que la
 * señal refleje (sobre todo) la voz del usuario. Sirve para atenuar el audio del
 * bot apenas el usuario empieza a hablar, de forma proactiva (antes de tener
 * transcripción), y así poder reconocer la interrupción al primer intento.
 */
const useVoiceActivity = ({
  enabled,
  onActive,
  threshold = DEFAULT_THRESHOLD,
}: UseVoiceActivityOptions): void => {
  const onActiveRef = useRef(onActive);

  useEffect(() => {
    onActiveRef.current = onActive;
  }, [onActive]);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      return;
    }

    let cancelled = false;
    let rafId: number | null = null;
    let stream: MediaStream | null = null;
    let audioCtx: AudioContext | null = null;
    let source: MediaStreamAudioSourceNode | null = null;
    let analyser: AnalyserNode | null = null;

    const start = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        if (cancelled) {
          mediaStream.getTracks().forEach((t) => t.stop());
          return;
        }
        stream = mediaStream;
        const Ctor =
          window.AudioContext ?? (window as WindowWithWebkitAudio).webkitAudioContext;
        if (!Ctor) return;
        audioCtx = new Ctor();
        source = audioCtx.createMediaStreamSource(stream);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.4;
        source.connect(analyser);

        const buffer = new Uint8Array(analyser.fftSize);
        const tick = () => {
          if (!analyser) return;
          analyser.getByteTimeDomainData(buffer);
          let sumSquares = 0;
          for (let i = 0; i < buffer.length; i += 1) {
            const v = (buffer[i] - 128) / 128;
            sumSquares += v * v;
          }
          const rms = Math.sqrt(sumSquares / buffer.length);
          if (rms > threshold) onActiveRef.current();
          rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      } catch {
        // permiso denegado o error de dispositivo — sin VAD
      }
    };

    start();

    return () => {
      cancelled = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      source?.disconnect();
      analyser?.disconnect();
      audioCtx?.close().catch(() => undefined);
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [enabled, threshold]);
};

export { useVoiceActivity };
