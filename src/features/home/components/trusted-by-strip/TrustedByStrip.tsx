import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FadeIn } from '@/src/shared/components/motion/FadeIn';
import { Marquee } from '@/src/shared/components/motion/Marquee';
import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { homeStaticData } from '@/src/features/home/data/home-content';
import { Container } from '../container/Container';
import { Text } from '@/src/shared/components/text/Text';

import styles from './trusted-by-strip.module.css';
import { WrapperMotion } from '@/src/shared/components/wrapper-motion/WrapperMotion';

type TrustedByStripProps = { t: ITranslations };

const TrustedByStrip = ({ t }: TrustedByStripProps) => {
  const label = t('trustedBy.label') as string;
  const logos = homeStaticData.trustedBy.logos;

  return (
    <Container className={styles.section} padding='xl' aria-label={label}>
      <FadeIn y={8} duration="fast">
        <Text 
          tag="p" 
          variant="description_xs" 
          color="muted"
          weight="semibold"
          delay={{ enter: 0, exit: 0 }}
          fadeUpTertiary
        >
          {label}
        </Text>
      </FadeIn>
      <WrapperMotion 
        delay={{ enter: 0.2, exit: 0 }}
        fadeUpTertiary
      >
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
      </WrapperMotion>
    </Container>
  );
};

export { TrustedByStrip };
