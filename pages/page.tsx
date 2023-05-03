// pages/index.tsx
import React from 'react';
import NotificationButton from '../components/utils/NotificationButton';

const NotificationPopup: React.FC = () => {
	return (
		<div className='flex min-h-screen items-center justify-around bg-black'>
			<NotificationButton
				buttonText='Click me!'
				notificationText='Button pressed!'
			/>

			<NotificationButton
				buttonText='Click me!'
				notificationText='Button pressed!'
			/>
		</div>
	);
};

export default NotificationPopup;
