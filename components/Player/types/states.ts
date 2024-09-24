// ------------------- SELECTIONS REDUCER -------------------
import React from 'react';

/**
 * Represents the state of selections within the application.
 *
 * @interface SelectionsState
 * @property {Array<{ id: number; selected: boolean }>} selected - An array of selection objects, each containing an identifier and a selection status.
 */
export interface SelectionsState {
    selected: { id: number; selected: boolean }[];
}

/**
 * Defines the actions that can be dispatched to manipulate the selection state.
 *
 * @interface SelectionsAction
 * @property {'select' | 'deselect'} type - The type of action to perform: 'select' to select an item or 'deselect' to deselect it.
 * @property {number} index - The identifier (id) of the selection item to update.
 * @property {boolean} [selected] - (Optional) The selection status to set. If omitted, defaults are used based on the action type.
 */
export interface SelectionsAction {
    type: 'select' | 'deselect';
    index: number;
    selected?: boolean;
}

/**
 * Reducer function to manage the selection state of items.
 *
 * @param {SelectionsState} state - The current selection state.
 * @param {SelectionsAction} action - The action to apply to the selection state.
 * @returns {SelectionsState} - The updated selection state after the action is applied.
 */
export const selectionsReducer = (
    state: SelectionsState,
    action: SelectionsAction
): SelectionsState => {
    switch (action.type) {
        case 'select':
            console.log(`Selected item ${action.index}!`, state);
            return {
                ...state,
                selected: state.selected.map(selection =>
                    selection.id === action.index
                        ? { ...selection, selected: true }
                        : selection
                ),
            };
        case 'deselect':
            console.log(`Deselected item ${action.index}!`, state);
            return {
                ...state,
                selected: state.selected.map(selection =>
                    selection.id === action.index
                        ? { ...selection, selected: false }
                        : selection
                ),
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// ------------------- LOCAL VOLUMES REDUCER -------------------

/**
 * Represents the state of local volume levels for multiple players.
 *
 * @interface LocalVolumesState
 * @property {number[]} volume - An array of volume levels corresponding to each player.
 */
export interface LocalVolumesState {
    volume: number[];
}

/**
 * Defines the actions that can be dispatched to manipulate local volume levels.
 *
 * @interface LocalVolumesAction
 * @property {'setVolume'} type - The type of action to perform. Currently, only 'setVolume' is supported.
 * @property {number} index - The index of the player whose volume is being set.
 * @property {number} payload - The new volume level for the specified player.
 */
export interface LocalVolumesAction {
    type: 'setVolume';
    index: number;
    payload: number;
}

/**
 * Reducer function to manage the local volume levels of players.
 *
 * @param {LocalVolumesState} state - The current state of local volumes.
 * @param {LocalVolumesAction} action - The action to apply to the local volumes state.
 * @returns {LocalVolumesState} - The updated local volumes state after the action is applied.
 */
export const localVolumesReducer = (
    state: LocalVolumesState,
    action: LocalVolumesAction
): LocalVolumesState => {
    switch (action.type) {
        case 'setVolume':
            return {
                ...state,
                volume: [
                    ...state.volume.slice(0, action.index),
                    action.payload,
                    ...state.volume.slice(action.index + 1),
                ],
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// ------------------- FADE ANIMATIONS REDUCER -------------------

/**
 * Represents the state of fade animations for multiple players using `requestAnimationFrame`.
 *
 * @interface FadeAnimationsState
 * @property {(number | null)[]} fadeAnimationHandles - An array containing animation frame request IDs or null for each player.
 */
export interface FadeAnimationsState {
    fadeAnimationHandles: (number | null)[];
}

/**
 * Defines the actions that can be dispatched to manipulate fade animations.
 *
 * @interface FadeAnimationsAction
 * @property {'setFadeAnimationHandle'} type - The type of action to perform. Currently, only 'setFadeAnimationHandle' is supported.
 * @property {number} index - The index of the player whose fade animation handle is being set.
 * @property {number | null} payload - The new animation frame request ID or null to clear it.
 */
export interface FadeAnimationsAction {
    type: 'setFadeAnimationHandle';
    index: number;
    payload: number | null;
}

/**
 * Reducer function to manage fade animations using `requestAnimationFrame`.
 *
 * @param {FadeAnimationsState} state - The current state of fade animations.
 * @param {FadeAnimationsAction} action - The action to apply to the fade animations state.
 * @returns {FadeAnimationsState} - The updated fade animations state after the action is applied.
 */
export const fadeAnimationsReducer = (
    state: FadeAnimationsState,
    action: FadeAnimationsAction
): FadeAnimationsState => {
    switch (action.type) {
        case 'setFadeAnimationHandle':
            return {
                ...state,
                fadeAnimationHandles: state.fadeAnimationHandles.map((handle, index) =>
                    index === action.index ? action.payload : handle
                ),
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// ------------------- PAUSED TIMER REDUCER -------------------

/**
 * Represents the state of paused times for multiple players.
 *
 * @interface PausedTimerState
 * @property {number[]} pausedAt - An array of timestamps indicating when each player was paused.
 */
export interface PausedTimerState {
    pausedAt: number[];
}

/**
 * Defines the actions that can be dispatched to manipulate paused times.
 *
 * @interface PausedTimerAction
 * @property {'setPausedAt'} type - The type of action to perform. Currently, only 'setPausedAt' is supported.
 * @property {number} index - The index of the player whose paused time is being set.
 * @property {number} payload - The timestamp at which the specified player was paused.
 */
export interface PausedTimerAction {
    type: 'setPausedAt';
    index: number;
    payload: number;
}

/**
 * Reducer function to manage the paused times of players.
 *
 * @param {PausedTimerState} state - The current state of paused times.
 * @param {PausedTimerAction} action - The action to apply to the paused times state.
 * @returns {PausedTimerState} - The updated paused times state after the action is applied.
 */
export const pausedTimerReducer = (
    state: PausedTimerState,
    action: PausedTimerAction
): PausedTimerState => {
    switch (action.type) {
        case 'setPausedAt':
            return {
                ...state,
                pausedAt: state.pausedAt.map((time, index) =>
                    index === action.index ? action.payload : time
                ),
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// ------------------- PLAYER URL REDUCER -------------------

/**
 * Represents the state of player URLs for multiple players.
 *
 * @interface PlayerUrlState
 * @property {string[]} url - An array of URLs corresponding to each player.
 */
export interface PlayerUrlState {
    url: string[];
}

/**
 * Defines the actions that can be dispatched to manipulate player URLs.
 *
 * @interface PlayerUrlAction
 * @property {'setUrl'} type - The type of action to perform. Currently, only 'setUrl' is supported.
 * @property {number} index - The index of the player whose URL is being set.
 * @property {string} payload - The new URL for the specified player.
 */
export interface PlayerUrlAction {
    type: 'setUrl';
    index: number;
    payload: string;
}

/**
 * Reducer function to manage the URLs of players.
 *
 * @param {PlayerUrlState} state - The current state of player URLs.
 * @param {PlayerUrlAction} action - The action to apply to the player URLs state.
 * @returns {PlayerUrlState} - The updated player URLs state after the action is applied.
 */
export const playerUrlReducer = (
    state: PlayerUrlState,
    action: PlayerUrlAction
): PlayerUrlState => {
    switch (action.type) {
        case 'setUrl':
            return {
                ...state,
                url: state.url.map((url, index) =>
                    index === action.index ? action.payload : url
                ),
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// ------------------- CONTROL STATES -------------------
// End Types are constructed by a PlayerControlsProvider and address a single player's settings in the Stack Reducers.

/**
 * Provides control over the local volumes of multiple players.
 *
 * @interface LocalVolumesControlType
 * @property {number[]} localVolumes - An array of volume levels for each player.
 * @property {React.Dispatch<LocalVolumesAction>} localVolumesDispatch - Dispatch function to update local volumes.
 */
export interface LocalVolumesControlType {
    localVolumes: number[];
    localVolumesDispatch: React.Dispatch<LocalVolumesAction>;
}

/**
 * Provides control over the local volume of a single player.
 *
 * @interface LocalVolumeControlType
 * @property {number} localVolume - The current volume level of the player.
 * @property {React.Dispatch<LocalVolumesAction>} localVolumeDispatch - Dispatch function to update the local volume.
 */
export interface LocalVolumeControlType {
    localVolume: number;
    localVolumeDispatch: React.Dispatch<LocalVolumesAction>;
}

/**
 * Simplifies the interface to set the local volume of a player.
 *
 * @interface LocalVolumeControlEndType
 * @property {number} localVolume - The current volume level of the player.
 * @property {(vol: number) => void} setLocalVolume - Function to set the local volume.
 */
export interface LocalVolumeControlEndType {
    localVolume: number;
    setLocalVolume: (vol: number) => void;
}

/**
 * Provides control over the fade animations of multiple players.
 *
 * @interface FadeAnimationsControlType
 * @property {(number | null)[]} fadeAnimationHandles - An array of animation frame request IDs for each player.
 * @property {React.Dispatch<FadeAnimationsAction>} fadeAnimationsDispatch - Dispatch function to update fade animations.
 */
export interface FadeAnimationsControlType {
    fadeAnimationHandles: (number | null)[];
    fadeAnimationsDispatch: React.Dispatch<FadeAnimationsAction>;
}

/**
 * Provides control over the fade animation of a single player.
 *
 * @interface FadeAnimationControlEndType
 * @property {number | null} fadeAnimationHandle - The current animation frame request ID for the player.
 * @property {React.Dispatch<FadeAnimationsAction>} fadeAnimationDispatch - Dispatch function to update the fade animation.
 */
export interface FadeAnimationControlType {
    fadeAnimationHandle: number | null;
    fadeAnimationDispatch: React.Dispatch<FadeAnimationsAction>;
}

/**
 * Simplifies the interface to set the fade animation handle of a player.
 *
 * @interface FadeAnimationControlEndType
 * @property {number | null} fadeAnimationHandle - The current animation frame request ID for the player.
 * @property {(handle: number | null) => void} setFadeAnimationHandle - Function to set the animation frame request ID.
 */
export interface FadeAnimationControlEndType {
    fadeAnimationHandle: number | null;
    setFadeAnimationHandle: (handle: number | null) => void;
}

/**
 * Provides control over the selection state of a player.
 *
 * @interface SelectionControlEndType
 * @property {boolean} selected - Indicates whether the player is selected.
 * @property {() => void} setSelected - Function to toggle the selection state.
 */
export interface SelectionControlEndType {
    selected: boolean;
    setSelected: () => void;
}

/**
 * Represents the saved volume state for a player.
 *
 * @interface SavedVolume
 * @property {boolean} hasSaved - Indicates if a volume has been saved.
 * @property {number} prevVol - The previous volume level that was saved.
 */
export interface SavedVolume {
    hasSaved: boolean;
    prevVol: number;
}

/**
 * Provides control over the saved volume state of a player.
 *
 * @interface SavedVolumeControlEndType
 * @property {SavedVolume} savedVolume - The current saved volume state.
 * @property {(vol: SavedVolume) => void} setSavedVolume - Function to update the saved volume state.
 */
export interface SavedVolumeControlEndType {
    savedVolume: SavedVolume;
    setSavedVolume: (vol: SavedVolume) => void;
}