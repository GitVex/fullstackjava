import React, { useState, useEffect } from 'react'
import { usePlayerHolder } from '../contexts/PlayerHolderProvider'
import YTPlayer from './YTPlayer'

export default function PlayerManager() {

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center gap-2">
            <p>This is the mixer</p>
            <div className="flex flex-row gap-2">
                <YTPlayer playerId={0} />
                <YTPlayer playerId={1} />
                <YTPlayer playerId={2} />
            </div>
        </div>
    )
}

