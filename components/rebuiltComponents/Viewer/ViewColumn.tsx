// ViewColumn.tsx
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { track } from '@prisma/client';
import ListItem from './ListItem';

export function ViewColumn({
	children,
	className,
	style,
	type,
}: {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	type?: string;
}) {
	let route = '/api/rebuilt/list';
	if (type === 'new') {
		route = '/api/rebuilt/list';
	} else if (type === 'trend') {
		route = '/api/rebuilt/list';
	} else if (type === 'filter') {
		route = '/api/rebuilt/filter';
	} else if (type === 'owned') {
		route = '/api/rebuilt/list';
	}

	const { isLoading, error, data } = useQuery<track[], Error>(
		'items',
		fetchData,
		{
			enabled: true,
			refetchInterval: 1000 * 60 * 20,
		}
	);

	useEffect(() => {}, [data]);

	async function fetchData(): Promise<track[]> {
		const response = await fetch(route, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({}),
		});
		const res = await response.json();

		return res;
	}

	return (
		<div className={className} style={style}>
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
