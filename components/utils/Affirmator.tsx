/* Create a react component with framer that display a plus or a hook sign for a short duration when recieving a signal */
import React from 'react'
import { motion } from 'framer-motion'

const Affirmator = (props: { affirmState: any, setAffirmState: any}) => {

    const { affirmState, setAffirmState } = props

    React.useEffect(() => {
        if (affirmState) {
            setTimeout(() => {
                setAffirmState(false)
            }, 1500)
        }
    }, [affirmState])

    return (
        <motion.div
            animate={affirmState ? { scale: 1.5, opacity: 1, y: -10 } : { scale: 0, opacity: 0, y: 0 }}
            transition={{ duration: 0.5 }}
            className='absolute translate-x-5 w-5 h-5 bg-green-500 rounded-full flex text-justify justify-center items-center text-white text-sm font-bold'
        > 
            <p className='translate-y-[-0.1rem]'>+</p>
        </motion.div>
    )
}

export default Affirmator