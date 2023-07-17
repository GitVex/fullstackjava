import React, { useContext } from 'react';
import PlayerHolderProvider from '../../contexts/PlayerHolderProvider';
import PlayerComponent from './PlayerComponent';
import WindowSizeContext from '../../contexts/WindowSizeProvider';

function PlayerUI() {
	const context = useContext(WindowSizeContext);
	const windowHeight: number | undefined | null = context?.windowHeight;
	const windowWidth: number | undefined | null = context?.windowWidth;

	return (
		<PlayerHolderProvider>
			<div
				className='absolute z-10 flex flex-row items-center justify-center gap-2 p-4 backdrop-blur-md'
				/* @ts-ignore */
				style={{ width: windowWidth, height: windowHeight }}
			>
				<div className='flex w-2/3 flex-col items-center'>
					<div className='grid grid-cols-2 grid-rows-4 gap-2'>
						{[0, 1, 2, 3, 4, 5, 6, 7].map((id) => (
							<PlayerComponent playerId={id} />
						))}
					</div>
				</div>

				<div className='flex w-1/3 flex-col'></div>
			</div>
		</PlayerHolderProvider>
	);
}

export default PlayerUI;
