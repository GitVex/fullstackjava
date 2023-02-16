import React, { useEffect, useState } from 'react'
import { usePlayerHolderById } from '../contexts/PlayerHolderProvider'

const fadeInterval = 100
const fadeStep = 1

/* USE VIDEO.JS https://videojs.com/getting-started | maybe for later projects :) */

// Youtube Player utilizing the Youtube IFrame API
function YTPlayer({ playerId }: { playerId: number }) {

    const [volume, setVolume] = useState(50)

    //@ts-ignore
    const player = usePlayerHolderById(playerId).player
    const ID = `player${playerId}`

    useEffect(() => {
        if (player) {
            player.setVolume(volume)
            if (volume == 0) {
                player.pauseVideo()
            } else {
                //player.playVideo()
            }
        }

        const slider = document.getElementById(`volumeSlider_${playerId}`)
        if (slider) {
            //@ts-ignore
            slider.value = volume
        }

    }, [volume])

    const sliderInputHandler = (e: any) => {
        if (parseInt(e.target.value) != volume) {
            setVolume(e.target.value)
        }
    }

    const fadeIn = () => {
        if (!player) return

        setVolume(1)
        const limit = player.getVolume() == 0 ? 50 : player.getVolume()
        player.playVideo()

        const interval = setInterval(() => {
            if (player.getVolume() < limit) {
                if (player.getPlayerState() == 1 && player.getPlayerState() != 3) {
                    setVolume(player.getVolume() + fadeStep)
                }
            } else {
                clearInterval(interval)
            }
        }, fadeInterval)
    }

    const fadeOut = () => {
        if (!player) return
        const limit = player.getVolume() == 0 ? 50 : player.getVolume()

        const interval = setInterval(() => {
            if (player.getVolume() > 0) {
                setVolume(player.getVolume() - fadeStep)
            } else {
                clearInterval(interval)
                player.pauseVideo()
            }
        }, fadeInterval)
    }

    return (
        <div className='flex flex-col gap-2 p-2 bg-gray-800/50 rounded h-full w-full'>
            <div className="flex flex-row justify-center items-center gap-2 h-full w-full">
                <div id={ID} />
                <div className="flex flex-col justify-center items-center gap-2 h-full w-full">
                    <p>{Math.round(volume)}</p>
                    <input id={`volumeSlider_${playerId}`} type="range" min="0" max="100" step="1" className="h-5/6 w-full bg-gray-800/50" orient="vertical"
                        onChange={sliderInputHandler}
                        onInput={sliderInputHandler}
                    />
                </div>
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
                <button className="bg-gray-800/50 rounded p-1" onClick={fadeOut}>Fade Out</button>
                <button className="bg-gray-800/50 rounded p-1" onClick={fadeIn}>Fade In</button>
            </div>
        </div>
    )

}

export default YTPlayer