import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import TagFinder from '../components/TagFinder'
import { useState } from 'react'

function showRelatedTags() {

    const queryClient = new QueryClient()

    const [filterState, setFilterState] = useState([] as string[])

    return (
        <QueryClientProvider client={queryClient}>
            <div className='flex flex-col gap-2 h-screen place-content-center items-center bg-gradient-to-tr dark:from-darknavy-600'>
                <h1>Find related Tags</h1>
                <p className=''>
                    Select a Tag to begin!
                </p>
                <TagFinder filterState={filterState} setFilterState={setFilterState}/>
            </div>
        </QueryClientProvider>
    )
}

export default showRelatedTags