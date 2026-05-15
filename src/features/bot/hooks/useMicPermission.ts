import { useCallback, useEffect } from 'react';

import { useBotStore, type MicPermission } from '@/src/features/bot/stores/bot.store';

interface UseMicPermissionResult {
  permission: MicPermission;
  request: () => Promise<MicPermission>;
}

const useMicPermission = (): UseMicPermissionResult => {
  const permission = useBotStore((s) => s.micPermission);
  const setMicPermission = useBotStore((s) => s.setMicPermission);

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.permissions?.query) return;
    let cancelled = false;
    let status: PermissionStatus | null = null;
    const handleChange = () => {
      if (!status || cancelled) return;
      setMicPermission(status.state as MicPermission);
    };
    navigator.permissions
      .query({ name: 'microphone' as PermissionName })
      .then((s) => {
        if (cancelled) return;
        status = s;
        setMicPermission(s.state as MicPermission);
        s.addEventListener('change', handleChange);
      })
      .catch(() => {
        /* permissions API not supported for microphone */
      });
    return () => {
      cancelled = true;
      status?.removeEventListener('change', handleChange);
    };
  }, [setMicPermission]);

  const request = useCallback(async (): Promise<MicPermission> => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setMicPermission('denied');
      return 'denied';
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
      setMicPermission('granted');
      return 'granted';
    } catch {
      setMicPermission('denied');
      return 'denied';
    }
  }, [setMicPermission]);

  return { permission, request };
};

export { useMicPermission };
