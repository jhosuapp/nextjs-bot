import type { JSX } from 'react';

import styles from './container.module.css';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  padding?: 'lg' | 'md' | 'sm';
};

const Container = ({ children, className = '', padding }: ContainerProps): JSX.Element => {
  return (
    <section className={ `${styles.container} ${className} ${padding ? styles[`container__padding_${padding}`] : ''}` }>
      {children}
    </section>
  )
}

export { Container }