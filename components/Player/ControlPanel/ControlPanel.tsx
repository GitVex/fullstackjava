import { useState } from 'react';
import { presetControlType } from '../../contexts/states';
import { fadeIntervalsControlType, localVolumesControlType } from '../types/states';
import GroupFadeControl from './GroupFadeControl';
import InitialPlayerLoader from './InitialPlayerLoader';
import SelectionsViewer from './SelectionsViewer';

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
                    presetControls={props.presetControls}
                />
            )}
        </div>
    );
}

export default ControlPanel;
