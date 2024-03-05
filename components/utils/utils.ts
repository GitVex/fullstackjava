import React from 'react';
import { PresetState } from '../Player/states';

export function sleep(milliseconds: number) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

function findExtremeIndex(
	array: number[],
	compare: (a: number, b: number) => boolean
): number {
	if (array.length === 0) {
		throw new Error('Cannot find extreme index of an empty array');
	}

	let extremeIndex = 0;
	let extremeValue = array[0];

	for (let i = 1; i < array.length; i++) {
		if (compare(array[i], extremeValue)) {
			extremeValue = array[i];
			extremeIndex = i;
		}
	}

	return extremeIndex;
}

export function argMax(array: number[]): number {
	return findExtremeIndex(array, (a, b) => a > b);
}

export function argMin(array: number[]): number {
	return findExtremeIndex(array, (a, b) => a < b);
}

export function copyStateWithoutFramePlayer(state: PresetState): PresetState {
	return {
		...state, // Copy the rest of the state
		players: state.players.map((player) => {
			const { framePlayer, ...rest } = player; // Destructure to exclude framePlayer
			return rest; // Return the rest of the properties
		}),
	};
}

function getVideoIdFromYoutubeUrl(url: string) {
	const regex =
		/(?:youtu\.be\/|youtube\.com(?:\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/|embed\/|v\/|m\/|watch\?(?:[^=]+=[^&]+&)*?v=))([^"&?\/\s]{11})/gm;
	const match = regex.exec(url);
	if (!match) {
		throw new Error('Invalid youtube url');
	}
	return match[1];
}

export function transformToTarget(input: string) {
	if (!input) {
		return null;
	}

	// Check if it's just the video ID
	if (input.length === 11) {
		return input;
	} else {
		return getVideoIdFromYoutubeUrl(input);
	}
}
