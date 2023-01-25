import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingAnim from './LoadingAnimDismount'

function LoadingAnimation(isPresent: any) {
    return (
        <div className='h-12'>
            <AnimatePresence>
                {isPresent ? (
                    <motion.div key='loader'>
                        <LoadingAnim />
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    )
}

export default LoadingAnimation