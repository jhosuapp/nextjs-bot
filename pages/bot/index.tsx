import type { GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next/pages';
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';

import { BotView } from '@/src/features/bot/views/Bot.view';
import { PageLayout } from '@/src/shared/layouts/page-layout/PageLayout';
import { PageTransition } from '@/src/shared/layouts/pageTransition/PageTransition';

export default function BotPage() {
  const { t } = useTranslation('bot');
  const { t: tc } = useTranslation('common');

  return (
    <PageLayout
      title={tc('seo.botTitle') as string}
      description={tc('seo.botDescription') as string}
    >
      <PageTransition>
        <BotView t={t} />
      </PageTransition>
    </PageLayout>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common', 'bot'])),
    },
  };
}
