import React, { useEffect, useState, useContext } from 'react'
import { usePlayerHolder } from '../contexts/PlayerHolderProvider'
import IFPlayer from '../utils/IFPlayer'

// Youtube Player utilizing the Youtube IFrame API
function YTPlayer({ playerId }: { playerId: number }) {

    const ID = `player${playerId}`

    return (
        <div className='flex flex-row gap-2 p-2 bg-gray-800/50 rounded'>
            <div id={ID} />
            <div className="flex flex-col w-fit justify-center items-center gap-2">
                <button onClick={() => {
                    //@ts-ignore
                    const player = window.YT.get(ID)
                    player.playVideo()
                }} className="w-full bg-gray-800/50 rounded p-2 hover:bg-gray-600/25 duration-150">Play</button>
                <button onClick={() => { 
                    //@ts-ignore
                    const player = window.YT.get(ID)
                    player.pauseVideo()
                 }} className="w-full bg-gray-800/50 rounded p-2 hover:bg-gray-600/25 duration-150">Pause</button>
            </div>
        </div>
    )

}

export default YTPlayer