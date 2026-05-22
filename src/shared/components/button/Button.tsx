import { ButtonHTMLAttributes, type JSX } from 'react';
import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { zoomInMotion } from '../../motion/zoomIn.motion';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import styles from './button.module.css';

type NativeProps = ButtonHTMLAttributes<HTMLButtonElement>;

type CustomProps = {
    text?: string;
    style?: 'primary' | 'secondary' | 'fit';
    className?: string;
    icon?: IconDefinition;
    iconRight?: IconDefinition;
    isLoad?: boolean;
} & MotionProps;

type ButtonProps = CustomProps & NativeProps;

const Button = ({ text, style, className, icon, iconRight, isLoad = false, ...props }:ButtonProps):JSX.Element => {
    return (
        <motion.button
            className={ `${styles.button} ${styles[`button--${style}`]} ${className ?? ''} ${isLoad && styles.button__loader}` }
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            {...props}
        >
            <FontAwesomeIcon
                className={ styles.button__icon }
                icon={ icon ?? faArrowRight }
                aria-hidden="true"
            />
            <span>{ text }</span>
            <AnimatePresence mode='wait'>
                {isLoad ? (
                    <motion.div {...zoomInMotion(0,0)}>
                        <FontAwesomeIcon
                            className={ styles.button__iconLoader }
                            icon={ faCircleNotch }
                            aria-hidden="true"
                        />
                    </motion.div>
                ) : (
                    <>
                        {iconRight ? (
                            <motion.div {...zoomInMotion(0,0)}>
                                <FontAwesomeIcon
                                    className={ styles.button__iconSecondary }
                                    icon={ iconRight }
                                    aria-hidden="true"
                                />
                            </motion.div>
                        ) : (
                            <b></b>
                        )}
                    </>
                )}
            </AnimatePresence>
        </motion.button>
    )
}

export { Button }
