// useFilterItems.ts
import useSWRInfinite from 'swr/infinite';
import { fetcher } from './fetcher';
import { useFilter } from '../../Contexts/FilterStateProvider';
import TPage from '../types/TPage';

export function useFilterItems(pageSize: number = 10) {
    const { filter } = useFilter();

    const getKey = (pageIndex: number, previousPageData: TPage | null) => {
        if (previousPageData && !previousPageData.data.length) return null;

        const route = `/api/viewer/filter?page=${pageIndex}&pageSize=${pageSize}`;

        return [route, filter];
    };

    const { data, error, size, setSize } = useSWRInfinite<TPage, Error>(
        getKey,
        (url) => fetcher(url, { filter }),
        {
            revalidateOnFocus: false,
            refreshInterval: 1000 * 60 * 10,
        },
    );

    const items = data ? data.flatMap(page => page.data) : [];
    const isLoadingMore = data && typeof data[size - 1] === 'undefined';

    return { items, isError: error, isLoading: !error && !data, isLoadingMore, setSize, size };
}
