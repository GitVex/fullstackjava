import React, { useContext } from 'react';
import WindowSizeContext from '../../contexts/WindowSizeProvider';

function PlayerUI() {
	const context = useContext(WindowSizeContext);
	const windowHeight: number | undefined | null = context?.windowHeight;
	const windowWidth: number | undefined | null = context?.windowWidth;

	return (
		<div
			className='flex flex-col backdrop-blur-md'
            /* @ts-ignore */
			style={{ 'width': windowWidth - 30, 'height': windowHeight - 30 }}
		>
			PlayerUI
			<div className='h-24 w-24 bg-emerald-500' />
			<div className='h-24 w-24 bg-emerald-500' />
			<div className='h-24 w-24 bg-emerald-500' />
			<div className='h-24 w-24 bg-emerald-500' />
		</div>
	);
}

export default PlayerUI;
