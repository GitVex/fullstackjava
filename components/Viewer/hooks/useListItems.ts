// useListItems.ts
import useSWRInfinite from 'swr/infinite';
import { fetcher } from './fetcher';
import TPage from '../types/TPage';

export function useListItems(pageSize: number = 10) {
    const excludeIds: number[] = [];

    const getKey = (pageIndex: number, previousPageData: TPage | null) => {
        if (previousPageData && !previousPageData.data.length) return null;

        if (previousPageData) {
            previousPageData.data.forEach(item => excludeIds.push(item.id));
        }

        return `/api/viewer/list?page=${pageIndex}&pageSize=${pageSize}&excludeIds=${excludeIds.toString()}`;
    };

    const { data, error, size, setSize } = useSWRInfinite<TPage, Error>(getKey, fetcher, {
        revalidateOnFocus: false,
        refreshInterval: 1000 * 60 * 10,
    });

    const items = data ? data.flatMap(page => page.data) : [];
    const isLoadingMore = data && typeof data[size - 1] === 'undefined';

    return { items, isError: error, isLoading: !error && !data, isLoadingMore, setSize, size };
}
