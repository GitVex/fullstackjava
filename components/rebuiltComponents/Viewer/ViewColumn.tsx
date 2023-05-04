// ViewColumn.tsx
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { track } from '@prisma/client';
import ListItem from './ListItem';
import { useFilterState } from '../../contexts/RebuiltFilterStateProvider';

export function ViewColumn({
	children,
	className,
	style,
	type = 'list',
}: {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	type?: string;
}) {

	const filterState = useFilterState();

	let route = '/api/rebuilt/list';
	if (type === 'new') {
		route = '/api/rebuilt/new';
	} else if (type === 'trend') {
		route = '/api/rebuilt/list';
	} else if (type === 'filter') {
		route = '/api/rebuilt/filter';
	} else if (type === 'owned') {
		route = '/api/rebuilt/list';
	} else {
		route = '/api/rebuilt/list';
	}

	const { isLoading, error, data, refetch } = useQuery<track[], Error>(
		['items', type],
		fetchData,
		{
			enabled: route === '/api/rebuilt/filter' ? false : true,
			refetchInterval: 1000 * 60 * 20,
			refetchOnWindowFocus: false,
		}
	);

	async function fetchData(): Promise<track[]> {
		const response = await fetch(route, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				filter: filterState,
				origin: type,
			}),
		});
		const res = await response.json();

		return res;
	}

	useEffect(() => {
		if (route === '/api/rebuilt/filter') {
			refetch();
		}
	}, [filterState]);

	return (
		<div className={className} style={style}>
			<p className='mb-2 w-full text-center capitalize'>{type}</p>
			<ul className='m-2 flex max-h-full flex-col gap-2'>
				{isLoading ? (
					<p>Loading...</p>
				) : error ? (
					<p>Error: {error.message}</p>
				) : data ? (
					data.map((item) => {
						return (
							<li key={item.id}>
								<ListItem item={item} />
							</li>
						);
					})
				) : (
					<p>no data</p>
				)}
			</ul>
		</div>
	);
}
