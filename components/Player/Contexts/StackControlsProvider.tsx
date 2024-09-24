// PlayerContext.tsx
import React, { createContext, useReducer, useState, useContext, useEffect, ReactNode } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import {
    FadeAnimationsState,
    FadeAnimationsAction,
    LocalVolumesState,
    LocalVolumesAction,
    fadeAnimationsReducer,
    localVolumesReducer,
} from '../types/states';
import { PresetState, PlayerStateAction } from '../../Contexts/states';
import { usePresetState } from '../../Contexts/PlayerHolderProvider';
import { DEFAULT_VOLUME } from '../../utils/DEFAULTS';

const initialFadeAnimations: FadeAnimationsState = {
    fadeAnimationHandles: Array(9).fill(null),
};

const initialVolumes: LocalVolumesState = {
    volume: Array(8).fill(DEFAULT_VOLUME),
};

interface StackControlsProviderType {
    presetState: PresetState;
    presetDispatch: React.Dispatch<PlayerStateAction>;
    debouncedPresetDispatch: any;
    disablePersistPreset: boolean;
    setDisablePersistPreset: React.Dispatch<React.SetStateAction<boolean>>;
    clearPersistPreset: () => void;
    localVolumes: LocalVolumesState;
    localVolumesDispatch: React.Dispatch<LocalVolumesAction>;
    masterVolume: number;
    setMasterVolume: React.Dispatch<React.SetStateAction<number>>;
    masterVolumeModifier: number;
    fadeAnimations: FadeAnimationsState;
    fadeAnimationsDispatch: React.Dispatch<FadeAnimationsAction>;

}

const StackControlsContext = createContext<StackControlsProviderType | null>(null);

export const StackControlsProvider = ({ children }: { children: ReactNode }) => {
    const {
        presetState,
        presetDispatch,
        disablePersistPreset,
        setDisablePersistPreset,
        clearPersistPreset,
    } = usePresetState();
    const debouncedPresetDispatch = useDebounceCallback(presetDispatch, 1000);

    const [localVolumes, localVolumesDispatch] = useReducer(localVolumesReducer, initialVolumes);
    const [masterVolume, setMasterVolume] = useState(presetState.masterVolume);
    const [masterVolumeModifier, setMasterVolumeModifier] = useState(presetState.masterVolume / 100);
    const [fadeAnimations, fadeAnimationsDispatch] = useReducer(fadeAnimationsReducer, initialFadeAnimations);

    useEffect(() => {
        setMasterVolumeModifier(masterVolume / 100);
        debouncedPresetDispatch({ type: 'setMasterVolume', payload: masterVolume });
    }, [masterVolume, debouncedPresetDispatch]);

    return (
        <StackControlsContext.Provider value={{
            presetState,
            presetDispatch,
            debouncedPresetDispatch,
            disablePersistPreset,
            setDisablePersistPreset,
            clearPersistPreset,
            localVolumes,
            localVolumesDispatch,
            masterVolume,
            setMasterVolume,
            masterVolumeModifier,
            fadeAnimations,
            fadeAnimationsDispatch,
        }}>
            {children}
        </StackControlsContext.Provider>
    );
};

export function useStackControls() {
    const context = useContext(StackControlsContext);
    if (!context) {
        throw new Error('useStackControls must be used within a StackControlsProvider');
    }
    return context;
}