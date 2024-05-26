import { useEffect, useState } from 'react';
import {
	useFilterState,
	useFilterStateUpdate,
} from '../contexts/RebuiltFilterStateProvider';
import TagItem from './TagItem';

function FilterUI() {
	const filterState = useFilterState();
	const setFilterState = useFilterStateUpdate();

	const [search, setSearch] = useState('');
	const globalDisable = false;

	const [tags, setTags] = useState<string[]>([]);

	const onChangeCallback = (e: any) => {
		const { checked, name } = e.target;

		setFilterState((prev) => {
			if (checked) {
				return [...prev, name];
			} else {
				return prev.filter((tag) => tag !== name);
			}
		});
	};

	useEffect(() => {
		(async () => {
			const res = await fetch('/api/tags', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ filter: filterState }),
			});
			const tagNames = await res.json();

			if (Array.isArray(tagNames)) {
				setTags(tagNames as string[]);
			} else {
				console.error(
					'Unknown data type on api response',
					typeof tagNames
				);
			}
		})();
	}, [filterState]);

	return (
		<div className='s flex h-full w-full flex-col gap-2 p-6'>
			<div className='h-full w-full rounded bg-blue-800/25 p-6'>
				<div className='flex max-h-full w-full flex-row flex-wrap gap-2 overflow-scroll'>
					<div className='h-1/6 w-full'>
						<input
							type='text'
							className='h-full w-full rounded bg-indigo-800/25 p-2'
							placeholder='Search...'
							onChange={(e) => {
								setSearch(e.target.value);
							}}
						/>
					</div>
					{tags.sort().map((tag, index) => {
						return (
							(tag.includes(search) ||
								search === '' ||
								filterState.includes(tag)) && (
								<TagItem
									tag={tag}
									index={index}
									globalDisable={globalDisable}
									onChangeCallback={onChangeCallback}
									isInFilter={filterState.includes(tag)}
								/>
							)
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default FilterUI;
