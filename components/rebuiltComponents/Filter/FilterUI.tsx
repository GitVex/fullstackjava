import React from 'react';
import {
	useFilterState,
	useFilterStateUpdate,
} from '../../contexts/FilterStateProvider';

function FilterUI() {
	const filterState = useFilterState();
	const setFilterState = useFilterStateUpdate();

	return (
		<div className='flex h-full w-full flex-col gap-2 p-6'>
			<div className='h-1/3 w-full rounded bg-emerald-500' />
			<div className='h-1/3 w-full rounded bg-amber-500' />
			<div className='h-1/3 w-full rounded bg-indigo-500' />
		</div>
	);
}

export default FilterUI;
