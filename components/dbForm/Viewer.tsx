import React from 'react'
import { useQuery } from 'react-query'
import { useState, useEffect } from 'react'
import ViewerContainer from './ViewerContainer'
import TagFinder from '../TagFinder'

function Viewer() {

    const [filterState, setFilterState] = useState([])

    useEffect(() => {
        callbackRequest()
    }, [filterState])

    // send the filter with the request in the body
    const callbackRequest = async () => {
        const response = await fetch('/api/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filter: filterState })
        })
        const data = await response.json()
        return data
    }

    const { isLoading, error, data } = useQuery('tracks', callbackRequest, { refetchInterval: 100 })

    return (
        <div>

            <TagFinder filterState={filterState} setFilterState={setFilterState} />

            <h1>Viewer</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                //@ts-ignore 
                <div>Error: {error.message}</div>
            ) : (
                <div className='flex flex-col gap-2 items-start'>
                    {data.map((track: any) => (
                        <div key={track.id}>
                            <ViewerContainer id={track.id} title={track.title} artist={track.artist} url={track.url} tags={track.tags} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Viewer