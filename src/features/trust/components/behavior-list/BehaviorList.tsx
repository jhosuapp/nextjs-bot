import type { JSX } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import { StaggerGroup, StaggerItem } from '@/src/shared/components/motion/StaggerGroup';

import styles from './behavior-list.module.css';

type BehaviorListProps = { items: string[] };

const BehaviorList = ({ items }: BehaviorListProps): JSX.Element => (
  <StaggerGroup className={styles.grid} stagger={0.06} amount={0.2}>
    {items.map((item) => (
      <StaggerItem key={item} className={styles.item}>
        <FontAwesomeIcon
          icon={faCircleCheck}
          className={styles.icon}
          aria-hidden="true"
        />
        <span className={styles.text}>{item}</span>
      </StaggerItem>
    ))}
  </StaggerGroup>
);

export { BehaviorList };
