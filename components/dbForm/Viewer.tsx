import React from 'react';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import ViewerContainer from './ViewerContainer';
import {
	useFilterState,
	usePingRefetch,
} from '../contexts/FilterStateProvider';
import TrackTotal from './TrackTotal';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingAnim from '../utils/LoadingAnimDismount';

const container = {
	show: {
		transition: {
			staggerChildren: 1,
		},
	},
	exit: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const item = {
	hidden: {
		opacity: 0,
		x: 20,
	},
	show: (i: number) => {
		return {
			opacity: 1,
			x: 0,
			transition: {
				delay: 0.05 * i,
			},
		};
	},
	exit: {
		opacity: 0,
		x: 20,
	},
};

function Viewer() {
	const [maxResults, setMaxResults] = useState(9);
	const [search, setSearch] = useState('');
	const filterState = useFilterState();
	const ping = usePingRefetch();

	useEffect(() => {
		refetch();
	}, [ping]);

	// send the filter with the request in the body
	const callbackRequest = async () => {
		const response = await fetch('/api/list', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ filter: filterState }),
		});
		const res = await response.json();
		return res;
	};
	const titleSearch = (e: any) => {
		setSearch(e.target.value);
	};

	const { isLoading, error, data, refetch } = useQuery(
		'tracks',
		callbackRequest,
		{ refetchInterval: 15000, enabled: false }
	);

	return (
		<>
			<div className='flex w-full flex-col items-center gap-2'>
				<span className='flex flex-row items-center gap-8'>
					<button
						onClick={() => setMaxResults(maxResults - 2)}
						className='w-fit rounded bg-gray-800/50 p-2 duration-100 hover:bg-gray-800/80'
					>
						Load less
					</button>
					<h1>Viewer ({data ? data.length : null}) </h1>
					<button
						onClick={() => setMaxResults(maxResults + 2)}
						className='w-fit rounded bg-gray-800/50 p-2 duration-100 hover:bg-gray-800/80'
					>
						Load more
					</button>
				</span>
				<input
					type='text'
					placeholder='Search Title'
					className='w-fit rounded bg-gray-800/50 p-2 duration-100 hover:bg-gray-800/80'
					onChange={titleSearch}
				/>
				<div className='h-fit w-full'>
					<AnimatePresence mode='wait'>
						{isLoading ? (
							<motion.div key='loader'>
								<LoadingAnim />
							</motion.div>
						) : error ? (
							//@ts-ignore
							<div>Error: {error.message}</div>
						) : data ? (
							<motion.div
								key='data'
								className='flex w-full flex-col items-center gap-1'
								variants={container}
								animate={data.length > 0 && 'show'}
							>
								<AnimatePresence>
									{data
										.map((track: any, idx: number) =>
											track.title
												.toLowerCase()
												.includes(
													search.toLowerCase()
												) ? (
												<ViewerContainer
													key={track.id}
													id={track.id}
													title={track.title}
													artist={track.artist}
													url={track.url}
													tags={track.tags}
													variants={item}
													custom={idx}
												/>
											) : null
										)
										.slice(0, maxResults)}
								</AnimatePresence>
							</motion.div>
						) : null}
					</AnimatePresence>
				</div>
				<TrackTotal />
			</div>
		</>
	);
}

export default Viewer;
