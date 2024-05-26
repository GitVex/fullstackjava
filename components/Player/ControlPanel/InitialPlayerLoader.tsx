import { useCallback, useEffect, useState } from 'react';
import { usePlayerHolder } from '../../contexts/PlayerHolderProvider';
import { presetControlType } from '../../contexts/states';
import { loadNewVideo } from '../../utils/utils';
import { localVolumesControlType } from '../states';

interface InitialPlayerLoaderProps {
    onLoaded: () => void;
    localVolumesControls: localVolumesControlType;
    presetControls: presetControlType;
}

function InitialPlayerLoader(props: InitialPlayerLoaderProps) {
    const { presetState, presetDispatch } = props.presetControls;
    const { localVolumes, localVolumesDispatch } = props.localVolumesControls;
    const { onLoaded } = props;

    const playerHolder = usePlayerHolder();
    const [allPlayersReady, setAllPlayersReady] = useState(false);

    const allReady = useCallback(() => playerHolder.holders.every(holder => holder.isReady), [playerHolder.holders]);

    const checkAllPlayersReady = useCallback(() => {
        if (allReady() && !allPlayersReady) {
            setAllPlayersReady(true);
            playerHolder.holders.forEach((holder, idx) => {
                if (holder.player) {
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
    }, [
        allReady,
        allPlayersReady,
        playerHolder.holders,
        presetDispatch,
        localVolumesDispatch,
        presetState.players,
        onLoaded,
    ]);

    useEffect(() => {
        const intervalId = setInterval(checkAllPlayersReady, 1000); // Increased interval to 1000ms (1 second)

        return () => {
            clearInterval(intervalId);
        };
    }, [checkAllPlayersReady]);

    return null;
}

export default InitialPlayerLoader;
