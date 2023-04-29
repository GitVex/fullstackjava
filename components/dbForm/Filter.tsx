import React from 'react';
import { useQuery } from 'react-query';

function Filter(props: { filterState: any; setFilterState: any }) {
	const { filterState, setFilterState } = props;

	const callbackRequest = async () => {
		const response = await fetch('/api/tags');
		const data = await response.json();
		return data;
	};

	const { isLoading, error, data } = useQuery('tags', callbackRequest, {
		refetchInterval: 100,
	});

	if (isLoading) return <div>Loading...</div>;
	//@ts-ignore
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className='flex h-auto w-auto flex-row flex-wrap gap-2 rounded bg-gray-700/20 p-2'>
			{/* Store the the tags with the first two ids in this section */}
			<div className='flex flex-col gap-1 rounded bg-gray-900/50 px-1'>
				{data.slice(0, 3).map((tag: any) => (
					<div
						key={tag.id}
						className='flex flex-row gap-1 rounded bg-gray-800/50 px-1'
					>
						<input
							type='checkbox'
							name={tag.name}
							id={tag.name}
							checked={filterState[tag.name]}
							onChange={() =>
								setFilterState({
									...filterState,
									[tag.name]: !filterState[tag.name],
								})
							}
						/>
						<label htmlFor={tag.name} className='w-1/6'>
							{tag.name}
						</label>
					</div>
				))}
				{/* Get all tags  */}
			</div>
			<div className='h-auto w-1 border-l-2 border-gray-800/50'></div>
			{/* Store the the tags with the first two ids in this section */}
			<div className='flex h-[10rem] flex-col gap-1 overflow-scroll rounded bg-gray-900/50 px-1'>
				{data.slice(3).map((tag: any) => (
					<div
						key={tag.id}
						className='flex flex-row gap-1 rounded bg-gray-800/50 px-1'
					>
						<input
							type='checkbox'
							name={tag.name}
							id={tag.name}
							checked={filterState[tag.name]}
							onChange={() =>
								setFilterState({
									...filterState,
									[tag.name]: !filterState[tag.name],
								})
							}
						/>
						<label htmlFor={tag.name} className='w-1/6'>
							{tag.name}
						</label>
					</div>
				))}
			</div>
			<div className='flex h-[10rem] flex-col gap-1 overflow-scroll rounded bg-gray-900/50 px-1'></div>
			<div className='h-auto w-1 border-l-2 border-gray-800/50'></div>
			<div className='flex h-[10rem] flex-col gap-1 overflow-scroll rounded bg-gray-900/50 px-1'></div>
			<div className='h-auto w-1 border-l-2 border-gray-800/50'></div>
		</div>
	);
}

export default Filter;
