import type { JSX } from 'react';
import Image from 'next/image';

import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { Text } from '@/src/shared/components/text/Text';
import { Container } from '@/src/features/home/components/container/Container';
import { WrapperMotion } from '@/src/shared/components/wrapper-motion/WrapperMotion';
import { ArticleMeta } from '@/src/features/trust/components/article-meta/ArticleMeta';

import styles from './trust-hero.module.css';

type TrustHeroProps = { t: ITranslations };

const TrustHero = ({ t }: TrustHeroProps): JSX.Element => {
  const lead = t('hero.lead', { returnObjects: true }) as string[];

  return (
    <header className={styles.hero}>
      <Container padding="xl">
        <div className={styles.heroInner}>
          <Text
            className={styles.eyebrow}
            tag="p"
            variant="description_xs"
            color="primary"
            weight="semibold"
            delay={{ enter: 0.53, exit: 0.14 }}
            immediate
          >
            {t('hero.eyebrow') as string}
          </Text>

          <Text
            tag="h1"
            className={styles.title}
            variant="title"
            color="secondary"
            weight="bold"
            delay={{ enter: 0.55, exit: 0.13 }}
            immediate
          >
            {t('hero.titleLead') as string}
            <strong className="gl-degradete-text font-bold">
              {t('hero.titleAccent') as string}
            </strong>
            {t('hero.titleTrail') as string}
          </Text>

          <WrapperMotion
            className={styles.dividerWrap}
            delay={{ enter: 0.57, exit: 0.12 }}
            immediate
          >
            <span className={styles.divider} aria-hidden="true" />
          </WrapperMotion>

          <WrapperMotion delay={{ enter: 0.58, exit: 0.12 }} immediate>
            <ArticleMeta t={t} />
          </WrapperMotion>

          <div className={styles.lead}>
            {lead.map((paragraph, index) => (
              <Text
                key={index}
                tag="p"
                variant={index === 0 ? 'subtitle_small' : 'description'}
                color="muted"
                weight={index === 0 ? 'medium' : 'normal'}
                delay={{ enter: 0.59 + index * 0.02, exit: 0.11 }}
                immediate
              >
                {paragraph}
              </Text>
            ))}
          </div>
        </div>

        <WrapperMotion
          className={styles.heroMediaWrap}
          delay={{ enter: 0.61, exit: 0.1 }}
          immediate
        >
          <figure className={styles.heroMedia}>
            <Image
              src="/images/bg.jpg"
              alt={t('hero.imageAlt') as string}
              fill
              sizes="(max-width: 900px) 100vw, 56rem"
              className={styles.heroImage}
              priority
            />
            <span className={styles.heroOverlay} aria-hidden="true" />
          </figure>
        </WrapperMotion>
      </Container>
    </header>
  );
};

export { TrustHero };
