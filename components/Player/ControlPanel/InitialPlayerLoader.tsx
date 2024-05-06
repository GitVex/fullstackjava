import { useCallback, useEffect } from 'react';
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

    const allReady = useCallback(() => playerHolder.holders.every(holder => holder.isReady), [playerHolder.holders]);

    const checkAllPlayersReady = useCallback(() => {
        /* console.log('checking player state ...', allReady); */
        if (allReady()) {
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
    }, [allReady, playerHolder, presetDispatch, localVolumesDispatch, presetState.players, onLoaded]);

    useEffect(() => {
        const intervalId = setInterval(checkAllPlayersReady, 500);

        return () => {
            clearInterval(intervalId);
        };
    }, [checkAllPlayersReady]);

    return <></>;
}

export default InitialPlayerLoader;
