import type { JSX } from 'react';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import type { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { Text } from '@/src/shared/components/text/Text';
import { Button } from '@/src/shared/components/button/Button';
import { WrapperMotion } from '@/src/shared/components/wrapper-motion/WrapperMotion';
import { FadeIn } from '@/src/shared/components/motion/FadeIn';
import { WHATSAPP_URL } from '@/src/config/site';

import styles from './article-cta.module.css';

type ArticleCtaProps = { t: ITranslations; tKey?: string };

const ArticleCta = ({ t, tKey = 'cta' }: ArticleCtaProps): JSX.Element => {
  const openWhatsApp = () =>
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');

  return (
    <div className={styles.inner}>
      <FadeIn className={styles.card} y={24}>
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.copy}>
          <Text
            tag="h2"
            variant="title_small"
            color="secondary"
            weight="bold"
            delay={{ enter: 0, exit: 0 }}
            immediate
          >
            {t(`${tKey}.title`) as string}
          </Text>
          <Text
            tag="p"
            variant="description"
            color="muted"
            delay={{ enter: 0, exit: 0 }}
            immediate
          >
            {t(`${tKey}.description`) as string}
          </Text>
        </div>
        <WrapperMotion delay={{ enter: 0, exit: 0 }} immediate>
          <Button
            text={t(`${tKey}.button`) as string}
            style="whatsapp"
            type="button"
            iconRight={faWhatsapp}
            onClick={openWhatsApp}
          />
        </WrapperMotion>
      </FadeIn>
    </div>
  );
};

export { ArticleCta };
