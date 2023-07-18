import React, { useState, useEffect } from 'react';
import { cyclicGenerator } from '../../../utils/cyclicGenerator';

function Tester() {
	const arr = Array.from({ length: 100 }, (_, i) => i);
	const gen = cyclicGenerator(arr, 50);

	const [num, setNum] = useState(gen.start);

	useEffect(() => {
		const interval = setInterval(() => {
			setNum(gen.next());
		}, 25);

		return () => clearInterval(interval);
	}, []);

	const opacity = (num: number, len: number) => {
		return num / len;
	};

	return (
		<div
			className={`flex h-screen w-screen place-content-center items-center text-2xl`}
			style={{ opacity: opacity(num, gen.length) }}
		>
			{num}
		</div>
	);
}

export default Tester;
