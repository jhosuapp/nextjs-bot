import type { JSX } from 'react';
import { BotEmbed } from '../bot-embed/BotEmbed';
import { ITranslations } from '@/src/shared/interfaces/i18n.interface';
import { Text } from '@/src/shared/components/text/Text';
import { Container } from '../container/Container';
import { Button } from '@/src/shared/components/button/Button';

import styles from './hero-section.module.css';
import { WrapperMotion } from '@/src/shared/components/wrapper-motion/WrapperMotion';

type HeroSectionProps = {
  t: ITranslations;
  tbot: ITranslations;
};

const HeroSection = ({ t, tbot }: HeroSectionProps):JSX.Element => {
  return (
    <section className={ styles.heroSection }>
      <Container className={ styles.heroSection__wrapper } padding='md'>
        <article className={ styles.heroSection__bot }>
          <WrapperMotion delay={{ enter: 0.52, exit: 0.15 }}>
            <BotEmbed t={tbot} />
          </WrapperMotion>
        </article>
        <article className={ styles.heroSection__content }>
            <Text
              tag='h1'
              variant='title'
              color='secondary'
              delay={{ enter: 0.53, exit: 0.14 }}
              weight='semibold'
            >
              Creamos <strong className='gl-degradete-text font-semibold'>Humanika</strong> para empresas
            </Text>
            <Text
              tag='h2'
              variant='subtitle_small'
              color='muted'
              delay={{ enter: 0.55, exit: 0.13 }}
              weight='medium'
            >
              Avatares inteligentes para web, WhatsApp, capacitación, ventas y experiencias BTL.
            </Text>
            <Text
              tag='h2'
              variant='description'
              color='muted'
              delay={{ enter: 0.57, exit: 0.12 }}
              weight='normal'
            >
              Avatares inteligentes para web, WhatsApp, capacitación, ventas y experiencias BTL.
            </Text>
            <WrapperMotion delay={{ enter: 0.59, exit: 0.11 }}>
              <div className={ styles.heroSection__buttons }>
                <Button
                  text={'Solicitar demo'}
                  style="primary"
                  type="button"
                />
                <Button
                  text={'Quiero asesoría'}
                  style="secondary"
                  type="button"
                />
              </div>
            </WrapperMotion>
        </article>
      </Container>
    </section>
  )
}

export { HeroSection }