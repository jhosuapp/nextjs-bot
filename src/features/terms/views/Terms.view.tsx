import type { JSX } from 'react';

import { LegalDocument } from '@/src/features/legal/components/legal-document/LegalDocument';
import type { RichTextBlock } from '@/src/shared/components/rich-text/RichText';
import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { WrapperMotion } from '@/src/shared/components/wrapper-motion/WrapperMotion';

type TermsViewProps = { t: ITranslations };

const TermsView = ({ t }: TermsViewProps): JSX.Element => {
  const blocks = t('sections', { returnObjects: true }) as RichTextBlock[];

  return (
    <WrapperMotion delay={{ enter: 0.56, exit: 0.15 }}>
      <LegalDocument
        title={t('hero.title') as string}
        lastUpdated={t('hero.lastUpdated') as string}
        blocks={blocks}
      />
    </WrapperMotion>
  );
};

export { TermsView };
