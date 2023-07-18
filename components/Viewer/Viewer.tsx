// Viewer.tsx
import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

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
