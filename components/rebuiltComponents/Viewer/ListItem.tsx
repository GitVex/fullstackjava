import React from 'react';
import { track } from '@prisma/client';

function ListItem({ item }: { item: track }) {
	return (
		<div className='flex w-full flex-row items-center gap-2 rounded-lg bg-indigo-600/10 p-2 text-sm'>
			<div className='flex w-3/5 flex-1 flex-col'>
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
				className='rounded bg-indigo-600/20 px-2 py-1 text-xs font-semibold text-white hover:scale-95 transition-all duration-100'
			>
				Copy
			</button>
			<button className='rounded bg-indigo-600/20 px-2 py-1 text-xs font-semibold text-white hover:scale-95 transition-all duration-100'>
				Add
			</button>
		</div>
	);
}

export default ListItem;
