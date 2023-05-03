import React, { useState, useContext } from 'react';
import WindowWidthContext from '../contexts/WindowSizeProvider';
import { breakpoints } from '../utils/breakpoints';
import { motion } from 'framer-motion';

const menuWidth = 420;

const SideBarVariants = {
	closed: {
		x: -1 * menuWidth,
	},
	open: {
		x: 0,
	},
};

const PlusVariants = {
	closed: {
		rotate: 0,
	},
	open: {
		rotate: 45,
	},
};

function Create({ className }: { className?: string }) {
	const [isOpenCreate, setIsOpenCreate] = useState(false);

	const context = useContext(WindowWidthContext);
	const windowWidth = context?.windowWidth;

	return windowWidth !== undefined &&
		windowWidth !== null &&
		windowWidth >= breakpoints.md ? (
		<motion.div
			className={`relative ${className}`}
			animate={isOpenCreate ? 'open' : 'closed'}
			initial='closed'
			variants={SideBarVariants}
		>
			<div
				className='absolute -left-6 -top-6 h-screen backdrop-blur-md'
				style={{ width: menuWidth }}
			>
				<div className='flex h-full w-full flex-col gap-2 p-6'>
					<div className='h-1/3 w-full rounded bg-emerald-500' />
					<div className='h-1/3 w-full rounded bg-amber-500' />
					<div className='h-1/3 w-full rounded bg-indigo-500' />
				</div>
			</div>

			<motion.div
				className={`absolute`}
				style={{ left: menuWidth }}
				onClick={() =>
					setIsOpenCreate((prevIsOpenCreate) => !prevIsOpenCreate)
				}
				variants={PlusVariants}
				animate={isOpenCreate ? 'open' : 'closed'}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='h-6 w-6 cursor-pointer text-[#FF0000]'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M12 4.5v15m7.5-7.5h-15'
					/>
				</svg>
			</motion.div>
		</motion.div>
	) : (
		<div />
	);
}

export default Create;
