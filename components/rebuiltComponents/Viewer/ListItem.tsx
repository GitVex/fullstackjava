import React from 'react';
import { track } from '@prisma/client';

function ListItem({ item }: { item: track }) {
	return (
		<div className='flex flex-row gap-2 text-sm'>
			<p
				onClick={() => window.open(item.url, '_blank')?.focus()}
				className='cursor-pointer bg-slate-500/50 rounded'
			>
				{item.title}: <em>{item.artist}</em>
			</p>
			<button className='bg-slate-500/50 rounded'>
				<p>Copy</p>
			</button>
			<button className='bg-slate-500/50 rounded'>
				<p>Add</p>
			</button>
		</div>
	);
}

export default ListItem;
