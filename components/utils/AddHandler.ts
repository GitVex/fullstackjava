import { useCallback } from 'react';
import { usePausedTimer } from '../contexts/PlayerHolderProvider';
import { usePlayerHolder } from '../contexts/PlayerHolderProvider';
import { loadNewVideo } from '../Player/PlayerComponent';

export const useLoadVideoInLongestPausedPlayer = () => {
	const pausedTimers = usePausedTimer();
	const playerHolder = usePlayerHolder();

	const loadVideo = useCallback(
		(url: string) => {
			// Find the index of the longest paused player
			const longestPausedIndex = pausedTimers.pausedAt.reduce(
				(maxIdx, cur, idx, arr) => {
					return cur > arr[maxIdx] ? idx : maxIdx;
				},
				0
			);

			// Retrieve the player using the index
			const holder = playerHolder.find(
				(h) => h.id === longestPausedIndex
			);

			if (holder && holder.player) {
				// Load the video into the player
				console.log(
					`Loading video into player ${holder.id} with url ${url}`
				);
				loadNewVideo(holder.player, url, undefined);
			} else {
				console.error('Player not found for the given index.');
			}
		},
		[pausedTimers, playerHolder]
	);

	return loadVideo;
};
