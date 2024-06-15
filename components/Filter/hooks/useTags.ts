import useSWR, { mutate } from 'swr';
import { useFilterState } from '../../contexts/FilterStateProvider';

const fetcher = (url: string, filterState: string[]) =>
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filter: filterState }),
    }).then((res) => res.json());

function useTags() {

    const { filterState } = useFilterState();

    const { data, error, isLoading } = useSWR(['/api/tags', filterState], () => fetcher('/api/tags', filterState));

    return {
        tags: data,
        isLoading,
        isError: error,
    };
}

export default useTags;
