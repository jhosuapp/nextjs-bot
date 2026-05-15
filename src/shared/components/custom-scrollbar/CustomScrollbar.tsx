import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { useLenisStore } from '@/src/shared/stores/lenis.store';

import styles from './custom-scrollbar.module.css';

const HIDE_DELAY_MS = 2000;
const MIN_THUMB_HEIGHT = 32;

const CustomScrollbar = () => {
  const lenis = useLenisStore((state) => state.lenis);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const y = useMotionValue(0);
  const height = useMotionValue(MIN_THUMB_HEIGHT);
  const [visible, setVisible] = useState(false);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    if (!lenis) return;

    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      const trackHeight = track.clientHeight;
      const limit = lenis.limit;
      if (limit <= 0 || trackHeight <= 0) {
        setScrollable(false);
        return;
      }
      setScrollable(true);
      const viewport = window.innerHeight;
      const ratio = viewport / (viewport + limit);
      const thumbHeight = Math.max(MIN_THUMB_HEIGHT, trackHeight * ratio);
      const progress = lenis.scroll / limit;
      const top = progress * (trackHeight - thumbHeight);
      height.set(thumbHeight);
      y.set(top);
    };

    const onScroll = () => {
      update();
      setVisible(true);
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
      }
      hideTimerRef.current = window.setTimeout(() => {
        setVisible(false);
      }, HIDE_DELAY_MS);
    };

    lenis.on('scroll', onScroll);
    window.addEventListener('resize', update);
    update();

    return () => {
      lenis.off('scroll', onScroll);
      window.removeEventListener('resize', update);
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, [lenis, height, y]);

  return (
    <div ref={trackRef} className={styles.track} aria-hidden>
      <motion.div
        className={styles.thumb}
        style={{ y, height }}
        initial={{ opacity: 0 }}
        animate={{ opacity: visible && scrollable ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </div>
  );
};

export { CustomScrollbar };
