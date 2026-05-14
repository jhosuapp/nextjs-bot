import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FadeIn } from '@/src/shared/components/motion/FadeIn';
import { Marquee } from '@/src/shared/components/motion/Marquee';
import type { TrustedByContent } from '@/src/features/home/data/home-content';

import styles from './trusted-by-strip.module.css';

type Props = { content: TrustedByContent };

const TrustedByStrip = ({ content }: Props) => {
  return (
    <section className={styles.section} aria-label={content.label}>
      <FadeIn as="p" className={styles.label} y={8} duration="fast">
        {content.label}
      </FadeIn>
      <Marquee className={styles.marquee} speed={32}>
        {content.logos.map((logo) => (
          <div key={logo.name} className={styles.logo} aria-label={logo.name}>
            <FontAwesomeIcon
              icon={logo.icon}
              className={styles.logoIcon}
              aria-hidden="true"
            />
            <span className={styles.logoName}>{logo.name}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export { TrustedByStrip };
