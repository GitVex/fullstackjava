// ViewColumn.tsx
import React, { useState } from 'react';
import { FilterItemsList, ListItems, NewItemsList } from './ItemLists';
import TListType from './types/TListType';

interface ViewColumnProps {
    type?: TListType;
}

export default function ViewColumn({ type = 'list' }: ViewColumnProps) {
    const [search, setSearch] = useState('');

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
                {type === 'list' && <ListItems search={search} />}
                {type === 'new' && <NewItemsList search={search} />}
                {type === 'filter' && <FilterItemsList search={search} />}
                {type === 'owned' && <ListItems search={search} />}
                {type === 'trend' && <ListItems search={search} />}


            </div>
        </div>
    )
        ;
}