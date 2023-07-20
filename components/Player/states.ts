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
}

export interface VolumesAction {
	type: 'setVolume';
	index: number;
	payload: number;
}

export const volumesReducer = (
	state: VolumesState,
	action: VolumesAction
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