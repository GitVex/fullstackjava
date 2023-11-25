export function sleep(milliseconds: number) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

const argFact =
	<T>(compareFn: (a: [T, number], b: [T, number]) => [T, number]) =>
	(array: T[]): number =>
		array.map((el, idx): [T, number] => [el, idx]).reduce(compareFn)[1];

export function argMin<T>(array: T[]): number {
	return argFact<T>((min, el) => (el[0] < min[0] ? el : min))(array);
}

export function argMax<T>(array: T[]): number {
	return argFact<T>((max, el) => (el[0] > max[0] ? el : max))(array);
}
