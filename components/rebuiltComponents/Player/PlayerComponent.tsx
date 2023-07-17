import React, { useMemo, useState, useRef } from 'react';
import { usePlayerHolderById } from '../../contexts/PlayerHolderProvider';
import { motion } from 'framer-motion';
import IFPlayer from '../../utils/IFPlayer';
import VolumeSlider from '../../utils/VolumeSlider';

const DEFAULT_VOLUME = 50;
const DEFAULT_FADE_INTERVAL = 75;
const DEFAULT_FADE_STEP = 1;

function sliderInputHandler(
	e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLInputElement>,
	player: IFPlayer | null,
	setVolumeFunc: React.Dispatch<React.SetStateAction<number>>,
	masterVolumeModifier: number
) {
	if (!player) return;

	const field = e.target as HTMLInputElement;

	const volume = parseInt(field.value) * masterVolumeModifier;

	setVolumeFunc(parseInt(field.value));
	player.setVolume(volume);
}

function loadNewVideo(
	e: React.FormEvent<HTMLInputElement>,
	player: IFPlayer | null
) {
	const field = e.target as HTMLInputElement;
	if (!player) return;
	if (!field.value) return;

	// strip video id from url and remove all other characters and timestamps
	field.value = field.value.replace(
		/(https:\/\/www\.youtube\.com\/watch\?v=|https:\/\/youtu\.be\/|&t=.*|&feature=emb_logo)/g,
		''
	);

	player.loadVideoById(field.value);
	setTimeout(() => {
		player.pauseVideo();
		player.setLoop(true);
	}, 1000);
}

function PlayerComponent({
	playerId,
	masterVolumeModifier,
}: {
	playerId: number;
	masterVolumeModifier: number;
}) {
	const ID = `player${playerId}`;

	const [volume, setVolume] = useState(DEFAULT_VOLUME);
	const fadeInterval = useRef(DEFAULT_FADE_INTERVAL);
	const fadeStep = useRef(DEFAULT_FADE_STEP);

	const ease = useRef(
		(x: number, limit: number) =>
			limit * (1 - Math.cos(((x / limit) * Math.PI) / 2))
	);

	const player = usePlayerHolderById(playerId).player;

	useMemo(() => {
		if (!player) return;

		player.setVolume(volume * masterVolumeModifier);
	}, [masterVolumeModifier]);

	return (
		<div className='flex h-[180px] w-96 flex-col justify-around gap-2 rounded border-2 border-darknavy-700 bg-darknavy-500 p-1'>
			<div className='flex w-full flex-row justify-around'>
				<div className='rounded' id={ID} />
				<VolumeSlider
					player={player}
					setVolume={setVolume}
					volume={volume}
					userOnChange={(e) =>
						sliderInputHandler(
							e,
							player,
							setVolume,
							masterVolumeModifier
						)
					}
					userOnInput={(e) =>
						sliderInputHandler(
							e,
							player,
							setVolume,
							masterVolumeModifier
						)
					}
				/>
			</div>
			<div className='flex w-full flex-row items-center justify-center gap-2'>
				<input
					type='text'
					className='w-2/5 rounded bg-gray-800/50 p-1'
					placeholder='Video ID'
					onKeyDown={(e) => {
						loadNewVideo(e, player);
					}}
				/>
				<button
					className='w-1/5 rounded bg-gray-800/50 p-1 disabled:opacity-50'
					/* onClick={fadeIn} */
					disabled={player ? false : true}
				>
					Fade In
				</button>
				<input
					type='text'
					className=' w-1/5 rounded bg-gray-800/50 p-1'
					placeholder='Limit'
					onKeyDown={(e) => {
						const field = e.target as HTMLInputElement;
						if (!player) return;
						if (e.key !== 'Enter' && field.value) return;

						if (player.getPlayerState() != 1) {
							/* fadeIn(e, parseInt(field.value)); */
							return;
						}
						/* fadeTo(e, parseInt(field.value)); */
					}}
				/>
				<button
					className='w-2/6 rounded bg-gray-800/50 p-1 disabled:opacity-50'
					/* onClick={fadeOut} */
					disabled={player ? false : true}
				>
					Fade Out
				</button>
			</div>
		</div>
	);
}

export default PlayerComponent;
