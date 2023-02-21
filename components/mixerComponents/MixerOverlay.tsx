import React from 'react'
import PlayerManager from './PlayerManager'
import PlayerHolderProvider from '../contexts/PlayerHolderProvider'

function MixerOverlay() {
    return (
        <PlayerHolderProvider>
            <PlayerManager />
        </PlayerHolderProvider>
    )
}

export default MixerOverlay