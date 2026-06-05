import type { JSX } from 'react';

import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { Text } from '@/src/shared/components/text/Text';
import { Container } from '@/src/features/home/components/container/Container';
import { tocStaticData } from '@/src/features/trust/data/trust-content';
import { ReadingProgress } from '@/src/features/trust/components/reading-progress/ReadingProgress';
import { TrustHero } from '@/src/features/trust/components/trust-hero/TrustHero';
import { ArticleToc } from '@/src/features/trust/components/article-toc/ArticleToc';
import { ArticleSection } from '@/src/features/trust/components/article-section/ArticleSection';
import { ArticleParagraphs } from '@/src/features/trust/components/article-section/ArticleParagraphs';
import { ComparisonSection } from '@/src/features/trust/components/comparison-section/ComparisonSection';
import { BehaviorList } from '@/src/features/trust/components/behavior-list/BehaviorList';
import { PullQuote } from '@/src/features/trust/components/pull-quote/PullQuote';
import { ChannelsGrid } from '@/src/features/trust/components/channels-grid/ChannelsGrid';
import { KeyTakeaways } from '@/src/features/trust/components/key-takeaways/KeyTakeaways';
import { TrustCta } from '@/src/features/trust/components/trust-cta/TrustCta';

import styles from './trust.module.css';

type TrustViewProps = { t: ITranslations };

const TrustView = ({ t }: TrustViewProps): JSX.Element => {
  const hiperParagraphs = t('hiperrealismo.paragraphs', { returnObjects: true }) as string[];
  const aiParagraphs = t('aiNative.paragraphs', { returnObjects: true }) as string[];
  const bullets = t('comportamiento.bullets', { returnObjects: true }) as string[];
  const compParagraphs = t('comportamiento.paragraphs', { returnObjects: true }) as string[];
  const futuroParagraphs = t('futuro.paragraphs', { returnObjects: true }) as string[];

  const tocItems = tocStaticData.map((item) => ({
    id: item.id,
    label: t(`toc.${item.key}`) as string,
  }));

  return (
    <div className={styles.page}>
      <ReadingProgress />
      <TrustHero t={t} />

      <Container padding="xl">
        <div className={styles.layout}>
          <ArticleToc title={t('toc.title') as string} items={tocItems} />

          <div className={styles.inner}>
            <ArticleSection
              id="hiperrealismo"
              index="01"
              eyebrow={t('hiperrealismo.eyebrow') as string}
              title={t('hiperrealismo.title') as string}
            >
              <ArticleParagraphs items={hiperParagraphs} />
            </ArticleSection>

            <ArticleSection
              id="ai-native"
              index="02"
              eyebrow={t('aiNative.eyebrow') as string}
              title={t('aiNative.title') as string}
            >
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

            <ComparisonSection t={t} />

            <ArticleSection
              id="comportamiento"
              index="03"
              eyebrow={t('comportamiento.eyebrow') as string}
              title={t('comportamiento.title') as string}
            >
              <ArticleParagraphs items={[t('comportamiento.intro') as string]} />
              <BehaviorList items={bullets} />
              <ArticleParagraphs items={compParagraphs} />
              <PullQuote quote={t('comportamiento.quote') as string} />
            </ArticleSection>

            <ArticleSection
              id="futuro"
              index="04"
              eyebrow={t('futuro.eyebrow') as string}
              title={t('futuro.title') as string}
            >
              <ArticleParagraphs items={futuroParagraphs} />
              <PullQuote
                quote={t('futuro.quote') as string}
                accent={t('futuro.quoteAccent') as string}
              />
            </ArticleSection>

            <ChannelsGrid t={t} />

            <KeyTakeaways t={t} />

            <TrustCta t={t} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export { TrustView };
