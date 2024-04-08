import React, { useState } from 'react';
import SelectionsViewer from './SelectionsViewer';
import GroupFadeControl from './GroupFadeControl';
import InitialPlayerLoader from './InitialPlayerLoader';
import { localVolumesControlType, fadeIntervalsControlType } from '../states';
import { PresetState, PlayerStateAction, presetControlType } from '../../contexts/states';
import { usePresetState } from '../../contexts/PlayerHolderProvider';

interface ControlPanelProps {
    presetControls: presetControlType;
    localVolumesControls: localVolumesControlType;
    fadeIntervalsControls: fadeIntervalsControlType;
}

function ControlPanel(props: ControlPanelProps) {
    const [initialLoadDone, setInitialLoadDone] = useState(false);
    const onLoaded = () => setInitialLoadDone(true);

    return (
        <div className="flex h-full w-1/3 flex-col items-center justify-center gap-2">
            <SelectionsViewer presetControls={props.presetControls} />
            <GroupFadeControl
                localVolumeControls={props.localVolumesControls}
                fadeIntervalsControls={props.fadeIntervalsControls}
                presetControls={props.presetControls}
            />
            {initialLoadDone ? null : (
                <InitialPlayerLoader
                    onLoaded={onLoaded}
                    localVolumesControls={props.localVolumesControls}
                    presetConstrols={props.presetControls}
                />
            )}
        </div>
    );
}

export default ControlPanel;
