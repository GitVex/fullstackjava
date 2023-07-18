export const cyclicGenerator = (arr: any[] = [], start?: any) => {
	let i = arr.includes(start) ? arr.indexOf(start) : 0;
	return {
		next: () => {
			const value = arr[i];
			i = (i + 1) % arr.length;
			return value;
		},
        length: arr.length,
        start: start || arr[0]
	};
};
