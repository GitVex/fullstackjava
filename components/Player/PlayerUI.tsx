import React, { useContext, useState, useMemo, useReducer } from 'react';
import PlayerHolderProvider from '../contexts/PlayerHolderProvider';
import PlayerComponent from './PlayerComponent';
import WindowSizeContext from '../contexts/WindowSizeProvider';
import VolumeSlider from '../utils/VolumeSlider';
import {
	SelectionsState,
	selectionsReducer,
	VolumesState,
	volumesReducer,
	FadeIntervalsState,
	fadeIntervalsReducer,
} from './states';
import SelectionsViewer from './ControlPanel/SelectionsViewer';
import GroupFadeControl from './ControlPanel/GroupFadeControl';

const DEFAULT_VOLUME = 50;

const initialVolumeStates: VolumesState = {
	volume: Array(9).fill(DEFAULT_VOLUME),
	savedVolume: Array(9).fill({hasSaved: false, prevVol: 0}),
};

const initialSelectionStates: SelectionsState = {
	selected: [0, 1, 2, 3, 4, 5, 6, 7].map((id) => ({
		id: id,
		selected: false,
	})),
};

const initialFadeIntervals: FadeIntervalsState = {
	fadeIntervals: Array(9).fill(null),
};

function PlayerUI() {
	const context = useContext(WindowSizeContext);
	const windowHeight: number | undefined | null = context?.windowHeight;
	const windowWidth: number | undefined | null = context?.windowWidth;

	const [masterVolume, setMasterVolume] = useState(100);
	const [masterVolumeModifier, setMasterVolumeModifier] = useState(1);

	const [volumes, volumeDispatch] = useReducer(
		volumesReducer,
		initialVolumeStates
	);
	const [selections, selectionDispatch] = useReducer(
		selectionsReducer,
		initialSelectionStates
	);
	const [fadeIntervals, fadeIntervalDispatch] = useReducer(
		fadeIntervalsReducer,
		initialFadeIntervals
	);
		

	useMemo(() => {
		setMasterVolumeModifier(masterVolume / 100);
	}, [masterVolume]);

	return (
		<PlayerHolderProvider>
			<div
				className='absolute z-10 flex flex-row items-center justify-center gap-2 p-4 backdrop-blur-md'
				/* @ts-ignore */
				style={{ width: windowWidth, height: windowHeight }}
			>
				<div className='flex h-full w-fit flex-row items-center gap-4'>
					<div className='flex w-full flex-col items-center'>
						<div className='grid grid-cols-2 grid-rows-4 gap-2'>
							{[0, 1, 2, 3, 4, 5, 6, 7].map((id) => (
								<PlayerComponent
									key={id}
									playerId={id}
									masterVolumeModifier={masterVolumeModifier}
									pVolume={volumes.volume[id]}
									pSetVolume={(volume) =>
										volumeDispatch({
											type: 'setVolume',
											index: id,
											payload: volume,
										})
									}
									pSavedVolume={volumes.savedVolume[id]}
									pSetSavedVolume={(value: {hasSaved: boolean, prevVol?: number}) =>
										volumeDispatch({
											type: 'setVolumeState',
											index: id,
											payload: value.prevVol ? value.prevVol : 0,
											saveState: value.hasSaved,
										})
									}
									pSelected={selections.selected[id].selected}
									pSetSelected={() => {
										if (selections.selected[id].selected) {
											selectionDispatch({
												type: 'deselect',
												index: id,
											});
										} else {
											selectionDispatch({
												type: 'select',
												index: id,
											});
										}
									}}
									pCurrentFadeInterval={fadeIntervals.fadeIntervals[id]}
									pSetCurrentFadeInterval={(interval) =>
										fadeIntervalDispatch({
											type: 'setCurrentFadeInterval',
											index: id,
											payload: interval,
										})
									}
								/>
							))}
						</div>
					</div>
					<div className='flex w-28 flex-col items-center gap-4'>
						<p className='whitespace-nowrap'>Master Volume</p>
						<VolumeSlider
							volume={masterVolume}
							setVolume={setMasterVolume}
							height={500}
						/>
					</div>
				</div>

				<div className='flex h-full w-1/3 flex-col items-center justify-center gap-2'>
					{/* render all selection states as rounded boxes in a 2 by 4 grid */}
					<SelectionsViewer
						selections={selections}
						selectionDispatch={selectionDispatch}
					/>
					<GroupFadeControl
						selections={selections}
						volumes={volumes}
						volumeDispatch={volumeDispatch}
						fadeIntervals={fadeIntervals}
						fadeIntervalDispatch={fadeIntervalDispatch}
					/>
				</div>
			</div>
		</PlayerHolderProvider>
	);
}

export default PlayerUI;
