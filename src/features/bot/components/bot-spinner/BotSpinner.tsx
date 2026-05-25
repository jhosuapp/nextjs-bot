import type { JSX } from 'react';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './bot-spinner.module.css';

const BotSpinner = ():JSX.Element => {
  return (
    <span className={ styles.root }>
      <FontAwesomeIcon className={ styles.icon } icon={faCircleNotch} />
    </span>
  )
}

export { BotSpinner }