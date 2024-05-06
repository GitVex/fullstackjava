// Viewer.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

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
