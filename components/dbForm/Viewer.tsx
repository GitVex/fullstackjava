import React from 'react'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import ViewerContainer from './ViewerContainer'
import { useFilterState, usePingRefetch } from '../contexts/FilterStateProvider'
import TrackTotal from './TrackTotal'


function Viewer() {

    const [maxResults, setMaxResults] = useState(7)
    const filterState = useFilterState()
    const ping = usePingRefetch()

    useEffect(() => {
        refetch()
    }, [ping])

    // send the filter with the request in the body
    const callbackRequest = async () => {
        const response = await fetch('/api/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filter: filterState, maxResults: maxResults })
        })
        const res = await response.json()
        return res
    }

    const { isLoading, error, data, refetch } = useQuery('tracks', callbackRequest, { refetchInterval: 15000, enabled: false })

    return (
        <>
            <div className='flex flex-col gap-2 items-center w-fit'>
                <h1>Viewer</h1>

                {
                    isLoading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        //@ts-ignore 
                        <div>Error: {error.message}</div>
                    ) : data ? (
                        <div className='flex flex-col gap-1 items-center w-full'>
                            {data.map((track: any) => (
                                <ViewerContainer key={track.id} id={track.id} title={track.title} artist={track.artist} url={track.url} tags={track.tags} />
                            ))}
                        </div>
                    ) : null
                }
                <TrackTotal />
                <button onClick={() => refetch()} className='p-2 rounded bg-gray-800/50 w-fit hover:bg-gray-800/80 duration-100'>Refresh</button>
                <span className='flex flex-row gap-2 items-center'>
                    <button onClick={() => setMaxResults(maxResults - 2)} className='p-2 rounded bg-gray-800/50 w-fit hover:bg-gray-800/80 duration-100'>Load less</button>
                    <p>[showing: {maxResults}]</p>
                    <button onClick={() => setMaxResults(maxResults + 2)} className='p-2 rounded bg-gray-800/50 w-fit hover:bg-gray-800/80 duration-100'>Load more</button>
                </span>
            </div>
        </>

    )
}

export default Viewer