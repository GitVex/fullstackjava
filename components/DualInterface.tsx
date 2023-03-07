import React, { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import DBForm from '../components/dbForm/DBForm'
import MixerOverlay from './mixerComponents/MixerOverlay'
import { motion } from 'framer-motion'

function DualInterface() {

    const [open, setOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const yInit = -900

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true)
        }
    }, [])

    return (
        <div className='overflow-hidden'>
            {!isMobile ? (
                <>
                    <div className="absolute flex flex-row w-screen justify-center">
                        <button onClick={() => setOpen(!open)} className="m-4 w-8 h-8 scale-x-[400%] z-20">
                            <motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" animate={open ? { scaleY: -1 } : {}}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </motion.svg>
                        </button>
                    </div>

                    <motion.div initial={{ y: yInit }} animate={open ? { y: 0 } : { y: yInit }} transition={{ duration: 1, ease: 'easeInOut' }} className="absolute backdrop-blur-md z-10">
                        <MixerOverlay />
                    </motion.div>
                </>
            ) : null}

            <div className='absolute flex flex-col h-screen w-screen z-0 bg-gradient-to-tr dark:from-darknavy-600'>
                <QueryClientProvider client={new QueryClient()}>
                    <DBForm />
                </QueryClientProvider>
            </div>

        </div>
    )
}

export default DualInterface