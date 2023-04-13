import React from 'react';

function ViewColumn({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) {
	return <div className={className}>{children}</div>;
}

export default ViewColumn;
