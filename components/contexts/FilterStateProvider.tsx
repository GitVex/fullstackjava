import React, { createContext, useContext, useState, ReactNode } from 'react';

type FilterStateContextType = {
    filterState: string[];
    setFilterState: React.Dispatch<React.SetStateAction<string[]>>;
};

const FilterStateContext = createContext<FilterStateContextType | undefined>(undefined);

export function useFilterState() {
    const context = useContext(FilterStateContext);
    if (!context) {
        throw new Error('useFilterState must be used within a FilterStateProvider');
    }
    return context;
}

function FilterStateProvider({ children }: { children: ReactNode }) {
    const [filterState, setFilterState] = useState<string[]>([]);

    const value = { filterState, setFilterState };

    return (
        <FilterStateContext.Provider value={value}>
            {children}
        </FilterStateContext.Provider>
    );
}

export default FilterStateProvider;
