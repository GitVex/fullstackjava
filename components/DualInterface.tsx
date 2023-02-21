import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import DBForm from '../components/dbForm/DBForm'
import MixerOverlay from './mixerComponents/MixerOverlay'
import { motion } from 'framer-motion'
import { useState } from 'react'

function DualInterface() {

    const [open, setOpen] = useState(false)



    return (
        <div className='bg-gradient-to-tr dark:from-darknavy-600 overflow-hidden'>
            <div className='absolute'>
                <motion.div initial={{ y: -1000 }} animate={open ? { y: 0 } : { y: -1000 }} className="backdrop-blur-md">
                    <MixerOverlay />
                </motion.div>
            </div>




            <div className='flex flex-col h-screen'>
            <button onClick={() => setOpen(!open)} className="absolute m-4 w-6 h-6 scale-x-[300%] self-center">
                <motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" animate={open ? { scaleY: -1 } : {} }>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                </motion.svg>
            </button>









                <QueryClientProvider client={new QueryClient()}>
                    <DBForm />
                </QueryClientProvider>
            </div>

        </div>
    )
}

export default DualInterface