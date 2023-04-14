import React from 'react';
import { track } from '@prisma/client';

function ListItem({
	item,
	children,
}: {
	item: track;
	children: React.ReactNode;
}) {
	return (
		<div>
			{children}
			<button onClick={() => window.open(item.url, '_blank')?.focus()}>
				<p>Copy</p>
			</button>
			<button>
				<p>Add</p>
			</button>
		</div>
	);
}

export default ListItem;
