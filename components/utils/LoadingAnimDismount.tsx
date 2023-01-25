/* use framer motion */
import React from 'react'
import { motion } from 'framer-motion'

const container = {
	show: {
		transition: {
			staggerChildren: 0.15
		}
	},
	exit: {
		transition: {
			staggerChildren: 0.1
		}
	}
};

const item = {
	hidden: {
		opacity: 0,
		y: 0,
		rotate: 0,
	},
	show: {
		opacity: [0, 1, 0],
		y: 0,
		rotate: [0, 360],
		transition: {
			ease: 'easeInOut',
			duration: 1,
			repeat: Infinity,
		},
	},
	exit: {
		opacity: [1, 0],
		y: -40,
		transition: {
			ease: 'easeInOut',
			duration: 0.5,
		},
	},
}

export default function LoadingAnim() {
	return (
		<motion.div className='loader flex flex-row h-full w-full place-content-center place-items-center'
			variants={container}
			initial='hidden'
			animate='show'
			exit='exit'>
				<motion.div key='item-1' className='w-2 h-2 rounded-full bg-gray-700/75 origin-left ml-2' variants={item} />
				<motion.div key='item-2' className='w-2 h-2 rounded-full bg-gray-700/75 origin-left ml-2' variants={item} />
				<motion.div key='item-3' className='w-2 h-2 rounded-full bg-gray-700/75 origin-left ml-2' variants={item} />
				<motion.div key='item-4' className='w-2 h-2 rounded-full bg-gray-700/75 origin-left ml-2' variants={item} />
		</motion.div>
	)
}