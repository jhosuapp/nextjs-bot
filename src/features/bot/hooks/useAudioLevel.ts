import { useEffect } from 'react';
import { useMotionValue, useReducedMotion, type MotionValue } from 'framer-motion';

interface UseAudioLevelOptions {
  enabled: boolean;
}

const NOISE_FLOOR = 0.02;
const MAX_RMS = 0.28;
const SMOOTHING = 0.45;

type WindowWithWebkitAudio = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

const useAudioLevel = ({ enabled }: UseAudioLevelOptions): MotionValue<number> => {
  const level = useMotionValue(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduce) {
      level.set(0);
      return;
    }
    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      return;
    }

    let cancelled = false;
    let rafId: number | null = null;
    let stream: MediaStream | null = null;
    let audioCtx: AudioContext | null = null;
    let source: MediaStreamAudioSourceNode | null = null;
    let analyser: AnalyserNode | null = null;
    let smoothed = 0;

    const start = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (cancelled) {
          mediaStream.getTracks().forEach((t) => t.stop());
          return;
        }
        stream = mediaStream;
        const Ctor = window.AudioContext ?? (window as WindowWithWebkitAudio).webkitAudioContext;
        if (!Ctor) return;
        audioCtx = new Ctor();
        source = audioCtx.createMediaStreamSource(stream);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.5;
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
          const normalized = Math.min(1, Math.max(0, (rms - NOISE_FLOOR) / (MAX_RMS - NOISE_FLOOR)));
          smoothed = smoothed * SMOOTHING + normalized * (1 - SMOOTHING);
          level.set(smoothed);
          rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      } catch {
        // permission denied or device error — leave level at 0
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
      level.set(0);
    };
  }, [enabled, reduce, level]);

  return level;
};

export { useAudioLevel };
