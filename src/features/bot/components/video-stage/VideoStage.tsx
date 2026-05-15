import type { JSX } from 'react';

import styles from './video-stage.module.css';

interface Props {
  refA: React.RefObject<HTMLVideoElement | null>;
  refB: React.RefObject<HTMLVideoElement | null>;
  active: 'A' | 'B';
}

const VideoStage = ({ refA, refB, active }: Props): JSX.Element => {
  return (
    <div className={styles.stage} aria-hidden="true">
      <video
        ref={refA}
        className={`${styles.video} ${active === 'A' ? styles.active : styles.inactive}`}
        playsInline
        preload="auto"
      />
      <video
        ref={refB}
        className={`${styles.video} ${active === 'B' ? styles.active : styles.inactive}`}
        playsInline
        preload="auto"
      />
      <div className={styles.scrim} aria-hidden="true" />
    </div>
  );
};

export { VideoStage };
