import type { JSX } from 'react';

import { Controller } from 'react-hook-form';
import { useFormHeroController } from '@/src/features/home/hooks/useFormHero.controller';
import { TextField } from '@/src/shared/components/text-field/TextField';
import { Container } from '../container/Container';

import styles from './form-hero.module.css';
import { Button } from '@/src/shared/components/button/Button';
import { WrapperMotion } from '@/src/shared/components/wrapper-motion/WrapperMotion';

const FormHero = ():JSX.Element => {
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
                label="Nombre"
                name="name"
                id="name"
                placeholder="Nombre"
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
                label="Empresa"
                name="company"
                id="company"
                placeholder="Nombre de la empresa"
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
                label="Correo electrónico"
                name="email"
                id="email"
                placeholder="ejemplo@correo.com"
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
                label="¿Qué quieres crear?"
                name="message"
                id="message"
                placeholder="Cuéntanos sobre tu proyecto"
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

        <WrapperMotion delay={{ enter: 0.57, exit: 0.15 }}>
          <Button
            text={'Quiero mi avatar'}
            style="primary"
            type="submit"
          />
        </WrapperMotion>
      </form>
    </Container>
  )
}

export { FormHero }