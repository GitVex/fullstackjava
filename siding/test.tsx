import React from 'react'
import LoadingAnim from '../components/utils/LoadingAnimDismount'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function test() {

	const [isPresent, setIsPresent] = useState(false)

	return (
		<div className="h-screen w-screen flex flex-col items-center place-content-around">
			<div className='h-12'>
				<AnimatePresence>
					{isPresent ? (
						<motion.div key='loader'>
							<LoadingAnim />
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>
			<button onClick={() => setIsPresent(!isPresent)} className="button-primary">Toggle</button>
			<p>isPresent: {isPresent.toString()}</p>

		</div >
	)
}

export default test