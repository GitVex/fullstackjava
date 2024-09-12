// useNewItems.ts
import useSWRInfinite from 'swr/infinite';
import { fetcher } from './fetcher';
import TPage from '../types/TPage';
import { mutate } from 'swr';
import { cache } from 'swr/_internal';

export function useNewItems(pageSize: number = 10) {
    const getKey = (pageIndex: number, previousPageData: TPage | null) => {
        if (previousPageData && !previousPageData.data.length) return null;
        return `/api/viewer/new?page=${pageIndex}&pageSize=${pageSize}`;
    };

    const { data, error, size, setSize } = useSWRInfinite<TPage, Error>(getKey, fetcher, {
        revalidateOnFocus: false,
        refreshInterval: 1000 * 60 * 2,
    });

    const items = data ? data.flatMap(page => page.data) : [];
    const isLoadingMore = data && typeof data[size - 1] === 'undefined';

    const caches = Array.from(cache.keys());

    const invalidateNewItemsCache = () => {
        caches.forEach((key) => {
            if (key.includes('/api/viewer/new')) {
                mutate(key, undefined, { revalidate: false }).then(() => {});
            }
        });
    };

    return { items, isError: error, isLoading: !error && !data, isLoadingMore, setSize, size, invalidateNewItemsCache };
}
