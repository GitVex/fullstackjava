import React, { useContext, useState, useMemo, useReducer } from 'react';
import PlayerHolderProvider from '../contexts/PlayerHolderProvider';
import PlayerComponent from './PlayerComponent';
import WindowSizeContext from '../contexts/WindowSizeProvider';
import VolumeSlider from '../utils/VolumeSlider';
import { motion } from 'framer-motion';

const DEFAULT_VOLUME = 50;

interface VolumesState {
	volume: number[];
}

interface VolumesAction {
	type: 'setVolume';
	index: number;
	payload: number;
}

const initialVolumeStates: VolumesState = {
	volume: Array(9).fill(DEFAULT_VOLUME),
};

const volumesReducer = (
	state: VolumesState,
	action: VolumesAction
): VolumesState => {
	switch (action.type) {
		case 'setVolume':
			return {
				...state,
				volume: state.volume.map((vol, index) => {
					if (index === action.index) {
						return action.payload;
					} else {
						return vol;
					}
				}),
			};
		default:
			throw new Error();
	}
};

interface SelectionsState {
	selected: { id: number; selected: boolean }[];
}

interface SelectionsAction {
	type: 'select' | 'deselect';
	index: number;
	selected?: boolean;
}

const initialSelectionStates: SelectionsState = {
	selected: [0, 1, 2, 3, 4, 5, 6, 7].map((id) => ({
		id: id,
		selected: false,
	})),
};

const selectionsReducer = (
	state: SelectionsState,
	action: SelectionsAction
): SelectionsState => {
	switch (action.type) {
		case 'select':
			console.log('selected player ' + action.index + '!', state);
			return {
				...state,
				selected: state.selected.map((selection) => {
					if (selection.id === action.index) {
						return { ...selection, selected: true };
					} else {
						return selection;
					}
				}),
			};
		case 'deselect':
			console.log('deselected player ' + action.index + '!', state);
			return {
				...state,
				selected: state.selected.map((selection) => {
					if (selection.id === action.index) {
						return { ...selection, selected: false };
					} else {
						return selection;
					}
				}),
			};
		default:
			throw new Error();
	}
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
				<div className='flex w-fit flex-row items-center gap-4'>
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
									pSelected={selections.selected[id].selected}
									pSetSelected={(selected) => {
										if (selected) {
											selectionDispatch({
												type: 'select',
												index: id,
											});
										} else {
											selectionDispatch({
												type: 'deselect',
												index: id,
											});
										}
									}}
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

				<div className='flex w-1/3 flex-col items-center'>
					<div className='flex flex-col items-center'>
						{/* render all selection states as rounded boxes in a 2 by 4 grid */}
						<p>Selections</p>
						<div className='grid grid-cols-2 grid-rows-4 gap-2 rounded bg-darknavy-500 p-4 shadow-[inset_0_0_8px_rgba(108,117,130,1)]'>
							{selections.selected.map((selection) => (
								<div
									key={selection.id}
									className={`relative flex h-8 w-8 rounded bg-transparent`}
								>
									<motion.div
										className={`absolute top-0 left-0 flex h-8 w-8 bg-blue-400`}
										animate={{
											scale: selection.selected ? 1.3 : 0,
										}}
									/>
									<div
										className={`absolute top-0 left-0 flex h-8 w-8 rounded bg-transparent shadow-[inset_0_0_12px_rgba(108,117,130,1)]`}
										onClick={() => {
											if (selection.selected) {
												selectionDispatch({
													type: 'deselect',
													index: selection.id,
												});
											} else {
												selectionDispatch({
													type: 'select',
													index: selection.id,
												});
											}
										}}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</PlayerHolderProvider>
	);
}

export default PlayerUI;
