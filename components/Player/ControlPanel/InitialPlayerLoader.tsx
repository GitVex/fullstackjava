import React, { useEffect, useState } from 'react';
import { usePresetState } from '../../contexts/PlayerHolderProvider';
import { usePlayerHolder } from '../../contexts/PlayerHolderProvider';
import { SetVolumesAction } from '../states';
import { loadNewVideo } from '../PlayerComponent';

interface InitialPlayerLoaderProps {
    onLoaded: () => void;
    pVolumes: number[];
    pSetVolume: React.Dispatch<SetVolumesAction>;
}

function InitialPlayerLoader({ onLoaded, pVolumes, pSetVolume }: InitialPlayerLoaderProps) {
    const { presetState, presetDispatch } = usePresetState();
    const playerHolder = usePlayerHolder();

    const volumes = pVolumes;
    const setVolume = pSetVolume;

    useEffect(() => {
        const checkAllPlayersReady = () => {
            const allReady = playerHolder.holders.every(holder => {
                return holder.isReady;                
            });

			console.log('checking player state ...', allReady);
            if (allReady) {
                console.log('All players are ready. Loading preset state...');

                playerHolder.holders.forEach((holder, idx) => {
                    if (holder.player) {
                        setVolume({
                            type: 'setVolume',
                            index: idx,
                            payload: presetState.players[idx].volume,
                        });
                        loadNewVideo(idx, presetDispatch, holder.player, presetState.players[idx].videoId);
                    }
                });

                setTimeout(() => onLoaded(), 100);
            }
        };

        const intervalId = setInterval(checkAllPlayersReady, 500);

        return () => {
            clearInterval(intervalId);
        };
    }, [playerHolder, onLoaded, setVolume, presetDispatch, presetState.players]);

    return <></>;
}

export default InitialPlayerLoader;
