import React, {
	useReducer,
	useContext,
	useMemo,
	useEffect,
	useState,
} from 'react';
import { motion } from 'framer-motion';
import PlayerUI from './PlayerUI';

function PlayerTopMenu() {
	const [isOpenPlayer, setIsOpenPlayer] = useState(false);
	const yInit = window.innerHeight * -1;

	// create a listener that listens for the spacebar keypress
	// if the spacebar is pressed, then toggle the isOpenPlayer state
	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.code === 'Space') {
			setIsOpenPlayer((prevIsOpenPlayer) => !prevIsOpenPlayer);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	const buttonVariants = {
		closed: {
			scaleY: 1,
		},
		open: {
			scaleY: -1,
		},
	};

	useEffect(() => {
		console.log('isOpenPlayer', isOpenPlayer);
	}, [isOpenPlayer]);

	return (
		<>
			<motion.div
				className='flex justify-center'
				onClick={() =>
					setIsOpenPlayer((prevIsOpenPlayer) => !prevIsOpenPlayer)
				}
				variants={buttonVariants}
				animate={isOpenPlayer ? 'open' : 'closed'}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 132 24'
					strokeWidth={2}
					stroke='currentColor'
					className='h-6 w-36 cursor-pointer text-red-600'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M107.5 8.25l-41.25 7.5-41.25-7.5'
					/>
				</svg>
			</motion.div>

			{/* Overlay */}
			<motion.div
				initial={{ y: yInit }}
				animate={isOpenPlayer ? { y: 0 } : { y: yInit }}
				transition={{ duration: 1, ease: 'easeInOut' }}
				className='absolute z-20 backdrop-blur-md'
			>
				<PlayerUI />
			</motion.div>
		</>
	);
}

export default PlayerTopMenu;
