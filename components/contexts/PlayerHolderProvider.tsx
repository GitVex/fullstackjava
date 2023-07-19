import React, { useState, useEffect, useContext } from 'react';
import IFPlayer from '../utils/IFPlayer';

// Create a custom hook to handle the initialization of multiple youtubte iframe players on a page
// This is a workaround for the fact that the youtube iframe api only allows one player per page
const PlayerHolderContext = React.createContext(
	[] as { id: number; player: IFPlayer; isAvailable: boolean }[]
);
const defaultVideoID = 'NpEaa2P7qZI'; // 'video placeholder' by Tristan Behaut
const maxPlayers = 9;

export function usePlayerHolder() {
	return useContext(PlayerHolderContext);
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

		//@ts-ignore
		window.onYouTubeIframeAPIReady = function () {
			playerHolderTemp = playerHolderTemp.map((holder) => ({
				...holder,
				// @ts-ignore
				player: new YT.Player(holder.player.id, {
					height: 128,
					width: 256,
					videoId: '_dyA3Xp02Bo', /* Placeholder: NpEaa2P7qZI */
				}),
			}));

			setPlayerHolder(playerHolderTemp);
		};

		return () => {
			document.body.removeChild(container);
		}

	}, []);

	return (
		<PlayerHolderContext.Provider value={playerHolder}>
			{children}
		</PlayerHolderContext.Provider>
	);
}

export default PlayerHolderProvider;
