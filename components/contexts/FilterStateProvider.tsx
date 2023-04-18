import React, { useContext, useState, useEffect } from 'react'

const FilterStateContext = React.createContext([] as string[])
const FilterStateUpdateContext = React.createContext((newFilterState: string[]) => console.log('No FilterStateProvider'))
const FetchSignalContext = React.createContext(false)

export function useFilterState() {
    return useContext(FilterStateContext)
}

export function useFilterStateUpdate() {
    return useContext(FilterStateUpdateContext)
}

export function usePingRefetch() {
    return useContext(FetchSignalContext)
}

export function FilterStateProvider({ children }: { children: React.ReactNode }) {

    const [filterState, setFilterState] = useState([] as string[])
    const [refetchSignal, setRefetchSignal] = useState(false)

    function updateFilterState(newFilterState: string[]) {
        setFilterState(newFilterState)
    }

    function pingRefetch() {
        setRefetchSignal(refetchSignal => !refetchSignal)
    }

    useEffect(() => {
        pingRefetch()
    }, [filterState])

    return (
        <FilterStateContext.Provider value={filterState}>
            <FilterStateUpdateContext.Provider value={updateFilterState}>
                <FetchSignalContext.Provider value={refetchSignal}>
                    {children}
                </FetchSignalContext.Provider>
            </FilterStateUpdateContext.Provider>
        </FilterStateContext.Provider>
    )
}

export default FilterStateProvider