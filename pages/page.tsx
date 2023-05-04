// pages/index.tsx
import React from 'react';
import NotificationButton from '../components/utils/NotificationButton';
import FilterUI from '../components/rebuiltComponents/Filter/FilterUI';
import FilterStateProvider from '../components/contexts/RebuiltFilterStateProvider';

const NotificationPopup: React.FC = () => {
	return (
		<div className='flex h-screen items-center justify-around bg-black'>
			<FilterStateProvider>
				<FilterUI />
			</FilterStateProvider>
		</div>
	);
};

export default NotificationPopup;
