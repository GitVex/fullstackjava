import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import PrimaryButton from '../components/PrimaryButton'

function first() {

    const initialSouls: string[] = []
    const [souls, setSouls] = useState(initialSouls)

    function fetchMeTheirSouls(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const id = event.currentTarget.id

        // call the fetch api at api/hello here, with the body being the name of the button
        // then set the souls state to the response
        fetch('/api/hello', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: id })
        }).then(res => res.json()).then(data => {
            setSouls([...souls, data.name])
        })
    }

    function getColor(soul: string) {
        if (soul === 'btn1') {
            return 'text-emerald-500'
        } else if (soul === 'btn2') {
            return 'text-rose-500'
        } else if (soul === 'btn3') {
            return 'text-purple-500'
        }
    }

    return (
        <div className='flex place-content-center items-center h-screen overflow-hidden bg-gradient-to-tr dark:from-darknavy-600 '>
            <div className='flex flex-row gap-2 relative'>
                <div className='flex flex-col gap-2'>
                    <h1>First Page</h1>
                    <motion.p className='w-60 m-2 truncate' whileHover={{ scale: 1.1 }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, quibusdam. Quisquam, quia. Quisquam, quia. Quisquam, quia.
                    </motion.p>
                    <div className='flex place-content-center items-center flex-row gap-2'>
                        <PrimaryButton id={'btn1'} callback={fetchMeTheirSouls} color={'bg-emerald-500'} />
                        <PrimaryButton id={'btn2'} callback={fetchMeTheirSouls} color={'bg-rose-500'} />
                        <PrimaryButton id={'btn3'} callback={fetchMeTheirSouls} color={'bg-purple-500'} />
                        <PrimaryButton id={'btn4'} callback={fetchMeTheirSouls} />
                    </div>
                </div>
                <div className='flex flex-col absolute gap-2 translate-x-96'>
                    {souls.map((soul, index) => (
                        <motion.p key={index} initial={{ x: 600  }} animate={{ x: 0 }} className={getColor(soul.slice(soul.length - 4, soul.length))}>{soul}</motion.p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default first