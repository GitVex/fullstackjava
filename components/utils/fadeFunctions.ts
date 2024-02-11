import IFPlayer from './IFPlayer';

const DEFAULT_FADE_INTERVAL = 75;
const DEFAULT_FADE_STEP = 1;
const DEFAULT_EASE = (x: number, limit: number) =>
	limit * (1 - Math.cos(((x / limit) * Math.PI) / 2));

export interface FadeOptions {
	framePlayer: IFPlayer | null;
	setVolume: React.Dispatch<number>;
	volume: number;
	savedVolume?: {hasSaved: boolean, prevVol?: number};
	setSavedVolume?: React.Dispatch<{hasSaved: boolean, prevVol?: number}>;
	currentFadeInterval: NodeJS.Timeout | null;
	setCurrentFadeInterval: React.Dispatch<NodeJS.Timeout | null>;
	pLimit?: number;
	fadeStep?: number;
	fadeInterval?: number;
	ease?: (x: number, limit: number) => number;
	inverse?: boolean
}

function fade({
	framePlayer,
	setVolume,
	volume,
	savedVolume,
	setSavedVolume,
	fadeStep = DEFAULT_FADE_STEP,
	fadeInterval = DEFAULT_FADE_INTERVAL,
	ease = DEFAULT_EASE,
	currentFadeInterval,
	setCurrentFadeInterval,
	pLimit,
	inverse,
}: FadeOptions) {
	if (!framePlayer) return;

	// Clear any existing interval
	if (currentFadeInterval) {
		clearInterval(currentFadeInterval);
		setCurrentFadeInterval(null);
	}

	// If hasSaved is true, then use the savedVolume as the limit
	let limit = 0;
	if (savedVolume?.hasSaved) {
		limit = savedVolume?.prevVol ?? 0;
	} else {
		limit = pLimit ?? (volume === 0 ? 50 : volume);
	}

	const startVolume = inverse ? volume : 1;
	let currentVolume = inverse ? volume : 1;

	if (!inverse) {
		framePlayer.playVideo();
		setVolume(1);
	}

	let runner = startVolume;

	let intervalId = setInterval(() => {
		try {
			if (inverse) {
				if (currentVolume > 0) {
					currentVolume = ease(runner, currentVolume);
					setVolume(Math.floor(currentVolume));
					runner -= fadeStep;
				} else {
					endFade(0, framePlayer);
					setSavedVolume?.({ hasSaved: true, prevVol: startVolume }); // Might produce problems if intervals are cancelled
				}
			} else {
				if (currentVolume < limit) {
					currentVolume = ease(runner, limit);
					setVolume(Math.floor(currentVolume));
					runner += fadeStep;
				} else {
					endFade(limit, framePlayer);
				}
			}
		} catch (error) {
			clearInterval(intervalId);
		}
	}, fadeInterval);

	setCurrentFadeInterval(intervalId);

	function endFade(volume: number, framePlayer: IFPlayer | null = null) {
		setVolume(volume);
		if (volume === 0) {
			framePlayer?.pauseVideo();
		}
		clearInterval(intervalId);
		setCurrentFadeInterval(null);
	}
}

export function fadeIn(options: FadeOptions) {
	fade({ ...options, inverse: false, });
}

export function fadeOut(options: FadeOptions) {
	fade({ ...options, inverse: true, });
}

export function fadeTo(
	{
		framePlayer,
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
	if (!framePlayer) return;

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

/* TO BE IMPLEMTNED: Crossfade two framePlayers */