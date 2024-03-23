import React, { useEffect, useState } from 'react';
import { usePlayerHolder } from '../../contexts/PlayerHolderProvider';
import { localVolumesControlType, localVolumeControlEndType } from '../states';
import { loadNewVideo } from '../PlayerComponent';
import { presetControlType } from '../../contexts/states';

interface InitialPlayerLoaderProps {
    onLoaded: () => void;
    localVolumesControls: localVolumesControlType;
    presetConstrols: presetControlType;
}

function InitialPlayerLoader(props: InitialPlayerLoaderProps) {
    const { presetState, presetDispatch } = props.presetConstrols;
    const { localVolumes, localVolumesDispatch } = props.localVolumesControls;
    const { onLoaded } = props;

    const playerHolder = usePlayerHolder();

    useEffect(() => {
        const checkAllPlayersReady = () => {
            const allReady = playerHolder.holders.every(holder => {
                return holder.isReady;
            });

            /* console.log('checking player state ...', allReady); */
            if (allReady) {
                console.log('All players are ready. Loading preset state...', presetState);

                playerHolder.holders.forEach((holder, idx) => {
                    if (holder.player) {
                        console.log('Setting player', idx, 'volume to', presetState.players[idx].volume);
                        localVolumesDispatch({
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
    }, [playerHolder, onLoaded, presetDispatch, localVolumesDispatch, presetState.players]);

    return <></>;
}

export default InitialPlayerLoader;
