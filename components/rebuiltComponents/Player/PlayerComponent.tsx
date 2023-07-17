import React, { useEffect, useState, useRef } from 'react';
import { usePlayerHolderById } from '../../contexts/PlayerHolderProvider';
import { motion } from 'framer-motion';
import IFPlayer from '../../utils/IFPlayer';

const DEFAULT_VOLUME = 50;
const DEFAULT_FADE_INTERVAL = 75;
const DEFAULT_FADE_STEP = 1;

function sliderInputHandler(e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLInputElement>, player: IFPlayer | null, setVolumeFunc: React.Dispatch<React.SetStateAction<number>>) {
	if (!player) return;

	const field = e.target as HTMLInputElement;

	setVolumeFunc(parseInt(field.value));
	player.setVolume(parseInt(field.value));
}

function PlayerComponent({ playerId }: { playerId: number }) {
	const ID = `player${playerId}`;

	const [volume, setVolume] = useState(DEFAULT_VOLUME);
	const fadeInterval = useRef(DEFAULT_FADE_INTERVAL);
	const fadeStep = useRef(DEFAULT_FADE_STEP);

	const ease = useRef(
		(x: number, limit: number) =>
			limit * (1 - Math.cos(((x / limit) * Math.PI) / 2))
	);

	const player = usePlayerHolderById(playerId).player;

	return (
		<div className='h-44 w-96 rounded border-2 border-indigo-700 bg-indigo-900 p-1 duration-100 hover:bg-emerald-500'>
			<div className='flex w-full flex-row justify-around'>
				<div className='rounded' id={ID} />
				<div className='flex w-10 flex-row items-center gap-4'>
					<input
						id={`volumeSlider`}
						type='range'
						min='0'
						max='100'
						step='1'
						// @ts-ignore
						orient='vertical'
						/* className={styles.slider} */
						onChange={(e) => sliderInputHandler(e, player, setVolume)}
						onInput={(e) => sliderInputHandler(e, player, setVolume)}
					/>
					<style>
						{`
							#volumeSlider {
								-webkit-appearance: slider-vertical;
								width: 8px;
								height: 100px;
						`}
					</style>
					<motion.p animate={{y: 50 + (-1 * volume) }}>{volume} </motion.p>
				</div>
			</div>
		</div>
	);
}

export default PlayerComponent;
