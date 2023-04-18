import React, { useEffect } from 'react';
import {
	useFilterState,
	useFilterStateUpdate,
} from '../../contexts/RebuiltFilterStateProvider';

function FilterUI() {
	const filterState = useFilterState();
	const setFilterState = useFilterStateUpdate();

	useEffect(() => {
		setFilterState(['foo', 'bar', 'baz']);
	}, []);

	return (
		<div className='flex h-full w-full flex-col gap-2 p-6'>
			<div className='h-1/3 w-full rounded bg-emerald-500'>
				<div className='flex flex-row gap-2'>
					{filterState.map((tag) => {
						return <p>{tag}</p>;
					})}
				</div>
			</div>
			<div className='h-1/3 w-full rounded bg-amber-500' />
			<div className='h-1/3 w-full rounded bg-indigo-500' />
		</div>
	);
}

export default FilterUI;
