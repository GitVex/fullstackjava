import React from 'react'
import { useQuery } from 'react-query'
import { useEffect } from 'react'
import ViewerContainer from './ViewerContainer'
import { useFilterState } from '../contexts/FilterStateProvider'
import { useFetchSignal } from '../contexts/FetchSignalProvider'

function Viewer() {

    const filterState = useFilterState()
    const refetchSignal = useFetchSignal()

    useEffect(() => {
        refetch()
    }, [refetchSignal])

    // send the filter with the request in the body
    const callbackRequest = async () => {

        console.log('refetching in Viewer with: ', filterState)

        const response = await fetch('/api/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filter: filterState })
        })
        const res = await response.json()
        console.log('response: ', res)
        return res
    }

    const { isLoading, error, data, refetch } = useQuery('tracks', callbackRequest, { refetchInterval: 15000, enabled: false })

    useEffect(() => {
        console.log('data: ', data)
    }, [data])

    return (
        <>
            
            <h1>Viewer</h1>
            {
                isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    //@ts-ignore 
                    <div>Error: {error.message}</div>
                ) : data ? (
                    <div className='flex flex-col gap-2 items-start'>
                        {data.map((track: any) => (
                            <div key={track.id}>
                                <ViewerContainer id={track.id} title={track.title} artist={track.artist} url={track.url} tags={track.tags} />
                            </div>
                        ))}
                    </div>
                ) : null
            }
        </>

    )
}

export default Viewer