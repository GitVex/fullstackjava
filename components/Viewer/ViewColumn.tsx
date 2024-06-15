// ViewColumn.tsx
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useItems } from './hooks/useItems';
import LoadingAnim from '../utils/LoadingAnimDismount';
import ListItem from './ListItem';

interface ViewColumnProps {
    className?: string;
    style?: React.CSSProperties;
    type?: string;

}

export function ViewColumn({ className, style, type = 'list' }: ViewColumnProps) {
    const [search, setSearch] = useState('');
    const { data: items, isError, isLoading } = useItems(type);

    return (
        <div className={className} style={style}>
            <AnimatePresence mode="wait">
                {isError && (<p>Error: {isError.message}</p>)}
                {isLoading && (
                    <motion.div key="loader" className="self-center">
                        <LoadingAnim />
                    </motion.div>
                )}
                {items && (
                    <div className="flex flex-col gap-2">
                        <input
                            type="text"
                            className="rounded bg-transparent p-1"
                            placeholder="Search ..."
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                        <ul className="flex max-h-full flex-col gap-2">
                            {items.map((item: any) => {
                                if (
                                    item.title.toLowerCase().includes(search.toLowerCase()) ||
                                    item.artist.toLowerCase().includes(search.toLowerCase())
                                ) {
                                    return (
                                        <li key={item.id}>
                                            <ListItem item={item} />
                                        </li>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </ul>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
