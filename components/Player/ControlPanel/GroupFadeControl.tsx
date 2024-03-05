import React, { useContext } from 'react';
import { usePlayerHolder } from '../../contexts/PlayerHolderProvider';
import {
	fadeIn,
	fadeOut,
} from '../../utils/fadeFunctions';
import {
	PlayerState,
	PlayerStateAction,
	FadeIntervalsState,
	FadeIntervalsAction,
} from '../states';
import IFPlayer from '../../utils/IFPlayer';

interface GroupFadeControlProps {
	players: PlayerState[];
	dispatch: React.Dispatch<PlayerStateAction>;
	fadeIntervals: FadeIntervalsState;
	fadeIntervalDispatch: React.Dispatch<FadeIntervalsAction>;
}

const handleGroupFade = (
	direction: 'in' | 'out',
	players: PlayerState[],
	framedPlayers: IFPlayer[],
	dispatch: React.Dispatch<PlayerStateAction>,
	fadeIntervals: FadeIntervalsState,
	fadeIntervalDispatch: React.Dispatch<FadeIntervalsAction>
) => {
	players.forEach((player, index) => {
		if (player.selected) {
			const targetVolume = direction === 'in' ? player.volume : 0;
			const framePlayer = framedPlayers[index];

			if (!framePlayer) return;
			if (direction === 'in') {
				fadeIn({
					framePlayer,
					setVolume: (volume: number) => {
						dispatch({
							type: 'setVolume',
							index,
							payload: volume,
						});
					},
					volume: player.volume,
					currentFadeInterval: fadeIntervals.fadeIntervals[index],
					setCurrentFadeInterval: (interval) =>
						fadeIntervalDispatch({
							type: 'setCurrentFadeInterval',
							index: index,
							payload: interval,
						}),
					pLimit: targetVolume,
				});
			} else if (direction === 'out') {
				fadeOut({
					framePlayer,
					setVolume: (volume: number) => {
						dispatch({
							type: 'setVolume',
							index,
							payload: volume,
						});
					},
					volume: player.volume,
					currentFadeInterval: fadeIntervals.fadeIntervals[index],
					setCurrentFadeInterval: (interval) =>
						fadeIntervalDispatch({
							type: 'setCurrentFadeInterval',
							index: index,
							payload: interval,
						}),
					pLimit: targetVolume,
				});
			} else {
				throw new Error('Invalid direction');
			}
		}
	});
};

function GroupFadeControl({
	players,
	dispatch,
	fadeIntervals,
	fadeIntervalDispatch,
}: GroupFadeControlProps) {

	const playerHolder = usePlayerHolder();
	const framedPlayers = playerHolder?.holders.map((holder) => {
		const player = holder.player;
		if (player && holder.isReady) {
			return player;
		} else {
			/* throw new Error('Player not found'); */
		}
	});

	return (
		<div>
			<div className='flex flex-row gap-2 rounded border-2 border-darknavy-700 bg-darknavy-500 p-2'>
				<button
					className='w-fit rounded border-2 border-darknavy-700 bg-darknavy-500 px-2 py-1 disabled:opacity-50'
					onClick={(e) => {
						handleGroupFade(
							'in',
							players,
							framedPlayers,
							dispatch,
							fadeIntervals,
							fadeIntervalDispatch
						);
					}}
					/* disabled={player ? false : true} */
				>
					Fade In
				</button>
				<button
					className='w-fit rounded border-2 border-darknavy-700 bg-darknavy-500 px-2 py-1 disabled:opacity-50'
					onClick={(e) => {
						handleGroupFade(
							'out',
							players,
							framedPlayers,
							dispatch,
							fadeIntervals,
							fadeIntervalDispatch
						);
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
