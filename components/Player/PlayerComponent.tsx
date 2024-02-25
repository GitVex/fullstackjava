import React, { useEffect, useMemo, useState } from 'react';
import { usePlayerHolderById } from '../contexts/PlayerHolderProvider';
import { motion } from 'framer-motion';
import IFPlayer from '../utils/IFPlayer';
import VolumeSlider from '../utils/VolumeSlider';
import { useDebounceCallback } from 'usehooks-ts';
import { fadeIn, fadeOut, fadeTo } from '../utils/fadeFunctions';
import { PlayerState, PlayerStateAction } from './states';

interface PlayerComponentProps {
	playerId: number;
	masterVolumeModifier: number;
	player: PlayerState;
	dispatch: React.Dispatch<PlayerStateAction>;
	pCurrentFadeInterval?: NodeJS.Timeout | null;
	pSetCurrentFadeInterval?: React.Dispatch<NodeJS.Timeout | null>;
	pVolume: number;
	pSetVolume: React.Dispatch<number>;
}

function sliderInputHandler(
	e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLInputElement>,
	player: IFPlayer | null,
	setVolumeFunc: React.Dispatch<number>,
	setSavedVolumeFunc: React.Dispatch<{ hasSaved: boolean; prevVol?: number }>,
	masterVolumeModifier: number
) {
	if (!player) return;

	const field = e.target as HTMLInputElement;

	const volume = parseInt(field.value) * masterVolumeModifier;

	setVolumeFunc(parseInt(field.value));
	setSavedVolumeFunc({ hasSaved: false });
	//player.setVolume(volume);
}

function fadeInputHandler(
	e: React.KeyboardEvent<HTMLInputElement>,
	framePlayer: IFPlayer | null,
	setVolume: React.Dispatch<number>,
	volume: number,
	currentFadeInterval: NodeJS.Timeout | null,
	setCurrentFadeInterval: React.Dispatch<NodeJS.Timeout | null>
) {
	const field = e.target as HTMLInputElement;
	if (!framePlayer) return;
	if (e.key !== 'Enter' || !field.value) return;

	if (framePlayer.getPlayerState() !== 1) {
		fadeIn({
			framePlayer,
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
			framePlayer,
			setVolume,
			volume,
			currentFadeInterval,
			setCurrentFadeInterval,
			pLimit: parseInt(field.value),
		},
		parseInt(field.value)
	);
}

export function loadNewVideo(
	playerId: number,
	dispatch: React.Dispatch<PlayerStateAction>,
	framePlayer: IFPlayer,
	url?: string,
	e?: React.KeyboardEvent<HTMLInputElement>,
	volume?: number
) {
	if (!framePlayer) return;
	if (e) {
		const field = e.target as HTMLInputElement;
		if (!field.value) return;
		if (e.key !== 'Enter') return;
		url = field.value;
	} else if (!url) {
		throw new Error('No url provided');
	}

	// strip video id from url and remove all other characters and timestamps
	const id = url.replace(
		/(https:\/\/www\.youtube\.com\/watch\?v=|https:\/\/youtu\.be\/|&t=.*|&feature=emb_logo)/g,
		''
	);

	volume
		? framePlayer.setVolume(volume)
		: framePlayer.setVolume(framePlayer.getVolume());

	framePlayer.loadVideoById(id);

	dispatch({
		type: 'setId',
		index: playerId,
		payload: id,
	});

	setTimeout(() => {
		framePlayer.pauseVideo();
		framePlayer.seekTo(0, true);
		framePlayer.setLoop(true);
	}, 1000);
}

function PlayerComponent({
	playerId,
	masterVolumeModifier,
	player,
	dispatch,
	pCurrentFadeInterval,
	pSetCurrentFadeInterval,
	pVolume,
	pSetVolume,
}: PlayerComponentProps) {
	const ID = `player${playerId}`;

	const debouncedDispatch = useDebounceCallback(dispatch, 750);

	const volume = pVolume;
	const setVolume = pSetVolume;

	const savedVolume = player?.savedVolume ?? { hasSaved: false, prevVol: 0 };
	const setSavedVolume = (value: { hasSaved: boolean; prevVol?: number }) => {
		debouncedDispatch?.({
			type: 'setSavedVolume',
			index: playerId,
			payload: value,
		});
	};

	const selected = player?.selected ?? false;
	const setSelected = () => {
		if (player?.selected) {
			debouncedDispatch?.({
				type: 'deselect',
				index: playerId,
			});
		} else {
			debouncedDispatch?.({
				type: 'select',
				index: playerId,
			});
		}
	};

	const currentFadeInterval = pCurrentFadeInterval ?? null;
	const setCurrentFadeInterval = pSetCurrentFadeInterval ?? (() => {});

	const framePlayer = usePlayerHolderById(playerId).player as IFPlayer;

	useEffect(() => {
		framePlayer?.setVolume(volume * masterVolumeModifier);
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [volume, masterVolumeModifier, debouncedDispatch]);

	useEffect(() => {
		debouncedDispatch({
			type: 'setVolume',
			index: playerId,
			payload: volume,
		});
	}, [volume, debouncedDispatch, playerId]);

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
					player={framePlayer}
					setVolume={setVolume}
					volume={volume}
					userOnChange={(e) =>
						sliderInputHandler(
							e,
							framePlayer,
							setVolume,
							setSavedVolume,
							masterVolumeModifier
						)
					}
					userOnInput={(e) =>
						sliderInputHandler(
							e,
							framePlayer,
							setVolume,
							setSavedVolume,
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
						loadNewVideo(
							playerId,
							dispatch,
							framePlayer,
							undefined,
							e,
							volume * masterVolumeModifier
						);
					}}
				/>
				<button
					className='w-1/5 rounded bg-gray-800/50 p-1 disabled:opacity-50'
					onClick={(e) => {
						fadeIn({
							framePlayer,
							setVolume,
							volume,
							savedVolume,
							setSavedVolume,
							currentFadeInterval,
							setCurrentFadeInterval,
							pLimit: volume,
						});
					}}
					disabled={framePlayer ? false : true}
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
							framePlayer,
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
							framePlayer,
							setVolume,
							volume,
							savedVolume,
							setSavedVolume,
							currentFadeInterval,
							setCurrentFadeInterval,
						});
					}}
					disabled={framePlayer ? false : true}
				>
					Fade Out
				</button>
			</div>
		</motion.div>
	);
}

export default PlayerComponent;
