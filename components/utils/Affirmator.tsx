import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const CircleVariants = {
    done: {
        opacity: 0,
        pathLength: 0,
    },
    loading: {
        opacity: 1,
        pathLength: .9,
        rotate: 360,
    },
};

const CheckVariants = {
    loading: {
        opacity: 0,
        pathLength: 0,
    },
    done: {
        opacity: 1,
        pathLength: 1,
        transition: {
            duration: 1,
            ease: 'easeOut',
        },
    },
};

interface AffirmatorProps {
    isLoading: boolean;
}

function Affirmator({ isLoading }: AffirmatorProps) {
    const [show, setShow] = useState(false);
    const currentTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isLoading) {
            if (currentTimeout.current) {
                clearTimeout(currentTimeout.current);
            }

            setShow(true);
        } else {
            currentTimeout.current = setTimeout(() => {
                setShow(false);
            }, 2000);
        }

        return () => {
            if (currentTimeout.current) {
                clearTimeout(currentTimeout.current);
            }
        };
    }, [isLoading]);

    return (
        <div className={'flex w-full items-center justify-center text-white'}>
            <AnimatePresence>
                {show &&
                    (<motion.div
                        className={'relative flex h-20 w-full items-center justify-center'}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        transition={{
                            duration: 1,
                            ease: 'easeInOut',
                        }}
                    >
                        <motion.svg className={'absolute'}
                                    width="80"
                                    height="80"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: isLoading ? 360 : 0 }}
                                    transition={{
                                        repeat: isLoading ? Infinity : 0,
                                        repeatType: 'loop',
                                        duration: 1,
                                        ease: 'linear',
                                    }}>

                            <motion.circle cx="12"
                                           cy="12"
                                           r="10"
                                           strokeWidth="2"
                                           strokeLinecap="round"
                                           strokeLinejoin="round"
                                           initial={{ pathLength: 0, opacity: 0 }}
                                           variants={CircleVariants}
                                           animate={isLoading ? 'loading' : 'done'}
                            />
                        </motion.svg>

                        <motion.svg className={'absolute'}
                                    width="80"
                                    height="80"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                        >
                            <motion.path
                                d="M6 12l4 4L18 8"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                variants={CheckVariants}
                                animate={isLoading ? 'loading' : 'done'}
                                transition={{
                                    duration: 1,
                                    ease: 'easeOut',
                                }}
                            />
                        </motion.svg>
                    </motion.div>)
                }
            </AnimatePresence>
        </div>
    )
        ;
}

export default Affirmator;
