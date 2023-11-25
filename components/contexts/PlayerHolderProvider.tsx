import React, { useState, useEffect, useContext, useReducer, use } from 'react';
import IFPlayer from '../utils/IFPlayer';
import { PausedTimerState, pausedTimerReducer } from '../Player/states';

const defaultVideoID = 'NpEaa2P7qZI'; // 'video placeholder' by Tristan Behaut
const maxPlayers = 9;

// Create a custom hook to handle the initialization of multiple youtubte iframe players on a page
// This is a workaround for the fact that the youtube iframe api only allows one player per page
const PlayerHolderContext = React.createContext(
	[] as { id: number; player: IFPlayer; isAvailable: boolean }[]
);
const PasuedTimerContext = React.createContext({} as { pausedAt: number[] });

const InitialPausedTimerState: PausedTimerState = {
	pausedAt: Array(maxPlayers).fill(0),
};

export function usePlayerHolder() {
	const context = useContext(PlayerHolderContext);
	if (context === undefined) {
		throw new Error(
			'usePausedTimer must be used within a PausedTimerProvider'
		);
	}
	return context;
}

export function usePausedTimer() {
	const context = useContext(PasuedTimerContext);
	if (context === undefined) {
		throw new Error(
			'usePausedTimer must be used within a PausedTimerProvider'
		);
	}
	return context;
}

export function usePlayerHolderById(id: number) {
	const playerHolder = useContext(PlayerHolderContext);

	const holder = playerHolder.find((holder) => holder.id === id);

	if (!holder) {
		return { id: -1, player: null, isAvailable: false };
	}

	return holder;
}

function PlayerHolderProvider({ children }: { children: React.ReactNode }) {
	const [pauseTimers, pauseTimerDispatch] = useReducer(
		pausedTimerReducer,
		InitialPausedTimerState
	);
	const setPausedAt = (pIndex: number, pPayload: number) => {
		pauseTimerDispatch({
			type: 'setPausedAt',
			index: pIndex,
			payload: pPayload,
		});
	};

	useEffect(() => {
		console.log('Updated pauseTimers:', pauseTimers);
	}, [pauseTimers]);

	const [playerHolder, setPlayerHolder] = useState(
		[] as { id: number; player: IFPlayer; isAvailable: boolean }[]
	);

	useEffect(() => {
		let playerHolderTemp = [] as {
			id: number;
			player: any;
			isAvailable: boolean;
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
				isAvailable: true,
			});
		}

		const tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';
		document.body.appendChild(tag);

		// paused state: 2, playing state: 1
		function onPlayerStateChange(e: any) {
			const player = e.target;
			const playerIdx = parseInt(
				player.g.id.charAt(player.g.id.length - 1)
			);
			const changedState = player.getPlayerState();

			// console.log('playerIdx:', playerIdx, 'changedState:', changedState);

			// console.log('registered state change in Player:', playerIdx, player.getPlayerState());
			if (changedState === YT.PlayerState.PAUSED) {
				setPausedAt(playerIdx, Date.now());
			} else if (changedState === YT.PlayerState.PLAYING) {
				setPausedAt(playerIdx, 0);
			} else if (changedState === YT.PlayerState.ENDED) {
				player.seekTo(0, true);
				player.pauseVideo();
			}
		}

		function onPlayerReady(e: any) {
			const player = e.target as IFPlayer;

			player.setVolume(0);
			player.playVideo();
			setTimeout(() => {
				player.seekTo(0, true);
				player.pauseVideo();
			}, 500);
		}

		//@ts-ignore
		window.onYouTubeIframeAPIReady = function () {
			playerHolderTemp = playerHolderTemp.map((holder) => ({
				...holder,
				// @ts-ignore
				player: new YT.Player(holder.player.id, {
					height: 128,
					width: 256,
					videoId:
						process.env.NODE_ENV !== 'development'
							? defaultVideoID
							: 'P2NVJSJVGVQ',
					events: {
						onStateChange: onPlayerStateChange,
						onReady: onPlayerReady,
					},
				}),
			}));

			setPlayerHolder(playerHolderTemp);
		};

		return () => {
			document.body.removeChild(container);
		};
	}, []);

	return (
		<PasuedTimerContext.Provider value={pauseTimers}>
			<PlayerHolderContext.Provider value={playerHolder}>
				{children}
			</PlayerHolderContext.Provider>
		</PasuedTimerContext.Provider>
	);
}

export default PlayerHolderProvider;
