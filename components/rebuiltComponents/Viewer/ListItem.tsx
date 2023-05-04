import React from 'react';
import { track } from '@prisma/client';
import NotificationButton from '../../utils/NotificationButton';

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
			<NotificationButton
				onClick={() => navigator.clipboard.writeText(item.url)}
				buttonText='Copy'
			/>
			<NotificationButton
				onClick={() => {}}
				buttonText='Add'
			/>
		</div>
	);
}

export default ListItem;
