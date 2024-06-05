import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import { usePlayerHolderById } from '../contexts/PlayerHolderProvider';
import { presetControlType } from '../contexts/states';
import IFPlayer from '../utils/IFPlayer';
import VolumeSlider from '../utils/VolumeSlider';
import { fadeIn, fadeOut } from '../utils/fadeFunctions';
import { fadeInputHandler, loadNewVideo } from '../utils/utils';
import { fadeIntervalControlType, localVolumeControlType } from './states';

interface PlayerComponentProps {
    playerId: number;
    masterVolumeModifier: number;
    presetControls: presetControlType;
    fadeIntervalControl: fadeIntervalControlType;
    localVolumeControl: localVolumeControlType;
}

function PlayerComponent(props: PlayerComponentProps) {
    const ID = `player${props.playerId}`;
    const { playerId, masterVolumeModifier, presetControls, fadeIntervalControl, localVolumeControl } = props;
    const playerInPreset = presetControls.presetState.players[playerId];
    const framePlayer = usePlayerHolderById(playerId).player as IFPlayer;

    const debouncedPresetDispatch = useDebounceCallback(presetControls.presetDispatch, 750);

    const [savedVolume, setSavedVolume] = useState({ hasSaved: false, prevVol: 0 });

    const currentFadeInterval = fadeIntervalControl.currentFadeInterval;
    const setCurrentFadeInterval = (interval: NodeJS.Timeout | null) =>
        fadeIntervalControl.currentFadeIntervalDispatch({
            type: 'setCurrentFadeInterval',
            index: playerId,
            payload: interval,
        });

    const selected = playerInPreset?.selected ?? false;
    const setSelected = () => {
        debouncedPresetDispatch?.({
            type: selected ? 'deselect' : 'select',
            index: playerId,
        });
    };

    const localVolume = localVolumeControl.localVolume;
    const setLocalVolume = (vol: number) => {
        if (!framePlayer) return;

        localVolumeControl.localVolumeDispatch({
            type: 'setVolume',
            index: playerId,
            payload: vol,
        });
        debouncedPresetDispatch({
            type: 'setVolume',
            index: playerId,
            payload: vol,
        });
    };

    useEffect(() => {
        if (!framePlayer || framePlayer?.setVolume === undefined) {
            return;
        }
        framePlayer.setVolume(localVolume * masterVolumeModifier);
    }, [framePlayer, localVolume, masterVolumeModifier]);

    return (
        <motion.div
            className="flex flex-col justify-around gap-2 rounded border-2 border-darknavy-700 bg-darknavy-500 p-1"
            animate={{
                boxShadow: selected ? '0 0 8px 1px #f00' : '0 0 0 0px #fff',
            }}
            transition={{
                duration: 0.2,
            }}
            onClick={e => {
                if (e.currentTarget !== e.target) return;
                setSelected();
            }}
        >
            <div className="flex w-full h-full flex-row justify-around" onClick={e => e.stopPropagation()}>
                <div className="rounded h-4/5" id={ID} />
                <VolumeSlider
                    volumeControl={{
                        localVolume,
                        setLocalVolume,
                    }}
                    className="rounded border-2 border-darknavy-400/25"
                    textBgColor="bg-darknavy-500"
                    height={'80%'}
                />
            </div>
            <div className="flex h-1/5 w-full flex-row items-center justify-center gap-2" onClick={e => e.stopPropagation()}>
                <input
                    type="text"
                    className="w-2/5 rounded bg-gray-800/50 p-1"
                    placeholder="Video ID"
                    onKeyDown={e => {
                        if (e.key !== 'Enter') return;
                        loadNewVideo(
                            playerId,
                            debouncedPresetDispatch,
                            framePlayer,
                            (e.target as HTMLInputElement).value,
                            localVolume * masterVolumeModifier,
                        );
                    }}
                />
                <button
                    className="w-1/5 rounded bg-gray-800/50 p-1 disabled:opacity-50"
                    onClick={() => {
                        fadeIn({
                            framePlayer,
                            localVolumeControl: { localVolume, setLocalVolume },
                            savedVolumeControl: { savedVolume, setSavedVolume },
                            fadeIntervalControl: { currentFadeInterval, setCurrentFadeInterval },
                        });
                    }}
                    disabled={!framePlayer}
                >
                    Fade In
                </button>
                <input
                    type="text"
                    className=" w-1/5 rounded bg-gray-800/50 p-1"
                    placeholder="Volume"
                    onKeyDown={e => {
                        fadeInputHandler(e, {
                            framePlayer,
                            localVolumeControl: { localVolume, setLocalVolume },
                            savedVolumeControl: { savedVolume, setSavedVolume },
                            fadeIntervalControl: { currentFadeInterval, setCurrentFadeInterval },
                        });
                    }}
                />
                <button
                    className="w-2/6 rounded bg-gray-800/50 p-1 disabled:opacity-50"
                    onClick={() => {
                        fadeOut({
                            framePlayer,
                            localVolumeControl: { localVolume, setLocalVolume },
                            savedVolumeControl: { savedVolume, setSavedVolume },
                            fadeIntervalControl: { currentFadeInterval, setCurrentFadeInterval },
                            pLimit: 0,
                        });
                    }}
                    disabled={!framePlayer}
                >
                    Fade Out
                </button>
            </div>
        </motion.div>
    );
}

export default PlayerComponent;
