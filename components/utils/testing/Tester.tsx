import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

function Tester() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={'flex h-screen items-center justify-center gap-10'}>
            <button onClick={() => setIsLoading(!isLoading)} className="btn btn-primary">
                {isLoading ? 'Stop Loading' : 'Start Loading'}
            </button>

            <motion.svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 initial={{ rotate: 0 }}
                 animate={{ rotate: isLoading ? 360 : 0 }}
                 transition={{
                     repeat: isLoading ? Infinity : 0, // This makes the circle animation loop
                     repeatType: 'loop',
                     duration: 1,
                     ease: 'linear',
                 }}>

                <motion.circle
                    cx="12"
                    cy="12"
                    r="10"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    variants={CircleVariants}
                    animate={isLoading ? 'loading' : 'done'}

                />

                {/* Checkmark */}
                <motion.path
                    d="M6 12l4 4L18 8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={CheckVariants}
                    animate={isLoading ? 'loading' : 'done'}
                />
            </motion.svg>
        </div>
    );
}

export default Tester;
