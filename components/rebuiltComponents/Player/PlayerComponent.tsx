import React, { useMemo, useState, useRef, useEffect } from 'react';
import { usePlayerHolderById } from '../../contexts/PlayerHolderProvider';
import { motion } from 'framer-motion';
import IFPlayer from '../../utils/IFPlayer';
import VolumeSlider from '../../utils/VolumeSlider';
import { sleep } from '../../utils/utils';

const DEFAULT_VOLUME = 50;
const DEFAULT_FADE_INTERVAL = 75;
const DEFAULT_FADE_STEP = 1;
const DEFAULT_EASE = (x: number, limit: number) =>
	limit * (1 - Math.cos(((x / limit) * Math.PI) / 2));

interface FadeOptions {
	player: IFPlayer | null;
	setVolume: React.Dispatch<React.SetStateAction<number>>;
	volume: number;
	fadeStep?: number;
	fadeInterval?: number;
	ease?: (x: number, limit: number) => number;
	currentFadeInterval: NodeJS.Timeout | null;
	setCurrentFadeInterval: React.Dispatch<
		React.SetStateAction<NodeJS.Timeout | null>
	>;
	pLimit?: number;
}

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

function fade({
	player,
	setVolume,
	volume,
	fadeStep = DEFAULT_FADE_STEP,
	fadeInterval = DEFAULT_FADE_INTERVAL,
	ease = DEFAULT_EASE,
	currentFadeInterval,
	setCurrentFadeInterval,
	pLimit,
	inverse,
}: FadeOptions & { inverse?: boolean }) {
	console.log(
		'fade function called with the following parameters:',
		arguments
	);
	if (!player) return;

	// Clear any existing interval
	if (currentFadeInterval) {
		console.log('Clearing existing interval');
		clearInterval(currentFadeInterval);
		setCurrentFadeInterval(null);
	}

	const limit = pLimit ?? (volume === 0 ? DEFAULT_VOLUME : volume);
	console.log('limit:', limit);
	const startVolume = inverse ? volume : 1;
	console.log('startVolume:', startVolume);
	let currentVolume = inverse ? volume : 1;

	if (!inverse) {
		console.log('Setting volume to 1');
		player.playVideo();
		setVolume(1);
	}

	let runner = startVolume;

	console.log('runner:', runner);

	let intervalId = setInterval(() => {
		console.log('Inside setInterval callback');
		try {
			if (inverse) {
				console.log('In inverse condition');
				if (currentVolume > 0) {
					console.log('Player volume is greater than 0');
					currentVolume = ease(runner, currentVolume);
					setVolume(Math.floor(currentVolume));
					runner -= fadeStep;
				} else {
					console.log(
						'Player volume is not greater than 0, ending fade'
					);
					endFade(0, player);
				}
			} else {
				console.log('In non-inverse condition');
				if (currentVolume < limit) {
					console.log('Player volume is less than limit');
					currentVolume = ease(runner, limit);
					setVolume(Math.floor(currentVolume));
					runner += fadeStep;
				} else {
					console.log(
						'Player volume is not less than limit, ending fade'
					);
					endFade(limit);
				}
			}
		} catch (error) {
			console.error('Error in fade function: ', error);
			clearInterval(intervalId);
		}
	}, fadeInterval);

	setCurrentFadeInterval(intervalId);

	function endFade(volume: number, player: IFPlayer | null = null) {
		console.log('endFade function called with volume:', volume);
		setVolume(volume);
		if (volume === 0) {
			console.log('Pausing video');
			player?.pauseVideo();
		}
		clearInterval(intervalId);
		setCurrentFadeInterval(null);
	}
}

function fadeIn(options: FadeOptions) {
	fade({ ...options, inverse: false });
}

function fadeOut(options: FadeOptions) {
	fade({ ...options, inverse: true });
}

function fadeTo(
	{
		player,
		setVolume,
		volume,
		fadeStep = DEFAULT_FADE_STEP,
		fadeInterval = DEFAULT_FADE_INTERVAL,
		currentFadeInterval,
		setCurrentFadeInterval,
		pLimit,
	}: FadeOptions,
	targetVolume: number
) {
	if (!player) return;

	// Clear any existing interval
	if (currentFadeInterval) {
		clearInterval(currentFadeInterval);
		setCurrentFadeInterval(null);
	}

	let currentVolume = volume;

	let intervalId = setInterval(() => {
		try {
			if (currentVolume > targetVolume) {
				currentVolume -= fadeStep;
				setVolume(currentVolume);
			} else if (currentVolume < targetVolume) {
				currentVolume += fadeStep;
				setVolume(currentVolume);
			} else {
				endFade(targetVolume);
			}
		} catch (error) {
			console.error('Error in fadeTo function: ', error);
			clearInterval(intervalId);
		}
	}, fadeInterval);

	setCurrentFadeInterval(intervalId);

	function endFade(volume: number) {
		setVolume(volume);
		clearInterval(intervalId);
		setCurrentFadeInterval(null);
	}
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
	const [currentFadeInterval, setCurrentFadeInterval] =
		useState<NodeJS.Timeout | null>(null);
	const fadeInterval = useRef(DEFAULT_FADE_INTERVAL);
	const fadeStep = useRef(DEFAULT_FADE_STEP);
	const ease = useRef(DEFAULT_EASE);

	const player = usePlayerHolderById(playerId).player;

	useMemo(() => {
		if (!player) return;

		player.setVolume(volume * masterVolumeModifier);
	}, [masterVolumeModifier]);

	useEffect(() => {
		console.log('vol ' + volume);
	}, [volume]);

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
					onClick={(e) => {
						fadeIn({
							player,
							setVolume,
							volume,
							fadeStep: fadeStep.current,
							fadeInterval: fadeInterval.current,
							ease: ease.current,
							currentFadeInterval,
							setCurrentFadeInterval,
							pLimit: volume,
						});
					}}
					disabled={player ? false : true}
				>
					Fade In
				</button>
				<input
					type='text'
					className=' w-1/5 rounded bg-gray-800/50 p-1'
					placeholder='Volume'
					onKeyDown={(e) => {
						const field = e.target as HTMLInputElement;
						if (!player) return;
						console.log('e.key:', e.key);
						if (e.key !== 'Enter' || !field.value) return;

						if (player.getPlayerState() !== 1) {
							fadeIn({
								player,
								setVolume,
								volume,
								fadeStep: fadeStep.current,
								fadeInterval: fadeInterval.current,
								ease: ease.current,
								currentFadeInterval,
								setCurrentFadeInterval,
								pLimit: parseInt(field.value),
							});
							return;
						}
						fadeTo(
							{
								player,
								setVolume,
								volume,
								fadeStep: fadeStep.current,
								fadeInterval: fadeInterval.current,
								currentFadeInterval,
								setCurrentFadeInterval,
								pLimit: parseInt(field.value),
							},
							parseInt(field.value)
						);
					}}
				/>
				<button
					className='w-2/6 rounded bg-gray-800/50 p-1 disabled:opacity-50'
					onClick={(e) => {
						fadeOut({
							player,
							setVolume,
							volume,
							fadeStep: fadeStep.current,
							fadeInterval: fadeInterval.current,
							ease: ease.current,
							currentFadeInterval,
							setCurrentFadeInterval,
						});
					}}
					disabled={player ? false : true}
				>
					Fade Out
				</button>
			</div>
		</div>
	);
}

export default PlayerComponent;
