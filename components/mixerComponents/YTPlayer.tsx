import React, { useEffect, useState } from 'react'
import { usePlayerHolderById } from '../contexts/PlayerHolderProvider'

const fadeInterval = 75
const fadeStep = 1

const startCases = [-1, 2, 5, 3]

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

    const fadeIn = (e: any, pLimit?: number) => {
        if (!player) return

        let limit = 0
        if (pLimit) {
            limit = pLimit
        } else {
            limit = player.getVolume() == 0 ? 50 : player.getVolume()
        }
        setVolume(1)

        const interval = setInterval(() => {
            if (!startCases.includes(player.getPlayerState()) && player.getVolume() < limit) {
                if (player.getPlayerState() == 1 && player.getPlayerState() != 3) {
                    setVolume(player.getVolume() + fadeStep)
                }
            } else if (startCases.includes(player.getPlayerState())) {
                player.playVideo()
            } else {
                clearInterval(interval)
            }
        }, fadeInterval)
    }

    const fadeOut = (e: any) => {
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
            <div className="flex flex-row justify-center items-center gap-2 h-5/6 w-full">
                <div id={ID} />
                <div className="flex flex-col justify-center items-center w-fit h-full">
                    <p className='-translate-y-14'>{Math.round(volume)}</p>
                    <input id={`volumeSlider_${playerId}`} type="range" min="0" max="100" step="1" className="bg-gray-800/50 w-4/6 -rotate-90"
                        onChange={sliderInputHandler}
                        onInput={sliderInputHandler}
                    />
                </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-2 w-full h-1/6">
                <input type="text" className="bg-gray-800/50 rounded p-1" placeholder="Video ID" onKeyDown={
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

                <button className="bg-gray-800/50 rounded p-1 min-w-fit" onClick={fadeIn}>Fade In</button>
                <input type="text" className=" bg-gray-800/50 rounded p-1 w-1/12 " placeholder="Limit" onKeyDown={
                    (e) => {
                        //@ts-ignore
                        if (e.key === 'Enter' && e.target.value) {
                            //@ts-ignore
                            fadeIn(e, e.target.value)
                        }
                    }
                } />
                <button className="bg-gray-800/50 rounded p-1 min-w-fit" onClick={fadeOut}>Fade Out</button>
            </div>
        </div>
    )

}

export default YTPlayer