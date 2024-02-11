// ------------------- SELECTIONS REDUCER -------------------

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

// ------------------- VOLUMES REDUCER -------------------

export interface VolumesState {
	volume: number[];
	savedVolume: { hasSaved: boolean; prevVol: number }[];
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
				savedVolume: state.savedVolume.map((entry, index) => {
					if (index === action.index) {
						return {
							hasSaved: action.saveState,
							prevVol: action.payload,
						};
					} else {
						return entry;
					}
				}),
			};
		default:
			throw new Error();
	}
};

// ------------------- FADE INTERVALS REDUCER -------------------

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

// ------------------- PAUSED TIMER REDUCER -------------------

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
};

// ------------------- PLAYER URL REDUCER -------------------

export interface PlayerUrlState {
	url: string[];
}

export interface PlayerUrlAction {
	type: 'setUrl';
	index: number;
	payload: string;
}

export const playerUrlReducer = (
	state: PlayerUrlState,
	action: PlayerUrlAction
): PlayerUrlState => {
	switch (action.type) {
		case 'setUrl':
			return {
				...state,
				url: state.url.map((url, index) => {
					if (index === action.index) {
						return action.payload;
					} else {
						return url;
					}
				}),
			};
		default:
			throw new Error();
	}
};

// ------------------- PLAYER STATE REDUCER -------------------

export interface PresetState {
	title: string;
	players: PlayerState[];
}

export interface PlayerState {
	title: string
	selected: boolean;
	volume: number;
	savedVolume: { hasSaved: boolean; prevVol?: number };
	pausedAt: number;
	url: string;
}

export type PlayerStateAction = VolumeAction | SetPausedAtAction | SetUrlAction | SelectAction | SetTitleAction;

type VolumeAction = SetVolumeAction | SetSavedVolumeAction;

interface SetVolumeAction {
	type: 'setVolume';
	index: number;
	payload: number;
}

interface SetSavedVolumeAction {
	type: 'setSavedVolume';
	index: number;
	payload: {hasSaved: boolean, prevVol?: number};
}

interface SetPausedAtAction {
	type: 'setPausedAt';
	index: number;
	payload: number;
}

interface SetUrlAction {
	type: 'setUrl';
	index: number;
	payload: string;
}

interface SetTitleAction {
	type: 'setTitle';
	index: number;
	payload: string;
}

interface SelectAction {
	type: 'select' | 'deselect';
	index: number;
}

export const playerStateReducer = (
	state: PresetState,
	action: PlayerStateAction
): PresetState => {

	function updatePlayerAtIndex(players: PlayerState[], index: number, update: Partial<PlayerState>): PlayerState[] {
		return players.map((player, i) => i === index ? { ...player, ...update } : player);
	  }

	switch (action.type) {
		case 'setTitle':
			return {
				...state,
				players: updatePlayerAtIndex(state.players, action.index, { title: action.payload }),
			};
		case 'setVolume':
			return {
				...state,
				players: updatePlayerAtIndex(state.players, action.index, { volume: action.payload }),
			};
		case 'setSavedVolume':
			return {
				...state,
				players: updatePlayerAtIndex(state.players, action.index, { savedVolume: action.payload }),
			};
		case 'setPausedAt':
			return {
				...state,
				players: updatePlayerAtIndex(state.players, action.index, { pausedAt: action.payload }),
			};
		case 'setUrl':
			return {
				...state,
				players: updatePlayerAtIndex(state.players, action.index, { url: action.payload }),
			};
		case 'select':
			return {
				...state,
				players: updatePlayerAtIndex(state.players, action.index, { selected: true }),
			};
		case 'deselect':
			return {
				...state,
				players: updatePlayerAtIndex(state.players, action.index, { selected: false }),
			};
		default:
			throw new Error();
	}
};





