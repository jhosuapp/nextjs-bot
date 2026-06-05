import type { JSX } from 'react';

import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { Text } from '@/src/shared/components/text/Text';
import { Container } from '@/src/features/home/components/container/Container';
import { TrustHero } from '@/src/features/trust/components/trust-hero/TrustHero';
import { ArticleSection } from '@/src/features/trust/components/article-section/ArticleSection';
import { ArticleParagraphs } from '@/src/features/trust/components/article-section/ArticleParagraphs';
import { BehaviorList } from '@/src/features/trust/components/behavior-list/BehaviorList';
import { PullQuote } from '@/src/features/trust/components/pull-quote/PullQuote';
import { TrustCta } from '@/src/features/trust/components/trust-cta/TrustCta';

import styles from './trust.module.css';

type TrustViewProps = { t: ITranslations };

const TrustView = ({ t }: TrustViewProps): JSX.Element => {
  const hiperParagraphs = t('hiperrealismo.paragraphs', { returnObjects: true }) as string[];
  const aiParagraphs = t('aiNative.paragraphs', { returnObjects: true }) as string[];
  const bullets = t('comportamiento.bullets', { returnObjects: true }) as string[];
  const compParagraphs = t('comportamiento.paragraphs', { returnObjects: true }) as string[];
  const futuroParagraphs = t('futuro.paragraphs', { returnObjects: true }) as string[];

  return (
    <div className={styles.page}>
      <TrustHero t={t} />

      <Container padding="xl">
        <div className={styles.inner}>
          <ArticleSection title={t('hiperrealismo.title') as string}>
            <ArticleParagraphs items={hiperParagraphs} />
          </ArticleSection>

          <ArticleSection title={t('aiNative.title') as string}>
            <ArticleParagraphs items={aiParagraphs} />
            <Text
              className={styles.shortLines}
              tag="p"
              variant="subtitle_small"
              color="secondary"
              weight="semibold"
              delay={{ enter: 0, exit: 0 }}
              fadeUpTertiary
            >
              {t('aiNative.shortLines') as string}
            </Text>
            <Text
              tag="p"
              variant="description"
              color="muted"
              delay={{ enter: 0, exit: 0 }}
              fadeUpTertiary
            >
              {t('aiNative.closingLead') as string}
              <strong className={styles.highlight}>
                {t('aiNative.closingTerm') as string}
              </strong>
              {t('aiNative.closingTrail') as string}
            </Text>
          </ArticleSection>

          <ArticleSection title={t('comportamiento.title') as string}>
            <ArticleParagraphs items={[t('comportamiento.intro') as string]} />
            <BehaviorList items={bullets} />
            <ArticleParagraphs items={compParagraphs} />
            <PullQuote quote={t('comportamiento.quote') as string} />
          </ArticleSection>

          <ArticleSection title={t('futuro.title') as string}>
            <ArticleParagraphs items={futuroParagraphs} />
            <PullQuote
              quote={t('futuro.quote') as string}
              accent={t('futuro.quoteAccent') as string}
            />
          </ArticleSection>
        </div>
      </Container>

      <TrustCta t={t} />
    </div>
  );
};

export { TrustView };
