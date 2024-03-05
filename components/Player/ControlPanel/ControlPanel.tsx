import React, { useState } from 'react';
import SelectionsViewer from './SelectionsViewer';
import GroupFadeControl from './GroupFadeControl';
import InitialPlayerLoader from './InitialPlayerLoader';
import {
	PresetState,
	PlayerStateAction,
	FadeIntervalsState,
	FadeIntervalsAction,
	SetVolumesAction,
} from '../states';

interface ControlPanelProps {
	states: PresetState;
	dispatch: React.Dispatch<PlayerStateAction>;
	fadeIntervals: FadeIntervalsState;
	fadeIntervalDispatch: React.Dispatch<FadeIntervalsAction>;
	pVolumes: number[];
	pSetVolume: React.Dispatch<SetVolumesAction>;
}

function ControlPanel({
	states,
	dispatch,
	fadeIntervals,
	fadeIntervalDispatch,
	pVolumes,
	pSetVolume,
}: ControlPanelProps) {
	const [initialLoadDone, setInitialLoadDone] = useState(false);
	const onLoaded = () => setInitialLoadDone(true);

	return (
		<div className='flex h-full w-1/3 flex-col items-center justify-center gap-2'>
			{/* render all selection states as rounded boxes in a 2 by 4 grid */}
			<SelectionsViewer players={states.players} dispatch={dispatch} />
			<GroupFadeControl
				players={states.players}
				dispatch={dispatch}
				fadeIntervals={fadeIntervals}
				fadeIntervalDispatch={fadeIntervalDispatch}
			/>
			{initialLoadDone ? null : (
				<InitialPlayerLoader
					onLoaded={onLoaded}
					pVolumes={pVolumes}
					pSetVolume={pSetVolume}
				/>
			)}
		</div>
	);
}

export default ControlPanel;
