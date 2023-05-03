import React from 'react';

interface TagItemProps {
	tag: string;
	index: number;
	globalDisable?: boolean;
	onChangeCallback?: (event: any) => void;
}

function TagItem({ tag, index, globalDisable = false, onChangeCallback }: TagItemProps) {
	return (
		<p key={index} className='flex flex-row gap-1 bg-indigo-500/25 rounded px-1'>
			<input type='checkbox' name={tag} id={tag + 'Box'} disabled={globalDisable} onChange={onChangeCallback}/>
			<label htmlFor={tag + 'Box'} className='w-full truncate'>
                {tag}
			</label>
		</p>
	);
}

export default TagItem;
