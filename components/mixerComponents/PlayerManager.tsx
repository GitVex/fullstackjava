import React, { useState, useEffect } from 'react'
import { usePlayerHolder } from '../contexts/PlayerHolderProvider'
import YTPlayer from './YTPlayer'

export default function PlayerManager() {

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center gap-2">
            <div className="flex flex-col gap-2 h-fit w-fit">
                <span className="flex flex-row gap-2">
                    <YTPlayer playerId={0} />
                    <YTPlayer playerId={1} />
                    <YTPlayer playerId={2} />
                </span>
                <span className="flex flex-row gap-2">
                    <YTPlayer playerId={3} />
                    <YTPlayer playerId={4} />
                    <YTPlayer playerId={5} />
                </span>
                <span className="flex flex-row gap-2">
                    <YTPlayer playerId={6} />
                    <YTPlayer playerId={7} />
                    <YTPlayer playerId={8} />
                </span>
            </div>
        </div>
    )
}

