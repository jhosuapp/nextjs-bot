import { InputHTMLAttributes, ReactNode, JSX } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { fadeUpMotion } from '../../motion/fadeUp.motion';

import styles from './text-field.module.css';

type NativeProps = InputHTMLAttributes<HTMLInputElement>;

type CustomProps = {
    feedback?: string;
    label?: string;
    style?: 'primary' | 'secondary';
    children?: ReactNode;
    childrenIsIcon?: boolean;
    toolTips?: string[];
    
    delayAnimate?: number;
    delayExit?: number;
    noAnimate?: boolean;
    classNameParent?: string;
}

export type Props = NativeProps & CustomProps;


const TextField = ({ children, childrenIsIcon, feedback, style, toolTips, label, delayAnimate, delayExit, noAnimate, classNameParent = '', ...props }:Props):JSX.Element => {
    return (
        <motion.div 
            {...(!noAnimate ? fadeUpMotion(delayAnimate ?? 0.5, delayExit ?? 0.14) : {})}
            className={ `${styles.textField} ${styles[`textField--${style}`]} ${feedback && styles.textFieldError} ${classNameParent}` }
        >
            {label && <label htmlFor={ props.name }>{ label }</label>}
            <div className={ styles.textFieldContent }>
                <input 
                    {...props}
                />
                {feedback && !children && (
                    <div className={ styles.textField__icons }>
                        <FontAwesomeIcon icon={faCircleExclamation} className={ styles.textField__dangerIcon } />
                    </div>
                )}
                {childrenIsIcon ? (
                    <div className={ styles.textField__icons }>
                        {feedback && <FontAwesomeIcon icon={faCircleExclamation} className={ styles.textField__dangerIcon } />}
                        { children }
                    </div>
                ) : (
                    children
                )}
            </div>
            {/* Tips */}
            {toolTips && (
                <ul className={ styles.textField__tooltip }>
                    {toolTips.map((data, index)=>(
                        <li key={ index } >{ data }</li>
                    ))}
                </ul>
            )}
            {/* Feedback */}
            {feedback && <span className={ styles.textField__feedback } role='alert'>{ feedback }</span>}
        </motion.div>
    )
}

export { TextField }