'use client';

import { ReactNode, useEffect, useState, type JSX } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import { anim, text } from './pageTransition.motion';
import { routes } from '../../constants/routes.constant';
import { SVG } from './PageTransitionSVG';
import { useLoaderStore } from '../../stores/loader.store';

import styles from './pageTransition.module.css';

type Props = {
    children: ReactNode;
}

const PageTransition = ({ children }: Props): JSX.Element => {
    const pathname = usePathname();

    const isLoadingDelay = useLoaderStore(state => state.isLoadingDelay);

    const [dimensions, setDimensions] = useState({
        width: 1920,
        height: 1080,
    });

    useEffect(() => {
        function resize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        resize();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className={styles.curve}>
            <div
                style={{ opacity: dimensions.width == null ? 1 : 0 }}
                className={styles.curve__bg}
            />

            {isLoadingDelay ? (
                <motion.p
                    className={`${styles.curve__route} ${styles.curve__route__transition}`}
                    {...anim(text)}
                >
                    150%
                </motion.p>
            ) : (
                <motion.p
                    className={styles.curve__route}
                    {...anim(text)}
                >
                    {routes[pathname] ?? '404'}
                </motion.p>
            )}

            {dimensions.width != null && dimensions.height != null && (
                <div className={styles.curve__svg}>
                    <SVG
                        width={dimensions.width}
                        height={dimensions.height}
                    />
                </div>
            )}

            {children}
        </div>
    );
}

export { PageTransition };