import React from 'react'
import Creator from '../components/dbForm/Creator'
import Viewer from '../components/dbForm/Viewer'
import { QueryClient, QueryClientProvider } from 'react-query'

function second() {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <div className='flex items-center h-screen place-content-around bg-gradient-to-tr dark:from-darknavy-600'>
                <div className='flex basis-1/2 items-center place-content-center'>
                    <Creator />
                </div>
                <div className='flex flex-col basis-1/2 items-center place-content-center'>
                    <Viewer />
                </div>
            </div>
        </QueryClientProvider>
    )
}

export default second