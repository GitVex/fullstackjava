import { useCallback } from 'react';
import { usePresetState } from '../contexts/PlayerHolderProvider';
import { usePlayerHolder } from '../contexts/PlayerHolderProvider';
import { loadNewVideo } from '../Player/PlayerComponent';
import { argMin } from './utils';

export const useLoadVideoInLongestPausedPlayer = () => {
	const playerHolder = usePlayerHolder();
	const { presetState, presetDispatch } = usePresetState();

	const loadVideo = useCallback(
		(title: string, url: string) => {
			// Find the index of the longest paused player
			const longestPausedIndex = argMin(presetState.players.map(player => player.pausedAt));

			// Retrieve the player using the index
			const holder = playerHolder.find(
				(h) => h.id === longestPausedIndex
			);

			if (holder && holder.player) {
				// Load the video into the player
				presetDispatch({
					type: 'setTitle',
					index: holder.id,
					payload: title,
				});
				loadNewVideo(holder.id, presetDispatch, holder.player, url, undefined, holder.player.getVolume());
			} else {
				console.error('Player not found for the given index.');
			}
		},
		[presetState, presetDispatch, playerHolder]
	);

	return loadVideo;
};
