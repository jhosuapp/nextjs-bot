import type { JSX, ReactNode } from 'react';

import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { Container } from '@/src/features/home/components/container/Container';
import type {
  ArticleBlock,
  ArticleContent,
  SectionContent,
} from '@/src/features/article/types/article.types';
import { ReadingProgress } from '@/src/features/article/components/reading-progress/ReadingProgress';
import { ArticleHero } from '@/src/features/article/components/article-hero/ArticleHero';
import { ArticleToc } from '@/src/features/article/components/article-toc/ArticleToc';
import { ArticleSection } from '@/src/features/article/components/article-section/ArticleSection';
import { ArticleParagraphs } from '@/src/features/article/components/article-section/ArticleParagraphs';
import { EmphasisLine } from '@/src/features/article/components/article-section/EmphasisLine';
import { InlineHighlight } from '@/src/features/article/components/article-section/InlineHighlight';
import { ComparisonBlock } from '@/src/features/article/components/comparison-block/ComparisonBlock';
import { FeatureList } from '@/src/features/article/components/feature-list/FeatureList';
import { PullQuote } from '@/src/features/article/components/pull-quote/PullQuote';
import { IconGrid } from '@/src/features/article/components/icon-grid/IconGrid';
import { KeyTakeaways } from '@/src/features/article/components/key-takeaways/KeyTakeaways';
import { ArticleCta } from '@/src/features/article/components/article-cta/ArticleCta';

import styles from './article-renderer.module.css';

type ArticleRendererProps = {
  t: ITranslations;
  content: ArticleContent;
};

const renderSectionContent = (
  item: SectionContent,
  t: ITranslations,
  index: number,
): ReactNode => {
  switch (item.kind) {
    case 'paragraphs':
      return (
        <ArticleParagraphs
          key={index}
          items={t(item.key, { returnObjects: true }) as string[]}
        />
      );
    case 'list':
      return (
        <FeatureList
          key={index}
          items={t(item.key, { returnObjects: true }) as string[]}
        />
      );
    case 'emphasis':
      return <EmphasisLine key={index} text={t(item.key) as string} />;
    case 'inlineHighlight':
      return (
        <InlineHighlight
          key={index}
          lead={t(item.leadKey) as string}
          term={t(item.termKey) as string}
          trail={t(item.trailKey) as string}
        />
      );
    case 'quote':
      return (
        <PullQuote
          key={index}
          quote={t(item.key) as string}
          accent={item.accentKey ? (t(item.accentKey) as string) : undefined}
        />
      );
  }
};

const renderBlock = (
  block: ArticleBlock,
  t: ITranslations,
  index: number,
): ReactNode => {
  switch (block.type) {
    case 'hero':
      return (
        <ArticleHero
          key={index}
          t={t}
          tKey={block.key ?? 'hero'}
          image={block.image}
        />
      );
    case 'section':
      return (
        <ArticleSection
          key={index}
          id={block.id}
          index={block.index}
          eyebrow={t(`${block.key}.eyebrow`) as string}
          title={t(`${block.key}.title`) as string}
        >
          {block.content.map((item, i) => renderSectionContent(item, t, i))}
        </ArticleSection>
      );
    case 'comparison':
      return <ComparisonBlock key={index} t={t} tKey={block.key} id={block.id} />;
    case 'iconGrid':
      return (
        <IconGrid
          key={index}
          t={t}
          tKey={block.key}
          items={block.items}
          id={block.id}
        />
      );
    case 'takeaways':
      return <KeyTakeaways key={index} t={t} tKey={block.key ?? 'takeaways'} />;
    case 'quote':
      return (
        <PullQuote
          key={index}
          quote={t(block.key) as string}
          accent={block.accentKey ? (t(block.accentKey) as string) : undefined}
        />
      );
    case 'cta':
      return <ArticleCta key={index} t={t} tKey={block.key ?? 'cta'} />;
  }
};

const ArticleRenderer = ({ t, content }: ArticleRendererProps): JSX.Element => {
  const { blocks, tocTitleKey = 'toc.title' } = content;

  // The hero is rendered full-width, above the reading column.
  const heroBlock = blocks.find((block) => block.type === 'hero');
  const bodyBlocks = blocks.filter((block) => block.type !== 'hero');

  // Any block that declares both an id and a `nav` key joins the sticky TOC.
  const tocItems = blocks.flatMap((block) =>
    'nav' in block && 'id' in block && block.nav && block.id
      ? [{ id: block.id, label: t(block.nav) as string }]
      : [],
  );

  const hasToc = tocItems.length > 0;

  return (
    <div className={styles.page}>
      <ReadingProgress />
      {heroBlock
        ? renderBlock(heroBlock, t, blocks.indexOf(heroBlock))
        : null}

      <Container padding="xl">
        <div className={`${styles.layout} ${hasToc ? '' : styles.layoutNoToc}`}>
          {hasToc ? (
            <ArticleToc title={t(tocTitleKey) as string} items={tocItems} />
          ) : null}

          <div className={styles.inner}>
            {bodyBlocks.map((block, index) => renderBlock(block, t, index))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export { ArticleRenderer };
