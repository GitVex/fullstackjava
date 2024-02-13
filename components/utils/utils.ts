import { useCallback, useRef } from 'react';

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

// A hook that takes a function and a delay, and returns a debounced version of the function
export const useDebounce = <F extends (...args: any[]) => any>(
	func: F,
	delay: number = 500
): F => {
	// Use a ref to store the function's arguments and timeout ID
	const argsRef = useRef<any[]>();
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

	// The debounced function
	const debouncedFunc = useCallback(
		(...args: any[]) => {
			// Store the latest arguments
			argsRef.current = args;

			// If there's an existing timeout, clear it
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			// Set a new timeout
			timeoutRef.current = setTimeout(() => {
				if (argsRef.current) {
					func(...argsRef.current);
				}
			}, delay);
		},
		[func, delay]
	); // Dependencies

	// Return the debounced function, casting it to the same type as the input function
	return debouncedFunc as F;
};
