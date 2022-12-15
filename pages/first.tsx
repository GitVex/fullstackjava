import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'

function first() {

    const initialSouls: string[] = []
    const [souls, setSouls] = useState(initialSouls)

    function fetchMeTheirSouls(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const id = event.currentTarget.id
        console.log('fetching soul of', id)
        // call the fetch api at api/hello here, with the body being the name of the button
        // then set the souls state to the response

        fetch('/api/hello', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: id })
        }).then(res => res.json()).then(data => {
            console.log(data, souls)
            setSouls([...souls, data.name])
            console.log(souls)
        })
    }

    return (
        <div className='flex place-content-center items-center h-screen overflow-hidden'>
            <div className='flex flex-row gap-2 relative'>
                <div className='flex flex-col gap-2'>
                    <h1>First Page</h1>
                    <motion.p className='w-60 m-2 truncate' whileHover={{ scale: 1.1 }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, quibusdam. Quisquam, quia. Quisquam, quia. Quisquam, quia.
                    </motion.p>
                    <div className='flex place-content-center items-center flex-row gap-2'>
                        <button id='btn1' onClick={fetchMeTheirSouls} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded duration-100'>
                            Btn1 here
                        </button>
                        <button id='btn2' onClick={fetchMeTheirSouls} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded duration-100'>
                            Btn2 here
                        </button>
                        <button id='btn3' onClick={fetchMeTheirSouls} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded duration-100'>
                            Btn3 here
                        </button>
                    </div>
                </div>
                <div className='flex flex-col gap-2 absolute translate-x-96'>
                    {souls.map((soul, index) => (
                        <motion.p key={index} initial={{x: 600}} animate={{x: 0}}>{soul}</motion.p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default first