import type { JSX } from 'react';

import { Controller } from 'react-hook-form';
import { useFormHeroController } from '@/src/features/home/hooks/useFormHero.controller';
import { TextField } from '@/src/shared/components/text-field/TextField';
import { Container } from '../container/Container';
import { ITranslations } from '@/src/shared/interfaces/i18n.interface';

import styles from './form-hero.module.css';
import { Button } from '@/src/shared/components/button/Button';
import { WrapperMotion } from '@/src/shared/components/wrapper-motion/WrapperMotion';

type FormHeroProps = { t: ITranslations };

const FormHero = ({ t }: FormHeroProps):JSX.Element => {
    const {
      control,
      errors,
      handleSubmit,
      onSubmit,
  } = useFormHeroController();

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={ styles.formHero }
        noValidate
      >
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
                type="text"
                label={t('contact.nameLabel') as string}
                name="name"
                id="name"
                placeholder={t('contact.namePlaceholder') as string}
                minLength={2}
                style="primary"
                feedback={ errors.name?.message }

                delayAnimate={0.57}
                delayExit={0.15}

                onChange={onChange}
                onBlur={onBlur}
                value={value}

                required
            />
          )}
        />

        <Controller
          name="company"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
                type="text"
                label={t('contact.companyLabel') as string}
                name="company"
                id="company"
                placeholder={t('contact.companyPlaceholder') as string}
                minLength={2}
                style="primary"
                feedback={ errors.company?.message }

                delayAnimate={0.57}
                delayExit={0.15}

                onChange={onChange}
                onBlur={onBlur}
                value={value}

                required
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
                type="text"
                label={t('contact.emailLabel') as string}
                name="email"
                id="email"
                placeholder={t('contact.emailPlaceholder') as string}
                minLength={2}
                style="primary"
                feedback={ errors.email?.message }

                delayAnimate={0.57}
                delayExit={0.15}

                onChange={onChange}
                onBlur={onBlur}
                value={value}

                required
            />
          )}
        />

        <Controller
          name="message"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
                type="text"
                label={t('contact.messageLabel') as string}
                name="message"
                id="message"
                placeholder={t('contact.messagePlaceholder') as string}
                minLength={2}
                style="primary"
                feedback={ errors.message?.message }

                delayAnimate={0.57}
                delayExit={0.15}

                onChange={onChange}
                onBlur={onBlur}
                value={value}

                required
            />
          )}
        />

        <WrapperMotion delay={{ enter: 0.57, exit: 0.15 }} immediate>
          <Button
            text={t('contact.cta') as string}
            style="primary"
            type="submit"
          />
        </WrapperMotion>
      </form>
    </Container>
  )
}

export { FormHero }
