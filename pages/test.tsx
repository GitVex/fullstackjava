import React, { useEffect, useState } from 'react';

function Test() {
	const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className='flex flex-col h-screen justify-center items-center'>
			<p>{windowSize.width}</p>
			<p>{windowSize.height}</p>
		</div>
	);
}

export default Test;
