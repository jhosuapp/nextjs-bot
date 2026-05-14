import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FadeIn } from '@/src/shared/components/motion/FadeIn';
import { Marquee } from '@/src/shared/components/motion/Marquee';
import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { homeStaticData } from '@/src/features/home/data/home-content';

import styles from './trusted-by-strip.module.css';

type Props = { t: ITranslations };

const TrustedByStrip = ({ t }: Props) => {
  const label = t('trustedBy.label') as string;
  const logos = homeStaticData.trustedBy.logos;

  return (
    <section className={styles.section} aria-label={label}>
      <FadeIn as="p" className={styles.label} y={8} duration="fast">
        {label}
      </FadeIn>
      <Marquee className={styles.marquee} speed={32}>
        {logos.map((logo) => (
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
