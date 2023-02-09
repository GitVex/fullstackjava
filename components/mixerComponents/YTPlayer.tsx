import React, { useEffect } from 'react'
import ts from 'typescript'
import { usePlayerHolderById } from '../contexts/PlayerHolderProvider'

const fadeInterval = 100
const fadeStep = 1

const fadeIn = (player: any, ID: number) => {
    const limit = player.getVolume() == 0 ? 50 : player.getVolume()
    player.setVolume(0)
    player.playVideo()

    const interval = setInterval(() => {
        if (player.getVolume() < limit) {
            // @ts-ignore
            document.getElementById(`volumeSlider${ID}`).value = player.getVolume() + fadeStep
        } else {
            clearInterval(interval)
        }
    }, fadeInterval)
}

const fadeOut = (player: any, ID: number) => {
    const interval = setInterval(() => {
        if (player.getVolume() > 0) {
            // @ts-ignore
            document.getElementById(`volumeSlider${ID}`).value = player.getVolume() - fadeStep
        } else {
            clearInterval(interval)
            player.pauseVideo()
        }
    }, fadeInterval)
}

/* USE VIDEO.JS https://videojs.com/getting-started | maybe for later projects :) */


// Youtube Player utilizing the Youtube IFrame API
function YTPlayer({ playerId }: { playerId: number }) {

    const player = usePlayerHolderById(playerId).player

    const ID = `player${playerId}`

    return (
        <div className='flex flex-col gap-2 p-2 bg-gray-800/50 rounded h-full w-full'>
            <div className="flex flex-row justify-center items-center gap-2 h-full w-full">
                <div id={ID} />
                {/* Style an input slider that controls the players volume */}
                <input id={`volumeSlider${ID}`} type="range" min="0" max="100" step="1" className="h-5/6 w-full bg-gray-800/50" orient="vertical" onChange={
                    (e) => {
                        //@ts-ignore
                        player.setVolume(e.target.value)
                    }
                } />
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
                <input type="text" className="w-1/2 bg-gray-800/50 rounded p-1" placeholder="Video ID" onKeyDown={
                    (e) => {
                        //@ts-ignore
                        if (e.key === 'Enter' && e.target.value) {
                            //@ts-ignore
                            player.loadVideoById(e.target.value)
                            //@ts-ignore
                            player.pauseVideo()
                        }
                    }
                } />
                <button className="bg-gray-800/50 rounded p-1" onClick={() => fadeOut(player, playerId)}>Fade Out</button>
                <button className="bg-gray-800/50 rounded p-1" onClick={() => fadeIn(player, playerId)}>Fade In</button>
            </div>
        </div>
    )

}

export default YTPlayer