import React, { useState, useEffect } from 'react'
import { usePlayerHolder } from '../contexts/PlayerHolderProvider'
import YTPlayer from './YTPlayer'

export default function PlayerManager() {

    return (
        <div className="h-screen w-screen flex flex-col gap-2 2xl:justify-center 2xl:items-center overflow-y-scroll overflow-x-hidden">
            <div className="flex flex-row flex-wrap gap-2 p-8 h-fit w-screen 2xl:justify-center 2xl:items-center">
                <YTPlayer playerId={0} />
                <YTPlayer playerId={1} />
                <YTPlayer playerId={2} />
                <YTPlayer playerId={3} />
                <YTPlayer playerId={4} />
                <YTPlayer playerId={5} />
                <YTPlayer playerId={6} />
                <YTPlayer playerId={7} />
                <YTPlayer playerId={8} />
            </div>
        </div>
    )
}

