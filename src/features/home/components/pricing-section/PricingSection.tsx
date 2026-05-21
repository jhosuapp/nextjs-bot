import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import { FadeIn } from '@/src/shared/components/motion/FadeIn';
import { StaggerGroup, StaggerItem } from '@/src/shared/components/motion/StaggerGroup';
import { Text } from '@/src/shared/components/text/Text';
import { Container } from '../container/Container';
import { WrapperMotion } from '@/src/shared/components/wrapper-motion/WrapperMotion';
import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { homeStaticData } from '@/src/features/home/data/home-content';

import styles from './pricing-section.module.css';

type Props = { t: ITranslations };

const PricingSection = ({ t }: Props) => {
  const { pricing } = homeStaticData;

  return (
    <Container id="pricing" className={styles.section} aria-labelledby="pricing-title" padding="xl">

      <FadeIn className={styles.card} delay={0.1} y={20}>
        <div className={styles.cardGlow} aria-hidden="true" />
        <div>
          <Text
            tag="h2"
            variant="title_small"
            color="secondary"
            delay={{ enter: 0, exit: 0 }}
            immediate
          >
            {t('pricing.titleLead')}
          </Text>
          <Text
            tag="h2"
            variant="subtitle"
            color="secondary"
            delay={{ enter: 0, exit: 0 }}
            immediate
          >
            <strong className='gl-degradete-text'>{t('pricing.price')}</strong>
          </Text>
        </div>

        <Text
          tag="p"
          variant="description"
          color="muted"
          delay={{ enter: 0, exit: 0 }}
          immediate
        >
          {t('pricing.description')}
        </Text>

        <div className={styles.divider} aria-hidden="true" />

        <StaggerGroup className={styles.features} stagger={0.08} amount={0.2}>
          {pricing.features.map((feature) => (
            <StaggerItem key={feature.id}>
              <span className={styles.featurePill}>
                <FontAwesomeIcon icon={faCircleCheck} className={styles.featureIcon} aria-hidden="true" />
                {t(`pricing.features.${feature.id}`) as string}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>

      </FadeIn>

      <WrapperMotion className={styles.footnote__wrapper} delay={{ enter: 0.15, exit: 0 }} fadeUpTertiary>
        <Text
          className={styles.footnote}
          tag="p"
          variant="description_small"
          color="muted"
          delay={{ enter: 0, exit: 0 }}
          immediate
        >
            {t('pricing.notePrefix')}
              <strong className={styles.noteEmphasis}>{t('pricing.noteEmphasis')}</strong>
            {t('pricing.noteSuffix')}
        </Text>
      </WrapperMotion>
    </Container>
  );
};

export { PricingSection };
