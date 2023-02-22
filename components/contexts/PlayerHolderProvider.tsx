import React, { useState, useEffect, useContext } from 'react'
import IFPlayer from '../utils/IFPlayer'

// Create a custom hook to handle the initialization of multiple youtubte iframe players on a page
// This is a workaround for the fact that the youtube iframe api only allows one player per page
const PlayerHolderContext = React.createContext([] as { id: number, player: IFPlayer, isAvailable: boolean }[])

export function usePlayerHolder() {
    return useContext(PlayerHolderContext)
}

export function usePlayerHolderById(id: number) {
    const playerHolder = useContext(PlayerHolderContext)

    if (!playerHolder[id]) {
        return {id: -1, player: null, isAvailable: false}
    }

    return playerHolder[id]
}


function PlayerHolderProvider({ children }: any) {
    const [playerHolder, setPlayerHolder] = useState([] as { id: number, player: IFPlayer, isAvailable: boolean }[]);

    useEffect(() => {

        let playerHolderTemp = [] as { id: number, player: any, isAvailable: boolean }[];

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

            for (let i = 0; i < 9; i++) {
                //@ts-ignore
                playerHolderTemp[i].player = new YT.Player(playerHolderTemp[i].player.id, {
                    height: 128,
                    width: 256,
                    videoId: 'o49in-4Galg',
                });
            }

            setPlayerHolder(playerHolderTemp);

        };
    }, []);

    return (
        <PlayerHolderContext.Provider value={playerHolder}>
            {children}
        </PlayerHolderContext.Provider>
    );
}

export default PlayerHolderProvider
