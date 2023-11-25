// File to handle

export interface SelectionsState {
	selected: { id: number; selected: boolean }[];
}

export interface SelectionsAction {
	type: 'select' | 'deselect';
	index: number;
	selected?: boolean;
}

export const selectionsReducer = (
	state: SelectionsState,
	action: SelectionsAction
): SelectionsState => {
	switch (action.type) {
		case 'select':
			console.log('selected player ' + action.index + '!', state);
			return {
				...state,
				selected: state.selected.map((selection) => {
					if (selection.id === action.index) {
						return { ...selection, selected: true };
					} else {
						return selection;
					}
				}),
			};
		case 'deselect':
			console.log('deselected player ' + action.index + '!', state);
			return {
				...state,
				selected: state.selected.map((selection) => {
					if (selection.id === action.index) {
						return { ...selection, selected: false };
					} else {
						return selection;
					}
				}),
			};
		default:
			throw new Error();
	}
};

export interface VolumesState {
	volume: number[];
	savedVolume: {hasSaved: boolean, prevVol: number}[];
}

export interface VolumesAction {
	type: 'setVolume';
	index: number;
	payload: number;
}

export interface setVolumeStateAction {
	type: 'setVolumeState';
	index: number;
	saveState: boolean;
	payload: number;
}

export const volumesReducer = (
	state: VolumesState,
	action: VolumesAction | setVolumeStateAction
): VolumesState => {
	switch (action.type) {
		case 'setVolume':
			return {
				...state,
				volume: state.volume.map((vol, index) => {
					if (index === action.index) {
						return action.payload;
					} else {
						return vol;
					}
				}),
			};
		case 'setVolumeState':
			return {
				...state,
				savedVolume: state.savedVolume.map(
					(entry, index) => {
						if (index === action.index) {
							return {
								hasSaved: action.saveState,
								prevVol: action.payload,
							};
						} else {
							return entry;
						}
					}
				)
			};
		default:
			throw new Error();
	}
};

export interface FadeIntervalsState {
	fadeIntervals: (NodeJS.Timeout | null)[];
}

export interface FadeIntervalsAction {
	type: 'setCurrentFadeInterval';
	index: number;
	payload: NodeJS.Timeout | null;
}

export const fadeIntervalsReducer = (
	state: FadeIntervalsState,
	action: FadeIntervalsAction
): FadeIntervalsState => {
	switch (action.type) {
		case 'setCurrentFadeInterval':
			return {
				...state,
				fadeIntervals: state.fadeIntervals.map((interval, index) => {
					if (index === action.index) {
						return action.payload;
					} else {
						return interval;
					}
				}),
			};
		default:
			throw new Error();
	}
};

export interface PausedTimerState {
	pausedAt: number[];
}

export interface PausedTimerAction {
	type: 'setPausedAt';
	index: number;
	payload: number;
}

export const pausedTimerReducer = (
	state: PausedTimerState,
	action: PausedTimerAction
): PausedTimerState => {
	switch (action.type) {
		case 'setPausedAt':
			return {
				...state,
				pausedAt: state.pausedAt.map((time, index) => {
					if (index === action.index) {
						return action.payload;
					} else {
						return time;
					}
				}),
			};
		default:
			throw new Error();
	}
}
