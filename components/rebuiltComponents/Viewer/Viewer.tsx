import React, { useState, useEffect } from 'react';
import { useQuery, QueryClientProvider, QueryClient } from 'react-query';

interface DataItem {
	id: number;
	name: string;
	description: string;
	image: string;
}

export function Viewer({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={className}>
			<QueryClientProvider client={new QueryClient()}>
				{children}
			</QueryClientProvider>
		</div>
	);
}

export function ViewColumn({
	children,
	className,
	style
}: {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}) {
	const { isLoading, error, data } = useQuery<DataItem[], Error>(
		'items',
		fetchData,
		{
			enabled: true,
			refetchInterval: 15000,
		}
	);

	useEffect(() => {}, [data]);

	async function fetchData(): Promise<DataItem[]> {
		const response = await fetch('/api/rebuilt/list', {
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
								<p>
									{item.name}: <em>{item.description}</em>
								</p>
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
