import React, { useContext, useState, useMemo, use } from 'react';
import PlayerHolderProvider from '../../contexts/PlayerHolderProvider';
import PlayerComponent from './PlayerComponent';
import WindowSizeContext from '../../contexts/WindowSizeProvider';
import VolumeSlider from '../../utils/VolumeSlider';

function PlayerUI() {
	const context = useContext(WindowSizeContext);
	const windowHeight: number | undefined | null = context?.windowHeight;
	const windowWidth: number | undefined | null = context?.windowWidth;

	const [masterVolume, setMasterVolume] = useState(100);
	const [masterVolumeModifier, setMasterVolumeModifier] = useState(1);

	useMemo(() => {
		setMasterVolumeModifier(masterVolume / 100);
	}, [masterVolume]);

	return (
		<PlayerHolderProvider>
			<div
				className='absolute z-10 flex flex-row items-center justify-center gap-2 p-4 backdrop-blur-md'
				/* @ts-ignore */
				style={{ width: windowWidth, height: windowHeight }}
			>
				<div className='flex w-fit flex-row items-center gap-4'>
					<div className='flex w-full flex-col items-center'>
						<div className='grid grid-cols-2 grid-rows-4 gap-2'>
							{[0, 1, 2, 3, 4, 5, 6, 7].map((id) => (
								<PlayerComponent
									playerId={id}
									masterVolumeModifier={masterVolumeModifier}
								/>
							))}
						</div>
					</div>
					<div className='flex w-28 flex-col items-center gap-4'>
						<p className='whitespace-nowrap'>Master Volume</p>
						<VolumeSlider
							volume={masterVolume}
							setVolume={setMasterVolume}
							height={500}
						/>
					</div>
				</div>

				<div className='flex w-1/3 flex-col items-center'>
					<div></div>
				</div>
			</div>
		</PlayerHolderProvider>
	);
}

export default PlayerUI;
