import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * Schema-driven article system.
 *
 * An article is an ordered list of `ArticleBlock`s living in a data file
 * (structural only: ids, icons, order, translation-key prefixes). Every visible
 * string is resolved at render time from the i18n namespace via the `t` prop, so
 * the same blocks render in every locale.
 *
 * To create a new article:
 *   1. public/locales/<es|en>/<slug>.json  — the copy.
 *   2. src/features/article/data/<slug>.content.ts — `ArticleContent` schema.
 *   3. pages/<slug>.tsx — load the namespace and render `<ArticleRenderer />`.
 */

/** Content nodes that live *inside* a section (rendered in order). */

// A run of plain paragraphs. `key` points at an array (returnObjects).
type ParagraphsContent = { kind: 'paragraphs'; key: string };

// Check-marked list shown as a responsive grid. `key` points at an array.
type ListContent = { kind: 'list'; key: string };

// A single emphasised line with an accent left border. `key` is one string.
type EmphasisContent = { kind: 'emphasis'; key: string };

// A paragraph with one highlighted term in the middle: lead + <term> + trail.
type InlineHighlightContent = {
  kind: 'inlineHighlight';
  leadKey: string;
  termKey: string;
  trailKey: string;
};

// A pull quote, optionally with a gradient accent line below it.
type QuoteContent = { kind: 'quote'; key: string; accentKey?: string };

type SectionContent =
  | ParagraphsContent
  | ListContent
  | EmphasisContent
  | InlineHighlightContent
  | QuoteContent;

/** Top-level blocks (rendered in order down the page). */

// Full-width header. Reads `<key>.eyebrow/titleLead/titleAccent/titleTrail/
// imageAlt/meta/lead`. `key` defaults to "hero". `image` omitted = no figure.
type HeroBlock = {
  type: 'hero';
  key?: string;
  image?: string;
};

// A titled section with an index + eyebrow and ordered content children.
// `nav` (a translation key) opts the section into the sticky table of contents.
type SectionBlock = {
  type: 'section';
  id: string;
  key: string;
  index?: string;
  nav?: string;
  content: ReadonlyArray<SectionContent>;
};

// Two-column "before / after" comparison. Reads `<key>.eyebrow/title` and
// `<key>.left` + `<key>.right` (each `{ label, items[] }`). Left = negative
// (✕, muted), right = positive (✓, accent).
type ComparisonBlock = {
  type: 'comparison';
  key: string;
  id?: string;
  nav?: string;
};

// Responsive icon grid. Labels come from `<key>.items.<itemKey>`; the icons are
// structural and stay here. Reads `<key>.eyebrow/title/description`.
type IconGridBlock = {
  type: 'iconGrid';
  key: string;
  items: ReadonlyArray<{ key: string; icon: IconDefinition }>;
  id?: string;
  nav?: string;
};

// Highlighted "in short" numbered card. Reads `<key>.title` + `<key>.items[]`.
type TakeawaysBlock = {
  type: 'takeaways';
  key?: string;
};

// Standalone pull quote between sections.
type QuoteBlock = {
  type: 'quote';
  key: string;
  accentKey?: string;
};

// Closing call to action with a WhatsApp button. Reads `<key>.title/
// description/button`. `key` defaults to "cta".
type CtaBlock = {
  type: 'cta';
  key?: string;
};

type ArticleBlock =
  | HeroBlock
  | SectionBlock
  | ComparisonBlock
  | IconGridBlock
  | TakeawaysBlock
  | QuoteBlock
  | CtaBlock;

// The table of contents title key (sticky sidebar). Defaults to "toc.title".
type ArticleContent = {
  tocTitleKey?: string;
  blocks: ReadonlyArray<ArticleBlock>;
};

export type {
  ArticleContent,
  ArticleBlock,
  SectionContent,
  HeroBlock,
  SectionBlock,
  ComparisonBlock,
  IconGridBlock,
  TakeawaysBlock,
  QuoteBlock,
  CtaBlock,
};
