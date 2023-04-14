import React from 'react';
import { track } from '@prisma/client';

function ListItem({ item }: { item: track }) {
	return (
		<div className='flex w-full flex-row items-center gap-2 rounded-lg bg-slate-500/10 p-2 text-sm'>
			<div className='flex flex-1 flex-col w-full'>
				<div
					onClick={() => window.open(item.url, '_blank')?.focus()}
					className='w-full cursor-pointer truncate'
					style={{ maxWidth: '100%' }}
				>
					<p className='overflow-hidden whitespace-nowrap font-semibold'>
						{item.title}
					</p>
					<p className='truncate text-slate-600'>
						<em>{item.artist}</em>
					</p>
				</div>
			</div>
			<button
				onClick={() => navigator.clipboard.writeText(item.url)}
				className='rounded bg-slate-500 px-2 py-1 text-xs font-semibold text-white'
			>
				Copy
			</button>
			<button className='ml-2 rounded bg-slate-500 px-2 py-1 text-xs font-semibold text-white'>
				Add
			</button>
		</div>
	);
}

export default ListItem;
