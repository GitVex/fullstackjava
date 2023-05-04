// Context to manage the state of the filter and update when new tags are selected
import React, { useState, useContext, useEffect } from 'react';

const FilterStateContext = React.createContext([] as string[]);
export const FilterStateUpdateContext = React.createContext(
	{} as React.Dispatch<React.SetStateAction<string[]>>
);

export function useFilterStateUpdate() {
	return useContext(FilterStateUpdateContext);
}

export function useFilterState() {
	return useContext(FilterStateContext);
}

function FilterStateProvider({ children }: { children?: React.ReactNode }) {
	const [filterState, setFilterState] = useState([] as string[]);

	useEffect(() => {
		console.log('FilterStateContext updated to: ', filterState);
	}, [filterState]);

	return (
		<FilterStateContext.Provider value={filterState}>
			<FilterStateUpdateContext.Provider value={setFilterState}>
				{children}
			</FilterStateUpdateContext.Provider>
		</FilterStateContext.Provider>
	);
}

export default FilterStateProvider;
