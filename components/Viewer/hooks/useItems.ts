// useItems.ts
import useSWR from 'swr';
import { track, tag } from '@prisma/client';
import { useFilter } from '../../contexts/FilterStateProvider';

const fetcher = (url: string, body?: any) =>
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());

export function useItems(type: string) {
    const { filter } = useFilter();

    let route = '/api/list';
    if (type === 'new') {
        route = '/api/viewer/new';
    } else if (type === 'trend') {
        route = '/api/viewer/list';
    } else if (type === 'filter') {
        route = '/api/viewer/filter';
    } else if (type === 'owned') {
        route = '/api/viewer/list';
    }

    const regFetcher = (route: string) => (() => fetcher(route));
    const FilteredFetcher = (route: string, filter: string[]) => (() => fetcher(route, { filter: filter }));

    const { data, error, isLoading, mutate } = useSWR<track & { tags: tag[] }[], Error>(
        type === 'filter' ? ['/api/viewer/filter', filter] : route,
        type === 'filter' ? FilteredFetcher(route, filter) : regFetcher(route),
        {
            revalidateOnFocus: false,
            refreshInterval: 1000 * 60 * 20,
        },
    );

    return { data, isError: error, isLoading, mutate };
}
