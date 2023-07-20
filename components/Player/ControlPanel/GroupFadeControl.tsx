import React, { useContext } from 'react';
import { usePlayerHolder } from '../../contexts/PlayerHolderProvider';
import { motion } from 'framer-motion';
import {
	FadeOptions,
	fadeIn,
	fadeOut,
	fadeTo,
} from '../../utils/fadeFunctions';
import { usePlayerHolderById } from '../../contexts/PlayerHolderProvider';
import {
	SelectionsState,
	VolumesState,
	VolumesAction,
	FadeIntervalsState,
	FadeIntervalsAction,
} from '../states';
import IFPlayer from '../../utils/IFPlayer';

interface GroupFadeControlProps {
	selections: SelectionsState;
	volumes: VolumesState;
	volumeDispatch: React.Dispatch<VolumesAction>;
	fadeIntervals: FadeIntervalsState;
	fadeIntervalDispatch: React.Dispatch<FadeIntervalsAction>;
}

function GroupFadeInHandler({
	players,
	selections,
	volumes,
	volumeDispatch,
	fadeIntervals,
	fadeIntervalDispatch,
}: GroupFadeControlProps & {
	players: { id: number; player: IFPlayer; isAvailable: boolean }[];
}) {
	const selected_players = players.filter((player) => {
		if (!player) return false;
		if (!selections.selected[player.id]) return false;
		return selections.selected[player.id].selected;
	});

	selected_players.forEach((player) => {
		if (!player) return;
		fadeIn({
			player: player.player,
			volume: volumes.volume[player.id],
			setVolume: (volume) => {
				volumeDispatch({
					type: 'setVolume',
					index: player.id,
					payload: volume,
				});
			},
			currentFadeInterval: fadeIntervals.fadeIntervals[player.id],
			setCurrentFadeInterval: (interval) => {
				fadeIntervalDispatch({
					type: 'setCurrentFadeInterval',
					index: player.id,
					payload: interval,
				});
			},
		});
	});
}

function GroupFadeOutHandler({
	players,
	selections,
	volumes,
	volumeDispatch,
	fadeIntervals,
	fadeIntervalDispatch,
}: GroupFadeControlProps & {
	players: { id: number; player: IFPlayer; isAvailable: boolean }[];
}) {
	const selected_players = players.filter((player) => {
		if (!player) return false;
		if (!selections.selected[player.id]) return false;
		return selections.selected[player.id].selected;
	});

	selected_players.forEach((player) => {
		if (!player) return;
		fadeOut({
			player: player.player,
			volume: volumes.volume[player.id],
			setVolume: (volume) => {
				volumeDispatch({
					type: 'setVolume',
					index: player.id,
					payload: volume,
				});
			},
			currentFadeInterval: fadeIntervals.fadeIntervals[player.id],
			setCurrentFadeInterval: (interval) => {
				fadeIntervalDispatch({
					type: 'setCurrentFadeInterval',
					index: player.id,
					payload: interval,
				});
			},
		});
	});
}

function GroupFadeControl({
	selections,
	volumes,
	volumeDispatch,
	fadeIntervals,
	fadeIntervalDispatch,
}: GroupFadeControlProps) {
	const players = usePlayerHolder();

	return (
		<div>
			<div className='flex flex-row gap-2 rounded border-2 border-darknavy-800 bg-darknavy-500 p-2'>
				<button
					className='w-fit rounded border-2 border-darknavy-800 bg-darknavy-500 px-2 py-1 disabled:opacity-50'
					onClick={(e) => {
						GroupFadeInHandler({
							players: players,
							selections: selections,
							volumes: volumes,
							volumeDispatch: volumeDispatch,
							fadeIntervals: fadeIntervals,
							fadeIntervalDispatch: fadeIntervalDispatch,
						});
					}}
					/* disabled={player ? false : true} */
				>
					Fade In
				</button>
				<button
					className='w-fit rounded border-2 border-darknavy-800 bg-darknavy-500 px-2 py-1 disabled:opacity-50'
					onClick={(e) => {
						GroupFadeOutHandler({
							players: players,
							selections: selections,
							volumes: volumes,
							volumeDispatch: volumeDispatch,
							fadeIntervals: fadeIntervals,
							fadeIntervalDispatch: fadeIntervalDispatch,
						});
					}}
					/* disabled={player ? false : true} */
				>
					Fade Out
				</button>
			</div>
		</div>
	);
}

export default GroupFadeControl;
