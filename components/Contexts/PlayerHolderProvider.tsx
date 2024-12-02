import React, { useContext, useEffect, useReducer } from 'react';
import IFPlayer from '../Player/types/IFPlayer';
import { playerHolderReducer, PlayerHolderState } from './states';
import { useWindowSize } from './WindowSizeProvider';
import { usePreset } from '../Player/Contexts/PresetProvider';

import { DEFAULT_VIDEO_ID } from '../utils/DEFAULTS';

const maxPlayers = 8;

// YT.PlayerState.UNSTARTED = -1;
// YT.PlayerState.ENDED = 0;
// YT.PlayerState.PLAYING = 1;
// YT.PlayerState.PAUSED = 2;
// YT.PlayerState.BUFFERING = 3;
// YT.PlayerState.CUED = 5;

// https://developers.google.com/youtube/iframe_api_reference?

// ----------------- CONTEXT DECLARATION -----------------
// Create a custom hook to handle the initialization of multiple YouTube iframe players on a page
// This is a workaround for the fact that the YouTube iframe api only allows one api call per mount
const PlayerHolderContext = React.createContext({} as PlayerHolderState);

// ----------------- INITIAL STATES -----------------
const initialPlayerHolderState: PlayerHolderState = {
    holders: Array(8)
        .fill(null)
        .map((_, index) => ({
            id: index,
            player: null,
            isReady: false,
        })),
    firstLoadDone: false,
};

// ----------------- HOOKS -----------------
export function usePlayerHolder() {
    const context = useContext(PlayerHolderContext);
    if (context === undefined) {
        throw new Error('usePlayerHolder must be used within a PlayerHolderProvider');
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

    const { presetDispatch } = usePreset();

    // ------- YT IFRAME API INIT -------
    const [playerHolder, dispatchPlayerHolder] = useReducer(playerHolderReducer, initialPlayerHolderState);
    const { windowHeight, windowWidth } = useWindowSize();

    useEffect(() => {

        if (typeof window === 'undefined') return;
        if (playerHolder.firstLoadDone) return;

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
                player.g.id.charAt(player.g.id.length - 1),
            );
            const changedState = player.getPlayerState();

            if (changedState === YT.PlayerState.PAUSED) {
                presetDispatch(
                    {
                        type: 'setPausedAt',
                        index: playerIdx,
                        payload: Date.now(),
                    },
                );
            } else if (changedState === YT.PlayerState.UNSTARTED) {
                presetDispatch(
                    {
                        type: 'setPausedAt',
                        index: playerIdx,
                        payload: Date.now(),
                    },
                );
            } else if (changedState === YT.PlayerState.PLAYING) {
                presetDispatch(
                    {
                        type: 'setPausedAt',
                        index: playerIdx,
                        payload: 9999999999999,
                    },
                );
            } else if (changedState === YT.PlayerState.ENDED) {
                player.seekTo(0, true);
            }
        }

        function onPlayerReady(e: any) {
            const player = e.target as IFPlayer;
            const playerIdx = parseInt(
                //@ts-ignore
                player.g.id.charAt(player.g.id.length - 1),
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
        window.onYouTubeIframeAPIReady = function() {
            playerHolderTemp = playerHolderTemp.map(holder => ({
                ...holder,
                // @ts-ignore
                player: new YT.Player(holder.player.id, {
                    // initialize player with a height of innerHeight / 7.58
                    // and a width of innerWidth / 7.40
                    height: windowHeight ? windowHeight / 7.58 : 0,
                    width: windowWidth ? windowWidth / 7.40 : 0,
                    videoId: DEFAULT_VIDEO_ID,
                    playerVars: {
                        fs: 0,
                        enablejsapi: 1,
                        origin: 'bardicinspiration.cc',
                    },
                    events: {
                        onStateChange: onPlayerStateChange,
                        onReady: onPlayerReady,
                    },
                }),
            }));

            dispatchPlayerHolder({
                type: 'init',
                payload: { holders: playerHolderTemp, firstLoadDone: true },
            });
        };

        return () => {
            document.body.removeChild(container);
        };
    }, [playerHolder.firstLoadDone, windowHeight, windowWidth]);

    // ------- LISTENERS -------

    /* useEffect(() => {
        console.log('presetState changed', presetState);
    }, [presetState]); */

    /* useEffect(() => {
        console.log('playerHolder changed', playerHolder);
    }, [playerHolder]); */

    return (
        <PlayerHolderContext.Provider value={{
            holders: playerHolder.holders,
            firstLoadDone: playerHolder.firstLoadDone,
        }}>
            {children}
        </PlayerHolderContext.Provider>
    );
}

export default PlayerHolderProvider;
