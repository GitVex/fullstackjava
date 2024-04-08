import IFPlayer from '../utils/IFPlayer';

// ------------------- PLAYER STATE REDUCER -------------------

export interface PresetState {
    title: string;
    players: PlayerState[];
    masterVolume: number;
}

export interface PlayerState {
    id: number;
    selected: boolean;
    volume: number;
    savedVolume: { hasSaved: boolean; prevVol: number };
    pausedAt: number;
    videoId: string;
}

export type PlayerStateAction =
    | VolumeAction
    | SetPausedAtAction
    | SetIdAction
    | SelectAction
    | SetTitleAction
    | SetPresetAction;

type VolumeAction = SetVolumeAction | SetSavedVolumeAction | SetMasterVolumeAction;

interface SetVolumeAction {
    type: 'setVolume';
    index: number;
    payload: number;
}

interface SetSavedVolumeAction {
    type: 'setSavedVolume';
    index: number;
    payload: { hasSaved: boolean; prevVol: number };
}

interface SetMasterVolumeAction {
    type: 'setMasterVolume';
    payload: number;
}

interface SetPausedAtAction {
    type: 'setPausedAt';
    index: number;
    payload: number;
}

interface SetIdAction {
    type: 'setId';
    index: number;
    payload: string;
}

interface SetTitleAction {
    type: 'setTitle';
    payload: string;
}

interface SelectAction {
    type: 'select' | 'deselect';
    index: number;
}

interface SetPresetAction {
    type: 'setPreset';
    payload: PresetState;
}

export const playerStateReducer = (state: PresetState, action: PlayerStateAction): PresetState => {
    function updatePlayerAtIndex(players: PlayerState[], index: number, update: Partial<PlayerState>): PlayerState[] {
        return players.map((player, i) => (i === index ? { ...player, ...update } : player));
    }

    switch (action.type) {
        case 'setPreset':
            return action.payload;
        case 'setTitle':
            return {
                ...state,
                title: action.payload,
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
        case 'setId':
            return {
                ...state,
                players: updatePlayerAtIndex(state.players, action.index, { videoId: action.payload }),
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
        case 'setMasterVolume':
            return {
                ...state,
                masterVolume: action.payload,
            };
        default:
            throw new Error();
    }
};

// ------------------- PLAYER HOLDER REDUCER -------------------

export interface PlayerHolderState {
    holders: { player: IFPlayer | null; isReady: boolean }[];
}

export type PlayerHolderAction = SetPlayerAction | SetReadyAction | InitHolderAction;

interface InitHolderAction {
    type: 'init';
    payload: PlayerHolderState;
}

interface SetPlayerAction {
    index: number;
    type: 'setPlayer';
    payload: IFPlayer;
}

interface SetReadyAction {
    index: number;
    type: 'setReady';
}

export const playerHolderReducer = (state: PlayerHolderState, action: PlayerHolderAction): PlayerHolderState => {
    switch (action.type) {
        case 'setPlayer':
            return {
                holders: state.holders.map((holder, index) =>
                    index === action.index ? { player: action.payload, isReady: holder.isReady } : holder
                ),
            };
        case 'setReady':
            return {
                holders: state.holders.map((holder, index) =>
                    index === action.index ? { player: holder.player, isReady: true } : holder
                ),
            };
        case 'init':
            return action.payload;
        default:
            throw new Error();
    }
};

// ------------------- CONTROL STATES -------------------

export interface presetControlType {
    presetState: PresetState;
    presetDispatch: React.Dispatch<PlayerStateAction>;
}