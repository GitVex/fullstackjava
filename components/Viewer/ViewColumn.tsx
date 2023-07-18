// ViewColumn.tsx
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { track } from '@prisma/client';
import ListItem from './ListItem';
import { useFilterState } from '../contexts/RebuiltFilterStateProvider';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingAnim from '../utils/LoadingAnimDismount';

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

	let route = '/api/list';
	if (type === 'new') {
		route = '/api/new';
	} else if (type === 'trend') {
		route = '/api/list';
	} else if (type === 'filter') {
		route = '/api/filter';
	} else if (type === 'owned') {
		route = '/api/list';
	} else {
		route = '/api/list';
	}

	const { isLoading, error, data, refetch } = useQuery<track[], Error>(
		['items', type],
		fetchData,
		{
			enabled: route === '/api/filter' ? false : true,
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
		if (route === '/api/filter') {
			refetch();
		}
	}, [filterState]);

	return (
		<div className={className} style={style}>
			<p className='mb-2 w-full text-center capitalize'>{type}</p>
			<AnimatePresence mode='wait'>
				{isLoading ? (
						<motion.div key='loader' className='self-center'>
							<LoadingAnim />
						</motion.div>
				) : error ? (
					<p>Error: {error.message}</p>
				) : data ? (
					<ul className='m-2 flex max-h-full flex-col gap-2'>
						{data?.map((item) => {
							return (
								<li key={item.id}>
									<ListItem item={item} />
								</li>
							);
						})}
					</ul>
				) : (
					<p>no data</p>
				)}
			</AnimatePresence>
		</div>
	);
}
