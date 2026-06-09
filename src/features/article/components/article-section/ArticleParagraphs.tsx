import type { JSX } from 'react';

import { Text } from '@/src/shared/components/text/Text';

type ArticleParagraphsProps = { items: string[] };

const ArticleParagraphs = ({ items }: ArticleParagraphsProps): JSX.Element => (
  <>
    {items.map((paragraph, index) => (
      <Text
        key={index}
        tag="p"
        variant="description"
        color="muted"
        delay={{ enter: 0, exit: 0 }}
        fadeUpTertiary
      >
        {paragraph}
      </Text>
    ))}
  </>
);

export { ArticleParagraphs };
