import { useEffect, useState } from 'react';
import { usePlayerHolder } from '../../contexts/PlayerHolderProvider';
import { presetControlType } from '../../contexts/states';
import IFPlayer from '../../utils/IFPlayer';
import { fadeIn, fadeOut } from '../../utils/fadeFunctions';
import { fadeIntervalsControlType, localVolumesControlType } from '../states';

interface GroupFadeControlProps {
    localVolumeControls: localVolumesControlType;
    fadeIntervalsControls: fadeIntervalsControlType;
    presetControls: presetControlType;
}

const handleGroupFade = (
    direction: 'in' | 'out',
    framedPlayers: (IFPlayer | null)[],
    localVolumeControl: localVolumesControlType,
    fadeIntervalsControls: fadeIntervalsControlType,
    presetControls: presetControlType,
) => {
    // Early exit if any framedPlayers are null
    if (framedPlayers.some(framePlayer => framePlayer === null)) return;

    // Determine the fade action based on the direction
    const fadeAction = direction === 'in' ? fadeIn : fadeOut;

    presetControls.presetState.players.forEach((player, idx) => {
        if (!player.selected || !framedPlayers[idx]) return;

        const targetVolume = direction === 'in' ? localVolumeControl.localVolumes[idx] : 0;
        const setVolume = (vol: number) => {
            localVolumeControl.localVolumesDispatch({ type: 'setVolume', index: idx, payload: vol });
        };
        const setCurrentFadeInterval = (interval: NodeJS.Timeout | null) => {
            fadeIntervalsControls.currentFadeIntervalDispatch({
                type: 'setCurrentFadeInterval',
                index: idx,
                payload: interval,
            });
        };
        const setSavedVolume = (savedVolume: { hasSaved: boolean; prevVol: number }) => {
            presetControls.presetDispatch({
                type: 'setSavedVolume',
                index: idx,
                payload: savedVolume,
            });
        };

        fadeAction({
            framePlayer: framedPlayers[idx],
            localVolumeControl: { localVolume: localVolumeControl.localVolumes[idx], setLocalVolume: setVolume },
            fadeIntervalControl: {
                currentFadeInterval: fadeIntervalsControls.currentFadeIntervals[idx],
                setCurrentFadeInterval,
            },
            savedVolumeControl: { savedVolume: player.savedVolume, setSavedVolume },
            pLimit: targetVolume,
            inverse: direction === 'out',
        });
    });
};

function GroupFadeControl({ localVolumeControls, fadeIntervalsControls, presetControls }: GroupFadeControlProps) {
    const [disable, setDisable] = useState(true);
    const playerHolder = usePlayerHolder();
    const framedPlayers = playerHolder.holders.map(holder => holder.player);

    useEffect(() => {
        const allReady = playerHolder.holders.every(holder => holder.isReady);
        setDisable(!allReady);
    }, [playerHolder.holders]);

    return (
        <div>
            <div className="flex flex-row gap-2 rounded border-2 border-darknavy-700 bg-darknavy-500 p-2">
                <button
                    className="w-fit rounded border-2 border-darknavy-700 bg-darknavy-500 px-2 py-1 disabled:opacity-50"
                    onClick={() =>
                        handleGroupFade('in', framedPlayers, localVolumeControls, fadeIntervalsControls, presetControls)
                    }
                    disabled={disable}
                >
                    Fade In
                </button>
                <button
                    className="w-fit rounded border-2 border-darknavy-700 bg-darknavy-500 px-2 py-1 disabled:opacity-50"
                    onClick={() =>
                        handleGroupFade('out', framedPlayers, localVolumeControls, fadeIntervalsControls, presetControls)
                    }
                    disabled={disable}
                >
                    Fade Out
                </button>
            </div>
        </div>
    );
}

export default GroupFadeControl;
