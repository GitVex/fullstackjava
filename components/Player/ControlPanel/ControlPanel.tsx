import React from 'react';
import SelectionsViewer from './SelectionsViewer';
import GroupFadeControl from './GroupFadeControl';
import {
    PresetState,
    PlayerStateAction,
    FadeIntervalsState,
    FadeIntervalsAction,
} from '../states';

interface ControlPanelProps {
    states: PresetState;
    dispatch: React.Dispatch<PlayerStateAction>;
    fadeIntervals: FadeIntervalsState;
    fadeIntervalDispatch: React.Dispatch<FadeIntervalsAction>;
}

function ControlPanel({
    states,
    dispatch,
    fadeIntervals,
    fadeIntervalDispatch,
}: ControlPanelProps) {
	return (
		<div className='flex h-full w-1/3 flex-col items-center justify-center gap-2'>
			{/* render all selection states as rounded boxes in a 2 by 4 grid */}
			<SelectionsViewer
				players={states.players}
				dispatch={dispatch}
			/>
			<GroupFadeControl
				players={states.players}
				dispatch={dispatch}
				fadeIntervals={fadeIntervals}
				fadeIntervalDispatch={fadeIntervalDispatch}
			/>
		</div>
	);
}

export default ControlPanel;
