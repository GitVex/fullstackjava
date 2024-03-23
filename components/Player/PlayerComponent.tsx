import React, { useEffect, useState } from 'react';
import { usePlayerHolderById } from '../contexts/PlayerHolderProvider';
import { motion } from 'framer-motion';
import IFPlayer from '../utils/IFPlayer';
import VolumeSlider from '../utils/VolumeSlider';
import { useDebounceCallback } from 'usehooks-ts';
import { fadeIn, fadeOut, fadeTo, FadeOptions } from '../utils/fadeFunctions';
import { PlayerStateAction, presetControlType } from '../contexts/states';
import { transformToTarget } from '../utils/utils';
import { fadeIntervalControlType, localVolumeControlType } from './states';

interface PlayerComponentProps {
    playerId: number;
    masterVolumeModifier: number;
    presetControls: presetControlType;
    fadeIntervalControl: fadeIntervalControlType;
    localVolumeControl: localVolumeControlType;
}

function fadeInputHandler(
    e: React.KeyboardEvent<HTMLInputElement>,
    { framePlayer, localVolumeControl, savedVolumeControl, fadeIntervalControl }: FadeOptions
) {
    // Early return if no framePlayer or if the event key is not 'Enter'
    if (!framePlayer || e.key !== 'Enter') return;

    const inputValue = e.currentTarget.value; // Directly access the input's value
    const targetVolume = parseInt(inputValue); // Parse once, ensuring we're working with a number

    // Further validation to proceed only if inputValue is a valid number
    if (isNaN(targetVolume)) return;

    // Define a callback to handle fading, choosing between fadeIn and fadeTo based on player state
    const fadeAction = framePlayer.getPlayerState() !== 1 ? fadeIn : fadeTo;

    // Execute the fading action with the provided parameters
    fadeAction({
        framePlayer,
        localVolumeControl,
        savedVolumeControl,
        fadeIntervalControl,
        pLimit: targetVolume,
    });
}

export function loadNewVideo(
    playerId: number,
    dispatch: React.Dispatch<PlayerStateAction>,
    framePlayer: IFPlayer,
    input: string,
    volume?: number
) {
    if (!framePlayer) return;

    const target = transformToTarget(input);
    if (!target) return;

    framePlayer.setVolume(volume ?? framePlayer.getVolume());
    framePlayer.loadVideoById(target);

    dispatch({
        type: 'setId',
        index: playerId,
        payload: target,
    });

    setTimeout(() => {
        framePlayer.pauseVideo();
        framePlayer.seekTo(0, true);
        framePlayer.setLoop(true);
    }, 1000);
}

function PlayerComponent(props: PlayerComponentProps) {
    const ID = `player${props.playerId}`;
    const { playerId } = props;
    const playerInPreset = props.presetControls.presetState.players[playerId];
    const framePlayer = usePlayerHolderById(props.playerId).player as IFPlayer;

    const debouncedPresetDispatch = useDebounceCallback(props.presetControls.presetDispatch, 750);

    const [savedVolume, setSavedVolume] = useState({ hasSaved: false, prevVol: 0 });

    const currentFadeInterval = props.fadeIntervalControl.currentFadeInterval;
    const setCurrentFadeInterval = (interval: NodeJS.Timeout | null) =>
        props.fadeIntervalControl.currentFadeIntervalDispatch({
            type: 'setCurrentFadeInterval',
            index: playerId,
            payload: interval,
        });

    const selected = playerInPreset?.selected ?? false;
    const setSelected = () => {
        debouncedPresetDispatch?.({
            type: playerInPreset?.selected ? 'deselect' : 'select',
            index: playerId,
        });
    };

    const localVolume = props.localVolumeControl.localVolume;
    const setLocalVolume = (vol: number) => {
        if (!framePlayer) return;

        props.localVolumeControl.localVolumeDispatch({
            type: 'setVolume',
            index: playerId,
            payload: vol,
        });
        debouncedPresetDispatch({
            type: 'setVolume',
            index: playerId,
            payload: localVolume,
        });
    };

    useEffect(() => {
        framePlayer?.setVolume(localVolume * props.masterVolumeModifier);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localVolume, props.masterVolumeModifier]);

    return (
        <motion.div
            className={
                'flex h-[180px] w-96 flex-col justify-around gap-2 rounded border-2 border-darknavy-700 bg-darknavy-500 p-1'
            }
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
            <div
                className="flex w-full flex-row justify-around"
                onClick={e => {
                    if (e.currentTarget !== e.target) return;
                    setSelected();
                }}
            >
                <div className="rounded" id={ID} />
                <VolumeSlider
                    volumeControl={{
                        localVolume,
                        setLocalVolume,
                    }}
                    className="rounded border-2 border-darknavy-400/25 p-2"
                    textBgColor="bg-darknavy-500"
                />
            </div>
            <div className="flex w-full flex-row items-center justify-center gap-2">
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
                            localVolume * props.masterVolumeModifier
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
                    disabled={framePlayer ? false : true}
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
                    disabled={framePlayer ? false : true}
                >
                    Fade Out
                </button>
            </div>
        </motion.div>
    );
}

export default PlayerComponent;
