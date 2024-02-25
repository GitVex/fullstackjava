import React from 'react';
import { useLocalStorage } from 'usehooks-ts';

function Tester() {
	const [count, setCount] = useLocalStorage('count', 0, {
		initializeWithValue: false,
	});

	return (
		<div
			className={`flex h-screen w-screen place-content-center items-center text-2xl`}
		>
			<button
				className={`m-2 rounded-md bg-blue-500 p-2 text-white`}
				onClick={() => setCount(count + 1)}
			>
				Increment
			</button>
			<div>{count}</div>
		</div>
	);
}

export default Tester;
