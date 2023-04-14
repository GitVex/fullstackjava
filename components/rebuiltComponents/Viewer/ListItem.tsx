import React from 'react';
import { track } from '@prisma/client';

function ListItem({ item }: { item: track }) {
	return (
		<div className='flex flex-row gap-2 text-sm'>
			<p
				onClick={() => window.open(item.url, '_blank')?.focus()}
				className='cursor-pointer rounded bg-slate-500/10'
			>
				{item.title}: <em>{item.artist}</em>
			</p>
			<button className='rounded bg-slate-500/10'>
				<p>Copy</p>
			</button>
			<button className='rounded bg-slate-500/10'>
				<p>Add</p>
			</button>
		</div>
	);
}

export default ListItem;
