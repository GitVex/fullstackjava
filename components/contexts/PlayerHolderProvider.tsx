import React, { useCallback, useEffect, useContext, useReducer } from 'react';
import IFPlayer from '../utils/IFPlayer';
import {
    PresetState,
    PlayerStateAction,
    playerStateReducer,
    PlayerHolderState,
    PlayerHolderAction,
    playerHolderReducer,
} from './states';

import { DEFAULT_VOLUME, DEFAULT_VIDEOID } from '../utils/DEFAULTS';

const maxPlayers = 8;

// YT.PlayerState.PLAYING = 1;
// YT.PlayerState.PAUSED = 2;
// YT.PlayerState.ENDED = 0;
// YT.PlayerState.CUED = 5;
// YT.PlayerState.BUFFERING = 3;
// YT.PlayerState.UNSTARTED = -1;

// ----------------- CONTEXT DECLARATION -----------------

// Create a custom hook to handle the initialization of multiple youtubte iframe players on a page
// This is a workaround for the fact that the youtube iframe api only allows one player per page
const PlayerHolderContext = React.createContext({} as PlayerHolderState);

const PresetStateContext = React.createContext(
    {} as {
        presetState: PresetState;
        presetDispatch: React.Dispatch<PlayerStateAction>;
    }
);

// ----------------- INITIAL STATES -----------------

const initialPresetState: PresetState = {
    title: 'New Preset',
    players: Array(8)
        .fill(null)
        .map((_, index) => ({
            id: index,
            selected: false,
            volume: DEFAULT_VOLUME,
            savedVolume: { hasSaved: false, prevVol: DEFAULT_VOLUME },
            pausedAt: Date.now(),
            videoId: DEFAULT_VIDEOID,
        })),
    masterVolume: 100,
};

const initialPlayerHolderState: PlayerHolderState = {
    holders: Array(8)
        .fill(null)
        .map((_, index) => ({
            id: index,
            player: null,
            isReady: false,
        })),
};

// ----------------- HOOKS -----------------

export function usePlayerHolder() {
    const context = useContext(PlayerHolderContext);
    if (context === undefined) {
        throw new Error('usePlayerHolder must be used within a PlayerHolderProvider');
    }
    return context;
}

export function usePresetState() {
    const context = useContext(PresetStateContext);
    if (context === undefined) {
        throw new Error('usePresetState must be used within a PresetStateContext');
    }
    return context;
}

export function usePlayerHolderById(id: number) {
    const playerHolder = useContext(PlayerHolderContext);

    const holder = playerHolder.holders.find((holder, index) => index === id);

    if (!holder) {
        return { id: -1, player: null, isReady: false };
    }

    return holder;
}

// ----------------- PROVIDER -----------------

function PlayerHolderProvider({ children }: { children: React.ReactNode }) {
    // ------- PRESET STATE PERSISTENCE -------

    const loadPersistPreset = (): PresetState => {
        const savedState = localStorage.getItem('presetState');
        if (savedState) return JSON.parse(savedState);
        return initialPresetState;
    };
    const savePersistPreset = (state: PresetState) => {
        localStorage.setItem('presetState', JSON.stringify(state));
    };

    const [presetState, presetDispatch] = useReducer(playerStateReducer, initialPresetState);

    useEffect(() => {
        presetDispatch({
            type: 'setPreset',
            payload: loadPersistPreset(),
        });
    }, []);

    const handleBeforeUnload = useCallback(
        (e: BeforeUnloadEvent) => {
            savePersistPreset(presetState);
            e.preventDefault();
            e.returnValue = '';
        },
        [presetState]
    );

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [handleBeforeUnload]);

    // ------- PAUSED TIMER -------

    const setPausedAt = (pIndex: number, pPayload: number) => {
        presetDispatch({
            type: 'setPausedAt',
            index: pIndex,
            payload: pPayload,
        });
    };

    // ------- YT IFRAME API INIT -------

    const [playerHolder, dispatchPlayerHolder] = useReducer(playerHolderReducer, initialPlayerHolderState);

    useEffect(() => {
        let playerHolderTemp = [] as {
            id: number;
            player: any;
            isReady: boolean;
        }[];

        const container = document.createElement('div');
        container.setAttribute('id', 'playerHolder');
        container.setAttribute('style', 'display: none');
        document.body.appendChild(container);

        for (let i = 0; i < maxPlayers; i++) {
            const div = document.createElement('div');
            div.setAttribute('id', `player${i}`);
            container.appendChild(div);

            playerHolderTemp.push({
                id: i,
                player: div,
                isReady: false,
            });
        }

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);

        // paused state: 2, playing state: 1
        function onPlayerStateChange(e: any) {
            const player = e.target as IFPlayer;
            const playerIdx = parseInt(
                //@ts-ignore
                player.g.id.charAt(player.g.id.length - 1)
            );
            const changedState = player.getPlayerState();

            if (changedState === YT.PlayerState.PAUSED) {
                setPausedAt(playerIdx, Date.now());
            } else if (changedState === YT.PlayerState.PLAYING) {
                setPausedAt(playerIdx, 9999999999999);
            } else if (changedState === YT.PlayerState.ENDED) {
                player.seekTo(0, true);
            }
        }

        function onPlayerReady(e: any) {
            const player = e.target as IFPlayer;
            const playerIdx = parseInt(
                //@ts-ignore
                player.g.id.charAt(player.g.id.length - 1)
            );

            player.setVolume(0);
            player.playVideo();
            setTimeout(() => {
                player.seekTo(0, true);
                player.pauseVideo();
                player.setVolume(50);

                dispatchPlayerHolder({
                    type: 'setReady',
                    index: playerIdx,
                });
            }, 500);
        }

        //@ts-ignore
        window.onYouTubeIframeAPIReady = function () {
            playerHolderTemp = playerHolderTemp.map(holder => ({
                ...holder,
                // @ts-ignore
                player: new YT.Player(holder.player.id, {
                    height: 128,
                    width: 256,
                    videoId: DEFAULT_VIDEOID,
                    events: {
                        onStateChange: onPlayerStateChange,
                        onReady: onPlayerReady,
                    },
                }),
            }));

            dispatchPlayerHolder({
                type: 'init',
                payload: { holders: playerHolderTemp },
            });
        };

        return () => {
            document.body.removeChild(container);
        };
    }, []);

    // ------- LISTENERS -------

    /* useEffect(() => {
        console.log('presetState changed', presetState);
    }, [presetState]); */

    /* useEffect(() => {
        console.log('playerHolder changed', playerHolder);
    }, [playerHolder]); */

    return (
        <PresetStateContext.Provider value={{ presetState, presetDispatch }}>
            <PlayerHolderContext.Provider value={playerHolder}>{children}</PlayerHolderContext.Provider>
        </PresetStateContext.Provider>
    );
}

export default PlayerHolderProvider;
