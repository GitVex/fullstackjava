// ------------------- SELECTIONS REDUCER -------------------
import React from 'react';

export interface SelectionsState {
    selected: { id: number; selected: boolean }[];
}

export interface SelectionsAction {
    type: 'select' | 'deselect';
    index: number;
    selected?: boolean;
}

export const selectionsReducer = (state: SelectionsState, action: SelectionsAction): SelectionsState => {
    switch (action.type) {
        case 'select':
            console.log('selected player ' + action.index + '!', state);
            return {
                ...state,
                selected: state.selected.map(selection => {
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
                selected: state.selected.map(selection => {
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

export interface LocalVolumesState {
    volume: number[];
}

export interface SetLocalVolumesAction {
    type: 'setVolume';
    index: number;
    payload: number;
}

export const localVolumesReducer = (state: LocalVolumesState, action: SetLocalVolumesAction): LocalVolumesState => {
    switch (action.type) {
        case 'setVolume':
            return {
                ...state,
                volume: [
                    ...state.volume.slice(0, action.index), // Keep volumes before the updated one
                    action.payload, // Update the volume at the specified index
                    ...state.volume.slice(action.index + 1) // Keep volumes after the updated one
                ],
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

export const fadeIntervalsReducer = (state: FadeIntervalsState, action: FadeIntervalsAction): FadeIntervalsState => {
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

export const pausedTimerReducer = (state: PausedTimerState, action: PausedTimerAction): PausedTimerState => {
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

export const playerUrlReducer = (state: PlayerUrlState, action: PlayerUrlAction): PlayerUrlState => {
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

// ------------------- CONTROL STATES -------------------

export interface localVolumesControlType {
    localVolumes: number[];
    localVolumesDispatch: React.Dispatch<SetLocalVolumesAction>;
}

export interface localVolumeControlType {
	localVolume: number;
	localVolumeDispatch: React.Dispatch<SetLocalVolumesAction>;
}

export interface localVolumeControlEndType {
	localVolume: number;
	setLocalVolume: (vol: number) => void;
}

export interface fadeIntervalsControlType {
    currentFadeIntervals: (NodeJS.Timeout | null)[];
    currentFadeIntervalDispatch: React.Dispatch<FadeIntervalsAction>;
}

export interface fadeIntervalControlType {
	currentFadeInterval: (NodeJS.Timeout | null);
	currentFadeIntervalDispatch: React.Dispatch<FadeIntervalsAction>;
}

export interface fadeIntervalControlEndType {
	currentFadeInterval: (NodeJS.Timeout | null);
	setCurrentFadeInterval: (interval: (NodeJS.Timeout | null)) => void;
}