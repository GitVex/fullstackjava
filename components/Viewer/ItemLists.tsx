import { useNewItems } from './hooks/useNewItems';
import { useFilterItems } from './hooks/useFilterItems';

import { Virtuoso } from 'react-virtuoso';
import ListItem from './ListItem';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingAnim from '../utils/LoadingAnimDismount';
import TItem from './types/TItem';
import TPage from './types/TPage';
import { useListItems } from './hooks/useListItems';

interface IItemsListProps {
    search: string;
    hook: {
        items: TItem[];
        isLoading: boolean;
        isError: any;
        isLoadingMore: boolean | undefined;
        setSize: (size: number | ((_size: number) => number)) => Promise<TPage[] | undefined>;
        size: number;
    };
}

export function ItemsList(props: IItemsListProps) {
    const search = props.search;
    const {
        items,
        isLoading,
        isError,
        isLoadingMore,
        setSize,
        size,
    } = props.hook;

    return (
        <AnimatePresence mode="wait">
            {isError && (<p>Error: {isError.message}</p>)}
            {isLoading && (
                <motion.div key="loader" className="self-center">
                    <LoadingAnim />
                </motion.div>
            )}
            {items && (
                <Virtuoso
                    data={items.filter((item: TItem) =>
                        item.title?.toLowerCase().includes(search.toLowerCase()) ||
                        item.artist?.toLowerCase().includes(search.toLowerCase()),
                    )}
                    itemContent={(_, item) => <ListItem item={item} />}
                    style={{ height: '100%', width: '100%' }}
                    onKeyDown={(e) => {
                        if (e.key === ' ') {
                            e.preventDefault();
                        }
                    }}
                    endReached={() => {
                        if (!isLoadingMore && search === '') {
                            setSize(size + 1).then(r => console.log(r, size));
                        }
                    }}
                    components={{
                        Footer: () => (
                            <div>
                                {isLoadingMore && search === '' ? (
                                    <motion.div key="loader" className="self-center">
                                        <LoadingAnim />
                                    </motion.div>
                                ) : ''}
                            </div>
                        ),
                    }}
                />
            )}
        </AnimatePresence>
    );
}

export function NewItemsList({ search }: { search: string }) {
    return (
        <ItemsList search={search} hook={useNewItems(30)} />
    );
}

export function FilterItemsList({ search }: { search: string }) {
    return (
        <ItemsList search={search} hook={useFilterItems(30)} />
    );
}

export function ListItems({ search }: { search: string }) {
    return (
        <ItemsList search={search} hook={useListItems(30)} />
    );
}