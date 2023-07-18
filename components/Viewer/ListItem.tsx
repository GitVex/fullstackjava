import React from 'react';
import { track } from '@prisma/client';
import NotificationButton from '../utils/NotificationButton';
import ts from 'typescript';

function ListItem({ item }: { item: track }) {

	return (
		//@ts-ignore
		<div className='flex w-full flex-row items-center gap-2 rounded-lg bg-indigo-600/10 p-2 text-sm hover:border-l-8 duration-100 ' style={{'border-inline-color': item.color}}>
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
				id = {item.id}
				color = {item.color}
				luminance={item.luminance}
				onClick={() => navigator.clipboard.writeText(item.url)}
			>
				Copy
			</NotificationButton>
			<NotificationButton
				id = {item.id}
				color = {item.color}
				luminance={item.luminance}
				onClick={() => {}}
			>
				Add
			</NotificationButton>
		</div>
	);
}

export default ListItem;
