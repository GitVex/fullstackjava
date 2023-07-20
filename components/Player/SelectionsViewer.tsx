import React from 'react';
import { motion } from 'framer-motion';

interface Selection {
	id: number;
	selected: boolean;
}

interface SelectionsViewerProps {
	selections: {
		selected: Selection[];
	};
	selectionDispatch: React.Dispatch<{
		type: 'select' | 'deselect';
		index: number;
	}>;
}

const SelectionsViewer: React.FC<SelectionsViewerProps> = ({
	selections,
	selectionDispatch,
}) => {
	return (
		<div className='absolute top-4 right-4'>
			<div className='flex flex-col items-center'>
				<div className='grid grid-cols-2 grid-rows-4 gap-2 rounded bg-darknavy-500 p-4 shadow-[inset_0_0_8px_rgba(108,117,130,1)]'>
					{selections.selected.map((selection) => (
						<div
							key={selection.id}
							className={`relative flex h-8 w-10 rounded bg-transparent`}
						>
							<motion.div
								className={`absolute top-0 left-0 flex h-8 w-10 rounded`}
								animate={{
                                    boxShadow: selection.selected ? '0 0 8px 3px #f00' : '0 0 0 0px #f00',
								}}
                                transition={{
                                    duration: 0.2,
                                }}
							/>
							<div
								className={`absolute top-0 left-0 flex h-8 w-10 rounded bg-transparent shadow-[inset_0_0_12px_rgba(108,117,130,1)]`}
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
	);
};

export default SelectionsViewer;
