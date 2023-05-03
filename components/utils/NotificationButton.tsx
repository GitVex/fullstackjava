// components/NotificationButton.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationButtonProps {
	buttonText: string;
	notificationText?: string;
	className?: string;
	onClick?: () => void;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
	buttonText,
	notificationText,
	className = '',
	onClick = () => {},
}) => {
	const [showNotification, setShowNotification] = useState(false);

	const handleButtonClick = () => {
		setShowNotification(true);
		setTimeout(() => {
			setShowNotification(false);
		}, 2000);
	};

	return (
		<div className='relative' onClick={onClick}>
			<AnimatePresence>
				{showNotification && (
					<motion.div
						initial={{
							opacity: 0,
							scale: 0.9,
						}}
						animate={{
							opacity: 1,
							scale: 1,
							y: '-120%',
						}}
						exit={{
							opacity: 0,
							scale: 0.9,
						}}
						transition={{
							duration: 0.2,
							type: 'spring',
							mass: 0.8,
						}}
						className='absolute h-5 w-full text-red-600'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke-width='1.5'
							stroke='currentColor'
							className='h-5 w-full'
						>
							<path
								stroke-linecap='round'
								stroke-linejoin='round'
								d='M4.5 12.75l6 6 9-13.5'
							/>
						</svg>
					</motion.div>
				)}
			</AnimatePresence>
			<button
				className={`flex w-auto flex-col justify-items-center rounded border border-blue-500 px-2 py-1 font-semibold text-white duration-200 hover:bg-blue-500 ${className}`}
				onClick={handleButtonClick}
			>
				{buttonText}
			</button>
		</div>
	);
};

export default NotificationButton;
