import React, { useContext, useState, useEffect } from 'react'

const FilterStateContext = React.createContext([] as string[])
const FilterStateUpdateContext = React.createContext( (newFilterState: string[]) => console.log('No FilterStateProvider') )

export function useFilterState() {
    return useContext(FilterStateContext)
}

export function useFilterStateUpdate() {
    return useContext(FilterStateUpdateContext)
}

export function FilterStateProvider({ children }: any) {

    const [filterState, setFilterState] = useState([] as string[])

    function updateFilterState(newFilterState: string[]) {
        setFilterState(newFilterState)
    }

    useEffect(() => {
        console.log('[Global] filterState updated to: ', filterState)
    }, [filterState])

    return (
        <FilterStateContext.Provider value={filterState}>
            <FilterStateUpdateContext.Provider value={updateFilterState}>
                {children}
            </FilterStateUpdateContext.Provider>
        </FilterStateContext.Provider>
    )
}

export default FilterStateProvider