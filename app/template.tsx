'use client';

import { useEffect, type ReactNode } from 'react';
import { useLoaderStore } from '../src/shared/stores/loader.store';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

type Props = {
    children: ReactNode;
};

export default function Template({ children }: Props) {
    const pathname = usePathname();
    const setIsLoading = useLoaderStore( state => state.setIsLoading );
    
    useEffect(() => { setIsLoading(); }, [setIsLoading]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}