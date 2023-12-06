import { useCallback } from 'react';
import { usePausedTimer } from '../contexts/PlayerHolderProvider';
import { usePlayerHolder } from '../contexts/PlayerHolderProvider';
import { loadNewVideo } from '../Player/PlayerComponent';
import { argMin } from './utils';

export const useLoadVideoInLongestPausedPlayer = () => {
	const pausedTimers = usePausedTimer();
	const playerHolder = usePlayerHolder();

	const loadVideo = useCallback(
		(url: string) => {
			// Find the index of the longest paused player
			const longestPausedIndex = argMin(pausedTimers.pausedAt);

			// Retrieve the player using the index
			const holder = playerHolder.find(
				(h) => h.id === longestPausedIndex
			);

			if (holder && holder.player) {
				// Load the video into the player
				console.log(
					`Loading video into player ${holder.id} with url ${url}`
				);
				loadNewVideo(holder.player, url, undefined, holder.player.getVolume());
			} else {
				console.error('Player not found for the given index.');
			}
		},
		[pausedTimers, playerHolder]
	);

	return loadVideo;
};
