import { useCallback, useEffect, useRef } from 'react';

import {
  INACTIVITY_MS,
  INACTIVITY_WARNING_MS,
} from '@/src/features/bot/data/bot-content';
import { useBotStore } from '@/src/features/bot/stores/bot.store';

interface UseInactivityTimerOptions {
  enabled: boolean;
  onTimeout: () => void;
}

const useInactivityTimer = ({ enabled, onTimeout }: UseInactivityTimerOptions) => {
  const setInactivityWarning = useBotStore((s) => s.setInactivityWarning);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onTimeoutRef = useRef(onTimeout);

  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  const clear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);
    timeoutRef.current = null;
    warningRef.current = null;
    setInactivityWarning(false);
  }, [setInactivityWarning]);

  const reset = useCallback(() => {
    clear();
    if (!enabled) return;
    warningRef.current = setTimeout(() => {
      setInactivityWarning(true);
    }, INACTIVITY_WARNING_MS);
    timeoutRef.current = setTimeout(() => {
      setInactivityWarning(false);
      onTimeoutRef.current();
    }, INACTIVITY_MS);
  }, [clear, enabled, setInactivityWarning]);

  useEffect(() => {
    reset();
    return clear;
  }, [reset, clear]);

  return { reset, clear };
};

export { useInactivityTimer };
