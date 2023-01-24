/* create a react component that displays the total amount of tracks in the database using the api/sum route */
import React from 'react'
import { useQuery } from 'react-query'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingAnim from '../utils/LoadingAnimDismount'

function TrackTotal() {

    const callbackRequest = async () => {
        const response = await fetch('/api/sum')
        const res = await response.json()

        return res.tracks
    }

    const { isLoading, error, data } = useQuery('trackTotal', callbackRequest)

    return (
        <div className={isLoading ? 'h-12' : ''}>
            <AnimatePresence>
                {
                    isLoading ? (
                        <motion.div key='loader'>
                            <LoadingAnim />
                        </motion.div>
                    ) : error ? (
                        //@ts-ignore
                        <div>Error: {error.message}</div>
                    ) : data ? (
                        <div className='flex flex-col gap-2 items-center w-full'>
                            <p>Total Tracks: {data}</p>
                        </div>) : null
                }
            </AnimatePresence>
        </div>
    )

}

export default TrackTotal
