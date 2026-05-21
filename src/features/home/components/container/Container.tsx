import type { JSX } from 'react';

import styles from './container.module.css';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  padding?: 'xl' | 'lg' | 'md' | 'sm';
  id?: string;
};

const Container = ({ children, className = '', padding, id }: ContainerProps): JSX.Element => {
  return (
    <section id={id} className={ `${styles.container} ${className} ${padding ? styles[`container__padding_${padding}`] : ''}` }>
      {children}
    </section>
  )
}

export { Container }