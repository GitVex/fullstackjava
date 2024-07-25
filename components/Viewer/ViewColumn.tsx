// ViewColumn.tsx
import React, { useState } from 'react';
import { FilterItemsList, ListItems, NewItemsList, SearchItemsList } from './ItemLists';
import TListType from './types/TListType';
import { useSearchItems } from './hooks/useSearchItems';

interface ViewColumnProps {
    type?: TListType;
}

export default function ViewColumn({ type = 'list' }: ViewColumnProps) {
    const [search, setSearch] = useState('');
    const searchHook = useSearchItems(search, 30);

    return (
        <div className="h-full">
            <div className="flex flex-col gap-2 h-full">
                <input
                    type="text"
                    className="rounded bg-transparent p-1"
                    placeholder="Search ..."
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
                {search && (<SearchItemsList hook={searchHook} />)}
                {!search && type === 'list' && <ListItems />}
                {!search && type === 'new' && <NewItemsList />}
                {!search && type === 'filter' && <FilterItemsList />}
                {!search && type === 'owned' && <ListItems />}
                {!search && type === 'trend' && <ListItems />}
            </div>
        </div>
    )
        ;
}