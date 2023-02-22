import React, { useEffect, useState } from 'react'
import { StyleRegistry } from 'styled-jsx'
import { usePlayerHolderById } from '../contexts/PlayerHolderProvider'
import stlyes from './YTPlayer.module.css'

const fadeInterval = 75
const fadeStep = 1

const ease = (x: number, limit: number) => limit * (1 - Math.cos(((x / limit) * Math.PI) / 2))

/* USE VIDEO.JS https://videojs.com/getting-started | maybe for later projects :) */

// Youtube Player utilizing the Youtube IFrame API
function YTPlayer({ playerId }: { playerId: number }) {

    const [volume, setVolume] = useState(50)

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

    const fade = (e: any, pLimit?: number, inverse: boolean = false) => {
        if (!player) return
        let limit = 0
        if (!inverse) {
            limit = pLimit ? (pLimit == 0 ? 50 : pLimit) : (player.getVolume() == 0 ? 50 : player.getVolume())
            setVolume(1)
        }
        let runner = inverse ? player.getVolume() : 1

        const interval = setInterval(() => {
            if (inverse) {
                if (player.getVolume() > 0) {
                    setVolume(ease(runner, player.getVolume()))
                    runner -= fadeStep
                } else {
                    setVolume(0)
                    clearInterval(interval)
                }
            } else {
                if (player.getVolume() < limit) {
                    setVolume(ease(runner, limit))
                    runner += fadeStep
                } else {
                    setVolume(limit)
                    clearInterval(interval)
                }
            }
        }, fadeInterval)	
    }

    const fadeIn = (e: any, pLimit?: number) => {fade(e, pLimit); player ? player.playVideo() : null}
    const fadeOut = (e: any, pLimit?: number) => fade(e, pLimit, true)

    const fadeTo = (e: any, volume: number) => {
        if (!player) return
        const limit = player.getVolume() == 0 ? 50 : player.getVolume()

        const interval = setInterval(() => {
            if (player.getVolume() > volume) {
                setVolume(player.getVolume() - fadeStep)
            } else if (player.getVolume() < volume) {
                setVolume(player.getVolume() + fadeStep)
            } else {
                clearInterval(interval)
            }
        }, fadeInterval)
    }

    return (
        <div id={`${ID}_container`} className='flex flex-col gap-2 p-2 bg-gray-900 rounded justify-center items-center h-fit max-w-md'>
            <div className="flex flex-row w-full h-full place-content-center items-center gap-8">
                <div className='rounded' id={ID} />
                <div className="flex flex-col justify-center items-center w-fit h-full rounded">
                    <p className=''>{Math.round(volume)}</p>
                    {/* @ts-ignore */}
                    <input id={`volumeSlider_${playerId}`} type="range" min="0" max="100" step="1" orient="vertical" className={stlyes.slider}
                        onChange={sliderInputHandler}
                        onInput={sliderInputHandler}
                    />
                </div>
            </div>
            <div className="flex flex-row justify-center items-center w-full gap-2">
                <input type="text" className="bg-gray-800/50 rounded p-1 w-2/5" placeholder="Video ID" onKeyDown={
                    (e) => {
                        const field = e.target as HTMLInputElement
                        if (!player) return
                        if (e.key !== 'Enter' && field.value) return

                        // strip video id from url and remove all other characters and timestamps
                        field.value = field.value.replace(/(https:\/\/www\.youtube\.com\/watch\?v=|https:\/\/youtu\.be\/|&t=.*|&feature=emb_logo)/g, '')
                        console.log(field.value)

                        player.loadVideoById(field.value)
                        player.pauseVideo()
                        player.setLoop(true)
                    }

                } />
                <button className="bg-gray-800/50 rounded p-1 w-1/5 disabled:opacity-50" onClick={fadeIn} disabled={player ? false : true}>Fade In</button>
                <input type="text" className=" bg-gray-800/50 rounded p-1 w-1/5" placeholder="Limit" onKeyDown={
                    (e) => {
                        const field = e.target as HTMLInputElement
                        if (!player) return
                        if (e.key !== 'Enter' && field.value) return

                        if (player.getPlayerState() != 1) {
                            fadeIn(e, parseInt(field.value))
                            return
                        }
                        fadeTo(e, parseInt(field.value))
                    }
                } />
                <button className="bg-gray-800/50 rounded p-1 disabled:opacity-50 w-1/5" onClick={fadeOut} disabled={player ? false : true}>Fade Out</button>
            </div>
        </div>
    )

}

export default YTPlayer