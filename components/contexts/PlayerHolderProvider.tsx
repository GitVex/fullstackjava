import React, { useState, useEffect, useContext } from 'react'
import IFPlayer from '../utils/IFPlayer'

// Create a custom hook to handle the initialization of multiple youtubte iframe players on a page
// This is a workaround for the fact that the youtube iframe api only allows one player per page
const PlayerHolderContext = React.createContext([] as { id: number, player: HTMLDivElement | IFPlayer, isAvailable: boolean }[])

export function usePlayerHolder() {
    return useContext(PlayerHolderContext)
}

export function usePlayerHolderById(id: number) {
    const playerHolder = useContext(PlayerHolderContext)
    return playerHolder[id]
}



function PlayerHolderProvider({ children }: any) {
    const [playerHolder, setPlayerHolder] = useState([] as { id: number, player: HTMLDivElement | IFPlayer, isAvailable: boolean }[]);

    useEffect(() => {

        let playerHolderTemp = [] as { id: number, player: HTMLDivElement | IFPlayer, isAvailable: boolean }[];

        const container = document.createElement('div');
        container.setAttribute('id', 'playerHolder');
        container.setAttribute('style', 'display: none');
        document.body.appendChild(container);

        for (let i = 0; i < 9; i++) {
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
            console.log('API READY');

            for (let i = 0; i < 9; i++) {
                //@ts-ignore
                playerHolderTemp[i].player = new YT.Player(playerHolderTemp[i].player.id, {
                    height: window.innerHeight / 6,
                    width: window.innerWidth / 6,
                    videoId: 'o49in-4Galg',
                });
            }

            setPlayerHolder(playerHolderTemp);

        };
    }, []);

    useEffect(() => {
        console.log("Players Initialized | ", playerHolder);
    }, [playerHolder])

    return (
        <PlayerHolderContext.Provider value={playerHolder}>
            {children}
        </PlayerHolderContext.Provider>
    );
}

export default PlayerHolderProvider
