import React, { useMemo, useState } from 'react';
import { usePlayerHolderById } from '../contexts/PlayerHolderProvider';
import { motion } from 'framer-motion';
import IFPlayer from '../utils/IFPlayer';
import VolumeSlider from '../utils/VolumeSlider';
import { fadeIn, fadeOut, fadeTo } from '../utils/fadeFunctions';

interface PlayerComponentProps {
	playerId: number;
	masterVolumeModifier: number;
	pVolume?: number;
	pSetVolume?: React.Dispatch<number>;
	pSelected?: boolean;
	pSetSelected?: () => void;
	pCurrentFadeInterval?: NodeJS.Timeout | null;
	pSetCurrentFadeInterval?: React.Dispatch<NodeJS.Timeout | null>;
}

function sliderInputHandler(
	e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLInputElement>,
	player: IFPlayer | null,
	setVolumeFunc: React.Dispatch<number>,
	masterVolumeModifier: number
) {
	if (!player) return;

	const field = e.target as HTMLInputElement;

	const volume = parseInt(field.value) * masterVolumeModifier;

	setVolumeFunc(parseInt(field.value));
	player.setVolume(volume);
}

function fadeInputHandler(
	e: React.KeyboardEvent<HTMLInputElement>,
	player: IFPlayer | null,
	setVolume: React.Dispatch<number>,
	volume: number,
	currentFadeInterval: NodeJS.Timeout | null,
	setCurrentFadeInterval: React.Dispatch<NodeJS.Timeout | null>
) {
	const field = e.target as HTMLInputElement;
	if (!player) return;
	if (e.key !== 'Enter' || !field.value) return;

	if (player.getPlayerState() !== 1) {
		fadeIn({
			player,
			setVolume,
			volume,
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
			currentFadeInterval,
			setCurrentFadeInterval,
			pLimit: parseInt(field.value),
		},
		parseInt(field.value)
	);
}

function loadNewVideo(
	e: React.KeyboardEvent<HTMLInputElement>,
	player: IFPlayer | null
) {
	const field = e.target as HTMLInputElement;
	if (!player) return;
	if (!field.value) return;
	if (e.key !== 'Enter') return;

	// strip video id from url and remove all other characters and timestamps
	field.value = field.value.replace(
		/(https:\/\/www\.youtube\.com\/watch\?v=|https:\/\/youtu\.be\/|&t=.*|&feature=emb_logo)/g,
		''
	);

	player.setVolume(0);
	player.loadVideoById(field.value);

	setTimeout(() => {
		player.pauseVideo();
		player.seekTo(0, true);
		player.setLoop(true);
	}, 1000);
}

function PlayerComponent({
	playerId,
	masterVolumeModifier,
	pVolume,
	pSetVolume,
	pSelected,
	pSetSelected,
	pCurrentFadeInterval,
	pSetCurrentFadeInterval,
}: PlayerComponentProps) {
	const ID = `player${playerId}`;

	const volume = pVolume ?? 50;
	const setVolume = pSetVolume ?? (() => {});

	const selected = pSelected ?? false;
	const setSelected = pSetSelected ?? (() => {});

	const currentFadeInterval = pCurrentFadeInterval ?? null;
	const setCurrentFadeInterval = pSetCurrentFadeInterval ?? (() => {});

	const player = usePlayerHolderById(playerId).player;

	useMemo(() => {
		player?.setVolume(volume * masterVolumeModifier);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [volume, masterVolumeModifier]);

	return (
		<motion.div
			className={
				'flex h-[180px] w-96 flex-col justify-around gap-2 rounded border-2 border-darknavy-700 bg-darknavy-500 p-1'
			}
			animate={{
				boxShadow: selected ? '0 0 8px 1px #f00' : '0 0 0 0px #fff',
			}}
			transition={{
				duration: 0.2,
			}}
			onClick={(e) => {
				if (e.currentTarget !== e.target) return;
				setSelected();
			}}
		>
			<div
				className='flex w-full flex-row justify-around'
				onClick={(e) => {
					if (e.currentTarget !== e.target) return;
					setSelected();
				}}
			>
				<div className='rounded' id={ID} />
				<VolumeSlider
					className='rounded border-2 border-darknavy-400/25 p-2'
					textBgColor='bg-darknavy-500'
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
						fadeInputHandler(
							e,
							player,
							setVolume,
							volume,
							currentFadeInterval,
							setCurrentFadeInterval
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
							currentFadeInterval,
							setCurrentFadeInterval,
						});
					}}
					disabled={player ? false : true}
				>
					Fade Out
				</button>
			</div>
		</motion.div>
	);
}

export default PlayerComponent;
